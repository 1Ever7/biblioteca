from django.db import models
from django.contrib.auth.models import User

class Libro(models.Model):
    titulo = models.CharField(max_length=200)
    autor = models.CharField(max_length=100)
    stock = models.PositiveIntegerField(default=0)  # Evita valores negativos
    categoria = models.CharField(max_length=100, blank=True, null=True)
    
    def __str__(self):
        return self.titulo

    def reducir_stock(self):
        """Reduce el stock del libro en 1."""
        if self.stock <= 0:
            raise ValueError("No hay stock disponible para este libro.")
        self.stock -= 1
        self.save()

    def aumentar_stock(self):
        """Aumenta el stock del libro en 1."""
        self.stock += 1
        self.save()


class Prestamo(models.Model):
    ESTADO_CHOICES = [
        ('activo', 'Activo'),
        ('devuelto', 'Devuelto'),
    ]

    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='prestamos')
    libro = models.ForeignKey(Libro, on_delete=models.CASCADE, related_name='prestamos')
    fecha_prestamo = models.DateField(auto_now_add=True)
    fecha_devolucion = models.DateField(null=True, blank=True)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='activo')

    @property
    def nombre_usuario(self):
        return self.usuario.username

    @property
    def titulo_libro(self):
        return self.libro.titulo

    def save(self, *args, **kwargs):
        # Asegúrate de que el stock del libro disminuya al crear un préstamo
        if not self.pk:  # Solo si es un nuevo préstamo
            self.libro.stock -= 1
            self.libro.save()
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        # Asegúrate de que el stock del libro aumente al eliminar un préstamo
        self.libro.stock += 1
        self.libro.save()
        super().delete(*args, **kwargs)

    def __str__(self):
        return f"Prestamo {self.id} - Libro: {self.libro.titulo}, Usuario: {self.usuario.username}"

class Usuario(models.Model):
    id = models.AutoField(primary_key=True)  # Corresponde al campo ID SERIAL
    nombre = models.CharField(max_length=100, null=False, blank=False)
    correo = models.EmailField(unique=True, null=False, blank=False)
    telefono = models.CharField(max_length=15, null=True, blank=True)
    rol = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return self.nombre