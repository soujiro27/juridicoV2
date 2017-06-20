  const $=require('jquery');
  var menu=function loadMenu(){
  
  var nUsr=localStorage.getItem("nUsr");
  var nCampana=localStorage.getItem("nCampana");
  

  if(nUsr!="" && nCampana!=""){    
    var sPanel ="";
    var nRenglon=0;
    var nTotal=0;
    var dato;
    
    $.ajax({
      type: 'GET',
      url: '/lstModulosByUsuarioCampana/' + nCampana,
      success: function(response) {
        var jsonData = JSON.parse(response);
             
        nTotal =jsonData.datos.length;
     
        for (var i = 0; i < nTotal; i++) {
          dato = jsonData.datos[i];
          //modulos.push(dato.tipo, dato.panel, dato.modulo);
          
          sPanel = dato.panel;
          document.getElementById(sPanel).style.display="block";
          
          sPanel = sPanel + "-UL";

          var ul = document.getElementById(sPanel);
            var li = document.createElement("li");            
              var ancla = document.createElement('a');              
              ancla.setAttribute('href', dato.liga);
                //PARA CARGAR UN ICONO
                var icono = document.createElement("li");
                icono.setAttribute("class", dato.icono);              
                ancla.appendChild(icono);               
                
                var texto = document.createTextNode( " " + dato.nombre);
                ancla.appendChild(texto);               
              nRenglon = nRenglon+1;              
            li.appendChild(ancla);
          ul.appendChild(li); 
        }
      },
      error: function(xhr, textStatus, error){
        alert('ERROR: En function cargarMenu(nCampana)  ->  statusText: ' + xhr.statusText + ' TextStatus: ' + textStatus + ' Error:' + error );
      }     
    });  
     }else{
    if(nCampana=="")alert("Debe establecer una CUENTA PÚBLICA como PREDETERMINADA. Por favor consulte con su administrador del sistema.");
  }



  

  $(".has_sub > a").click(function(e){
    e.preventDefault();
    var menu_li = $(this).parent("li");
    var menu_ul = $(this).next("ul");

    if(menu_li.hasClass("open")){
      menu_ul.slideUp(350);
      menu_li.removeClass("open")
    }
    else{
      $("#nav > li > ul").slideUp(350);
      $("#nav > li").removeClass("open");
      menu_ul.slideDown(350);
      menu_li.addClass("open");
    }
});
}


module.exports=menu;
