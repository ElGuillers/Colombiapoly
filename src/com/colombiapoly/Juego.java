package com.colombiapoly;

import com.colombiapoly.modelo.Casilla;
import com.colombiapoly.modelo.Dado;
import com.colombiapoly.modelo.Jugador;
import com.colombiapoly.modelo.Tablero;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Juego {
    private Tablero tablero;
    private List<Jugador> jugadores;
    private Dado dado1;
    private Dado dado2;
    private Scanner scanner;

    public Juego() {
        tablero = new Tablero();
        jugadores = new ArrayList<>();
        dado1 = new Dado();
        dado2 = new Dado();
        scanner = new Scanner(System.in);
    }

    public void iniciar() {
        System.out.println("==============================================");
        System.out.println("   BIENVENIDO A COLOMBIAPOLY - MODO CONSOLA   ");
        System.out.println("==============================================");

        // Configurar jugadores
        configurarJugadores();

        // Bucle principal del juego
        boolean juegoTerminado = false;
        int turno = 0;

        while (!juegoTerminado) {
            Jugador jugadorActual = jugadores.get(turno % jugadores.size());
            jugarTurno(jugadorActual);

            // Condición de victoria simplificada: si todos menos uno están en bancarrota (aquí omitido por brevedad, asumimos juego infinito hasta Ctrl+C)
            
            turno++;
        }
    }

    private void configurarJugadores() {
        System.out.print("¿Cuántos jugadores van a jugar? (2-4): ");
        int numJugadores = 2;
        try {
            numJugadores = Integer.parseInt(scanner.nextLine());
            if(numJugadores < 2) numJugadores = 2;
            if(numJugadores > 4) numJugadores = 4;
        } catch (Exception e) {
            System.out.println("Entrada inválida, se usarán 2 jugadores por defecto.");
        }

        int saldoInicial = 15000000; // 15 Millones de pesos

        for (int i = 1; i <= numJugadores; i++) {
            System.out.print("Nombre del Jugador " + i + ": ");
            String nombre = scanner.nextLine();
            if (nombre.trim().isEmpty()) {
                nombre = "Jugador " + i;
            }
            jugadores.add(new Jugador(nombre, saldoInicial));
        }
        System.out.println("\n¡Jugadores registrados! Cada uno empieza con $" + saldoInicial + " COP.\n");
    }

    private void jugarTurno(Jugador jugador) {
        System.out.println("\n----------------------------------------------");
        System.out.println("Turno de: " + jugador.getNombre() + " | Saldo: $" + jugador.getSaldo());
        System.out.println("Presiona ENTER para lanzar los dados...");
        scanner.nextLine();

        int d1 = dado1.lanzar();
        int d2 = dado2.lanzar();
        int sumaDados = d1 + d2;

        System.out.println("Has sacado " + d1 + " y " + d2 + " (Total: " + sumaDados + ")");

        jugador.mover(sumaDados);
        Casilla casillaActual = tablero.getCasilla(jugador.getPosicionActual());

        System.out.println(jugador.getNombre() + " cae en la casilla " + jugador.getPosicionActual() + ": [" + casillaActual.getNombre() + "]");

        // Logica muy basica de casillas
        if (casillaActual.esComprable()) {
            System.out.println("Esta propiedad no tiene dueño. Precio: $" + casillaActual.getPrecioCompra());
            if (jugador.getSaldo() >= casillaActual.getPrecioCompra()) {
                System.out.print("¿Deseas comprarla? (s/n): ");
                String resp = scanner.nextLine();
                if (resp.equalsIgnoreCase("s")) {
                    jugador.pagar(casillaActual.getPrecioCompra());
                    casillaActual.setPropietario(jugador);
                    System.out.println("¡Has comprado " + casillaActual.getNombre() + "!");
                }
            } else {
                System.out.println("No tienes suficiente dinero para comprarla.");
            }
        } else if (casillaActual.getPropietario() != null && casillaActual.getPropietario() != jugador) {
            Jugador dueño = casillaActual.getPropietario();
            int renta = casillaActual.getPrecioRenta();
            System.out.println("Esta propiedad pertenece a " + dueño.getNombre() + ". Debes pagar renta: $" + renta);
            jugador.pagar(renta);
            dueño.recibirDinero(renta);
            System.out.println("Saldo actual: $" + jugador.getSaldo());
        } else if (casillaActual.getTipo() == Casilla.TipoCasilla.IMPUESTO) {
            System.out.println("Debes pagar impuesto.");
            int impuesto = casillaActual.getNombre().contains("Lujo") ? 1000000 : 2000000;
            jugador.pagar(impuesto);
            System.out.println("Has pagado $" + impuesto + ". Saldo actual: $" + jugador.getSaldo());
        } else if (casillaActual.getTipo() == Casilla.TipoCasilla.IR_A_CARCEL) {
            System.out.println("¡Te ha cogido la policía! Vas directo a La Picota.");
            jugador.irACarcel();
        }

        // Si los dados son iguales, vuelve a tirar (a menos que haya ido a la cárcel)
        if (d1 == d2 && !jugador.isEstaEnCarcel()) {
            System.out.println("¡DADOS DOBLES! Vuelves a tirar.");
            jugarTurno(jugador);
        }
    }
}
