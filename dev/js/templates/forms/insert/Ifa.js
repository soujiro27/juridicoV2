var yo=require('yo-yo');
var $=require('jquery');
module.exports=function(idVolante){


$('div.widget-icons').html('  <button class="btn btn-primary btn-sm" id="addIfa" > Agregar Observacion </button>')

return yo`

<div>

<div class="contentIrac" id="contentIrac" >
    <form method="POST" class="form-inline" id="Ifa">



<div class="form-group pagina">
    <label for="pagina">Hoja</label>
    <input type="number"  id="pagina" name="pagina" required class="form-control"   >
    <input type="hidden"  name="parrafo" value="0"  >
    <input type="hidden"  name="idVolante" value="${idVolante}"  >
</div>




<div class="form-group observacion">
    <label for="observacion">Observacion</label>
    <textarea class="form-control" rows="3" name="observacion"  id="observacion" ></textarea>
</div>






<div class="form-group send">
    <input type="submit" class="btn btn-primary btn-sm" value="Guardar">
    <button class="btn btn-default btn-sm" id="cancelar">Cancelar</button>
</div>


</form>
</div>

</div>`;
}