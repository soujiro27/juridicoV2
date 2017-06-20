const $=require('jquery');
module.exports=function(data){


  function render(data){
    var tr=``;
    var td=``;
    for(let x in data){
      tr+=`<tr data-id="${data[x]}" data-nombre="${x}" >`;
      break;
    }

    $.each(data,function(index, el) {
      td+= `<td id="${index}" > ${el} </td>`;
    });
    tr+=`${td}`;
    tr=tr+`</tr>`;
    return tr;
  }
  return  $.parseHTML(render(data));

}
