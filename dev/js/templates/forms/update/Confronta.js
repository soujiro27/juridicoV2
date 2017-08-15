var yo=require('yo-yo');



module.exports=function(data){

var hConfronta=data.hConfronta;
hConfronta=hConfronta.substring(5,0);

return yo`<form method="POST" class="form-inline" id="confrontasJuridico">

<div class="form-group notaInformativa">
    <label for="notaInformativa">nota Informativa</label>
    <input type="text" class="form-control" id="notaInformativa" placeholder="nota Informativa"   name="notaInformativa"  value="${data.notaInformativa}" >
</div>

<div class="form-group nombre">
    <label for="nombre">Nombre</label>
    <input type="text" class="form-control" id="nombre" placeholder="Nombre" required pattern="[A-Za-z].{1,49}" name="nombreResponsable" title="Formato Incorrecto" value="${data.nombreResponsable}" >
</div>

<div class="form-group cargo">
    <label for="cargo">Cargo</label>
    <input type="text" class="form-control" id="cargo" placeholder="cargo" required pattern="[A-Za-z].{1,49}" name="cargoResponsable" title="Formato Incorrecto" value="${data.cargoResponsable}" >
</div>

<div class="form-group fConfronta">
    <label for="fConfronta">Fecha Confronta</label>
    <input type="text" id="fConfronta" name="fConfronta" required class="form-control fechaInput" pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))" value="${data.fConfronta}">
</div>


<div class="form-group hConfronta">
    <label for="hConfronta">Hora de Confronta</label>
    <input type="time" class="form-control" id="hConfronta" placeholder="hConfronta" required pattern="[A-Za-z].{1,49}" name="hConfronta" title="Formato Incorrecto" value="${hConfronta}" >
</div>


<div class="form-group fecha">
    <label for="fecha">Fecha Documento</label>
    <input type="text" id="fecha" name="fOficio" required class="form-control fechaInput" pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))" value="${data.fOficio}" >
</div>

<div class="form-group siglas">
    <label for="siglas">Siglas</label>
    <input type="text" class="form-control" id="siglas" placeholder="siglas" required " name="siglas" title="Nombre Incorrecto o Caracteres maximos" value="${data.siglas}" >
</div>



<div class="form-group idVolante">
    <input type="hidden" class="form-control" id="idVolante" placeholder="nota Informativa"   name="idVolante" value="${data.idVolante}" >
</div>



</form>`;

}


