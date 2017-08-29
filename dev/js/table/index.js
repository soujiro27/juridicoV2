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

  orderColumns(){
    $('table thead tr td').click(function(){
      alert("lest go")
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
