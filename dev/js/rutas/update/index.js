const page=require('page')
const updateClass=require('./../../update')
const funct=require('./../../functions')

let update = new updateClass()
let funcion= new funct()

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
	funcion.getDatos(ruta,data).
	then(response=>{
		let template=update.separaTemplates(ruta)
		update.formUpdate(template(response[0]),ctx.params.campo,ctx.params.id)
	})
})
