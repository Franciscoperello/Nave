

function pon_pantalla_completa() {
    if (( document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)) {
            if (document.documentElement.requestFullScreen) {
                document.documentElement.requestFullScreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullScreen) {
                document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        }
    }
    
    
    
function quita_pantalla_completa(){
    if (document.cancelFullScreen) {
        document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    }
}

function estiloPantalla(){
    var imagen = document.getElementById("icoPantalla");

    
    if (imagen.src.endsWith("/pComple.png")) {
        imagen.src = "/imagenes/pNComple.png";
        window.quita_pantalla_completa();

    } else if(imagen.src.endsWith("/pNComple.png")){
        imagen.src = "/imagenes/pComple.png"
        window.pon_pantalla_completa();
    }
}

function mostraeModal() {
    var modal = document.getElementById('miModal');
    modal.style.display = 'block';
}

function closeModal() {
    var modal = document.getElementById('miModal');
    modal.style.display = 'none';
}
