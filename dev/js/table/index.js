const $=require('jquery');
const template=require('./../templates/table')
const page=require('page');





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
      let tabla=template(response)
      $('div.loader').remove()
      $('div#main-content').html(tabla);
      self.clickTr();
      
    })
  }

  clickTr(){
    $('table.principal tbody tr').click(function(){
      let id=$(this).data('id');
      let campo=$(this).data('nombre')
     page.redirect('/juridico/'+ruta+'/update/'+campo+'/'+id)
  })
  }

  drawTableIfa(ruta){
    let self=this
    let final= self.getTable(ruta)
    .then(response=>{
      let tablaIfa=template(response)
      return tablaIfa
      
    })
    return final
  }






}
