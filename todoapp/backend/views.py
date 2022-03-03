from .serializers import TaskSerializer
from .models import Task
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.parsers import JSONParser

# Create your views here.
@api_view(['GET'])
def task_list_view(request):
    qs = Task.objects.all()
    serializer = TaskSerializer(qs, many=True)
    return Response(serializer.data, status=200)

@api_view(['POST'])
def task_create_view(request):
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE', 'POST'])
def task_delete_view(request, pk):
    qs = Task.objects.filter(id=pk)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    obj.delete()
    return Response({"message": "Task removed"}, status=200)


@api_view(['PUT'])
def task_complete_action_view(request, pk):
    '''
    id is required.
    Action options are: like, unlike, retweet
    '''
    qs = Task.objects.filter(id=pk)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    data = JSONParser().parse(request) 
    serializer = TaskSerializer(obj, data=data) 
    if serializer.is_valid(): 
        serializer.save() 
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)