import random

class Dado:
    def __init__(self):
        """Inicializa un dado de 6 caras."""
        self.valor = None  # No se ha lanzado aún

    def lanzar(self):
        """Genera un número aleatorio entre 1 y 6 y lo almacena."""
        self.valor = random.randint(1, 6)
        return self.valor
class Ficha:
    def __init__(self, posicion,equipo):
        """Inicializa una ficha con una posición (x, y) y asigna un equipo aleatorio entre 1 y 4."""
        self.posicion = posicion
        self.equipo = equipo
    def mover(self, posicion):
        self.posicion = posicion