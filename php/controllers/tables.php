<?php



class Tables extends Rutas{




private $caracteres='select idCaracter,siglas, nombre,estatus from sia_CatCaracteres';
private $acciones='select idAccion,nombre,estatus from sia_catAcciones';
private $SubTiposDocumentos='select idSubTipoDocumento, idTipoDocto, nombre,estatus from sia_catSubTiposDocumentos';

private $Volantes="select v.idVolante, v.folio, v.subfolio, v.numDocumento, v.idRemitente as Remitente, v.idTurnado as Turnado, v.fRecepcion,  v.extemporaneo, 
a.clave as auditoria,
sub.nombre as documento,
t.estadoProceso as estado,
v.estatus
from sia_VolantesDocumentos vd
inner join sia_Volantes v on vd.idVolante=v.idVolante
inner join sia_turnosJuridico t on v.idVolante=t.idVolante
inner join sia_auditorias a on vd.cveAuditoria=a.idAuditoria
inner join sia_catSubTiposDocumentos sub on vd.idSubTipoDocumento=sub.idSubTipoDocumento order by idVolante desc";

private $doctosTexto="select cdt.idDocumentoTexto, cdt.texto,
std.idTipoDocto,std.nombre,cdt.estatus
from sia_CatDoctosTextos cdt
inner join sia_catSubTiposDocumentos std on cdt.idSubTipoDocumento=std.idSubTipoDocumento";



private $ifaObservaciones="select idObservacionDoctoJuridico,pagina,observacion,estatus from sia_ObservacionesDoctosJuridico";


private $documentosGral="select v.idVolante,v.numDocumento,a.clave,subd.nombre as Documento, v.idTurnado as Remitente,
v.anexoDoc
from sia_Volantes v
inner join sia_VolantesDocumentos vd on v.idVolante=vd.idVolante
inner join sia_auditorias a on vd.cveAuditoria=a.idAuditoria
inner join sia_catSubTiposDocumentos subd on vd.idSubTipoDocumento=subd.idSubTipoDocumento
and v.anexoDoc is not null
";



public function incio($modulo){
		
		$obtener= new Get();
		if($modulo=='Caracteres'){$sql=$this->caracteres;}
		if($modulo=='Acciones'){$sql=$this->acciones;}
		if($modulo=='SubTiposDocumentos'){$sql=$this->SubTiposDocumentos;}
		if($modulo=='Volantes'){$sql=$this->Volantes;}
		if($modulo=='confrontasJuridico'){$sql=$this->sqlConfronta($_SESSION["idUsuario"]);}
		if($modulo=='DoctosTextos'){$sql=$this->doctosTexto;}
		if($modulo=='Ifa'){$sql=$this->sqlIfa($_SESSION["idUsuario"]);}
		if($modulo=='ObservacionesDoctosJuridico'){$sql=$this->ifaObservaciones;}
		if($modulo=='Documentos'){$sql=$this->Documentos($_SESSION["idUsuario"]);}
		if($modulo=='DocumentosGral'){$sql=$this->documentosGral;}
		$obtener->getTable($sql);
		
}


public function sqlConfronta($usuario){
	$confronta = "select 
v.idVolante, numDocumento, v.fRecepcion,v.idRemitente,v.asunto,v.extemporaneo,
cc.nombre as Caracter,
ac.nombre as Accion,
a.clave,
tj.estadoProceso,
p.valor as diasValor,
case when v.extemporaneo='NO' then
	CONVERT(nvarchar, DATEDIFF(DAY,'2017-06-20',CONVERT (date, SYSDATETIME())))
else
	'Extemporaneo'
end as dias,
v.estatus
from sia_usuarios u
inner join sia_empleados e on u.idEmpleado=e.idEmpleado
inner join sia_Volantes v on e.idArea=v.idTurnado
inner join sia_VolantesDocumentos vd on v.idVolante=vd.idVolante
inner join sia_catSubTiposDocumentos std on vd.idSubTipoDocumento=std.idSubTipoDocumento
inner join sia_CatCaracteres cc on v.idCaracter=cc.idCaracter
inner join sia_CatAcciones ac on v.idAccion=ac.idAccion
inner join sia_auditorias a on vd.cveAuditoria = a.idAuditoria
inner join sia_turnosJuridico tj on v.idVolante=tj.idVolante
inner join sia_Parametros p on std.nombre=p.clave
where u.idUsuario='$usuario' and std.nombre='CONFRONTA'";
	return $confronta;
	//require 'juridico/php/controllers/fechas.php';
	//$fecha= new Fechas();
	//$fecha->fechaActual();
}


public function sqlIfa($usuario){
	$sql="select v.idVolante,v.numDocumento, v.fRecepcion, v.idRemitente, v.asunto, v.estatus, t.estadoProceso from sia_Volantes v
inner join sia_VolantesDocumentos vd on v.idVolante=vd.idVolante
inner join sia_catSubTiposDocumentos sub on vd.idSubTipoDocumento=sub.idSubTipoDocumento
inner join sia_turnosJuridico t on v.idVolante=t.idVolante
where sub.nombre='Ifa' and v.idTurnado=
(select nombreCorto from sia_areas where idAreaSuperior='DGAJ' and idEmpleadoTitular=
(select idEmpleado from sia_usuarios where idUsuario='".$_SESSION ['idUsuario']."')) order by v.idVolante desc";
	return $sql;
}


public function Documentos($usuario)
{
	$sql="select v.idVolante,v.numDocumento,a.clave as Auditoria,subd.nombre as Tipo,
v.anexoDoc
from sia_Volantes v
inner join sia_VolantesDocumentos vd on v.idVolante=vd.idVolante
inner join sia_auditorias a on vd.cveAuditoria=a.idAuditoria
inner join sia_catSubTiposDocumentos subd on vd.idSubTipoDocumento=subd.idSubTipoDocumento
where v.idTurnado=(select idArea from sia_usuarios where idUsuario='$usuario')
and v.anexoDoc is not null";
return $sql;
}





}





 ?>
