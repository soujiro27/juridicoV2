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
				funcion.sendData(datosSend,'insert').then(response=>{ self.successInsert(response)})
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
		let self=this
		if(json.insert!='true'){
			confirms.modernAlert(json.insert)
		}else{
			if(ruta=='Volantes'){
				self.notificacionVolante()
			}
			tabla.drawTable(ruta)
		}
		$('a#agregar').show();
	}


	onchangeTipoDocto(){

		var self=this
		$('select#idDocumento').change(function() {
			
			var val=$(this).val()
			var obj={}
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
		var self=this
		$('select#cveAuditoria').change(function(event) {
			let id=$(this).val()
			funcion.getAuditoriaById(id)
			.then(response=>{
				
				funcion.separaDatosAuditoria(response[0].sujeto,'idUnidad')
				funcion.separaDatosAuditoria(response[0].rubros,'idObjeto')
				//$('ul#idObjeto').html('<li>'+response[0].rubros+'</li>')
				
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
			let id=datos[3].value
			console.log(datos)
			if(funcion.validaDatos(datos)){
				if(ruta=='DocumentosSiglas'){
					let firma=self.getDataFirma(datos)
					funcion.sendDataRuta(firma,tipo,ruta).then(response=>{
						self.successCedulaIfa(response,id)
					})
				}
				/*funcion.sendDataRuta(datosSend,tipo,ruta).then(response=>{ 
					self.successCedulaIfa(response,id)


				})*/
			}

		});
	}


	successCedulaIfa(json,id){
		let self=this
		json.insert!='true' ? confirms.modernAlert(json.insert):self.confirmPrintCedulaIfa(id)
		$('a#agregar').show();
	}


	confirmPrintCedulaIfa(id){
		let self=this
		$.confirm({
			title: 'Datos Actualizados',
    		content: 'Desea Imprimir la Cedula',
    	buttons: {
        	confirm:{
				text: 'Imprimir',
				btnClass:'btn-warning',
				action:function(){
					self.reporteObsvIfa(id)
				}
        },
        	cancel:{
				text:'Cancelar',
				btnClass:'btn-red',
				action:function(){
					tabla.drawTable(ruta)
				}
        }
    	}
		});
	}
	

	getDataFirma(datos){
		let firma=''
		let data=''
		for(let x in datos){
			if(datos[x].name=='firma'){
				firma+=datos[x].value+','
			}else{
				data+=datos[x].name+'='+datos[x].value+'&'
			}	
		}
		data=data+'idEmpleadosFirma='+firma
		return data
	}

	dataFileUpload(){
		 var fileExtension = "";
		 $('input[type=file]').change(function(){
			var file = $("#imagen")[0].files[0];
			var fileName = file.name;
			fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
			var fileSize = file.size;
			var fileType = file.type;
    	});
	}

	uploadFile(){
		let self=this
		$('form#documentosJur').on('submit',function(e){
			e.preventDefault()
			 var formData = new FormData($(this)[0]);
			    $.ajax({
            url: '/juridico/uploadFile',  
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function(){
               // message = $("<span class='before'>Subiendo la imagen, por favor espere...</span>");
                //showMessage(message)        
            },
          
            success: function(json){
			  let data=JSON.parse(json)
			  if(data.update=='false'){
					confirms.modernAlert('El numero de Documento no se encuentra Registrado')
			  }else{
				//confirms.modernAlert('El Documento se a cargado con exito')
				self.main('Documentos');
			  }
            },
         
            error: function(){
                alert('ocurrio un eror')
            }
        });
		})
	}



	checkNumeroDocumento(){
	let self=this
		$('input#numDocumento').keyup(function(){
			let valor=$(this).val();
			let idEmpleado=funcion.getDatos('usuarios',{idUsuario:nUsr})
			.then(empleado=>{
				let area=empleado["0"].idArea
				funcion.getDatos('Volantes',{numDocumento:valor,idTurnado:area})
				.then(json=>{
					let container=$('div.uploadContainer')
					let send=$('div.uploadInput')
					if(json.register=='No se encontro registro'){
						container.html(`<h3>${json.register}</h3>`)
						send.hide()
					}else{
						if(json["0"].anexoDoc==null){
							container.html(`<h3>No hay Documentos Asignados</h3>`)
							send.show()
						}else{
							container.html(`<h3>Hay un Documento Asignado <a href="/juridico/files/${json["0"].anexoDoc}" target="_blank"> ${json["0"].anexoDoc}</a></h3>`)
							send.show()
						}
					}
				})
			})
			
			

		
		})
	}


	notificacionVolante(){
		let self=this
		self.getLastFolio('Volantes','idVolante')
		.then(response=>{
			let idVolante=response[0].folio
			$.get({
				url:'/juridico/notificaciones/'+idVolante,
				success:function(json){
					let data=JSON.parse(json)
					$.get({
						url:'/altanotifica/'+data["0"].idUsuario+'|'+data["0"].mensaje+'|'+idVolante+'|'+data["0"].idAuditoria+'|Volantes|idVolante'
					})
				
					
				}
			})
			
		})
	}


	checkDocumentoGral(){
		let self=this
		$('input#numDocumento').keyup(function(){
			let valor=$(this).val();
				funcion.getDatos('Volantes',{numDocumento:valor})
				.then(json=>{
					let container=$('div.uploadContainer')
					let send=$('div.uploadInput')
					if(json.register=='No se encontro registro'){
						container.html(`<h3>${json.register}</h3>`)
						send.hide()
					}else{
						if(json["0"].anexoDoc==null){
							container.html(`<h3>No hay Documentos Asignados</h3>`)
							send.show()
						}else{
							container.html(`<h3>Hay un Documento Asignado <a href="/juridico/files/${json["0"].anexoDoc}" target="_blank"> ${json["0"].anexoDoc}</a></h3>`)
							send.show()
						}
					}
				})
		
			
			

		
		})
	}

}


