# 🇨🇴 Colombiapoly

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FElGuillers%2FColombiapoly)
![Java](https://img.shields.io/badge/Java-11%2B-orange.svg)
![Web](https://img.shields.io/badge/Web-HTML5%20%7C%20CSS3%20%7C%20JS-yellow.svg)
![Paradigm](https://img.shields.io/badge/Paradigm-OOP-blue.svg)
![Hosting](https://img.shields.io/badge/Deploy-Vercel-black.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

> **Colombiapoly** es una adaptación del clásico juego de mesa Monopoly desarrollada con lógica central en **Java (Programación Orientada a Objetos)** y una **interfaz web interactiva** moderna lista para desplegar en **Vercel** o **GitHub Pages**. Ambientado 100% en la cultura, ciudades y economía de **Colombia**.

---

## 🌐 Demo en Vivo

Puedes probar la versión web en línea sin instalar nada y desde cualquier dispositivo (PC, tablet o móvil):

👉 **[Jugar Colombiapoly en Vivo](https://colombiapoly.vercel.app)** *(o en tu URL de Vercel)*

---

## ✨ Características Principales

- **Multijugador:** Partidas de 2 a 4 jugadores con avatares temáticos (🚗 Chiva, ☕ Café, 🥑 Aguacate, 🦅 Cóndor).
- **Economía Colombiana:** Moneda en Pesos Colombianos (COP) con capital inicial de **$15.000.000 COP** por jugador.
- **Tablero Realista de 40 Casillas:**
  - **Ciudades y Regiones:** Bogotá (Parque 93, Centro Histórico), Medellín (El Poblado, Laureles), Cartagena (Bocagrande), Cali, Bucaramanga, San Andrés, Santa Marta, Pasto, Leticia, Quibdó, entre otras.
  - **Sistemas de Transporte:** Transmilenio, Metro de Medellín, MIO y Transmetro.
  - **Servicios Públicos:** EPM (Energía) y Empresa de Acueducto.
  - **Casillas Especiales:** SALIDA (+ $2.000.000 COP al dar la vuelta), Impuestos (Renta y Lujo), Casualidad, Arca Comunal y Cárcel ("La Picota").
- **Mecánica de Dados:** Lanzamiento de 2 dados con animaciones y regla de dados dobles (turno extra).
- **Gestión Inmobiliaria:** Compra de propiedades y cobro automático de rentas a rivales.
- **Efectos de Sonido:** Audio sintetizado con la Web Audio API (100% nativo, sin dependencias externas).

---

## 🏛️ Arquitectura del Proyecto

El proyecto implementa principios de **Clean Code**, **Separación de Responsabilidades** y **POO**:

```
Colombiapoly/
├── src/                             # LÓGICA DE NEGOCIO EN JAVA
│   ├── Main.java                    # Punto de entrada consola
│   └── com/colombiapoly/
│       ├── Juego.java               # Controlador de partida en consola
│       └── modelo/
│           ├── Casilla.java         # Modelo de casilla (Enum, compra, renta)
│           ├── Dado.java            # Aleatoriedad y tiradas
│           ├── Jugador.java         # Estado, dinero, posición y cárcel
│           └── Tablero.java         # Arreglo circular de 40 casillas
│
├── index.html                       # INTERFAZ WEB (HTML5 semántico)
├── style.css                        # ESTILOS MODERNOS (Responsive, tema oscuro)
├── app.js                           # CONTROLADOR WEB (ES6 OOP que replica Java)
├── vercel.json                      # CONFIGURACIÓN PARA VERCEL
└── README.md
```

### Correspondencia de Clases (Java ↔ Web)

| Concepto POO | Clase en Java (`src/`) | Implementación Web (`app.js`) |
|---|---|---|
| **Tablero** | `com.colombiapoly.modelo.Tablero` | `class Tablero`: Administra las 40 casillas colombianas |
| **Casilla** | `com.colombiapoly.modelo.Casilla` | `class Casilla`: Propiedades, precios, renta y dueño |
| **Jugador** | `com.colombiapoly.modelo.Jugador` | `class Jugador`: Saldo COP, avatar, cárcel y activos |
| **Dado** | `com.colombiapoly.modelo.Dado` | `Math.random()` con animación y regla de dados dobles |
| **Juego** | `com.colombiapoly.Juego` | `class JuegoWeb`: Orquestador de turnos, UI y eventos |

---

## 🚀 Despliegue en Vercel (En 1 Minuto)

1. Ve a [Vercel](https://vercel.com) e inicia sesión con tu cuenta de **GitHub**.
2. Haz clic en **"Add New..."** ➡️ **"Project"**.
3. Selecciona tu repositorio **`Colombiapoly`** y haz clic en **Import**.
4. Deja la configuración por defecto y haz clic en **Deploy**.
5. ¡Listo! Vercel te dará una URL pública gratuita (ej. `https://colombiapoly-xxx.vercel.app`) para compartir con reclutadores.

---

## 💻 Ejecución Local

### Opción A: Modo Web (Navegador)
Simplemente abre el archivo `index.html` en cualquier navegador web o usa una extensión como *Live Server* en VS Code.

### Opción B: Modo Consola (Java Terminal)
```bash
# Compilar clases
javac -encoding UTF-8 -d bin src/com/colombiapoly/modelo/*.java src/com/colombiapoly/*.java src/Main.java

# Ejecutar
java -cp bin Main
```

---

## 👤 Autor

Desarrollado por **[Guillermo](https://github.com/ElGuillers)**.  
*Demostración de habilidades en Java (POO), JavaScript moderno y despliegue continuo en la nube.*
