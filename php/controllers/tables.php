<?php
class Tables extends Rutas{

private $caracteres='select idCaracter,siglas, nombre,estatus from sia_CatCaracteres';
private $acciones='select idAccion,nombre,estatus from sia_catAcciones';
private $SubTiposDocumentos='select idSubTipoDocumento, idTipoDocto, nombre,estatus from sia_catSubTiposDocumentos';

private $Volantes="select v.idVolante, v.folio, v.numDocumento, v.idRemitente as Remitente, v.idTurnado as Turnado, v.fRecepcion, v.estatus,
a.clave as auditoria,
sub.nombre as documento,
t.estadoProceso as estado
from sia_VolantesDocumentos vd
inner join sia_Volantes v on vd.idVolante=v.idVolante
inner join sia_turnosJuridico t on v.idVolante=t.idVolante
inner join sia_auditorias a on vd.cveAuditoria=a.idAuditoria
inner join sia_catSubTiposDocumentos sub on vd.idSubTipoDocumento=sub.idSubTipoDocumento order by idVolante desc";



public function incio($modulo){
		$obtener= new Get();
		if($modulo=='Caracteres'){$sql=$this->caracteres;}
		if($modulo=='Acciones'){$sql=$this->acciones;}
		if($modulo=='SubTiposDocumentos'){$sql=$this->SubTiposDocumentos;}
		if($modulo=='Volantes'){$sql=$this->Volantes;}
		$obtener->getTable($sql);
}



}



 ?>
