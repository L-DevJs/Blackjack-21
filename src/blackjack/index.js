  import _ from "underscore";
  
    let baraja = [],
      puntosJugadores = [];
  
    const TIPOS = ["C", "D", "H", "S"],
      TIPOSESPECIALES = ["A", "J", "Q", "K"];
  
    //Referencias HTML
    const btnPedir = document.querySelector("#btnPedir"),
      points = document.querySelectorAll("small"),
      btnNuevo = document.querySelector("#btnNuevo"),
      btnPlantar = document.querySelector("#btnPlantar"),
      secciones = document.querySelectorAll(".divCartas");
  
    //Iniciar game
    const iniciarGame = (numeroJugadores = 2) => {
      baraja = [];
      baraja = crearBaraja();
      puntosJugadores = [];
      alert("Nueva baraja Generada!")
      for (let i = 0; i < numeroJugadores; i++) {
        puntosJugadores.push(0);
      }
      points.forEach((element) => (element.innerText = 0));
      secciones.forEach((element) => (element.innerHTML = ""));
      btnPedir.disabled = false;
      btnPlantar.disabled = true;
    };
  
    //Creacion de la baraja
    const crearBaraja = () => {
      for (let i = 2; i <= 10; i++) {
        for (let tipo of TIPOS) {
          baraja.push(i + tipo);
        }
      }
  
      for (let especial of TIPOSESPECIALES) {
        for (let tipo of TIPOS) {
          baraja.push(especial + tipo);
        }
      }
  
      return _.shuffle(baraja);
    };
  
    //Pedir carta
    const pedirCarta = () => {
      return baraja.length === 0
        ? alert("No hay cartas en la baraja")
        : baraja.pop();
    };
  
    //Asignar valor a las cartas
    const valorCarta = (carta) => {
      const valor = carta.substring(0, carta.length - 1);
      return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
    };
  
    //acumularPuntajes
    const puntajes = (numeroPlayer, carta) => {
      puntosJugadores[numeroPlayer] += valorCarta(carta);
      points[numeroPlayer].innerText = puntosJugadores[numeroPlayer];
      return puntosJugadores[numeroPlayer];
    };
  
    //Creacion de carta
    const crearCarta = (carta, jugador) => {
      const images = document.createElement("img");
      images.classList.add("carta");
      images.src = `assets/cartas/${carta}.png`;
      secciones[jugador].appendChild(images);
    };
  
    //verificar ganador
    const winner = () => {
      setTimeout(() => {
        const [puntosPlayer, puntosComputadora] = puntosJugadores;
        if (puntosPlayer <= 21 && puntosComputadora > 21) {
          alert("Player Winner");
        } else if (puntosComputadora <= 21 && puntosComputadora > puntosPlayer) {
          alert("Bot Winner");
        } else if (puntosComputadora === puntosPlayer) {
          alert("Empate");
        }
      }, 10);
    };
  
    //validar turno del bot
    const changeBot = (puntosPlayers) => {
      setTimeout(() => {
        if (puntosPlayers > 21) {
          btnPedir.disabled = true;
          btnPlantar.disabled = true;
          turnoBot(puntosPlayers);
        } else if (puntosPlayers === 21) {
          btnPedir.disabled = true;
          btnPlantar.disabled = true;
          turnoBot(puntosPlayers);
        }
      }, 10);
    };
  
    //Turno del bot
    const turnoBot = (puntosMinimos) => {
      do {
        const carta = pedirCarta();
        puntajes(1, carta);
        crearCarta(carta, 1);
  
        if (puntosMinimos > 21) {
          alert("Bot Winner");
          break;
        }
      } while (puntosJugadores[1] < puntosMinimos && puntosMinimos <= 21);
  
      winner();
    };
  
    //Eventos
    btnPedir.addEventListener("click", () => {
      btnPlantar.disabled = false;
      const carta = pedirCarta();
      const puntosPlayer = puntajes(0, carta);
      crearCarta(carta, 0);
      changeBot(puntosPlayer);
    });
  
    btnPlantar.addEventListener("click", () => {
      btnPedir.disabled = true;
      btnPlantar.disabled = true;
      turnoBot(puntosJugadores[0]);
    });
  
    btnNuevo.addEventListener("click", () => {
      iniciarGame();
    });

  