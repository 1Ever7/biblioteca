#from django.db import models

# Create your models here.

from django.db import models

class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)

    def __str__(self):
        return self.nombre

class Libro(models.Model):
    titulo = models.CharField(max_length=200)
    autor = models.CharField(max_length=100)

    def __str__(self):
        return self.titulo

class Prestamo(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    libro = models.ForeignKey(Libro, on_delete=models.CASCADE)
    fecha_prestamo = models.DateField(auto_now_add=True)
    fecha_devolucion = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.usuario} → {self.libro}"
