var yo=require('yo-yo');
module.exports=function(){



return yo`<form method="POST" class="form-inline" id="documentosJur" enctype="multipart/form-data">

<div class="form-group anexoDoc">
    <label for="anexoDoc">Documento</label>
    <input type="file" class="form-control"   name="anexoDoc" id="imagen" >
</div>
<div class="form-group numDocumento">
    <label for="numDocumento">Numero de Documento</label>
    <input type="text" id="numDocumento" name="numDocumento" required class="form-control">
</div>
<div class="form-group send">
    <input type="submit" class="btn btn-primary btn-sm" value="Guardar">
    <button class="btn btn-default btn-sm" id="cancelar">Cancelar</button>
</div>

</form>`;

}

