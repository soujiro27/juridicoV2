const yo=require('yo-yo')
module.exports=function(data){




return yo`<form method="POST" class="form-inline" id="SubTiposDocumentos">
   <div class="form-group idDocumento">
    <label for="idDocumento">Tipo de Documento</label>
    <select name="idTipoDocto" id="idDocumento" required="required" class="form-control">
    	<option value=""> Seleccione una Opción </option>
    	${ data.map(function(json){
    		return yo`<option value="${json.idTipoDocto}" >${json.nombre} </option>`
    	}) }
    </select>
</div>
<div class="form-group nombre">
    <label for="nombre">Nombre</label>
    <input type="text" class="form-control" id="nombre" placeholder="Nombre" required pattern="[A-Za-z].{1,49}" name="nombre" title="Nombre Incorrecto o Caracteres maximos" >
</div>


<div class="form-group send">
    <input type="submit" class="btn btn-primary btn-sm" value="Guardar">
    <button class="btn btn-default btn-sm" id="cancelar">Cancelar</button>
</div>

</form>`;

}


