window.CKEDITOR_BASEPATH = 'node_modules/ckeditor/'
require('ckeditor')
const $=require('jquery')
const link=require('./../rutas/link')
const query=require('./../notificaciones')
const funct=require('./../functions')
const table=require('./../table')

const Caracteres=require('./../templates/forms/update/Caracteres.js');
const Acciones=require('./../templates/forms/update/Acciones.js');
const SubTiposDocumentos=require('./../templates/forms/update/SubTiposDocumentos.js');
const Volantes=require('./../templates/forms/update/Volantes.js');
const Textos=require('./../templates/forms/update/Textos');
const confronta=require('./../templates/forms/update/Confronta')
const ifa=require('./../templates/forms/update/Ifa')

let tabla=new table()
let confirms=new query()
let funcion=new funct();

module.exports=class Update extends link{

	separaTemplates(ruta){
		if(ruta=='Caracteres'){return Caracteres}
		if(ruta=='Acciones'){return Acciones}
		if(ruta=='SubTiposDocumentos'){return SubTiposDocumentos}
		if(ruta=='Volantes'){return Volantes}
		if(ruta=='DoctosTextos'){return Textos}
		if(ruta=='confrontasJuridico'){return confronta}
		if(ruta=='Ifa'){return ifa}

	}


	creaObjeto(ctx){
		let campo=ctx.params.campo
		let id=ctx.params.id
		let data={}
		data[campo]=id
		return data
	}


	
	successInsert(json){
		json.insert!='true' ? confirms.modernAlert(json.update):tabla.drawTable(ruta)
	}


	formUpdate(template,campo,id)
	{
		let self=this
		$.confirm({
			title:'Actualizar Registro',
			theme: 'material',
			content:template,
			onOpenBefore:function(){
				try{
				CKEDITOR.disableAutoInline = true;
				CKEDITOR.inline('observacionUpdate');
				//CKEDITOR.config.skin = 'office2013';
				}
				catch(err){
				console.log(err)
				}
				funcion.loadDateInput();
			},
			buttons:{
				formSubmit:{
					text:'Actualizar',
					btnClass:'btn-blue',
					action:function(e){
						let form=$('form#'+ruta);
						let datos=form.serializeArray();
						let datosSend=form.serialize()+'&'+campo+'='+id;
						debugger
						if(funcion.validaDatos(datos)){
							funcion.sendData(datosSend,'update').then(response=>{self.successInsert(response)})
						}
					}
				},
				cancel:{
					text:'Cancelar',
					btnClass: 'btn-danger',
				},
				somethingElse:{
					text:'Imprimir',
					btnClass: 'btn-warning',
					action:function(){
						if(ruta=='Volantes'){self.reporteVolantes(id)}
						if(ruta=='confrontasJuridico'){self.reporteConfronta(id)}
					}
				}
			}
		})
	}



tableIfa(){
	let self=this
	tabla.drawTableIfa('ObservacionesDoctosJuridico')
	.then(response=>{
		$.confirm({
		title: 'Observaciones Ifa',
		content:response,
		buttons: {
			formSubmit: {
				text: 'Submit',
				btnClass: 'btn-blue',
				action: function () {
						console.log("win")
					}
				
				}
			},
			cancel: function () {
				
			},
			onContentReady:function(){
				 $('table.principal tbody tr').click(function(){
					let id=$(this).data('id');
					let campo=$(this).data('nombre')
					funcion.getDatos('ObservacionesDoctosJuridico',{idObservacionDoctoJuridico:id})
					.then(response=>{
						var template=self.separaTemplates(ruta)
						self.formUpdate(template(response[0]),campo,id)

					})
				})
			}
		})
	})
	

}









}