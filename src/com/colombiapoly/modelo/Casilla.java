package com.colombiapoly.modelo;

public class Casilla {
    public enum TipoCasilla {
        SALIDA, PROPIEDAD, TRANSPORTE, SERVICIO, SUERTE, ARCA_COMUNAL, CARCEL, IR_A_CARCEL, IMPUESTO, PARADA_LIBRE
    }

    private String nombre;
    private TipoCasilla tipo;
    private int precioCompra;
    private int precioRenta;
    private Jugador propietario;

    // Constructor para propiedades comprables (Ciudades, Transportes, Servicios)
    public Casilla(String nombre, TipoCasilla tipo, int precioCompra, int precioRenta) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.precioCompra = precioCompra;
        this.precioRenta = precioRenta;
        this.propietario = null;
    }

    // Constructor para casillas especiales (Salida, Suerte, Cárcel, etc.)
    public Casilla(String nombre, TipoCasilla tipo) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.precioCompra = 0;
        this.precioRenta = 0;
        this.propietario = null;
    }

    public String getNombre() {
        return nombre;
    }

    public TipoCasilla getTipo() {
        return tipo;
    }

    public int getPrecioCompra() {
        return precioCompra;
    }

    public int getPrecioRenta() {
        return precioRenta;
    }

    public Jugador getPropietario() {
        return propietario;
    }

    public void setPropietario(Jugador propietario) {
        this.propietario = propietario;
    }

    public boolean esComprable() {
        return (tipo == TipoCasilla.PROPIEDAD || tipo == TipoCasilla.TRANSPORTE || tipo == TipoCasilla.SERVICIO) && propietario == null;
    }
}
