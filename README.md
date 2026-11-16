# 🇨🇴 Colombiapoly

[![Run on Replit](https://replit.com/badge/github/ElGuillers/Colombiapoly)](https://replit.com/new/github/ElGuillers/Colombiapoly)
![Java](https://img.shields.io/badge/Java-11%2B-orange.svg)
![Paradigm](https://img.shields.io/badge/Paradigm-OOP-blue.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

> **Colombiapoly** es una adaptación del clásico juego de mesa Monopoly desarrollada en **Java**, ambientada completamente en la geografía, cultura y economía de **Colombia**. 

Diseñado bajo principios de **Programación Orientada a Objetos (POO)**, con una arquitectura modular y desacoplada que simula turnos de jugadores, lanzamiento de dados, compra de propiedades emblemáticas, cobro de alquileres, impuestos y visitas a la cárcel ("La Picota").

---

## 🎮 Jugar Ahora en la Nube (1 Clic)

Puedes probar el juego en vivo desde tu navegador sin instalar Java ni configurar entornos:

👉 **[Haz clic aquí para Ejecutar en Replit](https://replit.com/new/github/ElGuillers/Colombiapoly)**  
*(Presiona el botón verde **Run** al cargar para iniciar la partida en la terminal interactiva)*.

---

## ✨ Características Principales

- **Multijugador por consola:** Soporte para 2 a 4 jugadores por partida.
- **Economía Colombiana:** Transacciones en Pesos Colombianos (COP) con un saldo inicial de **$15.000.000 COP** por jugador.
- **Tablero Realista (40 Casillas):**
  - **Ciudades y Regiones:** Bogotá (Parque 93, Centro Histórico), Medellín (El Poblado, Laureles), Cartagena (Bocagrande), Cali, Bucaramanga, San Andrés, Santa Marta, Pasto, Leticia, Quibdó, entre otras.
  - **Sistemas de Transporte:** Transmilenio, Metro de Medellín, MIO y Transmetro.
  - **Servicios Públicos:** EPM (Energía) y Acueducto.
  - **Casillas Especiales:** SALIDA (+ $2.000.000 COP al dar la vuelta), Impuestos (Renta y Lujo), Casualidad, Arca Comunal y Cárcel ("La Picota").
- **Mecánica de Dados:** Lanzamiento de 2 dados de 6 caras. ¡Si sacas dados dobles, obtienes un turno extra!
- **Gestión de Propiedades y Renta:** Compra de casillas disponibles y cobro automatizado de renta a rivales.

---

## 🏛️ Arquitectura y Diseño de Software

El proyecto aplica principios de **Clean Code** y **POO (Programación Orientada a Objetos)**:

```
src/
├── Main.java                        # Punto de entrada de la aplicación
└── com/colombiapoly/
    ├── Juego.java                   # Controlador del ciclo de vida y turnos
    └── modelo/
        ├── Casilla.java             # Entidad de casilla (Enum TipoCasilla, precios, propietario)
        ├── Dado.java                # Simulación de generación aleatoria de dados
        ├── Jugador.java             # Entidad jugador (saldo, posición, estado en cárcel)
        └── Tablero.java             # Estructura del tablero y configuración de las 40 casillas
```

### Diagrama de Responsabilidades

| Clase | Responsabilidad Principal |
|---|---|
| `Main` | Inicializa y lanza la instancia principal del juego. |
| `Juego` | Orquesta el flujo de turnos, captura de inputs (`Scanner`), lógica de compra, transacciones y desempates por dados dobles. |
| `Tablero` | Inicializa y administra el arreglo circular de las 40 casillas temáticas. |
| `Casilla` | Modela las propiedades, tipo de casilla (`PROPIEDAD`, `TRANSPORTE`, `SERVICIO`, etc.), costos de compra y renta. |
| `Jugador` | Gestiona el estado de cada participante: saldo, posición relativa (0 a 39) y penalizaciones de cárcel. |
| `Dado` | Encapsula la aleatoriedad (`Random`) para simular lanzamientos de 1 a 6. |

---

## 🚀 Cómo Ejecutar Localmente

### Prerrequisitos
- Tener instalado **Java JDK 11 o superior** (`java -version` en tu terminal).
- Git instalado (opcional para clonar).

### Paso a paso desde la terminal

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/ElGuillers/Colombiapoly.git
   cd Colombiapoly
   ```

2. **Compilar las clases:**
   ```bash
   javac -encoding UTF-8 -d bin src/com/colombiapoly/modelo/*.java src/com/colombiapoly/*.java src/Main.java
   ```

3. **Ejecutar el juego:**
   ```bash
   java -cp bin Main
   ```

### Ejecución en IntelliJ IDEA / Eclipse / VS Code
- Abre la carpeta del proyecto en tu IDE favorito.
- Asegúrate de marcar la carpeta `src` como **Sources Root**.
- Ejecuta la clase `Main.java`.

---

## 🎯 Ejemplo de Partida en Consola

```text
==============================================
   BIENVENIDO A COLOMBIAPOLY - MODO CONSOLA   
==============================================
¿Cuántos jugadores van a jugar? (2-4): 2
Nombre del Jugador 1: Camilo
Nombre del Jugador 2: Valentina

¡Jugadores registrados! Cada uno empieza con $15000000 COP.

----------------------------------------------
Turno de: Camilo | Saldo: $15000000
Presiona ENTER para lanzar los dados...
Has sacado 4 y 2 (Total: 6)
Camilo cae en la casilla 6: [Pasto (Azul Claro)]
Esta propiedad no tiene dueño. Precio: $1000000
¿Deseas comprarla? (s/n): s
¡Has comprado Pasto (Azul Claro)!
```

---

## 🗺️ Próximas Mejoras (Roadmap)

- [ ] Sistema de construcción de casas y hoteles en las propiedades.
- [ ] Cartas interactivas de *Casualidad* y *Arca Comunal* con eventos culturales colombianos.
- [ ] Detección automática de bancarrota y condición de victoria.
- [ ] Migración a interfaz web con **Spring Boot + React** para despliegue completo en la nube.

---

## 👤 Autor

Desarrollado por **[Guillermo](https://github.com/ElGuillers)**.  
*Proyecto con fines demostrativos de lógica en Java y Programación Orientada a Objetos.*
