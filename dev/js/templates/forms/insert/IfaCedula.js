var yo=require('yo-yo');
module.exports=function(idVolante,SubTipoDocumento){




return yo`

<div>

<div class="contentIrac" id="contentIrac" >
    <form method="POST" class="form-inline" id="DocumentosSiglas">



<div class="form-group siglas">
    <label for="siglas">Siglas</label>
    <input type="text"  id="siglas" name="siglas" required class="form-control"   >
    <input type="hidden"  name="idVolante" value="${idVolante}"  >
</div>


<div class="form-group subDocumento">
    <label for="subDocumento">Tipo de SubDocumento</label>
    <select name="idSubTipoDocumento" id="subDocumento" required="required" class="form-control" >
      <option value=""> Seleccione una Opción </option>
        ${SubTipoDocumento.map(function(json){
            return yo `<option value="${json.idSubTipoDocumento}">${json.nombre}</option>`
            
        })}
    </select>
</div>

<div class="form-group tabla">
    <table  class="table table-striped table-bordered table-hover" >
        <thead>
            <tr>
                <td>Texto</td>
            </tr>
        </thead>
        <tbody id="textosIfa"></tbody>
    </table>
</div>


<div class="form-group textoIfa">
    <label for="textoIfa">textoIfa</label>
    <textarea class="form-control" rows="3" readonly  id="textoIfa" ></textarea>
    <input type="hidden"  name="idDocumentoTexto" id="idDocumentoTexto" value=""  >
</div>

<div class="form-group fecha">
    <label for="fecha">Fecha Documento</label>
    <input type="text" id="fOficio" name="fOficio" required class="form-control fechaInput" pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))">
</div>





<div class="form-group send">
    <input type="submit" class="btn btn-primary btn-sm" value="Guardar">
    <button class="btn btn-default btn-sm" id="cancelar">Cancelar</button>
</div>


</form>
</div>

</div>`;
}