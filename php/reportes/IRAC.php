<?php
session_start();
// Include the main TCPDF library (search for installation path).
require_once('./tcpdf/examples/tcpdf_include.php');

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

$sql = "SELECT vo.numDocumento,a.clave claveAuditoria,vo.fDocumento,CONCAT(us.nombre,' ',us.paterno,' ', us.materno) nombreres, ar.nombre direccion,ds.fOficio,ds.siglas FROM sia_Volantes vo INNER JOIN sia_volantesDocumentos vd on vo.idVolante = vd.idVolante INNER JOIN sia_areas ar on vo.idRemitente=ar.idArea INNER JOIN sia_usuarios us on ar.idEmpleadoTitular=us.idEmpleado INNER JOIN sia_DocumentosSiglas ds on vo.idVolante=ds.idVolante INNER JOIN sia_auditorias a on vd.cveAuditoria=a.idAuditoria WHERE vo.idVolante='$idVolante';";      
      
$db=conecta();
$datos=consultaRetorno($sql, $db);

function convierte($cadena){
  $str = utf8_decode($cadena);
  return $str;
}

function mes($num){
  $meses= ['Enero','Febrero','Marzo','Abril','Mayo','Junio', 'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  return $meses[$num-1];
}

$fecha=explode('-',$datos[0]['fDocumento']);
$mes=mes(intval($fecha[1]));

$feoficio=explode('-',$datos[0]['fOficio']);
$mes2=mes(intval($feoficio[1]));

$numdocu=convierte(str_replace('/',"\n", $datos[0]['numDocumento']));
$clave=convierte(str_replace('/',"\n", $datos[0]['claveAuditoria']));
$fdocume=$datos[0]['fDocumento'];
$nomarers=$datos[0]['nombreres'];
$direc=$datos[0]['direccion'];
$sig=$datos[0]['siglas'];

class MYPDF extends TCPDF {
      // Page footer
    public function Footer() {
        // Position at 15 mm from bottom
        $this->SetY(-15);
        // Set font
        $this->SetFont('helvetica', 'I', 10);
        // Page number
        //$this->Cell(20);
        //$this->Cell(186, 3,' | '.$this->getAliasNumPage().' | '. ' de '.' | '.$this->getAliasNbPages().' | ',1,1,'R');
    }
}

// create new PDF document
$pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Auditoria Superior de la Ciudad de México');
$pdf->SetTitle('IRAC ' .$clave);
 
 $pdf->setPrintHeader(false);
//$pdf->setPrintFooter(false);

// set header and footer fonts
$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

// set margins
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

// set auto page breaks
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

// set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

// set some language-dependent strings (optional)
if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
    require_once(dirname(__FILE__).'/lang/eng.php');
    $pdf->setLanguageArray($l);
}

// -------------------------------------------------------------------

// set font
$pdf->SetFont('helvetica', '', 20);

// add a page
$pdf->AddPage();

$text1 = '
<table cellspacing="0" cellpadding="0" border="0">
    <tr>
        <td colspan="1"><img img src="img/asamblea.png"/></td>
        <td colspan="2"></td>
        <td colspan="4"><p><font size="10"><b> AUDITORÍA SUPERIOR DE LA CIUDAD DE MÉXICO<br><br> DIRECCIÓN GENERAL DE ASUNTOS JURIDICOS<br><br>OFICIO NÚM: ' .$numdocu .'<br><br> ASUNTO: Se remite evaluación del Informe de <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Resultados de Auditoría para Confronta<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (IRAC) correspondiente a la Auditoría <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' . $clave . '.<br><br>Ciudad de México, '. $fecha[2] . ' de ' .$mes . ' de ' . $fecha[0].'</b></p></font></td>
    </tr>
</table>';

$pdf->SetFontSize(9);
$pdf->writeHTML($text1);

//$pdf->SetFont('helvetica', '', 8);

// -------------------------------------------------------------------

$tbl = <<<EOD
<table cellspacing="0" cellpadding="0" border="0">
    
    <tr>
        <td colspan="1"><b>{$nomarers} <br>{$direc}<br>PRESENTE</b></td>
        
        
    </tr>
</table>
EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');



// -------------------------------------------------------------------

$tbl = <<<EOD
<table cellspacing="0" cellpadding="0" border="0">
    
    <tr>
        <td align="justify">En atención al oficio número {$numdocu} de fecha {$feoficio[2]} de {$mes2} de {$feoficio[0]}, presentado ante esta Dirección General el día {$fecha[2]} de {$mes} de {$fecha[0]}, y de conformidad con lo dispuesto por el Manual del Proceso General de Fiscalización en su Apartado 7. “Fases de Auditoría”, inciso B) “Fase de Ejecución”, Subapartado 4. “Confronta de Resultados de Auditoría con el Sujeto Fiscalizado”, numeral 1, por este conducto, me permito remitir junto al original en sobre cerrado, la Hoja de Evaluación del Informe de Resultados de Auditoría para Confronta (IRAC):</td>
    </tr>

