window.addEventListener("DOMContentLoaded", ()=> {
    var game = document.getElementById('game');
    var bullets = [];
    var enemies = [];
    var lastBulletTime = Date.now();
    var tiempo = document.getElementById("tiempo");
    var temporizador = 0;
    var contador = 0;
    let juegoActivo = true;
    var formulario = document.getElementById('formula');

    var ship = document.getElementById('ship');
    ship.style.left = '10px';
    ship.style.bottom = '10px'
    var topPantalla = ship.offsetTop;


    /*
        Evento que median la escucha (keydown) detecta la pulsacion de una tecla y mueve el objeto sumando o restando en la posicion x o y,
        o dispara una bala que es creada mediante un (createElement(div), la posiciona en el centro de la nave y la añade a mi pantalla de juego (game).
        Ademas me detecta con un (date.now) me detecta el tiempo que ha pasado desde que he disparado entre bala y bala para evitar el spam de las balas(bullet).
    */
   
    const accionesTecla = {
        'a': () => moverIzquierda(),
        'd': () => moverDerecha(),
        'w': () => moverArriba(),
        's': () => moverAbajo(),
        ' ': () => disparar()
    };

    // Agrega event listener para el evento 'keydown'
    
        document.addEventListener('keydown', (event) => {
            if (juegoActivo) {
                const teclaPresionada = event.key;
                if (teclaPresionada in accionesTecla) {
                accionesTecla[teclaPresionada]();
                }
            }
        });
    
  // Funciones para cada acción
    function moverIzquierda() {
        if (parseInt(ship.style.left) > 0) {
        ship.style.left = (parseInt(ship.style.left) - 10) + 'px';
        }
    }
  
    function moverDerecha() {
        if (parseInt(ship.style.left) + ship.offsetWidth < game.offsetWidth) {
        ship.style.left = (parseInt(ship.style.left) + 10) + 'px';
        }
    }
  
    function moverArriba() {
        if (parseInt(ship.style.bottom) + ship.offsetHeight < game.offsetHeight) {
        ship.style.bottom = (parseInt(ship.style.bottom) + 10) + 'px';
        }
    }
  
    function moverAbajo() {
        if (parseInt(ship.style.bottom) > 0) {
        ship.style.bottom = (parseInt(ship.style.bottom) - 10) + 'px';
        }
    }
  
    function disparar() {
        if (juegoActivo) {
            var now = Date.now();
            if (now - lastBulletTime >= 300) {
                var bullet = document.createElement('div');
                bullet.className = 'bullet';
                positionLeft = ship.offsetLeft;
                bullet.style.left = (parseInt(positionLeft) + 17.5) + 'px';
                positionTop = ship.offsetTop;
                bullet.style.top = (positionTop - 10) + 'px';
                game.appendChild(bullet);
                bullets.push(bullet);
                lastBulletTime = now;
            }
        }
    }

    /*
        Funcion de intervalo que se ejecuta cada 100ms.
        Esta funcion es un bucle forEach del array Bullets que mueve las balas con respecto a su posicion en (top) y detecta si sale una bala del borde
        de mi pantalla de juego (game) y borra la bala de la pantalla y de la array de bullets.

        En el segundo bucle hace la funcion de colision de las balas con los enemigos  en caso de que se toquen y el resultado sea (True),
        elimina la bala y el enemigo tanto de la pantalla como de las arrays que contienen las ballas(bullets) y los enemigos(enemies).
    */
        setInterval(function() {
            if (juegoActivo) {
                bullets.forEach(function(bullet) {
                bullet.style.top = (parseInt(bullet.style.top) - 5) + 'px';
                
                if (parseInt(bullet.style.bottom) > 600) {
                    bullet.parentNode.removeChild(bullet);
                    var index = bullets.indexOf(bullet);
                    bullets.splice(index, 1);
                }

                enemies.forEach(function(enemy) {
                    if (collision2(bullet, enemy)) {
                        bullet.parentNode.removeChild(bullet);
                        enemy.parentNode.removeChild(enemy);
                        var index = bullets.indexOf(bullet);
                        bullets.splice(index, 1);
                        index = enemies.indexOf(enemy);
                        enemies.splice(index, 1);
                        contador++;
                        document.getElementById("valor").textContent="Puntuación: "+contador;
                    }
                });
            });
        }}, 7);

        /*
            Funcion de intervalo que se ejecuta cada 2000ms.
            Funcion que genera los enemigos (img) le asigna la clase y la imagen que es. Luego lo genera dentro de mi pestaña game en top 0px para que aparezca arriba
            y genera con el math ramdon un numero aleatorio para el eje x. Luego lo implementa en el lienzo (Game)
        */
        var generaEnemigo = setInterval(function() {
            var enemy = document.createElement('img');
            enemy.className = 'enemy';
            enemy.src = './imagenes/enemigo.png';
            enemy.style.left = Math.random() * (game.offsetWidth - 30) + 'px';
            enemy.style.top = '0px';
            game.appendChild(enemy);
            enemies.push(enemy);
        }, 2000);

        var movimientoEnemigo = setInterval(function() {
            enemies.forEach(function(enemy) {
                enemy.style.top = (parseInt(enemy.style.top) + 10) + 'px';
                if (parseInt(enemy.style.top) > game.offsetHeight) {
                    enemy.parentNode.removeChild(enemy);
                    var index = enemies.indexOf(enemy);
                    enemies.splice(index, 1);
                }
                if (collision2(ship, enemy)) {
                    derrota();
                    setTimeout(()=>{
                        location.reload();
                    }, 3000)
                }
            });
        }, 100);
 

        function derrota(){
            juegoActivo = false;
            let pPuntuacio = document.getElementById("putnuacion");
            let pTiempo = document.getElementById("tSobre");
            let contDerrota = document.getElementById("derrota");
            pTiempo.textContent = "Tiempo: " + temporizador + "s";
            pPuntuacio.textContent = "Puntuación: "+contador;
            contDerrota.style.display = "block";
            clearInterval(movimientoEnemigo);
            clearInterval(generaEnemigo);
        }

    function collision2(element1, element2) {
        // Obtener rectángulo delimitador para el primer elemento
        var rect1 = (element1 instanceof HTMLElement) ? element1.getBoundingClientRect() : element1;
        
        // Obtener rectángulo delimitador para el segundo elemento
        var rect2 = (element2 instanceof HTMLElement) ? element2.getBoundingClientRect() : element2;

        // Ajustar los valores para tener en cuenta los márgenes
        var marginX = 0;
        var marginY = 0;

        rect1.left -= marginX;
        rect1.right += marginX;
        rect1.top -= marginY;
        rect1.bottom += marginY;

        rect2.left -= marginX;
        rect2.right += marginX;
        rect2.top -= marginY;
        rect2.bottom += marginY;

        // Verificar la colisión
        return !(rect1.right < rect2.left || 
                rect1.left > rect2.right || 
                rect1.bottom < rect2.top || 
                rect1.top > rect2.bottom
        );     
    }

    setInterval(function(){
        tiempo.textContent= "Tiempo: " + temporizador + "s";
        temporizador++;
    }, 1000)

});