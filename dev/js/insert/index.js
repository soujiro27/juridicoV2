const $=require('jquery')
const link=require('./../rutas/link')
const query=require('./../notificaciones')
const table=require('./../table');
const funct=require('./../functions')

let confirms=new query()
let tabla=new table()
let funcion=new funct();
module.exports=class Insert extends link{



	renderForm(template){
		let main=$('div#main-content')
		$('a#agregar').hide();
		main.empty()
		main.html(template)
		this.cancelar()
	}

	cancelar(){
		let self = this
		$('button#cancelar').click(function(event) {
			event.preventDefault()
			self.main(ruta);
		});
	}

	getData(){
		let self=this
		$('form#'+ruta).submit(function(event) {
			event.preventDefault()
			let datos=$(this).serializeArray()
			let datosSend=$(this).serialize()
			if(funcion.validaDatos(datos)){
				funcion.sendData(datosSend,'insert').then(response=>{ self. successInsert(response)})
			}

		});
	}

	validaDatos(datos){
		let cont=0
		datos.map(function(json){
			let dato=json.value
			dato=dato.trim()
			if(valida.isEmpty(dato)){cont++}
		})
		if(cont>0){
			confirms.msgAlert('No puede haber datos vacios')
			return false
		}
		else{return true}
	}

	successInsert(json)
	{
		json.insert!='true' ? confirms.modernAlert(json.insert):tabla.drawTable(ruta)
		$('a#agregar').show();
	}


	onchangeTipoDocto(){
		self=this
		$('select#idDocumento').change(function(event) {
			let val=$(this).val()
			let obj={}
			obj['idTipoDocto']=val
			obj['estatus']='ACTIVO'
			funcion.getDatos('catSubTiposDocumentos',obj)
			.then(response=>{
				if(response.register){
					confirms.modernAlert('No hay Sub Documentos Capturados para esta opcion')
					$('select#subDocumento').html('<option value=""> No hay Registros </option>')
				}	
				else{
					let option=self.createComboSubDocumento(response)
					$('select#subDocumento').html(option)
				}
			})
		});
	}

	createComboSubDocumento(datos){
		var opt=' <option value=""> Seleccione una Opción </option>'
		datos.map(function(json){
			opt+=`<option value="${json.idSubTipoDocumento}">${json.nombre}</option>`
		})

		return opt
	}


	onchangeAuditoria(){
		self=this
		$('select#cveAuditoria').change(function(event) {
			let id=$(this).val()
			funcion.getAuditoriaById(id)
			.then(response=>{
				
				funcion.separaDatosAuditoria(response[0].sujeto,'idUnidad')
				funcion.separaDatosAuditoria(response[0].objeto,'idObjeto')
				$('ul#tipoAuditoria').html('<li>'+response[0].tipo+'</li>')
				$('input#idRemitente').val(response[0].idArea)
				$('div.datosAuditoria').slideDown('slow')
				$('div.contentVolante').slideDown('slow')
			})
		});
	}

	getLastFolio(modulo,campo)
	{
		let get=new Promise((resolve,reject)=>{
			$.get({
				url:'/folio/'+modulo+'/'+campo,
				success:function(data){
					let json=JSON.parse(data);
					resolve(json)

				}
			})
		})
		return get
	}

	formIfa(template){
		this.renderForm(template);
		CKEDITOR.disableAutoInline = true;
		CKEDITOR.inline('observacion');
		//CKEDITOR.config.skin = 'office2013';
		funcion.loadDateInput();
		this.getData()
	}



	getDataRuta(ruta,tipo){
		let self=this
		$('form#'+ruta).submit(function(event) {
			event.preventDefault()
			let datos=$(this).serializeArray()
			let datosSend=$(this).serialize()
			if(funcion.validaDatos(datos)){
				funcion.sendDataRuta(datosSend,tipo,ruta).then(response=>{ self. successInsert(response)})
			}

		});
	}



}
