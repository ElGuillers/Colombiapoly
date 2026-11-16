/**
 * COLOMBIAPOLY - LÓGICA DE JUEGO WEB (ES6 + POO)
 * Réplica de la arquitectura de clases Java:
 * - Tablero, Casilla, Jugador, Dado, Juego
 */

// Utilidad de formato de moneda COP
const formatCOP = (num) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(num);
};

// ============================================================================
// AUDIO SINTETIZADO (Web Audio API - 100% offline y sin archivos externos)
// ============================================================================
class SoundEffects {
  constructor() {
    this.enabled = true;
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  playTone(freq, type = 'sine', duration = 0.15, volume = 0.15) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio fallback silencioso
    }
  }

  dice() {
    this.playTone(320, 'triangle', 0.08, 0.2);
    setTimeout(() => this.playTone(440, 'triangle', 0.08, 0.2), 90);
  }

  buy() {
    this.playTone(523.25, 'sine', 0.1, 0.2);
    setTimeout(() => this.playTone(659.25, 'sine', 0.1, 0.2), 110);
    setTimeout(() => this.playTone(783.99, 'sine', 0.25, 0.25), 220);
  }

  pay() {
    this.playTone(280, 'sawtooth', 0.15, 0.15);
    setTimeout(() => this.playTone(220, 'sawtooth', 0.25, 0.15), 120);
  }

  salida() {
    this.playTone(440, 'sine', 0.1, 0.2);
    setTimeout(() => this.playTone(554.37, 'sine', 0.1, 0.2), 100);
    setTimeout(() => this.playTone(659.25, 'sine', 0.1, 0.2), 200);
    setTimeout(() => this.playTone(880, 'sine', 0.3, 0.25), 300);
  }

  jail() {
    this.playTone(150, 'sawtooth', 0.3, 0.3);
  }
}

const sounds = new SoundEffects();

// ============================================================================
// MODELOS DEL JUEGO (Reflejando el paquete com.colombiapoly.modelo)
// ============================================================================

const TipoCasilla = {
  SALIDA: 'SALIDA',
  PROPIEDAD: 'PROPIEDAD',
  TRANSPORTE: 'TRANSPORTE',
  SERVICIO: 'SERVICIO',
  SUERTE: 'SUERTE',
  ARCA_COMUNAL: 'ARCA_COMUNAL',
  CARCEL: 'CARCEL',
  IR_A_CARCEL: 'IR_A_CARCEL',
  IMPUESTO: 'IMPUESTO',
  PARADA_LIBRE: 'PARADA_LIBRE'
};

class Casilla {
  constructor(nombre, tipo, precioCompra = 0, precioRenta = 0, colorClass = '') {
    this.nombre = nombre;
    this.tipo = tipo;
    this.precioCompra = precioCompra;
    this.precioRenta = precioRenta;
    this.colorClass = colorClass;
    this.propietario = null;
  }

  esComprable() {
    return (
      (this.tipo === TipoCasilla.PROPIEDAD ||
        this.tipo === TipoCasilla.TRANSPORTE ||
        this.tipo === TipoCasilla.SERVICIO) &&
      this.propietario === null
    );
  }
}

class Jugador {
  constructor(nombre, saldoInicial, token, color) {
    this.nombre = nombre;
    this.saldo = saldoInicial;
    this.posicionActual = 0;
    this.estaEnCarcel = false;
    this.token = token;
    this.color = color;
    this.propiedades = [];
  }

  mover(pasos) {
    let pasoSalida = false;
    this.posicionActual += pasos;
    if (this.posicionActual >= 40) {
      this.posicionActual -= 40;
      this.recibirDinero(2000000);
      pasoSalida = true;
    }
    return pasoSalida;
  }

  pagar(cantidad) {
    this.saldo -= cantidad;
  }

  recibirDinero(cantidad) {
    this.saldo += cantidad;
  }

  irACarcel() {
    this.estaEnCarcel = true;
    this.posicionActual = 10;
  }

  salirDeCarcel() {
    this.estaEnCarcel = false;
  }
}

class Tablero {
  constructor() {
    this.casillas = [];
    this.inicializarTablero();
  }

