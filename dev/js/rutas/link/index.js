module.exports=class Redireccion{

	main(ruta){
		location.href='/juridico/'+ruta
	}

	reporteVolantes(id){
		window.open('/juridico/php/reportes/Volantes.php'+'?param1='+id)
	}
	reporteConfronta(id){
		window.open('/juridico/php/reportes/Confronta.php'+'?param1='+id)
	}
	reporteObsvIfa(id){
		window.open('/juridico/php/reportes/tcpdf/examples/Ifa.php'+'?param1='+id)
	}
	notificaciones(){
		//console.log
	}

	cedulaIrac(id){
		window.open('/juridico/php/reportes/IRAC.php'+'?param1='+id)
	}

}


//http://172.16.6.33/altanotifica/998|mensajePrueba|2293|86|Volantes|idVolante