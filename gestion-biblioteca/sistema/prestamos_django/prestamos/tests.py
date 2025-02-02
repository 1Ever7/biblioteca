from django.test import TestCase
from django.contrib.auth.models import User
from .models import Libro, Prestamo

class PrestamoModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Configuración inicial para las pruebas
        cls.usuario = User.objects.create_user(username='testuser', password='12345')
        cls.libro = Libro.objects.create(titulo='Libro de Prueba', autor='Autor de Prueba', stock=5)

    def test_crear_prestamo(self):
        # Prueba la creación de un préstamo
        prestamo = Prestamo.objects.create(
            usuario=self.usuario,
            libro=self.libro,
            fecha_devolucion=None,
            estado='activo'
        )
        self.assertEqual(prestamo.estado, 'activo')
        self.assertEqual(prestamo.nombre_usuario, 'testuser')
        self.assertEqual(prestamo.titulo_libro, 'Libro de Prueba')

    def test_stock_libro(self):
        # Prueba que el stock del libro disminuye al crear un préstamo
        initial_stock = self.libro.stock
        Prestamo.objects.create(
            usuario=self.usuario,
            libro=self.libro,
            fecha_devolucion=None,
            estado='activo'
        )
        self.libro.refresh_from_db()
        self.assertEqual(self.libro.stock, initial_stock - 1)

    def test_eliminar_prestamo(self):
        # Prueba que el stock del libro aumenta al eliminar un préstamo
        initial_stock = self.libro.stock
        prestamo = Prestamo.objects.create(
            usuario=self.usuario,
            libro=self.libro,
            fecha_devolucion=None,
            estado='activo'
        )
        prestamo.delete()
        self.libro.refresh_from_db()
        self.assertEqual(self.libro.stock, initial_stock)