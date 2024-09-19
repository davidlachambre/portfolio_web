$(document).ready(function(){
    $("#btn_nav_mobile").click(function(){
        $("#menu_nav_mobile").slideToggle("slow");
        $(this).toggleClass("btn_mobile_normal");
    });//Fin de CLICK.BOUTON-SLIDE
});//Fin de DOCUMENT.READY