  inicializarTablero() {
    // 0 - 9
    this.casillas[0] = new Casilla('SALIDA', TipoCasilla.SALIDA, 0, 0, 'color-especial');
    this.casillas[1] = new Casilla('Quibdó', TipoCasilla.PROPIEDAD, 600000, 20000, 'color-marron');
    this.casillas[2] = new Casilla('Arca Comunal', TipoCasilla.ARCA_COMUNAL, 0, 0, 'color-especial');
    this.casillas[3] = new Casilla('Leticia', TipoCasilla.PROPIEDAD, 600000, 40000, 'color-marron');
    this.casillas[4] = new Casilla('Impuesto de Renta', TipoCasilla.IMPUESTO, 0, 0, 'color-especial');
    this.casillas[5] = new Casilla('Estación Transmilenio', TipoCasilla.TRANSPORTE, 2000000, 250000, 'color-transporte');
    this.casillas[6] = new Casilla('Pasto', TipoCasilla.PROPIEDAD, 1000000, 60000, 'color-azul-claro');
    this.casillas[7] = new Casilla('Casualidad', TipoCasilla.SUERTE, 0, 0, 'color-especial');
    this.casillas[8] = new Casilla('Popayán', TipoCasilla.PROPIEDAD, 1000000, 60000, 'color-azul-claro');
    this.casillas[9] = new Casilla('Riohacha', TipoCasilla.PROPIEDAD, 1200000, 80000, 'color-azul-claro');

    // 10 - 19
    this.casillas[10] = new Casilla('La Picota (Cárcel / Visita)', TipoCasilla.CARCEL, 0, 0, 'color-especial');
    this.casillas[11] = new Casilla('Pereira', TipoCasilla.PROPIEDAD, 1400000, 100000, 'color-rosa');
    this.casillas[12] = new Casilla('Empresa de Energía (EPM)', TipoCasilla.SERVICIO, 1500000, 150000, 'color-servicio');
    this.casillas[13] = new Casilla('Armenia', TipoCasilla.PROPIEDAD, 1400000, 100000, 'color-rosa');
    this.casillas[14] = new Casilla('Manizales', TipoCasilla.PROPIEDAD, 1600000, 120000, 'color-rosa');
    this.casillas[15] = new Casilla('Estación Metro Medellín', TipoCasilla.TRANSPORTE, 2000000, 250000, 'color-transporte');
    this.casillas[16] = new Casilla('Ibagué', TipoCasilla.PROPIEDAD, 1800000, 140000, 'color-naranja');
    this.casillas[17] = new Casilla('Arca Comunal', TipoCasilla.ARCA_COMUNAL, 0, 0, 'color-especial');
    this.casillas[18] = new Casilla('Neiva', TipoCasilla.PROPIEDAD, 1800000, 140000, 'color-naranja');
    this.casillas[19] = new Casilla('Villavicencio', TipoCasilla.PROPIEDAD, 2000000, 160000, 'color-naranja');

    // 20 - 29
    this.casillas[20] = new Casilla('Parada Libre', TipoCasilla.PARADA_LIBRE, 0, 0, 'color-especial');
    this.casillas[21] = new Casilla('Bucaramanga', TipoCasilla.PROPIEDAD, 2200000, 180000, 'color-rojo');
    this.casillas[22] = new Casilla('Casualidad', TipoCasilla.SUERTE, 0, 0, 'color-especial');
    this.casillas[23] = new Casilla('Cúcuta', TipoCasilla.PROPIEDAD, 2200000, 180000, 'color-rojo');
    this.casillas[24] = new Casilla('Santa Marta', TipoCasilla.PROPIEDAD, 2400000, 200000, 'color-rojo');
    this.casillas[25] = new Casilla('Estación MIO', TipoCasilla.TRANSPORTE, 2000000, 250000, 'color-transporte');
    this.casillas[26] = new Casilla('Barranquilla', TipoCasilla.PROPIEDAD, 2600000, 220000, 'color-amarillo');
    this.casillas[27] = new Casilla('Empresa de Acueducto', TipoCasilla.SERVICIO, 1500000, 150000, 'color-servicio');
    this.casillas[28] = new Casilla('Cali', TipoCasilla.PROPIEDAD, 2600000, 220000, 'color-amarillo');
    this.casillas[29] = new Casilla('San Andrés', TipoCasilla.PROPIEDAD, 2800000, 240000, 'color-amarillo');

    // 30 - 39
    this.casillas[30] = new Casilla('¡Váyase a La Picota!', TipoCasilla.IR_A_CARCEL, 0, 0, 'color-especial');
    this.casillas[31] = new Casilla('Medellín - El Poblado', TipoCasilla.PROPIEDAD, 3000000, 260000, 'color-verde');
    this.casillas[32] = new Casilla('Medellín - Laureles', TipoCasilla.PROPIEDAD, 3000000, 260000, 'color-verde');
    this.casillas[33] = new Casilla('Arca Comunal', TipoCasilla.ARCA_COMUNAL, 0, 0, 'color-especial');
    this.casillas[34] = new Casilla('Cartagena - Bocagrande', TipoCasilla.PROPIEDAD, 3200000, 280000, 'color-verde');
    this.casillas[35] = new Casilla('Estación Transmetro', TipoCasilla.TRANSPORTE, 2000000, 250000, 'color-transporte');
    this.casillas[36] = new Casilla('Casualidad', TipoCasilla.SUERTE, 0, 0, 'color-especial');
    this.casillas[37] = new Casilla('Bogotá - Centro Histórico', TipoCasilla.PROPIEDAD, 3500000, 350000, 'color-azul-oscuro');
    this.casillas[38] = new Casilla('Impuesto de Lujo', TipoCasilla.IMPUESTO, 0, 0, 'color-especial');
    this.casillas[39] = new Casilla('Bogotá - Parque 93', TipoCasilla.PROPIEDAD, 4000000, 500000, 'color-azul-oscuro');
  }

