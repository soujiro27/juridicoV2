var yo=require('yo-yo');
module.exports=function(tipoDocto){

console.log(tipoDocto)





/*

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
*/

return yo`<form method="POST" class="form-inline" id="Volantes">

<div class="headerVolante">

<div class="form-group idDocumento">
    <label for="idDocumento">Tipo de Documento</label>
    <select name="idTipoDocto" id="idDocumento" required="required" class="form-control">
    <option value=""> Seleccione una Opción </option>
        ${ tipoDocto.map(function(json){
            return yo`<option value="${json.idTipoDocto}" >${json.nombre} </option>`
        }) }
   </select>
</div>

<div class="form-group subDocumento">
    <label for="subDocumento">Tipo de SubDocumento</label>
    <select name="idSubTipoDocumento" id="subDocumento" required="required" class="form-control" >
      <option value=""> Seleccione una Opción </option>
    </select>
</div>

<div class="form-group Promocion">
    <label for="subDocumento">Promocion de Accion</label>
    <select name="promocion" id="promocion" required="required" class="form-control">
     <option value=""> Seleccione una Opción </option>
      <option value="SI"> SI</option>
       <option value="NO"> NO </option>
    </select>
</div>



<div class="form-group cveAuditoria">
    <label for="cveAuditoria">Clave de Auditoria</label>
    <select name="cveAuditoria" id="cveAuditoria" required="required" class="form-control">
    </select>
</div>

</div>

<div class="datosAuditoria">

<div class="form-group idUnidad">
    <label for="idUnidad">Sujeto de Fiscalizacion</label>
    <ul id="idUnidad" ></ul>
</div>

<div class="form-group idObjeto">
    <label for="idObjeto">Rubro</label>
    <ul id="idObjeto" >
    </ul>
</div>

<div class="form-group tipoAuditoria">
    <label for="tipoAuditoria">Tipo de Auditoria</label>
    
     <ul id="tipoAuditoria" >
    </ul>
</div>

    
</div>



<div class="contentVolante">

<div class="form-group Folio">
    <label for="Folio">Folio</label>
    <input type="number"  id="Folio" name="folio" required class="form-control" />
</div>


<div class="form-group numDocumento">
    <label for="numDocumento">Numero de Documento</label>
    <input type="text" id="numDocumento" name="numDocumento" required class="form-control">
</div>

<div class="form-group fDocumento">
    <label for="fDocumento">Fecha de Documento</label>
    <input type="text" id="fDocumento" name="fDocumento" required class="form-control fechaInput" pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))">
</div>

<div class="form-group anexos">
    <label for="anexos">Numero de Anexos</label>
    <input type="number" id="anexos" name="anexos" required class="form-control" pattern="[0-9]{1,16}">
</div>

<div class="form-group fRecepcion">
    <label for="fRecepcion">Fecha de Recepcion</label>
    <input type="text" id="fRecepcion" name="fRecepcion" required class="form-control fechaInput" pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))">
</div>

<div class="form-group hRecepcion">
    <label for="hRecepcion">Hora de Recepcion</label>
    <input type="time" id="hRecepcion" name="hRecepcion" required class="form-control " pattern="([0-1]{1}[0-9]{1}|20|21|22|23):[0-5]{1}[0-9]{1}" placeholder="00:00" title="Formato de 24 horas 00:00">
</div>


<div class="form-group idRemitente">
    <label for="idRemitente">Remitente</label>
     <input type="text" name="idRemitente" id="idRemitente"  readonly class="form-control" />
  

   
</div>


<div class="form-group Destinatario">
    <label for="Destinatario">Destinatario</label>
    <input type="text" id="Destinatario"  name="destinatario" class="form-control" placeholder="Destinatario" pattern="[a-zA-Z._- ]" required title="Unicamente letras" value="DR. IVÁN DE JESÚS OLMOS CANSINO" readonly />

</div>

<div class="form-group Asunto">
    <label for="Asunto">Asunto</label>
    <textarea class="form-control" rows="3" name="asunto" required placeholder="Asunto"></textarea>
</div>

<div class="form-group idCaracter">
    <label for="idCaracter">Caracter</label>
    <select name="idCaracter" id="idCaracter" required="required" class="form-control" >
   </select>
   
    
</div>

<div class="form-group idTurnado">
    <label for="idTurnado">Turnado a:</label>
     <select name="idTurnado" id="idTurnado" required="required" class="form-control" >
    </select>
</div>

<div class="form-group idAccion">
    <label for="idAccion">Instruccion</label>
     <select name="idAccion" id="idAccion" required="required" class="form-control" >
    </select>
</div>



<div class="form-group send">
    <input type="submit" class="btn btn-primary btn-sm" value="Guardar">
    <button class="btn btn-default btn-sm" id="cancelar">Cancelar</button>
</div>


</div>
</form>`;

}