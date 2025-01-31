#from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Usuario, Libro, Prestamo

admin.site.register(Usuario)
admin.site.register(Libro)
admin.site.register(Prestamo)
