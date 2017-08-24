var yo=require('yo-yo');
module.exports=function(data){

var opuesto;
data.estatus=='ACTIVO' ? opuesto='INACTIVO':opuesto='ACTIVO';


return yo`

<div>

<div class="contentIrac" id="contentIrac" >
    <form method="POST" class="form-inline" id="Irac">



<div class="form-group pagina">
    <label for="pagina">Hoja</label>
    <input type="hidden"  name="idVolante" value="${data.idVolante}"  >
    <input type="number"  id="pagina" name="pagina" required class="form-control" value="${data.pagina}"  >
</div>

<div class="form-group parrafo">
<label for="parrafo">Parrafo</label>
<input type="text"  id="parrafo" name="parrafo" required class="form-control"   value="${data.parrafo}">
</div>


<div class="form-group observacion">
    <label for="observacionUpdate">Observacion</label>
    <textarea class="form-control" rows="4" name="observacion"  id="observacionUpdate" >${data.observacion}</textarea>
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