</table>
EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');

// -----------------------------------------------------------------------------
$sql="SELECT ROW_NUMBER() OVER (ORDER BY vo.idVolante  desc ) as fila,a.idAuditoria,a.clave,dbo.lstSujetosByAuditoria(a.idAuditoria) sujeto, ta.nombre tipo, a.rubros FROM sia_Volantes vo INNER JOIN sia_ObservacionesDoctosJuridico ob on vo.idVolante=ob.idVolante INNER JOIN sia_auditorias a on ob.cveAuditoria=a.idAuditoria INNER JOIN sia_tiposauditoria ta on a.tipoAuditoria=ta.idTipoAuditoria WHERE vo.idVolante='$idVolante' GROUP BY a.idAuditoria,a.clave, ta.nombre, a.rubros,vo.idVolante;";

$db=conecta();
$datos=consultaRetorno($sql, $db);

$tbl = <<<EOD
  <table cellspacing="0" cellpadding="1" border="1">
    <tr style="background-color:#E7E6E6;">
      <th colspan="1" align="center"><b>No.</b></th>
      <th colspan="1" align="center"><b>AUDITORIA NÚM.</b></th>
      <th colspan="1" align="center"><b>SUJETO FISCALIZADO</b></th>
      <th colspan="1" align="center"><b>TIPO DE AUDITORIA</b></th>
      <th colspan="3" align="center"><b>RUBRO</b></th>
    </tr>
    
EOD;

foreach ($datos as $row) {
$tbl .= <<<EOD
  <tr>
    <td colspan="1" align="center">{$row['fila']}</td>
    <td colspan="1" align="center">{$row['clave']}</td>
    <td colspan="1">{$row['sujeto']}</td>
    <td colspan="1">{$row['tipo']}</td>
    <td colspan="3">{$row['rubros']}</td>
  </tr>
EOD;
}

$tbl .= <<<EOD
  </table>
EOD;


$pdf->writeHTML($tbl, true, false, false, false, '');

// -----------------------------------------------------------------------------

$tbl = <<<EOD
<table cellspacing="0" cellpadding="0" border="0">
    
    <tr>
        <td>Sin otro particular por el momento, hago propicia la ocasión para enviarle un cordial saludo.<br><br></td>
    </tr>
    <tr>
        <td><b>ATENTAMENTE<br>El DIRECTOR GENERAL<br><br><br><br><br></b></td>
    </tr>
    <tr>
        <td><b>DR. IVÁN DE JESÚS OLMOS CANSINO<br></b></td>
    </tr>
</table>
EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');
// -----------------------------------------------------------------------------
$tbl = <<<EOD
<table cellspacing="0" cellpadding="0" border="0">
    <tr>
        <td colspan="1">c.c.p.</td>  
        <td colspan="5"><b>DR. DAVID MANUEL VEGA VERA,</b> Auditor Superior.- Presente.- Para su conocimiento.<br><b>C.P. FELIPE DE JESÚS ALVA MARTÍNEZ,</b> Titular de la Unidad Técnica Sustantiva de Fiscalización Financiera y Administración.- Presente.- Para su conocimiento.<br><b>DR. ARTURO VÁZQUEZ ESPINOSA,</b> Titular de la Unidad Técnica Sustantiva de Fiscalización Especializada y de Asuntos Jurídicos.- Presente.- Para su conocimiento.</td>
    </tr>
</table>
EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');

// -----------------------------------------------------------------------------

$tbl = <<<EOD
  <table cellspacing="0" cellpadding="0" border="0">
    <tr><td colspan="6" align="left">{$sig}<br><br></td></tr>
  </table>
EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');
// -----------------------------------------------------------------------------


$pdf->AddPage();



$cuenta=$_SESSION["idCuentaActual"];

