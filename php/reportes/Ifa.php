<?php
//require './fpdf.php';
session_start();
require './../models/get.php';
require('mc_table.php');

$idVolante = $_GET['param1'];

function conecta(){
    try{
      require './../../../src/conexion.php';
      $db = new PDO("sqlsrv:Server={$hostname}; Database={$database}", $username, $password );
      return $db;
    }catch (PDOException $e) {
      print "ERROR: " . $e->getMessage();
      die();
    }
  }

function consultaRetorno($sql,$db){
		$query=$db->prepare($sql);
		$query->execute();
    return $query->fetchAll(PDO::FETCH_ASSOC);
}

$cuenta=$_SESSION["idCuentaActual"];

$sql="SELECT a.idAuditoria auditoria,ta.nombre tipo, COALESCE(convert(varchar(20),a.clave),convert(varchar(20),a.idAuditoria)) claveAuditoria,
 dbo.lstSujetosByAuditoria(a.idAuditoria) sujeto, dbo.lstObjetosByAuditoria(a.idAuditoria) objeto, a.idArea,
 ar.nombre
 FROM sia_programas p
 INNER JOIN sia_auditorias a on p.idCuenta=a.idCuenta and p.idPrograma=a.idPrograma
 INNER JOIN sia_areas ar on a.idArea=ar.idArea
 LEFT JOIN sia_tiposauditoria ta on a.tipoAuditoria= ta.idTipoAuditoria
 WHERE a.idCuenta='$cuenta' and a.idAuditoria=(select cveAuditoria from sia_VolantesDocumentos where idVolante='$idVolante')
 GROUP BY a.idAuditoria, a.clave,ta.nombre,a.idProceso,a.idEtapa,ar.nombre, a.idArea,ar.nombre";

$db=conecta();
$datos=consultaRetorno($sql, $db);

function convierte($cadena){
  $str = utf8_decode($cadena);
  return $str;
}


$ente=str_replace('/',"\n", $datos[0]['objeto']);
$sujeto=str_replace('/',"\n", $datos[0]['sujeto']);

$audit=convierte('AUDITORÍA SUPERIOR DE LA CIUDAD DE MÉXICO');
$dir=convierte('DIRECCIÓN GENERAL DE ASUNTOS JURÍDICOS');
$dijpa=convierte('DIRECCIÓN DE INTERPRETACIÓN JURÍDICA Y DE PROMOCIÓN DE ACCIONES');
$hoja=convierte('HOJÁ DE EVALUACIÓN DE INFORMES FINALES DE AUDÍTORIA ');
$num=convierte('NÚM DE DOCUMENTO');
$cuenta=convierte('CUENTA PÚBLICA 2015');
$fechaTxt=convierte('Ciudad de México, ');
$destTxt=convierte('DR. IVÁN DE JESÚS OLMOS CANSINO');
$ente=convierte($ente);
$sujeto=convierte($sujeto);




$pdf = new PDF_MC_Table();
$pdf->AddPage();

$pdf->header(
  $pdf->SetFont('Arial','B',10),
  $pdf->Cell(180,1,$audit,0,0,'C'),
  $pdf->Ln(5),
  $pdf->Cell(180,1,$dir,0,0,'C'),
  $pdf->Ln(5),
  $pdf->Cell(180,1,$dijpa,0,0,'C'),
  $pdf->Ln(5),
  $pdf->Cell(180,1,$hoja,0,0,'C'),
  $pdf->Ln(5),
  $pdf->Cell(180,1,$cuenta,0,0,'C'),
  $pdf->Ln(10),
  $pdf->SetFont('Arial','',9),
  $pdf->SetWidths(array(90,90)),
  $pdf->RowLeft(array('UNIDAD ADMINISTRATIVA AUDITORIA',$datos[0]['nombre'])),
  $pdf->SetWidths(array(90,90)),
  $pdf->RowLeft(array('CLAVE',$datos[0]['claveAuditoria'])),
  $pdf->SetWidths(array(90,90)),
  $pdf->RowLeft(array('RUBRO AUDITADO',$ente)),
  $pdf->SetWidths(array(90,90)),
  $pdf->RowLeft(array('TIPO DE AUDITORIA',$datos[0]['tipo'])),
  $pdf->SetWidths(array(90,90)),
  $pdf->RowLeft(array('ENTE AUDITADO',$sujeto))

);


$pdf->Ln(10);
$pdf->Cell(180,1,'OBSERVACIONES',0,0,'C');




$sql="select * from sia_ObservacionesDoctosJuridico where idVolante='$idVolante'";
$datos=consultaRetorno($sql, $db);
$pdf->Ln(10);
$pdf->SetWidths(array(20,20,140));
$pdf->Row(array('No.','HOJA','OBSERVACIONES'));

foreach ($datos as $key => $value) {
  $texto=convierte($datos[$key]['observacion']);
  $pdf->SetWidths(array(20,20,140));
  $pdf->RowLeft(array($key+1,$datos[$key]['pagina'],$texto));
  $pdf->Ln(0);
}

  $pdf->Ln(5);
  $pdf->Cell(180,1,'POTENCIALES PROMOCIONES DE ACCIONES:',0,0,'C');

$rubrica='La Dirección General de Asuntos Jurídicos conincide con la potencial promoción de accíon señalada en la cédula correspondiente, no obstante, se sugiere precisar él o los incisos relacionados con la misma.';

$rub='Se debe considerar que la Dirección General de Asuntos Jurídicos no cuenta con soporte documental que permita determinar si se reúnen o no los elementos suficientes e idóneos para acreditar las irregularidades detectadas en la auditoria y palsmadas en los resultados; acreditar la probable responsabilidad de los servidores públicos; y en su caso, la fecha probable de presentación de las promociones de acciones correspondientes ante la autoridad competente.';

$rubrica=convierte($rubrica);
$rub=convierte($rub);
$pdf->Ln(5);
$pdf->MultiCell(180,5,$rubrica,0,'L');
$pdf->Ln(5);
$pdf->MultiCell(180,5,$rub,0,'L');
$pdf->Ln(5);

function mes($num){
  $meses= ['Enero','Febrero','Marzo','Abril','Mayo','Junio', 'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  return $meses[$num-1];
}


$fecha=getdate();
$mesTxt=mes($fecha['mon']);

$pdf->Cell(180,5,$fechaTxt.$fecha['mday'].' de '.$mesTxt.' de '.$fecha['year'],0,0,'R');


$pdf->Ln(10);
$pdf->Cell(90,1,'AUTORIZO',0,0,'C');
$pdf->Cell(90,1,'REVISO',0,0,'C');

/*
$pdf->Image('./img/logo-top.png',10,8,33);
$pdf->SetFont('Arial','B',10);
$pdf->Cell(80,1,'',0);
$pdf->Cell(50,1,$dir,0,0,'L');
$pdf->Ln(5);
$pdf->Cell(80,1,'',0);
$pdf->Cell(50,5,'NOTA INFORMATIVA',0,0,'L');
*/



$pdf->Output();

?>
