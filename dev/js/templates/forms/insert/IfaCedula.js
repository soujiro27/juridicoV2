var yo=require('yo-yo');
module.exports=function(idVolante,docSiglas,empleados,idTipoDocto){




//console.log(docSiglas)
//console.log(SubTipoDocumento)
//console.log(idVolante)

if(docSiglas.register=='No se encontro registro'){

return yo`
<div>
<div class="contentIrac" id="contentIrac" >
<form method="POST" class="form-inline" id="DocumentosSiglas">





<div class="form-group textoIfa">
    <button type="button" class="btn btn-primary" id="addPromoAccion">Agregar Promocion de Acciones</button>
    <textarea class="form-control" rows="7" readonly  id="textoIfa"></textarea>
    <input type="hidden"  name="idDocumentoTexto" id="idDocumentoTexto" value=""  >
    <input type="hidden"  name="idSubTipoDocumento" id="idDocumentoTexto" value="${idTipoDocto}"  >
</div>



<div class="form-group siglas">
    <label for="siglas">Siglas</label>
    <input type="text"  id="siglas" name="siglas" required class="form-control"   >
    <input type="hidden"  name="idVolante" value="${idVolante}"  >
</div>

<div class="form-group firmas">
    <label for="firmas">Personal que Firma</label>
    <select name="firma" id="firma" required="required" class="form-control" multiple >
      <option value=""> Seleccione una Opción </option>
        ${empleados.map(function(json){
           
            return yo `<option value="${json.idEmpleado}">${json.paterno} ${json.materno} ${json.nombre} </option>`
            
        })}
    </select>
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
}else{
let firmas=docSiglas[0].idEmpleadosFirma;
let firmasArray=firmas.split(',')
let largo=parseInt(firmasArray.length);
largo=largo-1
let final=firmasArray.splice(0,largo)
let id=docSiglas[0].idDocumentoTexto
let texto

$.get({
        url:'/getRegister/CatDoctosTextos',
        data:{
            idDocumentoTexto:id
        },
        async:false,
        success:function(data){
            let json=JSON.parse(data);
            console.log(json)
            texto=json[0].texto
        }
        
})


return yo`
<div>
<div class="contentIrac" id="contentIrac" >
    <form method="POST" class="form-inline" id="DocumentosSiglas">
<div class="form-group siglas">
    <label for="siglas">Siglas</label>
    <input type="text"  id="siglas" name="siglas" required class="form-control" value="${docSiglas[0].siglas}"   >
   
</div>
<div class="form-group subDocumento">
    <label for="subDocumento">Tipo de SubDocumento</label>
    <select name="idSubTipoDocumento" id="subDocumento" required="required" class="form-control" >
      <option value=""> Seleccione una Opción </option>
        ${SubTipoDocumento.map(function(json){
            if(json.idSubTipoDocumento==docSiglas[0].idSubTipoDocumento)
                {
                    return yo`<option value="${json.idSubTipoDocumento}" selected >${json.nombre} </option>`    
                }
            return yo `<option value="${json.idSubTipoDocumento}">${json.nombre}</option>`
            
        })}
    </select>
</div>

<div class="form-group textoIfa">
    <label for="textoIfa">Promociones de Acciones</label>
    <textarea class="form-control" rows="3" readonly  id="textoIfa" >${texto}</textarea>
    <input type="hidden"  name="idDocumentoTexto" id="idDocumentoTexto" value="${docSiglas[0].idDocumentoTexto}"  >
</div>

<div class="form-group firmas">
    <label for="firmas">Personal que Firma</label>
    <select name="firma" id="firma" required="required" class="form-control" multiple >
      <option value=""> Seleccione una Opción </option>
        ${empleados.map(function(json){
           for(let x in final){
               if(final[x]==json.idEmpleado){
                    return `<option value="${json.idEmpleado}" selected>${json.paterno} ${json.materno} ${json.nombre} </option>`       
               }else{
                    return yo `<option value="${json.idEmpleado}">${json.paterno} ${json.materno} ${json.nombre} </option>`
               }
           }
            
            
        })}
    </select>
</div>



<div class="form-group fecha">
    <label for="fecha">Fecha Documento</label>
    <input type="text" id="fOficio" name="fOficio" required class="form-control fechaInput" pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))" value="${docSiglas[0].fOficio}" >
    <input type="hidden"  name="idVolante" value="${idVolante}"  >
</div>




<div class="form-group send">
    <input type="submit" class="btn btn-primary btn-sm" value="Guardar">
    <button class="btn btn-default btn-sm" id="cancelar">Cancelar</button>
</div>


</form>
</div>

</div>`;
}



}