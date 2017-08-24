var yo=require('yo-yo');
module.exports=function(idVolante){



return yo`<form method="POST" class="form-inline" id="confrontasJuridico">

<div class="form-group notaInformativa">
    <label for="notaInformativa">nota Informativa</label>
    <input type="hidden" name="idVolante" value="${idVolante}"  >

    <input type="text" class="form-control" id="notaInformativa" placeholder="nota Informativa"   name="notaInformativa"  >
</div>

<div class="form-group nombre">
    <label for="nombre">Nombre</label>
    <input type="text" class="form-control" id="nombre" placeholder="Nombre" required pattern="[A-Za-z].{1,49}" name="nombreResponsable" title="Formato Incorrecto"  >
</div>

<div class="form-group cargo">
    <label for="cargo">Cargo</label>
    <input type="text" class="form-control" id="cargo" placeholder="cargo" required pattern="[A-Za-z].{1,49}" name="cargoResponsable" title="Formato Incorrecto"  >
</div>

<div class="form-group fConfronta">
    <label for="fConfronta">Fecha Confronta</label>
    <input type="text" id="fConfronta" name="fConfronta" required class="form-control fechaInput" pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))">
</div>

<div class="form-group hConfronta">
    <label for="hConfronta">Hora de Confronta</label>
    <input type="time" class="form-control" id="hConfronta"  required pattern="([0-1]{1}[0-9]{1}|20|21|22|23):[0-5]{1}[0-9]{1}" placeholder="00:00" name="hConfronta" title="Formato Incorrecto"  >
</div>

<div class="form-group fecha">
    <label for="fecha">Fecha Documento</label>
    <input type="text" id="fOficio" name="fOficio" required class="form-control fechaInput" pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))">
</div>


<div class="form-group siglas">
    <label for="siglas">Siglas</label>
    <input type="text" class="form-control" id="siglas" placeholder="siglas" required " name="siglas" title="Nombre Incorrecto o Caracteres maximos"  >
</div>


<div class="form-group send">
    <input type="submit" class="btn btn-primary btn-sm" value="Guardar">
    <button class="btn btn-default btn-sm" id="cancelar">Cancelar</button>
</div>



</form>`;

}


