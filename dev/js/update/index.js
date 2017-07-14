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
const cedulaIfa=require('./../templates/forms/insert/IfaCedula')

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
							
							self.tableIfa(datos[0].value)
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



tableIfa(id){
	let self=this
	tabla.drawTableIfa('ObservacionesDoctosJuridico')
	.then(response=>{
		$.confirm({
		title: 'Observaciones Ifa',
		content:response,
		buttons: {
			newObvsIfa: {
				text: 'Agregar Observacion',
				btnClass: 'btn-blue',
				action: function () {
						insert.formIfa(ifaEmpty(id))
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
					//self.reporteObsvIfa(id)

					console.log(id)
					funcion.getDatos('DocumentosSiglas',{idVolante:id})
					.then(volante=>{
						if(volante.register=='No se encontro registro'){
							alert("no hay ")
						}else{
							alert("si hay")
						}
						
					})

					funcion.getDatos('catSubTiposDocumentos',{estatus:'ACTIVO'})
					.then(response =>{
						/*componer toda esta zona */
						insert.renderForm(cedulaIfa(id,response))
						funcion.loadDateInput();
						insert.getDataRuta('DocumentosSiglas')
						$('select#subDocumento').change(function(){
							let val= $(this).val()
							funcion.getDatos('CatDoctosTextos',{idSubTipoDocumento:val})
							.then(json=>{
								let td=""
								$.each(json,function(index,value){
									td+=`<tr data-id="${value.idDocumentoTexto}"><td>${value.texto}</td></tr>`
								})
								
								$('table tbody#textosIfa').html(td);
								$('table tbody#textosIfa tr').click(function(){
									let id=$(this).data('id');
									let texto=$(this).children('td').text();
									$('input#idDocumentoTexto').attr('value',id)
									$('textarea#textoIfa').text(texto)
								})

							})
						})

					}) /* toda estra zona hacia rriba hacer en funcion */
				}
			}
			},
			onContentReady:function(){
				let _this=this
				 $('table.principal tbody tr').click(function(){
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









}