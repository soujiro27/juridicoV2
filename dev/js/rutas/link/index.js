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

}