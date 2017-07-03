const yo=require('yo-yo')
module.exports=function(datos,documento,SubTiposDocumento){
 
var opuesto;
datos.estatus=='ACTIVO' ? opuesto='INACTIVO':opuesto='ACTIVO';

return yo`<form method="POST" class="form-inline" id="DoctosTextos">
   <div class="form-group idDocumento">
    <label for="idDocumento">Tipo de Documento</label>
    <select name="idTipoDocto" id="idDocumento" required="required" class="form-control">
    	<option value=""> Seleccione una Opción </option>
    	${ documento.map(function(json){
            if(json.idTipoDocto==datos.idTipoDocto){
                return yo`<option value="${json.idTipoDocto}" selected >${json.nombre} </option>`    
            }
    		return yo`<option value="${json.idTipoDocto}" >${json.nombre} </option>`
    	}) }
    </select>
</div>

<div class="form-group subDocumento">
    <label for="subDocumento">Tipo de SubDocumento</label>
    <select name="idSubTipoDocumento" id="subDocumento" required="required" class="form-control" >
      <option value=""> Seleccione una Opción </option>
        ${ SubTiposDocumento.map(function(json){
            if(json.idSubTipoDocumento==datos.idSubTipoDocumento){
                return yo`<option value="${json.idSubTipoDocumento}" selected >${json.nombre} </option>`    
            }
    		return yo`<option value="${json.idSubTipoDocumento}" >${json.nombre} </option>`
    	}) }
    </select>
</div>

<div class="form-group texto">
    <label for="texto">Texto</label>
    <textarea class="form-control" rows="3" name="texto" required placeholder="texto">${datos.texto}</textarea>
</div>

<div class="form-group estatus">
    <label for="estatus">Estatus</label>
    <select id="estatus" name="estatus" class="form-control">
    <option value="${datos.estatus}">${datos.estatus}</option>
    <option value="${opuesto}">${opuesto}</option>
    </select>
</div>


</form>`;

}


