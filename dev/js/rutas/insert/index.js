const $=require('jquery');
const page=require('page');
const inst=require('./../../insert/')
const funct=require('./../../functions')

const carac=require('./../../templates/forms/insert/Caracteres.js')
const actions=require('./../../templates/forms/insert/Acciones.js')
const SubTiposDocumentos=require('./../../templates/forms/insert/SubTiposDocumentos.js')
const volantes=require('./../../templates/forms/insert/Volantes.js')


var insert = new inst();
let funcion= new funct();

page('/juridico/Caracteres/Add',function(ctx,next) {
  	insert.renderForm(carac)
  	insert.getData()
})


page('/juridico/Acciones/Add',function(ctx,next) {
  	insert.renderForm(actions)
  	insert.getData()
})



page('/juridico/SubTiposDocumentos/Add',function(ctx,next) {

	let data={}
	data['tipo']='JURIDICO'
	funcion.getDatos('tiposdocumentos',data)
	.then(response=>{
  	   insert.renderForm(SubTiposDocumentos(response))
  	   insert.getData()
  })
})



page('/juridico/Volantes/Add',function(ctx,next) {
    let tipodoctoObject=funcion.createObject('tipo','JURIDICO')
    let activos=funcion.createObject('estatus','ACTIVO')
    let tipoTurnado=funcion.createObject('idAreaSuperior','DGAJ')

    let folio= insert.getLastFolio('Volantes','idVolante')
    let tipoDocto=funcion.getDatos('tiposdocumentos',tipodoctoObject)
    let caracter=funcion.getDatos('catCaracteres',activos)
    let comboAudi=funcion.getComboAuditorias()
    let turnado=funcion.getDatos('areas',tipoTurnado)
    let accion=funcion.getDatos('catAcciones',activos)
    Promise.all([tipoDocto,comboAudi,caracter,accion,turnado,folio])
    .then(values=>{
      insert.renderForm(volantes(values[0]))
      $('div.contentVolante').hide()
      $('div.datosAuditoria').hide()
      funcion.loadDateInput()
      insert.onchangeTipoDocto()
      let auditorias=funcion.createComboAuditorias(values[1])
      let caracter=funcion.createComboCaracter(values[2])
      let accion=funcion.createComboAccion(values[3])
      let turnado=funcion.createComboTurnado(values[4])
      
      $('select#cveAuditoria').html(auditorias)
      $('select#idCaracter').html(caracter)
      $('select#idTurnado').html(turnado)
      $('select#idAccion').html(accion)
      $('input#Folio').attr('title','El ultimo Folio registrado es el: '+values[5][0]['folio'])
      insert.onchangeAuditoria()
      insert.getData()

      
    })
})
