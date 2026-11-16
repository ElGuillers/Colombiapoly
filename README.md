# 🇨🇴 Colombiapoly — El Juego de Bienes Raíces de Colombia

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FElGuillers%2FColombiapoly)
[![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.java.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **Colombiapoly** es una adaptación temática inspirada en el clásico Monopoly, ambientada en las regiones, transporte y cultura de Colombia. Diseñado con una sólida arquitectura **Orientada a Objetos (POO)** en **Java** y portado a una **versión web interactiva (HTML5 / CSS3 / ES6+)** optimizada para despliegue instantáneo en **Vercel**.

---

## 🚀 Demostración en Línea

Accede a la versión web directamente en tu navegador (sin necesidad de instalaciones):

👉 **[Jugar Colombiapoly en Vercel](https://colombiapoly.vercel.app)** *(o el enlace generado en tu despliegue)*

---

## 🎯 Características Principales

- 👥 **Partidas Multijugador Local (2 a 4 jugadores):** Asignación de nombres, colores distintivos y avatares personalizados (💼, ☕, 🌺, 🐆).
- 💰 **Economía Realista en COP:**
  - Saldo inicial de **$15.000.000 COP** por jugador.
  - Bono de **+$2.000.000 COP** cada vez que se pasa o cae en la casilla **SALIDA**.
- 🗺️ **Tablero Completo de 40 Casillas:**
  - **Ciudades y Regiones:** Desde Quibdó y Leticia hasta sectores exclusivos de Medellín (El Poblado, Laureles), Cartagena (Bocagrande) y Bogotá (Zona Rosa, Centro Histórico).
  - **Transporte Público Nacional:** Estaciones de *TransMilenio*, *Metro de Medellín*, *MIO* y *Transmetro*.
  - **Servicios Públicos:** *EPM (Energía)* y *Empresa de Acueducto*.
  - **Instituciones y Casillas Especiales:** *La Picota* (Cárcel / De Visita), *Casualidad*, *Arca Comunal* e impuestos de la *DIAN*.
- 🎲 **Mecánica de Dados:** Doble turno por sacar dados iguales (dobles).
- 🔊 **Efectos de Audio Nativos:** Síntesis sonora mediante la **Web Audio API** (sin dependencias ni librerías externas).
- 📱 **Diseño Responsivo y Moderno:** Interfaz estilizada con Glassmorphism, paneles de estado en tiempo real, registro de eventos (*log*) y visualización detallada de cada propiedad.

---

## 🏗️ Arquitectura y Principios de Diseño

El proyecto cuenta con dos implementaciones sincronizadas que demuestran principios de ingeniería de software y programación orientada a objetos (POO):

### 1. Modelo de Dominio (Java & JavaScript)
```
┌─────────────────────────────────────────────────────────────┐
│                            Juego                            │
│  - Controla el flujo de turnos, estado global y finalización │
└──────────────────────────────┬──────────────────────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
┌───────────────────────┐             ┌───────────────────────┐
│        Tablero        │             │        Jugador        │
│  - 40 Casillas        │             │  - Nombre, Dinero COP │
│  - Indexación circular│             │  - Posición, Propied. │
└───────────┬───────────┘             │  - Estado bancarrota  │
            ▼                         └───────────────────────┘
┌───────────────────────┐
│        Casilla        │
│  - Nombre, Tipo       │
│  - Precio, Renta      │
│  - Propietario        │
└───────────────────────┘
```

- **Separación de Responsabilidades (SRP):** Cada clase (`Casilla`, `Tablero`, `Jugador`, `Dado`, `Juego`) encapsula únicamente su lógica de dominio.
- **Acoplamiento Bajo:** El modelo de reglas de negocio en Java se transfiere limpiamente a clases modernas en ES6 (`app.js`) para la vista web.

---

## 📂 Estructura del Repositorio

```bash
Colombiapoly/
├── src/                          # Implementación Core en Java (POO)
│   ├── Main.java                 # Punto de entrada de consola
│   └── com/colombiapoly/
│       ├── Juego.java            # Controlador del flujo de juego
│       └── modelo/
│           ├── Casilla.java      # Modelado de casillas y tipos
│           ├── Dado.java         # Generador de tiradas aleatorias
│           ├── Jugador.java      # Estado financiero e inventario
│           └── Tablero.java      # Configuración de las 40 casillas
├── index.html                    # Interfaz web interactiva
├── style.css                     # Estilos modernos, diseño responsive y temas
├── app.js                        # Lógica del cliente, audio y renderizado dinámico
├── vercel.json                   # Configuración para despliegue en Vercel
└── README.md                     # Documentación del proyecto
```

---

## 💻 Cómo Ejecutar el Proyecto

### Opción A: Versión Web (Vía Navegador)
No requiere instalación de compiladores ni frameworks pesados:
1. Clona el repositorio:
   ```bash
   git clone https://github.com/ElGuillers/Colombiapoly.git
   cd Colombiapoly
   ```
2. Abre el archivo `index.html` en tu navegador preferido, o ejecútalo con cualquier servidor local (como la extensión *Live Server* de VS Code o `npx serve .`).

---

### Opción B: Versión de Consola (Java)
Para compilar y correr la versión orientada a objetos en terminal:

1. Asegúrate de tener instalado **JDK 11+**:
   ```bash
   javac -version
   ```
2. Compila los archivos fuente:
   ```bash
   javac -d bin src/Main.java src/com/colombiapoly/Juego.java src/com/colombiapoly/modelo/*.java
   ```
3. Ejecuta la aplicación:
   ```bash
   java -cp bin Main
   ```

---

## ☁️ Despliegue en la Nube (Vercel)

El proyecto incluye el archivo `vercel.json` optimizado para desplegarse como sitio estático sin configuraciones complejas:

### Método 1: Desde el Dashboard de Vercel (Recomendado)
1. Entra a [vercel.com](https://vercel.com/) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **"Add New..."** ➔ **"Project"**.
3. Selecciona el repositorio **`Colombiapoly`**.
4. Deja la configuración por defecto (Framework Preset: *Other*) y haz clic en **Deploy**.
5. ¡Listo! En segundos obtendrás tu URL pública `https://tu-proyecto.vercel.app` para compartir en tu currículum o portafolio.

### Método 2: Vía Vercel CLI
```bash
# Instalar Vercel CLI globalmente
npm i -g vercel

# Iniciar despliegue
vercel
```

---

## 🛠️ Tecnologías Utilizadas

- **Java 17+:** Programación Orientada a Objetos pura, colecciones y lógica de consola.
- **JavaScript Moderno (ES6+):** Clases, manipulación del DOM y gestión de eventos.
- **Web Audio API:** Generación de audio procedural en tiempo de ejecución.
- **HTML5 Semántico & CSS3:** CSS Grid, Flexbox, variables personalizadas y diseño adaptativo.
- **Vercel:** Plataforma de hosting en el Edge para despliegue continuo (CI/CD con GitHub).

---

## 👤 Autor

Desarrollado por **Guillermo** ([@ElGuillers](https://github.com/ElGuillers))  
- 💼 [LinkedIn](https://linkedin.com) *(añade tu enlace)*  
- 🐙 [GitHub](https://github.com/ElGuillers)

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
