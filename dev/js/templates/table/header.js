const $=require('jquery');
const yo=require('yo-yo')
module.exports=function(data){


  function render(llave){
    return `<th id="${llave}" class="${llave}">${llave}</th>`;
  }

  var th=``;
  $.each(data,function(index, el) {
    th+=render(index)
  });

  return th;
}
