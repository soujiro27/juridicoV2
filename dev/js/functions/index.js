const $=require('jquery')
const link=require('./../rutas/link')
const valida=require('validator')
const query=require('./../notificaciones')
let confirms=new query()
module.exports=class Funciones extends link{

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


	sendData(datos,tipo){
		let post=new Promise((resolve,reject)=>{
			$.post({
				url:'/'+tipo+'/'+ruta,
				data:datos,
				success:function(json){
					let data=JSON.parse(json)
					resolve(data)
				}
			});
		})
		return post
	}

	
	getDatos(ruta,data){
		let get=new Promise((resolve,reject)=>{
			$.get({
				url:'/getRegister/'+ruta,
				data:data,
				success:function(data){
					let json=JSON.parse(data);
					resolve(json)

				}
			})
		})
		return get
	}


	createObject(campo,valor)
	{
		let objeto={}
		objeto[campo]=valor
		return objeto
	}



	getComboAuditorias(){
		let get=new Promise((resolve,reject)=>{
			$.get({
				url:'/getCombo/auditorias',
				success:function(json){
					let data=JSON.parse(json)
					resolve(data)
				}
			});
		})
		return get
	}

	createComboAuditorias(datos){
		var opt=' <option value=""> Seleccione una Opción </option>'
		datos.map(function(json){
			opt+=`<option value="${json.idAuditoria}">${json.clave}</option>`
		})

		return opt
	}

	createComboCaracter(datos){
		var opt=' <option value=""> Seleccione una Opción </option>'
		datos.map(function(json){
			opt+=`<option value="${json.idCaracter}">${json.nombre}</option>`
		})

		return opt
	}

	createComboTurnado(datos){
		var opt=' <option value=""> Seleccione una Opción </option>'
		datos.map(function(json){
			opt+=`<option value="${json.idArea}">${json.nombre}</option>`
		})

		return opt
	}

	createComboAccion(datos){
		var opt=' <option value=""> Seleccione una Opción </option>'
		datos.map(function(json){
			opt+=`<option value="${json.idAccion}">${json.nombre}</option>`
		})

		return opt
	}


	getAuditoriaById(id)
	{
		let get=new Promise((resolve,reject)=>{
			$.get({
				url:'/auditorias/'+id,
				success:function(json){
					let data=JSON.parse(json)
					resolve(data)
				}
			});
		})
		return get
	}


	separaDatosAuditoria(data,id){
		var arreglo=data.split("/");
  		var li="";
  		$.each(arreglo, function(index, val) {
    		li+='<li>'+val+'</li>';
  		});
     $('ul#'+id).html(li);
	}


	loadDateInput()
	{
		$('input.fechaInput').datepicker({ dateFormat: "yy-mm-dd" });
    	
	}




}