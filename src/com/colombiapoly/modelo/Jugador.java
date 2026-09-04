package com.colombiapoly.modelo;

public class Jugador {
    private String nombre;
    private int saldo;
    private int posicionActual;
    private boolean estaEnCarcel;
    private int turnosEnCarcel;

    public Jugador(String nombre, int saldoInicial) {
        this.nombre = nombre;
        this.saldo = saldoInicial;
        this.posicionActual = 0; // Inicia en la casilla 0 (Salida)
        this.estaEnCarcel = false;
        this.turnosEnCarcel = 0;
    }

    public void mover(int cantidadCasillas) {
        this.posicionActual += cantidadCasillas;
        // Si pasa de la casilla 39, da la vuelta (pasa por Salida)
        if (this.posicionActual >= 40) {
            this.posicionActual -= 40;
            // Al pasar por salida recibe 2 millones
            recibirDinero(2000000);
            System.out.println(this.nombre + " ha pasado por la SALIDA. Recibe $2.000.000 COP.");
        }
    }

    public void pagar(int cantidad) {
        this.saldo -= cantidad;
    }

    public void recibirDinero(int cantidad) {
        this.saldo += cantidad;
    }

    public void irACarcel() {
        this.estaEnCarcel = true;
        this.posicionActual = 10; // Posición de la cárcel en el tablero clásico
        this.turnosEnCarcel = 0;
    }

    public void salirDeCarcel() {
        this.estaEnCarcel = false;
        this.turnosEnCarcel = 0;
    }

    // Getters y Setters
    public String getNombre() {
        return nombre;
    }

    public int getSaldo() {
        return saldo;
    }

    public int getPosicionActual() {
        return posicionActual;
    }
    
    public void setPosicionActual(int posicion) {
        this.posicionActual = posicion;
    }

    public boolean isEstaEnCarcel() {
        return estaEnCarcel;
    }

    public int getTurnosEnCarcel() {
        return turnosEnCarcel;
    }

    public void incrementarTurnosCarcel() {
        this.turnosEnCarcel++;
    }
}
