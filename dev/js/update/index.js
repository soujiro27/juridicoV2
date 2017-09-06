window.CKEDITOR_BASEPATH = 'node_modules/ckeditor/'
require('ckeditor')
const $=require('jquery')
const link=require('./../rutas/link')
const query=require('./../notificaciones')
const funct=require('./../functions')
const table=require('./../table')
const inst=require('./../insert')

const Caracteres=require('./../templates/forms/update/Caracteres.js');
const Acciones=require('./../templates/forms/update/Acciones.js');
const SubTiposDocumentos=require('./../templates/forms/update/SubTiposDocumentos.js');
const Volantes=require('./../templates/forms/update/Volantes.js');
const Textos=require('./../templates/forms/update/Textos');
const confronta=require('./../templates/forms/update/Confronta')
const ifa=require('./../templates/forms/update/Ifa')
const ifaEmpty=require('./../templates/forms/insert/Ifa')
const irac=require('./../templates/forms/update/Irac')
const iracEmpty=require('./../templates/forms/insert/Irac')
const cedulaIrac=require('./../templates/forms/insert/IracCedula')
const cedulaIfa=require('./../templates/forms/insert/IfaCedula')
const dibujaTabla=require('./../templates/table')


let tabla=new table()
let confirms=new query()
let funcion=new funct();
let insert=new inst();

module.exports=class Update extends link{

	separaTemplates(ruta){
		if(ruta=='Caracteres'){return Caracteres}
		if(ruta=='Acciones'){return Acciones}
		if(ruta=='SubTiposDocumentos'){return SubTiposDocumentos}
		if(ruta=='Volantes'){return Volantes}
		if(ruta=='DoctosTextos'){return Textos}
		if(ruta=='confrontasJuridico'){return confronta}
		if(ruta=='Ifa'){return ifa}
		if(ruta=='Irac'){return irac}

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
				let editor=CKEDITOR.inline('observacionUpdate');
				editor.on('change',function(e){
					$('textarea#observacionUpdate').text(editor.getData())
				})
				
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
						
						if(funcion.validaDatos(datos)){
							funcion.sendData(datosSend,'update').then(response=>{self.successInsert(response)})
						}
						try{
							if(ruta=='Ifa'){
								self.tableIfa(datos[0].value)

							}
						}catch(err){console.log(err)}
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



tableIfa(id,titulo){
	
	let self=this
	let header='Obervaciones '+ titulo
	tabla.drawTableIfa('ObservacionesDoctosJuridico',{idVolante:id})
	.then(response=>{
		
		$.confirm({
		title: header,
		content:response,
		buttons: {
			newObvsIfa: {
				text: 'Agregar Observacion',
				btnClass: 'btn-blue',
				action: function () {
					if(ruta=='Irac'){
						insert.formIfa(iracEmpty(id))
					}else{
						insert.formIfa(ifaEmpty(id))
					}
					
				}
				
				},
			cancel:{
				text:'Cancelar',
				btnClass: 'btn-danger',
				},
			printCedula:{
				text:"Generar Cedula",
				btnClass:'btn-warning',
				action:function(){
					let usertest=funcion.getDatos('usuarios',{idUsuario:nUsr})
					.then(json=>{
						let idArea=json["0"].idArea
						let nombre=ruta.toUpperCase()
						let docSiglas=funcion.getDatos('DocumentosSiglas',{idVolante:id})
						let usuario=funcion.getDatos('PuestosJuridico',{idArea:idArea,titular:'NO'}) 
						let idTipoDocto=funcion.getDatos('catSubTiposDocumentos',{nombre:nombre})
						Promise.all([docSiglas,usuario,idTipoDocto])
						.then(resolve=>{
							let idDocto=resolve[2][0].idSubTipoDocumento
							//console.log(resolve[1][0].idArea)					

							if(ruta=='Ifa'){
								var template=cedulaIfa(id,resolve[0],resolve[1],idDocto)
								
							}
							else if(ruta=='Irac'){var template=cedulaIrac(id,resolve[0],resolve[1],idDocto)}
							//let template=cedulaIfa(id,resolve[0],resolve[1],idDocto)
							/* carga el template de la cedula del ifa */
							insert.renderForm(template)
							funcion.loadDateInput();

							if(resolve[0].register=='No se encontro registro'){
								insert.getDataRuta('DocumentosSiglas','insert')
							}else{
								insert.getDataRuta('DocumentosSiglas','update')
							}


							$('button#addPromoAccion').click(function(){
								funcion.getDatos('CatDoctosTextos',{idSubTipoDocumento:idDocto})
							.then(data=>{self.tablaTextosIfa(data)})
							})
						
						})
					})
				
				}
			}
			},
			onContentReady:function(){
				let _this=this
				
				 $('table#ObservacionesDoctosJuridico tbody tr').click(function(){
					let id=$(this).data('id');
					let campo=$(this).data('nombre')
					_this.close()
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



tablaTextosIfa(json){
	
	if(json.register=='No se encontro registro'){
		var template='<p> No hay Textos Asignados a este Sub Documento</p>'
	}else{
		var template=dibujaTabla(json)
	}
	

 $.alert({
	title:'Promoción de Acciones',
	content:template,
	onContentReady:function(){
		$('table.principal tr').click(function(){
			let id=$(this).data('id')
			let texto=$(this).children('td#texto').text();
			$('input#idDocumentoTexto').attr('value',id)
			$('textarea#textoIfa').text(texto)
		})
	},
	draggable: true
 })
}

cerrarVolante(id){
	funcion.getDatos('turnosJuridico',{idVolante:id})
	.then(response=>{
		
	})
}



}