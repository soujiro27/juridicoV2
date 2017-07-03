const yo=require('yo-yo')
module.exports=function(documento,SubTiposDocumento){
return yo`<form method="POST" class="form-inline" id="DoctosTextos">
   <div class="form-group idDocumento">
    <label for="idDocumento">Tipo de Documento</label>
     <input type="hidden" id="tipo"  name="tipo"  value="JURIDICO"  />
     <input type="hidden" id="nombre"  name="nombre"  value="TEXTO-JURIDICO"  />
    <select name="idTipoDocto" id="idDocumento" required="required" class="form-control">
    	<option value=""> Seleccione una Opción </option>
    	${ documento.map(function(json){
    		return yo`<option value="${json.idTipoDocto}" >${json.nombre} </option>`
    	}) }
    </select>
</div>

<div class="form-group subDocumento">
    <label for="subDocumento">Tipo de SubDocumento</label>
    <select name="idSubTipoDocumento" id="subDocumento" required="required" class="form-control" >
      <option value=""> Seleccione una Opción </option>
        ${ SubTiposDocumento.map(function(json){
    		return yo`<option value="${json.idSubTipoDocumento}" >${json.nombre} </option>`
    	}) }
    </select>
</div>

<div class="form-group texto">
    <label for="texto">Texto</label>
    <textarea class="form-control" rows="3" name="texto" required placeholder="texto"></textarea>
</div>


<div class="form-group send">
    <input type="submit" class="btn btn-primary btn-sm" value="Guardar">
    <button class="btn btn-default btn-sm" id="cancelar">Cancelar</button>
</div>

</form>`;

}


