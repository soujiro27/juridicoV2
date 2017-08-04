window.CKEDITOR_BASEPATH = 'node_modules/ckeditor/'
require('ckeditor')
const page=require('page')

const updateClass=require('./../../update')
const funct=require('./../../functions')
const instr= require('./../../insert')
const table=require('./../../table')

const ConfrontaEmpty=require('./../../templates/forms/insert/Confronta')


var cont=0;

let update = new updateClass()
let funcion= new funct()
let insert= new instr();
let tabla= new table();
page('/juridico/Caracteres/update/:campo/:id',function(ctx,next){
	let data=update.creaObjeto(ctx)
	funcion.getDatos(ruta,data).
	then(response=>{
		let template=update.separaTemplates(ruta)
		update.formUpdate(template(response[0]),ctx.params.campo,ctx.params.id)
	})
})



page('/juridico/Acciones/update/:campo/:id',function(ctx,next){
	let data=update.creaObjeto(ctx)
	funcion.getDatos(ruta,data).
	then(response=>{
		let template=update.separaTemplates(ruta)
		update.formUpdate(template(response[0]),ctx.params.campo,ctx.params.id)
	})
})


page('/juridico/SubTiposDocumentos/update/:campo/:id',function(ctx,next){
	let data=update.creaObjeto(ctx)
	let datosRegistro=funcion.getDatos(ruta,data)
	let comboTipoDocto=funcion.getDatos('tiposdocumentos',{tipo:'JURIDICO'})
	Promise.all([datosRegistro,comboTipoDocto]).then(values=>{
		let datos=values[0][0]
		let combo=values[1]
		let template=update.separaTemplates(ruta)
		update.formUpdate(template(datos,combo),ctx.params.campo,ctx.params.id)

	})
})



page('/juridico/Volantes/update/:campo/:id',function(ctx,next){
	let data=update.creaObjeto(ctx)
	let datosVolante=funcion.getDatos(ruta,data)
	let caracter=funcion.getDatos('catCaracteres',{estatus:'ACTIVO'})
	let turnado=funcion.getDatos('areas',{idAreaSuperior:'DGAJ'})
	let accion=funcion.getDatos('catAcciones',{estatus:'ACTIVO'})
	Promise.all([datosVolante,caracter,turnado,accion])
	.then(values=>{

		let template=update.separaTemplates(ruta)
		update.formUpdate(template(values[0],values[1],values[2],values[3]),ctx.params.campo,ctx.params.id)
	})
})



page('/juridico/DoctosTextos/update/:campo/:id',function(ctx,next){
	let data=update.creaObjeto(ctx)
	let datosRegistro=funcion.getDatos(ruta,data)
	let comboTipoDocto=funcion.getDatos('tiposdocumentos',{tipo:'JURIDICO'})
	let subtipo=funcion.getDatos('catSubTiposDocumentos',{estatus:'ACTIVO'})
	Promise.all([datosRegistro,comboTipoDocto,subtipo]).then(values=>{
		let datos=values[0][0]
		let combo=values[1]
		let subtipo=values[2]
		let template=update.separaTemplates(ruta)
		update.formUpdate(template(datos,combo,subtipo),ctx.params.campo,ctx.params.id)

	})
})


page('/juridico/confrontasJuridico/update/:campo/:id',function(ctx,next){
	let data=update.creaObjeto(ctx)
	funcion.getDatos(ruta,data).
	then(response=>{
		if(response.register=='No se encontro registro'){
			insert.renderForm(ConfrontaEmpty(ctx.params.id));
			funcion.loadDateInput();
			insert.getData()

		}else{
			var template=update.separaTemplates(ruta)
			update.formUpdate(template(response[0]),ctx.params.campo,ctx.params.id)
		
		}
	})
})


page('/juridico/Ifa/update/:campo/:id',function(ctx,next){
	let data=update.creaObjeto(ctx)
	update.tableIfa(ctx.params.id);
})
