module.exports=class Redireccion{

	main(ruta){
		location.href='/juridico/'+ruta
	}

	reporteVolantes(id){
		window.open('/juridico/php/reportes/Volantes.php'+'?param1='+id)
	}

}