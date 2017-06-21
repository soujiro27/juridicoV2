<?php


class procesaDatosQuery{

	public function obtieneCamposInsert($datos){
		$campos="";
		foreach ($datos as $key => $value) {
			$campos=$campos.$key.', ';
		}
		return $campos;
	}

	public function obtieneValoresQuery($datos){
		$valores="";
		foreach ($datos as $key => $value) {
			$valores=$valores.':'.$key.', ';
		}
		return $valores;
	}


	public function obtieneValoresQueryUpdate($datos){
		$valores="";
		$num=count($datos);
		$cont=1;
		foreach ($datos as $key => $value) {
			if($cont>=$num)
			{
				break;
			}
			$cont++;
			$valores=$valores.$key.'=:'.$key.', ';
		}

		return $valores;
	}


	public function obtieneValoresWhereUpdate($datos){
	$valores="";
	$num=count($datos);
	$cont=1;
	foreach ($datos as $key => $value) {
		if($cont==$num)
		{
			$valores=$valores.$key.'=:'.$key.', ';
		}
		$cont++;
	}
	$sql=substr($valores,0,-2);
	return $sql;
	}

	public function obtieneArregloPdo($datos){
		$arreglo=array();
		foreach ($datos as $key => $value) {
			$arreglo[':'.$key]=$value;
		}
		return $arreglo;
	}

	public function obtieneCamposWhere($datos){
		$valores="";
		foreach ($datos as $key => $value) {
			$valores=$valores.$key.'=:'.$key.' and ';
		}
		$sql=substr($valores,0,-4);
		return $sql;
	}



	public function separaDatosVolante($data){
	$comprobar=['idTipoDocto','numDocumento','folio','fDocumento','idRemitente','destinatario','idCaracter','idTurnado','idAccion','anexos','hRecepcion','fRecepcion','asunto','extemporaneo','subFolio'];
	$cont=count($comprobar);
	foreach ($data as $key => $value) {
		for ($i=0; $i <$cont ; $i++) {
			if($key==$comprobar[$i]){
				$datosComprobacion[$key]=$value;
			}
		}
	}
	
	return $datosComprobacion;
	}


	public function separaDatosInsertVolantesDocumentos(array $data){
		$comprobar=['idSubTipoDocumento','cveAuditoria','promocion'];
		$cont=count($comprobar);
		foreach ($data as $key => $value) {
			for ($i=0; $i <$cont ; $i++) {
				if($key==$comprobar[$i]){
					$datosComprobacion[$key]=$value;
				}
			}
		}
		return $datosComprobacion;
	}


}


 ?>
