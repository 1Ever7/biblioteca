from django.urls import path
from .views import (
    PrestamoListView,
    PrestamoCreateView,
    PrestamoUpdateView,
    PrestamoDeleteView,
    LibroCreateView,
    UsuarioCreateView,
    crear_prestamo,
)

urlpatterns = [
    path('', PrestamoListView.as_view(), name='prestamo-list'),
    path('crear/', crear_prestamo, name='prestamo-create'),  # Usa la función `crear_prestamo`
    path('actualizar/<int:pk>/', PrestamoUpdateView.as_view(), name='prestamo-update'),
    path('eliminar/<int:pk>/', PrestamoDeleteView.as_view(), name='prestamo-delete'),
    path('libro/crear/', LibroCreateView.as_view(), name='libro-create'),
    path('usuario/crear/', UsuarioCreateView.as_view(), name='usuario-create'),
]