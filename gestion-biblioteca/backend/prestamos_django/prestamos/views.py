from django.shortcuts import render,redirect
from django.shortcuts import render, get_object_or_404
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from django.core.cache import cache
from django.core.paginator import Paginator
from .models import Prestamo, Libro
from .forms import PrestamoForm
from django.views.generic import CreateView
from .models import Libro
from .forms import LibroForm
from django.contrib.auth.models import User
from django.views.generic import CreateView
from .forms import UsuarioForm

class UsuarioCreateView(CreateView):
    model = User
    form_class = UsuarioForm
    template_name = 'usuarios/crear_usuario.html'
    success_url = reverse_lazy('prestamo-list')

# Create your views here.
#def list_prestamos(request):
 #   return render(request, 'list_prestamos.html')

    

# Lista de préstamos con caché y paginación
class PrestamoListView(ListView):
    model = Prestamo
    template_name = 'list_prestamos.html'
    context_object_name = 'prestamos'
    paginate_by = 10  # Paginación

    def get_queryset(self):
        queryset = cache.get('prestamos_cache')
        if not queryset:
            queryset = Prestamo.objects.all().select_related('usuario', 'libro')  # Optimización de consultas
            cache.set('prestamos_cache', queryset, timeout=300)  # Almacena en caché por 5 minutos
        return queryset

# Crear préstamo con validación
class PrestamoCreateView(CreateView):
    model = Prestamo
    form_class = PrestamoForm
    template_name = 'crear_prestamo.html'
    success_url = reverse_lazy('prestamo-list')

    def form_valid(self, form):
        libro = form.cleaned_data['libro']
        if libro.stock <= 0:
            form.add_error('libro', 'No hay stock disponible para este libro.')
            return super().form_invalid(form)
        libro.stock -= 1
        libro.save()
        return super().form_valid(form)


# Actualizar préstamo
class PrestamoUpdateView(UpdateView):
    model = Prestamo
    form_class = PrestamoForm
    template_name = 'editar_prestamo.html'
    success_url = reverse_lazy('prestamo-list')

# Eliminar préstamo
class PrestamoDeleteView(DeleteView):
    model = Prestamo
    template_name = 'eliminar_prestamo.html'
    success_url = reverse_lazy('prestamo-list')

    def delete(self, request, *args, **kwargs):
        prestamo = self.get_object()
        libro = prestamo.libro
        libro.stock += 1
        libro.save()
        return super().delete(request, *args, **kwargs)

def crear_prestamo(request):
    if request.method == 'POST':
        form = PrestamoForm(request.POST)
        if form.is_valid():
            libro = form.cleaned_data['libro']
            if libro.stock > 0:
                prestamo = form.save(commit=False)
                libro.stock -= 1
                libro.save()
                prestamo.save()
                return redirect('prestamo-list')
            else:
                form.add_error('libro', 'No hay stock disponible para este libro.')
    else:
        form = PrestamoForm()

    # Obtener todos los libros disponibles
    libros = Libro.objects.all()
    return render(request, 'crear_prestamo.html', {'form': form, 'libros': libros})

class LibroCreateView(CreateView):
    model = Libro
    form_class = LibroForm
    template_name = 'libros/crear_libro.html'
    success_url = reverse_lazy('prestamo-list')

def actualizar_prestamo(request, pk):
    prestamo = get_object_or_404(Prestamo, pk=pk)
    if request.method == 'POST':
        form = PrestamoForm(request.POST, instance=prestamo)
        if form.is_valid():
            prestamo = form.save(commit=False)
            if prestamo.estado == 'devuelto' and prestamo.libro.stock >= 0:
                prestamo.libro.stock += 1
                prestamo.libro.save()
            prestamo.save()
            return redirect('prestamo-list')
    else:
        form = PrestamoForm(instance=prestamo)

    return render(request, 'editar_prestamo.html', {'form': form})
