var yo=require('yo-yo');

module.exports=function(data,caracter,turnado,accion){

console.log(caracter)
data=data[0]

var opuesto;
data.estatus=='ACTIVO' ? opuesto='INACTIVO':opuesto='ACTIVO';

var extemporaneo;
data.extemporaneo=='SI' ? extemporaneo='NO':extemporaneo='SI'

var hRecepcion=data.hRecepcion;
hRecepcion=hRecepcion.substring(5,0);


function creaOptionCaracter(combo){
    let opt='';
    combo.map(function(json){
        if(data.idCaracter==json.idCaracter){
            opt+=`<option value="${json.idCaracter}" selected >${json.nombre}</option>`     
        }
        else{
            opt+=`<option value="${json.idCaracter}" >${json.nombre}</option>`
        }

    }) 
    return opt
}


function creaOptionTurnado(combo){
    let opt='';
    combo.map(function(json){
        if(data.idTurnado==json.idArea){
            opt+=`<option value="${json.idArea}" selected >${json.nombre}</option>`     
        }
        else{
            opt+=`<option value="${json.idArea}" >${json.nombre}</option>`
        }

    }) 
    return opt
}


function creaOptionAccion(combo){
    let opt='';
    combo.map(function(json){
        if(data.idAccion==json.idAccion){
            opt+=`<option value="${json.idAccion}" selected >${json.nombre}</option>`     
        }
        else{
            opt+=`<option value="${json.idAccion}" >${json.nombre}</option>`
        }

    }) 
    return opt
}


let optCaracter=$.parseHTML(creaOptionCaracter(caracter))
let optTurnado=$.parseHTML(creaOptionTurnado(turnado))
let optAccion=$.parseHTML(creaOptionAccion(accion))









return yo`<form method="POST" class="form-inline" id="Volantes">

<div class="contentVolante">

<div class="bloque1">

<div class="form-group Folio">
    <label for="Folio">Folio</label>
    <input type="number" readonly id="Folio" name="folio" required class="form-control" value="${data.folio}" >
</div>


<div class="form-group numDocumento">
    <label for="numDocumento">Numero de Documento</label>
    <input type="text" id="numDocumento" name="numDocumento" required class="form-control" value="${data.numDocumento}" disabled="true">
</div>

<div class="form-group subFolio">
    <label for="subFolio">subFolio</label>
    <input type="number" readonly id="subFolio" name="subFolio" required class="form-control" value="${data.subFolio}" >
</div>



<div class="form-group idRemitente">
    <label for="idRemitente">Remitente</label>
    <input type="text" readonly class="form-control" name="idRemitente" id="idRemitente" value="${data.idRemitente}">
</div>


</div>


<div class="bloque2">

<div class="form-group fDocumento">
    <label for="fDocumento">Fecha de Documento</label>
    <input type="text" id="fDocumento" name="fDocumento" required class="form-control" pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))" value="${data.fDocumento}">
</div>

<div class="form-group anexos">
    <label for="anexos">Numero de Anexos</label>
    <input type="number" id="anexos" name="anexos" required class="form-control" value="${data.anexos}">
</div>

<div class="form-group fRecepcion">
    <label for="fRecepcion">Fecha de Recepcion</label>
    <input type="text" id="fRecepcion" name="fRecepcion" required class="form-control" pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))" value="${data.fRecepcion}">
</div>

<div class="form-group hRecepcion">
    <label for="hRecepcion">Hora de Recepcion</label>
    <input type="time" id="hRecepcion" name="hRecepcion" required="required" pattern="([0-1]{1}[0-9]{1}|20|21|22|23):[0-5]{1}[0-9]{1}" placeholder="00:00" title="Formato de 24 horas 00:00" class="form-control" value="${hRecepcion}">
</div>




</div>


<div class="bloque3">


<div class="form-group Asunto">
    <label for="Asunto">Asunto</label>
    <textarea class="form-control" rows="3" name="asunto" required placeholder="Asunto" >${data.asunto}</textarea>
</div>

</div>


<div class="bloque4">

<div class="form-group idCaracter">
    <label for="idCaracter">Caracter</label>
    <select class="form-control" name="idCaracter" id="idCaracter" required>
    ${optCaracter}
    </select>
</div>

<div class="form-group idTurnado">
    <label for="idTurnado">Turnado a:</label>
    <select class="form-control" name="idTurnado" id="idTurnado" required>
        ${optTurnado}
    </select>
</div>

<div class="form-group idAccion">
    <label for="idAccion">Instruccion</label>
    <select class="form-control" name="idAccion" id="idAccion" required>
         ${optAccion}
    </select>
</div>



<div class="form-group extemporaneo">
    <label for="subDocumento">Extemporaneo</label>
    <select name="extemporaneo" id="extemporaneo" required="required" class="form-control">
     <option value="${data.extemporaneo}">${data.extemporaneo}</option>
    <option value="${extemporaneo}">${extemporaneo}</option>
    </select>
</div>



<div class="form-group estatus">
    <label for="estatus">Estatus</label>
    <select id="estatus" name="estatus" class="form-control">
    <option value="${data.estatus}">${data.estatus}</option>
    <option value="${opuesto}">${opuesto}</option>
    </select>
</div>





</div>




</div>
</form>`;

}