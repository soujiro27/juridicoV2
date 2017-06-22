const $=require('jquery');
const page=require('page');
require('babelify-es6-polyfill');
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
    let folio= insert.getLastFolio('Volantes','idVolante')
    let tipoDocto=funcion.getDatos('tiposdocumentos',{tipo:'JURIDICO'})
    let caracter=funcion.getDatos('catCaracteres',{estatus:'ACTIVO'})
    let comboAudi=funcion.getComboAuditorias()
    let turnado=funcion.getDatos('areas',{idAreaSuperior:'DGAJ'})
    let accion=funcion.getDatos('catAcciones',{estatus:'ACTIVO'})
    Promise.all([tipoDocto,comboAudi,caracter,accion,turnado,folio])
    .then(values=>{
      insert.renderForm(volantes(values[0],values[1],values[2],values[3],values[4],values[5]))
      $('div.contentVolante').hide()
      $('div.datosAuditoria').hide()
      funcion.loadDateInput()
      insert.onchangeTipoDocto()
      insert.onchangeAuditoria()
      insert.getData()

      
    })
})
