const $=require('jquery')
const link=require('./../rutas/link')
const query=require('./../notificaciones')
const funct=require('./../functions')
const table=require('./../table')

const Caracteres=require('./../templates/forms/update/Caracteres.js');
const Acciones=require('./../templates/forms/update/Acciones.js');
const SubTiposDocumentos=require('./../templates/forms/update/SubTiposDocumentos.js');
const Volantes=require('./../templates/forms/update/Volantes.js');

let tabla=new table()
let confirms=new query()
let funcion=new funct();

module.exports=class Update extends link{

	separaTemplates(ruta){
		if(ruta=='Caracteres'){return Caracteres}
		if(ruta=='Acciones'){return Acciones}
		if(ruta=='SubTiposDocumentos'){return SubTiposDocumentos}
		if(ruta=='Volantes'){return Volantes}

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
					}
				},
				cancel:{
					text:'Cancelar'
				}
			}
		})
	}











}