$sql = " SELECT a.idAuditoria auditoria,ta.nombre tipo, COALESCE(convert(varchar(20),a.clave),convert(varchar(20),a.idAuditoria)) claveAuditoria,
 dbo.lstSujetosByAuditoria(a.idAuditoria) sujeto, dbo.lstObjetosByAuditoria(a.idAuditoria) objeto, a.idArea,
 ar.nombre,a.rubros,cu.anio
 FROM sia_programas p
 INNER JOIN sia_auditorias a on p.idCuenta=a.idCuenta and p.idPrograma=a.idPrograma
 INNER JOIN sia_areas ar on a.idArea=ar.idArea
 LEFT JOIN sia_tiposauditoria ta on a.tipoAuditoria= ta.idTipoAuditoria
 LEFT JOIN sia_cuentas cu on a.idCuenta = cu.idCuenta
 WHERE a.idCuenta='$cuenta' and a.idAuditoria=(select cveAuditoria from sia_VolantesDocumentos where idVolante='$idVolante')
 GROUP BY a.idAuditoria, a.clave,ta.nombre,a.idProceso,a.idEtapa,ar.nombre, a.idArea,ar.nombre,a.rubros,cu.anio;";      
      
$db=conecta();
$datos=consultaRetorno($sql, $db);


$aud=convierte(str_replace('/',"\n", $datos[0]['auditoria']));
$ti=convierte(str_replace('/',"\n", $datos[0]['tipo']));
$clave=convierte(str_replace('/',"\n", $datos[0]['claveAuditoria']));
$sSujeto=$datos[0]['sujeto'];
$unidadAdmin=$datos[0]['nombre'];
$rubro=$datos[0]['rubros'];
$an=$datos[0]['anio'];



$text1 = '
<table cellspacing="0" cellpadding="0" border="0">
    <tr>
        <td align="center"><p><font size="10"><b> AUDITORÍA SUPERIOR DE LA CIUDAD DE MÉXICO<br>DIRECCIÓN GENERAL DE ASUNTOS JURIDICOS<br>HOJA DE EVALUACIÓN DEL INFORME DE RESULTADOS DE AUDITORÍA PARA CONFRONTA<br>CUENTA PÚBLICA '.$an.'</b></p></font></td>
    </tr>
</table>';

$pdf->SetFontSize(9);
$pdf->writeHTML($text1);

//$pdf->SetFont('helvetica', '', 8);

// -------------------------------------------------------------------

/*
$sql="SELECT f.nombre sFase, orden, min(aa.fInicio ) desde, max(aa.fFin) hasta, sum(convert(int,aa.diasEfectivos)) cantidad " .
        "FROM sia_fases f " . 
        "LEFT JOIN sia_auditoriasactividades aa on f.idFase = aa.idFase and  aa.idAuditoria='$p2' Group by f.nombre, orden order by f.orden;";

$db=conecta();
$datos=consultaRetorno($sql, $db);
*/
$tbl = <<<EOD
  <table cellspacing="0" cellpadding="1" border="1" style="background-color:#E7E6E6;">
    <tr>
      <td colspan="1"><b>UNIDAD ADMINISTRATIVA AUDITORA:</b></td>
      <td colspan="2">{$unidadAdmin}</td>
    </tr>    
    <tr>
      <td  colspan="1"><b>CLAVE:</b></td>
      <td colspan="2">{$clave}</td>
    </tr>
    <tr>
      <td colspan="1"><b>RUBRO O FUNCIÓN DE GASTO AUDITADO:</b></td>
      <td colspan="2">{$rubro}</td>
    </tr>
    <tr>
      <td colspan="1"><b>TIPO DE AUDITORÍA:</b></td>
      <td colspan="2">{$ti}</td>
    </tr>
    <tr>
      <td colspan="1"><b>SUJETO FISCALIZADO:</b></td>
      <td colspan="2">{$sSujeto}</td>
    </tr>
  </table>
EOD;


$pdf->writeHTML($tbl, true, false, false, false, '');

// -----------------------------------------------------------------------------

$sql="SELECT ROW_NUMBER() OVER (ORDER BY idVolante  desc ) as fila, idObservacionDoctoJuridico, idVolante, idSubTipoDocumento, cveAuditoria,pagina,parrafo,observacion FROM sia_ObservacionesDoctosJuridico WHERE idVolante='$idVolante';";

$db=conecta();
$datos=consultaRetorno($sql, $db);

$tbl = <<<EOD
  <table cellspacing="0" cellpadding="1" border="1">
    <tr style="background-color:#E7E6E6;">
      <th colspan="1" align="center"><b>No.</b></th>
      <th colspan="1" align="center"><b>Página</b></th>
      <th colspan="4" align="center"><b>Observaciones</b></th>
    </tr>
    
EOD;

foreach ($datos as $row) {
$tbl .= <<<EOD
  <tr>
    <td align="center">{$row['fila']}</td>
    <td colspan="1" align="center">{$row['pagina']}</td>
    <td colspan="5">{$row['observacion']}</td>

  </tr>
EOD;
}

