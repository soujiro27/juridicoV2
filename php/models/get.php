<?php




class Get{



	public function conecta(){
			try{
				require 'src/conexion.php';
				$db = new PDO("sqlsrv:Server={$hostname}; Database={$database}", $username, $password );
				return $db;
			}catch (PDOException $e) {
				print "ERROR: " . $e->getMessage();
				die();
			}
		}

		//necesaria
	public function consultaRetorno($sql){
		$db=$this->conecta();
		$query=$db->prepare($sql);
		$query->execute();
		//echo "\nPDO::errorInfo():\n";
    //print_r($query->errorInfo());
		return $query->fetchAll(PDO::FETCH_ASSOC);
	}

	public function consultaRetornoPDO($sql,$pdo){
			$db=$this->conecta();
			$query=$db->prepare($sql);
			$query->execute($pdo);
			return $query->fetchAll(PDO::FETCH_ASSOC);
		}

		//necesaria
	public function getTable($sql){
			$db=$this->conecta();
			$datos=$this->consultaRetorno($sql);
			echo json_encode($datos);
	}




		//necesaria
	public function getDuplicado($tabla,$datos){
			$procesa=new procesaDatosQuery();
			$sql=$procesa->obtieneCamposWhere($datos);
			$sql="SELECT * FROM sia_".$tabla." WHERE ".$sql;
			//echo $sql;
			$pdo=$procesa->obtieneArregloPdo($datos);
			$datos=$this->consultaRetornoPDO($sql,$pdo);
			return $datos;
	}

	public function getDuplicadoOrder($tabla,$datos,$order){
			$procesa=new procesaDatosQuery();
			$sql=$procesa->obtieneCamposWhere($datos);
			$sql="SELECT * FROM sia_".$tabla." WHERE ".$sql." order by ".$order;
			//echo $sql;
			$pdo=$procesa->obtieneArregloPdo($datos);
			$datos=$this->consultaRetornoPDO($sql,$pdo);
			return $datos;
	}


	public function getCombo($tabla,$campos,$where,$pdo){
		$db=$this->conecta();
		if($tabla=='auditorias'){
			$sql="SELECT ".$campos." FROM sia_".$tabla." WHERE ".$where." AND clave<>'NULL' ";
		}else{
			$sql="SELECT ".$campos." FROM sia_".$tabla." WHERE ".$where;
		}
		$datos=$this->consultaRetornoPDO($sql,$pdo);
		echo json_encode($datos);
	}

	public function getLastFolio($tabla,$campo){
		$db=$this->conecta();
		$sql="if (select MAX(".$campo.") from sia_".$tabla.")<1
			select 1 as folio
			ELSE
		select MAX(".$campo.") as folio from sia_".$tabla;
		$datos=$this->consultaRetorno($sql);
		echo json_encode($datos);
	}

		//necesaria
	public function getComboAuditorias()
	{
		$db=$this->conecta();
		$cuenta=$_SESSION["idCuentaActual"];

		$sql="SELECT idAuditoria,clave,idUnidad from sia_auditorias where idCuenta='$cuenta' and clave <>'NULL'";

		$datos=$this->consultaRetorno($sql);
		echo json_encode($datos);
	}

	//necesaria
	public function getAuditoriaById($id){
		$cuenta=$_SESSION["idCuentaActual"];
		$db=$this->conecta();
		$sql="SELECT a.idAuditoria auditoria,ta.nombre tipo, COALESCE(convert(varchar(20),a.clave),convert(varchar(20),a.idAuditoria)) claveAuditoria,
 dbo.lstSujetosByAuditoria(a.idAuditoria) sujeto, a.idArea, a.rubros, subDoc.nombre, v.idTurnado
 FROM sia_programas p
 INNER JOIN sia_auditorias a on p.idCuenta=a.idCuenta and p.idPrograma=a.idPrograma
 INNER JOIN sia_areas ar on a.idArea=ar.idArea
 left join sia_VolantesDocumentos vd on a.idAuditoria=vd.cveAuditoria
 left join sia_catSubTiposDocumentos subDoc on vd.idSubTipoDocumento=subDoc.idSubTipoDocumento
 left join sia_Volantes v on vd.idVolante=v.idVolante
 LEFT JOIN sia_tiposauditoria ta on a.tipoAuditoria= ta.idTipoAuditoria
 WHERE a.idCuenta='$cuenta' and a.idAuditoria='$id' GROUP BY 
 a.idAuditoria, a.clave,ta.nombre,a.idProceso,a.idEtapa,ar.nombre, a.idArea, a.rubros, subDoc.nombre, v.idTurnado";
	$datos=$this->consultaRetorno($sql);
	echo json_encode($datos);

	}


	//necesaria
	public function getTablaObservaciones($modulo){
		$db=$this->conecta();
		$sql="select v.idVolante,v.numDocumento, v.fRecepcion, v.idRemitente, v.asunto, v.estatus, t.estadoProceso from sia_Volantes v
inner join sia_VolantesDocumentos vd on v.idVolante=vd.idVolante
inner join sia_catSubTiposDocumentos sub on vd.idSubTipoDocumento=sub.idSubTipoDocumento
inner join sia_turnosJuridico t on v.idVolante=t.idVolante
where sub.nombre='$modulo' and v.idTurnado=
(select nombreCorto from sia_areas where idAreaSuperior='DGAJ' and idEmpleadoTitular=
(select idEmpleado from sia_usuarios where idUsuario='".$_SESSION ['idUsuario']."')) order by v.idVolante desc";
$datos=$this->consultaRetorno($sql);
echo json_encode($datos);
	}



	public function getLastFolioVolantes(){
		$db=$this->conecta();
		$sql="select MAX(idVolante) as folio from sia_Volantes";
		$datos=$this->consultaRetorno($sql);
		return $datos;
	}


	public function getDatosNotificacion($idVolante){
		$db=$this->conecta();
		$sql="select u.idUsuario,concat('Tienes un Nuevo Documento: ',subtipo.nombre) as mensaje, 
audi.idAuditoria from sia_Volantes v
inner join sia_areas a on v.idTurnado=a.nombreCorto
inner join sia_VolantesDocumentos vd on v.idVolante=vd.idVolante
inner join sia_catSubTiposDocumentos subtipo on vd.idSubTipoDocumento=subtipo.idSubTipoDocumento
inner join sia_auditorias audi on vd.cveAuditoria=audi.idAuditoria
inner join sia_usuarios u on a.idEmpleadoTitular=u.idEmpleado
where v.idVolante='$idVolante'";
$datos=$this->consultaRetorno($sql);
	echo json_encode($datos);
	}

}







?>
