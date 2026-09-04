package com.colombiapoly.modelo;

import java.util.Random;

public class Dado {
    private Random random;

    public Dado() {
        this.random = new Random();
    }

    public int lanzar() {
        // Retorna un número entre 1 y 6
        return random.nextInt(6) + 1;
    }
}