$tbl .= <<<EOD
  <tr><td colspan="6"></td></tr>
  <tr>
    <td colspan="6"><p align="center"><b>POTENCIALES PROMOCIONES DE ACCIONES</b></p><br>Esta Dirección General de Asuntos Jurídicos coincide con la Potencial Promoción de Acción señalada en la cédula pertinente del Informe Final de Auditoría en revisión.<br><br>Se debe considerar que la Dirección General de Asuntos Jurídicos no cuenta con soporte documental que permita determinar si se reúnen o no los elementos suficientes e idóneos para acreditar las observaciones detectadas en la auditoría.</td>  
  </tr>
 </table>
EOD;


$pdf->writeHTML($tbl, true, false, false, false, '');

// -----------------------------------------------------------------------------

$sql="SELECT ar.idArea,pj.puesto juridico,CONCAT(us.saludo,' ',us.nombre,' ',us.paterno,' ',us.materno) nombre, ds.siglas,ds.fOficio FROM sia_Volantes vo INNER JOIN sia_areas ar on vo.idTurnado= ar.idArea INNER JOIN sia_usuarios us on ar.idEmpleadoTitular=us.idEmpleado INNER JOIN sia_PuestosJuridico pj on us.idEmpleado=pj.rpe INNER JOIN sia_DocumentosSiglas ds on vo.idVolante = ds.idVolante WHERE vo.idVolante='$idVolante'";

$db=conecta();
$date=consultaRetorno($sql, $db);

$Nombreela=$date[0]['juridico'];
$nombrecon=$date[0]['nombre'];
$sig=$date[0]['siglas'];


$fecha=explode('-',$date[0]['fOficio']);
//var_dump($fecha);
$mes=mes(intval($fecha[1]));



$tbl = <<<EOD
  <table cellspacing="0" cellpadding="0" border="0">
    <tr><td colspan="6" align="right">Ciudad de México, $fecha[2] de $mes de $fecha[0]<br><br></td></tr>  
  </table>
EOD;


$pdf->writeHTML($tbl, true, false, false, false, '');


// -----------------------------------------------------------------------------

$tbl = <<<EOD
<table cellspacing="0" cellpadding="0" border="0">
 
 <tr>
  <td align="center"><b>REVISÓ</b></td>
  <td align="center"><b>AUTORIZO</b></td>
 </tr>
 <tr>
  <td align="center"><b><br><br><br><br><br>{$nombrecon}</b></td>
  <td align="center"><b><br><br><br><br><br>DR. IVAN DE JESÚS OLMOS CANSINO</b></td>
 </tr>
  <tr>
  <td align="center"><b>{$Nombreela}</b></td>
  <td align="center"><b>DIRECTOR GENERAL DE ASUNTOS JURIDICOS</b></td>
 </tr>

</table>
EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');


// -----------------------------------------------------------------------------

$tbl = <<<EOD
<table cellspacing="0" cellpadding="0" border="">
 
 <tr>
  <td align="center"><br><br><br><br><b>ELABORÓ</b></td>
  <td align="center"><br><br><br><br><b>ELABORÓ</b></td>
 </tr>
 <tr>
  <td align="center"><b><br><br><br><br><br>LIC. ROGELIO COHEN RAMIREZ</b></td>
  <td align="center"><b><br><br><br><br><br>DR. IVAN DE JESÚS OLMOS CANSINO</b></td>
 </tr>
  <tr>
  <td align="center"><b>DIRECTOR DE INTERPRETACIÓN JURÍDICA Y PROMOCIÓN DE ACCIONES</b></td>
  <td align="center"><b>DIRECTOR GENERAL DE ASUNTOS JURIDICOS</b></td>
 </tr>

</table>
EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');


// -----------------------------------------------------------------------------
/*
$tbl = <<<EOD
<table cellspacing="0" cellpadding="0" border="">
 
 <tr>
  <td align="center"><br><br><br><br><b>ELABORÓ</b></td>
  <td></td>
 </tr>
 <tr>
  <td align="center"><b><br><br><br><br><br><br>LIC. ROGELIO COHEN RAMIREZ</b></td>
 </tr>
  <tr>
  <td align="center"><b>DIRECTOR DE INTERPRETACIÓN JURÍDICA Y PROMOCIÓN DE ACCIONES</b></td>
  </tr>

</table>
EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');
*/

// -----------------------------------------------------------------------------

$tbl = <<<EOD
  <table cellspacing="0" cellpadding="0" border="0">
    <tr><td colspan="6" align="left">{$sig}<br><br></td>
    <td><br><b>Ref. ACF-</b></td></tr>  
  </table>
EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');
// -----------------------------------------------------------------------------
//Close and output PDF document
$pdf->Output('IRAC', 'I');

//============================================================+
// END OF FILE
//============================================================+