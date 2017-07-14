<?php

session_start();
require './../../../models/get.php';
$idVolante = $_GET['param1'];

function conecta(){
    try{
      require './../../../../../src/conexion.php';
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


















// Include the main TCPDF library (search for installation path).
require_once('tcpdf_include.php');
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Nicola Asuni');
$pdf->SetTitle('Observaciones Ifa');


// remove default header/footer
$pdf->setPrintHeader(false);
$pdf->setPrintFooter(false);

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

// set margins
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);

// set auto page breaks
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

// set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

// set some language-dependent strings (optional)
if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
    require_once(dirname(__FILE__).'/lang/eng.php');
    $pdf->setLanguageArray($l);
}

// ---------------------------------------------------------

// set font
$pdf->SetFont('times', '', 9);

// add a page
$pdf->AddPage();

// set some text to print
$txt = <<<EOD
AUDITORIA SUPERIO DE LA CIUDAD DE MÉXICO
DIRECCIÓN GENERAL DE ASUNTOS JURÍDICOS
DIRECCIÓN DE INTERPRETACIÓN JURÍDICA Y PROMOCIÓN DE ACCIONES
HOJA DE EVALUACIÓN DE INFORMES FINALES DE AUDITORÍA
CUENTA PÚBLICA 2015
EOD;

// print a block of text using Write()
$pdf->Write(0, $txt, '', 0, 'C', true, 0, false, false, 0);

// ---------------------------------------------------------

$test="carlois";

$html = <<<EOD
<table cellspacing="0" cellpadding="1" border="1">
    <tr>
        <td>UNIDAD ADMINISTRATIVA AUDITORA</td>
        <td>{$datos[0]['nombre']}</td>
    </tr>
    <tr>
        <td>CLAVE</td>
        <td>{$datos[0]['claveAuditoria']}</td>
    </tr>
    <tr>
        <td>RUBRO AUDITADO</td>
        <td>{$ente}</td>
    </tr>
    <tr>
        <td>TIPO DE AUDITORIA</td>
        <td>{$datos[0]['tipo']}</td>
    </tr>
    <tr>
        <td>ENTE AUDITADO</td>
        <td>{$sujeto}</td>
    </tr>
</table>
EOD;
$pdf->writeHTML($html, true, false, false, false, '');


$txt = <<<EOD
OBSERVACIONES
EOD;

// print a block of text using Write()
$pdf->Write(0, $txt, '', 0, 'C', true, 0, false, false, 0);



$html = <<<EOD
<table cellspacing="0" cellpadding="1" border="1">
   <tr>
       <td>No.</td>
       <td>Hoja</td>
       <td></td>
   </tr>
    <tr>
        <td>1</td>
        <td>56</td>
        <td>Lorem Ipsum es un texto de marcador de posición comúnmente utilizado en las industrias gráficas, gráficas y editoriales para previsualizar diseños y maquetas visuales.
</td>
    </tr>
</table>
EOD;
$pdf->writeHTML($html, true, false, false, false, '');













//Close and output PDF document
$pdf->Output('example_002.pdf', 'I');

//============================================================+
// END OF FILE
//============================================================+
