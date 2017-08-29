const $=require('jquery');
const template=require('./../templates/table')
const page=require('page');
const orderV=require('./../Order/Volantes')
const func=require('./../functions')

const orderVolantes= new orderV()
const funcion=new func();


module.exports=class Tabla{


  getTable(tabla){
      let get=new Promise((resolve,reject)=>{
        $.get('/table/'+tabla,function(json, textStatus) {
            resolve(JSON.parse(json));
        });
      })
      return get
  }



  drawTable(ruta){
    let self=this
    self.getTable(ruta)
    .then(response=>{
      let tabla=template(response,ruta)
      $('div.loader').remove()
      $('div#main-content').html(tabla);
      self.clickTr();
      self.orderColumns(ruta)
    })
  }

  clickTr(){
    $('table.principal tbody tr').click(function(){
      let id=$(this).data('id');
      let campo=$(this).data('nombre')
     page.redirect('/juridico/'+ruta+'/update/'+campo+'/'+id)
  })
  }


 /*checar esta funcion para ver si si se queda 
  btnOrderBy(ruta){
    if(ruta=='Volantes'){
      $('button#orderBy').click(function(){
          orderVolantes.menu()
      })
    }
  }*/



  orderColumns(ruta){

    let self=this

    $('.tableHeader tr th').click(function(){
      let valor=$(this).data('order')
      $('div.orderType').hide()
      $(this).append('<div class="orderType"><p data-typeOrder="Asc">Asc</p><p data-typeOrder="Desc">Desc</p></div>')
      $('div.orderType p').click(function(){
        let order=$(this).text()
        console.log(order)
        funcion.getTableOrder(ruta,valor,order)
        .then(response=>{
          let tabla=template(response,ruta)
          $('div.loader').remove()
          $('div#main-content').html(tabla);
          self.clickTr();
          self.orderColumns(ruta)
        })
      })
      /*funcion.getTableOrder(ruta,valor)
      .then(response=>{
        let tabla=template(response,ruta)
        $('div.loader').remove()
        $('div#main-content').html(tabla);
        self.clickTr();
        self.orderColumns(ruta)
      })*/
    })
  }




  drawTableIfa(ruta,data){
    let self=this
    let final= funcion.getDatos(ruta,data)
    .then(response=>{
      let tablaIfa=template(response,ruta)
      return tablaIfa
      
    })
    return final
  }


}
