var yo=require('yo-yo');
module.exports=function(data){

var opuesto;
data.estatus=='ACTIVO' ? opuesto='INACTIVO':opuesto='ACTIVO';


return yo`

<div>

<div class="contentIrac" id="contentIrac" >
    <form method="POST" class="form-inline" id="Ifa">



<div class="form-group pagina">
    <label for="pagina">Hoja</label>
    <input type="number"  id="pagina" name="pagina" required class="form-control" value="${data.pagina}"  >
  
</div>


<div class="form-group fDocumento">
    <label for="fDocumento">Fecha de Documento</label>
    <input type="text" id="fDocumento" name="fDocumento" required class="form-control fechaInput" pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))" value="${data.fDocumento}" >
</div>



<div class="form-group observacion">
    <label for="observacionUpdate">Observacion</label>
    <textarea class="form-control" rows="3" name="observacion"  id="observacionUpdate" >${data.observacion}</textarea>
</div>

<div class="form-group estatus">
    <label for="estatus">Estatus</label>
    <select id="estatus" name="estatus" class="form-control">
    <option value="${data.estatus}">${data.estatus}</option>
    <option value="${opuesto}">${opuesto}</option>
    </select>
</div>





</form>
</div>

</div>`;
}