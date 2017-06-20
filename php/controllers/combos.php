<?php


class Combos extends Rutas{


	public function getComboAuditorias()
	{
		$obtiene= new Get();
		$cuenta=$_SESSION["idCuentaActual"];
		$sql="SELECT idAuditoria,clave,idUnidad from sia_auditorias where idCuenta='$cuenta' and clave <>'NULL'";
		$datos=$obtiene->consultaRetorno($sql);
		echo json_encode($datos);
	}


}

 ?>
