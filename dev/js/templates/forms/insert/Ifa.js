var yo=require('yo-yo');
module.exports=function(idVolante){




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


<div class="form-group fDocumento">
    <label for="fDocumento">Fecha de Documento</label>
    <input type="text" id="fDocumento" name="fDocumento" required class="form-control fechaInput" pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))">
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