  getCasilla(indice) {
    if (indice >= 0 && indice < 40) return this.casillas[indice];
    return null;
  }
}

// ============================================================================
// CONTROLADOR DEL JUEGO (com.colombiapoly.Juego)
// ============================================================================
class JuegoWeb {
  constructor() {
    this.tablero = new Tablero();
    this.jugadores = [];
    this.turnoIndex = 0;
    this.dadosTirados = false;
    this.dadosDobles = false;
    this.dadoFaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

    // Tokens y colores asignados a jugadores
    this.availableTokens = [
      { icon: '🚗', color: '#ef4444', name: 'Chiva / Carro' },
      { icon: '☕', color: '#3b82f6', name: 'Taza de Café' },
      { icon: '🥑', color: '#10b981', name: 'Aguacate' },
      { icon: '🦅', color: '#f59e0b', name: 'Cóndor' }
    ];

    this.initDOM();
  }

  initDOM() {
    // Configuración inicial de UI
    this.setupPlayerInputs(3);
    this.bindEvents();
  }

  setupPlayerInputs(count) {
    const container = document.getElementById('player-inputs-container');
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
      const defaultName = ['Camilo', 'Valentina', 'Santiago', 'Daniela'][i] || `Jugador ${i + 1}`;
      const token = this.availableTokens[i];

      const row = document.createElement('div');
      row.className = 'player-input-row';
      row.innerHTML = `
        <span class="player-token" style="color: ${token.color};">${token.icon}</span>
        <input type="text" id="p-name-${i}" value="${defaultName}" placeholder="Nombre Jugador ${i + 1}" maxlength="18">
      `;
      container.appendChild(row);
    }
  }

  bindEvents() {
    // Selección de cantidad de jugadores
    document.querySelectorAll('.btn-count').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.btn-count').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        const count = parseInt(e.target.dataset.count, 10);
        this.setupPlayerInputs(count);
      });
    });

    // Iniciar juego
    document.getElementById('btn-start-game').addEventListener('click', () => {
      this.iniciarPartida();
    });

    // Tirar dados
    document.getElementById('btn-roll-dice').addEventListener('click', () => {
      this.jugarTurno();
    });

    // Terminar turno
    document.getElementById('btn-end-turn').addEventListener('click', () => {
      this.pasarTurno();
    });

    // Comprar propiedad
    document.getElementById('btn-buy-property').addEventListener('click', () => {
      this.comprarPropiedadActual();
    });

    // Reiniciar
    document.getElementById('btn-restart').addEventListener('click', () => {
      if (confirm('¿Seguro que deseas reiniciar la partida?')) {
        location.reload();
      }
    });

    // Sonido toggle
    const btnSound = document.getElementById('btn-sound-toggle');
    btnSound.addEventListener('click', () => {
      sounds.enabled = !sounds.enabled;
      btnSound.textContent = sounds.enabled ? '🔊' : '🔇';
    });

    // Cerrar modal
    document.getElementById('btn-close-modal').addEventListener('click', () => {
      document.getElementById('modal-properties').classList.remove('active');
    });
  }

  iniciarPartida() {
    const inputs = document.querySelectorAll('.player-input-row input');
    this.jugadores = [];

    inputs.forEach((input, idx) => {
      const name = input.value.trim() || `Jugador ${idx + 1}`;
      const tokenInfo = this.availableTokens[idx];
      const jugador = new Jugador(name, 15000000, tokenInfo.icon, tokenInfo.color);
      this.jugadores.push(jugador);
    });

    // Cambiar de pantalla
    document.getElementById('setup-screen').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');

    this.renderBoard();
    this.renderDashboard();
    this.actualizarTurnoUI();

    this.log(`🏁 ¡Partida iniciada con ${this.jugadores.length} jugadores! Cada uno inicia con ${formatCOP(15000000)}.`, 'log-buy');
  }

  renderBoard() {
    const grid = document.getElementById('board-grid');
    grid.innerHTML = '';

    this.tablero.casillas.forEach((casilla, idx) => {
      const tileEl = document.createElement('div');
      tileEl.className = 'tile';
      tileEl.id = `tile-${idx}`;

      let priceHTML = '';
      if (casilla.precioCompra > 0) {
        priceHTML = `<span class="tile-price">${formatCOP(casilla.precioCompra)}</span>`;
      }

      tileEl.innerHTML = `
        <div class="tile-color-bar ${casilla.colorClass}"></div>
        <div class="tile-content">
          <span class="tile-index">#${idx}</span>
          <h4 class="tile-name">${casilla.nombre}</h4>
          ${priceHTML}
          <div class="tile-players-presence" id="tile-players-${idx}"></div>
        </div>
      `;

      // Clic para inspeccionar
      tileEl.addEventListener('click', () => {
        this.mostrarDetalleCasilla(casilla, idx);
      });

      grid.appendChild(tileEl);
    });

    this.actualizarPresenciaJugadores();
  }

  actualizarPresenciaJugadores() {
    // Limpiar presencia
    for (let i = 0; i < 40; i++) {
      const el = document.getElementById(`tile-players-${i}`);
      const tile = document.getElementById(`tile-${i}`);
      if (el) el.innerHTML = '';
      if (tile) tile.classList.remove('tile-current-player');
    }

    // Ubicar jugadores
    this.jugadores.forEach(j => {
      const container = document.getElementById(`tile-players-${j.posicionActual}`);
      if (container) {
        const span = document.createElement('span');
        span.textContent = j.token;
        span.title = j.nombre;
        container.appendChild(span);
      }
    });

    // Resaltar casilla del jugador activo
    const jugadorActivo = this.jugadores[this.turnoIndex];
    const tileActiva = document.getElementById(`tile-${jugadorActivo.posicionActual}`);
    if (tileActiva) {
      tileActiva.classList.add('tile-current-player');
    }
  }

  renderDashboard() {
    const dash = document.getElementById('players-dashboard');
    dash.innerHTML = '';

    this.jugadores.forEach((j, idx) => {
      const badge = document.createElement('div');
      badge.className = `player-badge ${idx === this.turnoIndex ? 'active-turn' : ''}`;
      badge.style.borderLeftColor = j.color;
      badge.innerHTML = `
        <span class="p-token">${j.token}</span>
        <div>
          <span class="p-name">${j.nombre}</span>
          <span class="p-money">${formatCOP(j.saldo)}</span>
        </div>
      `;
      badge.addEventListener('click', () => this.abrirModalPropiedades(j));
      dash.appendChild(badge);
    });
  }

  actualizarTurnoUI() {
    const jugador = this.jugadores[this.turnoIndex];
    document.getElementById('current-player-name').textContent = jugador.nombre;
    document.getElementById('current-player-avatar').textContent = jugador.token;
    document.getElementById('current-player-balance').textContent = formatCOP(jugador.saldo);

    document.getElementById('btn-roll-dice').disabled = this.dadosTirados;
    document.getElementById('btn-end-turn').disabled = !this.dadosTirados;

    this.actualizarPresenciaJugadores();
    this.renderDashboard();
    this.mostrarDetalleCasilla(this.tablero.getCasilla(jugador.posicionActual), jugador.posicionActual);
  }

  jugarTurno() {
    if (this.dadosTirados) return;

    sounds.dice();
    const die1El = document.getElementById('die-1');
    const die2El = document.getElementById('die-2');

    die1El.classList.add('rolling');
    die2El.classList.add('rolling');

    setTimeout(() => {
      die1El.classList.remove('rolling');
      die2El.classList.remove('rolling');

      const d1 = Math.floor(Math.random() * 6) + 1;
      const d2 = Math.floor(Math.random() * 6) + 1;
      const suma = d1 + d2;
      this.dadosDobles = (d1 === d2);

      die1El.querySelector('.die-face').textContent = this.dadoFaces[d1 - 1];
      die2El.querySelector('.die-face').textContent = this.dadoFaces[d2 - 1];

      const jugador = this.jugadores[this.turnoIndex];

      let msg = `${jugador.nombre} sacó ${d1} y ${d2} (Total: ${suma})`;
      if (this.dadosDobles) msg += ' ¡DADOS DOBLES! 🎲🎲';
      document.getElementById('dice-result-msg').textContent = msg;

      // Movimiento
      const pasoPorSalida = jugador.mover(suma);
      if (pasoPorSalida) {
        sounds.salida();
        this.log(`🚩 ${jugador.nombre} completó la vuelta y pasó por la SALIDA (+${formatCOP(2000000)}).`, 'log-go');
      }

      this.dadosTirados = true;
      this.evaluarCasillaActual(jugador);
      this.actualizarTurnoUI();
    }, 450);
  }

  evaluarCasillaActual(jugador) {
    const casilla = this.tablero.getCasilla(jugador.posicionActual);
    this.log(`📍 ${jugador.nombre} cayó en [${casilla.nombre}].`);

    if (casilla.tipo === TipoCasilla.IR_A_CARCEL) {
      sounds.jail();
      jugador.irACarcel();
      this.log(`🚨 ¡La policía atrapó a ${jugador.nombre}! Va directo a La Picota.`, 'log-jail');
      this.actualizarPresenciaJugadores();
      return;
    }

    if (casilla.tipo === TipoCasilla.IMPUESTO) {
      sounds.pay();
      const impuesto = casilla.nombre.includes('Lujo') ? 1000000 : 2000000;
      jugador.pagar(impuesto);
      this.log(`💸 ${jugador.nombre} pagó ${formatCOP(impuesto)} de impuesto.`, 'log-rent');
      return;
    }

    if (casilla.tipo === TipoCasilla.ARCA_COMUNAL || casilla.tipo === TipoCasilla.SUERTE) {
      // Evento casual
      const bono = (Math.random() > 0.5 ? 500000 : -300000);
      if (bono > 0) {
        jugador.recibirDinero(bono);
        this.log(`✨ ${casilla.nombre}: Premio de lotería local. Recibes ${formatCOP(bono)}.`, 'log-buy');
      } else {
        jugador.pagar(Math.abs(bono));
        this.log(`⚠️ ${casilla.nombre}: Arreglos en la vía pública. Pagas ${formatCOP(Math.abs(bono))}.`, 'log-rent');
      }
      return;
    }

    // Casillas de propiedad con dueño
    if (casilla.propietario && casilla.propietario !== jugador) {
      sounds.pay();
      const renta = casilla.precioRenta;
      jugador.pagar(renta);
      casilla.propietario.recibirDinero(renta);
      this.log(`🏷️ ${casilla.nombre} pertenece a ${casilla.propietario.nombre}. ${jugador.nombre} paga ${formatCOP(renta)} de renta.`, 'log-rent');
    }
  }

  comprarPropiedadActual() {
    const jugador = this.jugadores[this.turnoIndex];
    const casilla = this.tablero.getCasilla(jugador.posicionActual);

    if (!casilla.esComprable()) return;

    if (jugador.saldo < casilla.precioCompra) {
      alert('No tienes suficiente saldo para comprar esta propiedad.');
      return;
    }

    sounds.buy();
    jugador.pagar(casilla.precioCompra);
    casilla.propietario = jugador;
    jugador.propiedades.push(casilla);

    // Marcar en la casilla del tablero
    const tileEl = document.getElementById(`tile-${jugador.posicionActual}`);
    let ownerTag = tileEl.querySelector('.tile-owner-tag');
    if (!ownerTag) {
      ownerTag = document.createElement('div');
      ownerTag.className = 'tile-owner-tag';
      tileEl.querySelector('.tile-content').appendChild(ownerTag);
    }
    ownerTag.textContent = `${jugador.token} ${jugador.nombre}`;
    ownerTag.style.background = jugador.color;
    ownerTag.style.color = '#fff';

    this.log(`🏡 ¡${jugador.nombre} compró ${casilla.nombre} por ${formatCOP(casilla.precioCompra)}!`, 'log-buy');
    this.actualizarTurnoUI();
  }

  pasarTurno() {
    if (this.dadosDobles) {
      // Turno extra por dados dobles
      this.dadosTirados = false;
      this.dadosDobles = false;
      document.getElementById('dice-result-msg').textContent = '¡Tiraste dados dobles! Tienes un turno extra.';
      this.actualizarTurnoUI();
      return;
    }

    this.turnoIndex = (this.turnoIndex + 1) % this.jugadores.length;
    this.dadosTirados = false;
    this.dadosDobles = false;
    document.getElementById('dice-result-msg').textContent = 'Presiona para lanzar los dados';
    this.actualizarTurnoUI();
  }

  mostrarDetalleCasilla(casilla, indice) {
    if (!casilla) return;

    const jugadorActivo = this.jugadores[this.turnoIndex];
    document.getElementById('card-title').textContent = `#${indice} ${casilla.nombre}`;
    document.getElementById('card-type-tag').textContent = casilla.tipo;

    const strip = document.getElementById('card-color-strip');
    strip.className = `card-color-strip ${casilla.colorClass}`;

    const stats = document.getElementById('card-stats');
    const actions = document.getElementById('card-actions');
    const desc = document.getElementById('card-description');

    if (casilla.tipo === TipoCasilla.PROPIEDAD || casilla.tipo === TipoCasilla.TRANSPORTE || casilla.tipo === TipoCasilla.SERVICIO) {
      stats.style.display = 'flex';
      desc.textContent = `Propiedad de inversión comercial en Colombia. Genera renta automática cuando otros jugadores caen aquí.`;
      document.getElementById('stat-price').textContent = formatCOP(casilla.precioCompra);
      document.getElementById('stat-rent').textContent = formatCOP(casilla.precioRenta);
      document.getElementById('stat-owner').textContent = casilla.propietario ? `${casilla.propietario.token} ${casilla.propietario.nombre}` : 'Sin dueño (Disponible)';

      // Botón de compra solo si el jugador activo está en ella, no tiene dueño y tiró los dados
      if (casilla.esComprable() && jugadorActivo.posicionActual === indice && this.dadosTirados) {
        actions.style.display = 'block';
        const btnBuy = document.getElementById('btn-buy-property');
        btnBuy.textContent = `Comprar por ${formatCOP(casilla.precioCompra)} 🏠`;
        btnBuy.disabled = jugadorActivo.saldo < casilla.precioCompra;
      } else {
        actions.style.display = 'none';
      }
    } else {
      stats.style.display = 'none';
      actions.style.display = 'none';
      if (casilla.tipo === TipoCasilla.SALIDA) {
        desc.textContent = 'Punto de partida. Al dar una vuelta completa recibes $2.000.000 COP.';
      } else if (casilla.tipo === TipoCasilla.CARCEL) {
        desc.textContent = 'La Picota. Si estás de visita no pasa nada. Si caes aquí por sanción, pierdes turnos.';
      } else if (casilla.tipo === TipoCasilla.IR_A_CARCEL) {
        desc.textContent = '¡Sanción policial! Te trasladas de inmediato a La Picota sin cobrar salida.';
      } else if (casilla.tipo === TipoCasilla.IMPUESTO) {
        desc.textContent = 'Casilla de impuestos de la DIAN. Debes contribuir al fisco nacional.';
      } else {
        desc.textContent = 'Casilla especial de evento.';
      }
    }
  }

  abrirModalPropiedades(jugador) {
    document.getElementById('modal-player-title').innerHTML = `${jugador.token} Propiedades de ${jugador.nombre} (${formatCOP(jugador.saldo)})`;
    const list = document.getElementById('modal-properties-list');
    list.innerHTML = '';

    if (jugador.propiedades.length === 0) {
      list.innerHTML = '<p style="color: var(--text-muted); text-align: center;">Este jugador aún no tiene propiedades adquiridas.</p>';
    } else {
      jugador.propiedades.forEach(p => {
        const item = document.createElement('div');
        item.className = 'prop-card-item';
        item.innerHTML = `
          <div>
            <strong>${p.nombre}</strong>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${p.tipo}</div>
          </div>
          <div style="text-align: right;">
            <div style="color: var(--accent-green); font-family: monospace;">Renta: ${formatCOP(p.precioRenta)}</div>
          </div>
        `;
        list.appendChild(item);
      });
    }

    document.getElementById('modal-properties').classList.add('active');
  }

  log(mensaje, tipo = '') {
    const logContainer = document.getElementById('game-log');
    const entry = document.createElement('div');
    entry.className = `log-entry ${tipo}`;
    entry.textContent = mensaje;
    logContainer.prepend(entry);
  }
}

// Inicializar al cargar el DOM
window.addEventListener('DOMContentLoaded', () => {
  new JuegoWeb();
});
