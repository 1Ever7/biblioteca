from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Usuario

from .serializers import UsuarioSerializer

class UsuarioList(APIView):
    def get(self, request):
        usuarios = Usuario.objects.all()
        serializer = UsuarioSerializer(usuarios, many=True)
        return Response(serializer.data)
