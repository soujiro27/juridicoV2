<?php

$header='
<nav class="navbar navbar-default navbar-fixed-top">
		<div class="container-fluid">
			<nav class="collapse navbar-collapse bs-navbar-collapse" role="navigation">
				<div class="col-xs-12">
					<div class="col-xs-2"><a href="/"><img src="../img/logo-top.png"></a></div>
					<div class="col-xs-2">
						<ul class="nav navbar-nav "><li><a href="#"><i class="fa fa-th-list"></i> '. $_SESSION["sCuentaActual"].'</a></li></ul>
					</div>
					<div class="col-xs-3"><h2>'.$tipo . $nombre.'</h2></a></div>
					<!--
					<div class="col-xs-2">
						<ul class="nav navbar-nav "><li><a href="./notificaciones"><i class="fa fa-envelope-o"></i> Usted tiene <span class="badge">0</span> Mensaje(s).</a></li></ul>
					</div>
					-->
					<div class="col-xs-2">
					 <ul class="nav navbar-nav "><li><a href="./notificaciones"><i class="fa fa-envelope-o"></i> Tiene <span><input type="text"  class="noti" id="txtNoti"></input></span> Mensaje(s).</a></li></ul>
					</div>

					<div class="col-xs-3">
						<ul class="nav navbar-nav  pull-right">
							<li class="dropdown pull-right">
								<a data-toggle="dropdown" class="dropdown-toggle" href="/">
									<i class="fa fa-user"></i> <b>C. '. $_SESSION["sUsuario"] .'</b> <b class="caret"></b>
								</a>
								<ul class="dropdown-menu">
								  <li><a href="/perfil"><i class="fa fa-user"></i> Perfil</a></li>
								  <li><a href="/cerrar"><i class="fa fa-sign-out"></i> Salir</a></li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	</nav>';

echo $header;

 ?>
