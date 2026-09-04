package com.colombiapoly.modelo;

public class Tablero {
    private Casilla[] casillas;

    public Tablero() {
        casillas = new Casilla[40];
        inicializarTablero();
    }

    private void inicializarTablero() {
        // Precios base simplificados (en miles, ej. 600 = $600.000 COP)
        // Multiplicaremos por 1000 en la lógica de la UI o simplemente los manejamos completos.
        // Vamos a usar valores completos para que sea realista.

        // 0 - 9
        casillas[0] = new Casilla("SALIDA", Casilla.TipoCasilla.SALIDA);
        casillas[1] = new Casilla("Quibdó (Marrón)", Casilla.TipoCasilla.PROPIEDAD, 600000, 20000);
        casillas[2] = new Casilla("Arca Comunal", Casilla.TipoCasilla.ARCA_COMUNAL);
        casillas[3] = new Casilla("Leticia (Marrón)", Casilla.TipoCasilla.PROPIEDAD, 600000, 40000);
        casillas[4] = new Casilla("Impuesto de Renta", Casilla.TipoCasilla.IMPUESTO); // Paga 2000000
        casillas[5] = new Casilla("Estación Transmilenio", Casilla.TipoCasilla.TRANSPORTE, 2000000, 250000);
        casillas[6] = new Casilla("Pasto (Azul Claro)", Casilla.TipoCasilla.PROPIEDAD, 1000000, 60000);
        casillas[7] = new Casilla("Casualidad", Casilla.TipoCasilla.SUERTE);
        casillas[8] = new Casilla("Popayán (Azul Claro)", Casilla.TipoCasilla.PROPIEDAD, 1000000, 60000);
        casillas[9] = new Casilla("Riohacha (Azul Claro)", Casilla.TipoCasilla.PROPIEDAD, 1200000, 80000);

        // 10 - 19
        casillas[10] = new Casilla("La Picota (Cárcel / De Visita)", Casilla.TipoCasilla.CARCEL);
        casillas[11] = new Casilla("Pereira (Rosa)", Casilla.TipoCasilla.PROPIEDAD, 1400000, 100000);
        casillas[12] = new Casilla("Empresa de Energía (EPM)", Casilla.TipoCasilla.SERVICIO, 1500000, 0); // Renta depende de dados
        casillas[13] = new Casilla("Armenia (Rosa)", Casilla.TipoCasilla.PROPIEDAD, 1400000, 100000);
        casillas[14] = new Casilla("Manizales (Rosa)", Casilla.TipoCasilla.PROPIEDAD, 1600000, 120000);
        casillas[15] = new Casilla("Estación Metro de Medellín", Casilla.TipoCasilla.TRANSPORTE, 2000000, 250000);
        casillas[16] = new Casilla("Ibagué (Naranja)", Casilla.TipoCasilla.PROPIEDAD, 1800000, 140000);
        casillas[17] = new Casilla("Arca Comunal", Casilla.TipoCasilla.ARCA_COMUNAL);
        casillas[18] = new Casilla("Neiva (Naranja)", Casilla.TipoCasilla.PROPIEDAD, 1800000, 140000);
        casillas[19] = new Casilla("Villavicencio (Naranja)", Casilla.TipoCasilla.PROPIEDAD, 2000000, 160000);

        // 20 - 29
        casillas[20] = new Casilla("Parada Libre", Casilla.TipoCasilla.PARADA_LIBRE);
        casillas[21] = new Casilla("Bucaramanga (Rojo)", Casilla.TipoCasilla.PROPIEDAD, 2200000, 180000);
        casillas[22] = new Casilla("Casualidad", Casilla.TipoCasilla.SUERTE);
        casillas[23] = new Casilla("Cúcuta (Rojo)", Casilla.TipoCasilla.PROPIEDAD, 2200000, 180000);
        casillas[24] = new Casilla("Santa Marta (Rojo)", Casilla.TipoCasilla.PROPIEDAD, 2400000, 200000);
        casillas[25] = new Casilla("Estación MIO", Casilla.TipoCasilla.TRANSPORTE, 2000000, 250000);
        casillas[26] = new Casilla("Barranquilla (Amarillo)", Casilla.TipoCasilla.PROPIEDAD, 2600000, 220000);
        casillas[27] = new Casilla("Empresa de Acueducto", Casilla.TipoCasilla.SERVICIO, 1500000, 0);
        casillas[28] = new Casilla("Cali (Amarillo)", Casilla.TipoCasilla.PROPIEDAD, 2600000, 220000);
        casillas[29] = new Casilla("San Andrés (Amarillo)", Casilla.TipoCasilla.PROPIEDAD, 2800000, 240000);

        // 30 - 39
        casillas[30] = new Casilla("¡Váyase a La Picota!", Casilla.TipoCasilla.IR_A_CARCEL);
        casillas[31] = new Casilla("Medellín - Poblado (Verde)", Casilla.TipoCasilla.PROPIEDAD, 3000000, 260000);
        casillas[32] = new Casilla("Medellín - Laureles (Verde)", Casilla.TipoCasilla.PROPIEDAD, 3000000, 260000);
        casillas[33] = new Casilla("Arca Comunal", Casilla.TipoCasilla.ARCA_COMUNAL);
        casillas[34] = new Casilla("Cartagena - Boca Grande (Verde)", Casilla.TipoCasilla.PROPIEDAD, 3200000, 280000);
        casillas[35] = new Casilla("Estación Transmetro", Casilla.TipoCasilla.TRANSPORTE, 2000000, 250000);
        casillas[36] = new Casilla("Casualidad", Casilla.TipoCasilla.SUERTE);
        casillas[37] = new Casilla("Bogotá - Centro Histórico (Azul Oscuro)", Casilla.TipoCasilla.PROPIEDAD, 3500000, 350000);
        casillas[38] = new Casilla("Impuesto de Lujo", Casilla.TipoCasilla.IMPUESTO); // Paga 1000000
        casillas[39] = new Casilla("Bogotá - Parque 93 (Azul Oscuro)", Casilla.TipoCasilla.PROPIEDAD, 4000000, 500000);
    }

    public Casilla getCasilla(int indice) {
        if (indice >= 0 && indice < 40) {
            return casillas[indice];
        }
        return null;
    }
}
