from django import forms
from .models import Prestamo, Libro
from django import forms
from .models import Libro
from django import forms
from django.contrib.auth.models import User
from django import forms
from .models import Usuario

class UsuarioForm(forms.ModelForm):
    #password = forms.CharField(widget=forms.PasswordInput(), label="Contraseña")

    class Meta:
        model = Usuario
        fields = ['nombre', 'correo', 'telefono', 'rol']

    #def save(self, commit=True):
     #   usuario = super().save(commit=False)
      #  usuario.set_password(self.cleaned_data['password'])  # Hashea la contraseña
       # if commit:
        #    usuario.save()
        #return usuario




class LibroForm(forms.ModelForm):
    class Meta:
        model = Libro
        fields = ['titulo', 'autor', 'categoria', 'stock']

class PrestamoForm(forms.ModelForm):
    class Meta:
        model = Prestamo
        fields = ['usuario', 'libro', 'fecha_devolucion', 'estado']
        widgets = {
            'fecha_devolucion': forms.DateInput(attrs={'type': 'date', 'format': '%Y-%m-%d'})
        }

    def clean_libro(self):
        libro = self.cleaned_data['libro']
        if libro.stock <= 0:
            raise forms.ValidationError("No hay stock disponible para este libro.")
        return libro

