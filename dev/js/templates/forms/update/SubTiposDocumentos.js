var yo=require('yo-yo');
const $=require('jquery')

module.exports=function(data,combo){
var opuesto;
var estatus=data.estatus
estatus=estatus.trim()
estatus=='ACTIVO' ? opuesto='INACTIVO': opuesto='ACTIVO';



function creaOption(combo){
    let opt='';
    combo.map(function(json){
        if(data.idTipoDocto==json.idTipoDocto){
            opt+=`<option value="${json.idTipoDocto}" selected >${json.nombre}</option>`     
        }
        else{
            opt+=`<option value="${json.idTipoDocto}" >${json.nombre}</option>`
        }

    }) 
    return opt
}

let opt=$.parseHTML(creaOption(combo))

return yo`<form method="POST" class="form-inline" id="SubTiposDocumentos">
   <div class="form-group idDocumento">
    <label for="idDocumento">Tipo de Documento</label>
    <select name="idTipoDocto" id="idDocumento" required="required" class="form-control">
        ${opt}
    </select>
    
</div>
<div class="form-group nombre">
    <label for="nombre">Nombre</label>
    <input type="text" class="form-control" id="nombre" placeholder="Nombre" required pattern="[A-Za-z].{1,49}" name="nombre" title="Nombre Incorrecto o Caracteres maximos" value="${data.nombre}">
</div>




<div class="form-group estatus">
    <label for="estatus">Estatus</label>
    <select id="estatus" name="estatus" class="form-control">
    <option value="${data.estatus}">${estatus}</option>
    <option value="${opuesto}">${opuesto}</option>
    </select>
</div>

</form>`;

}