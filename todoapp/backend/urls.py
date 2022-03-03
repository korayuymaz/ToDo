from django.urls import path

from .views import (
    task_list_view,
    task_create_view,
    task_delete_view,
    task_complete_action_view
)
'''
CLIENT
Base ENDPOINT /api/
'''
urlpatterns = [
    path('', task_list_view),
    path('create/', task_create_view),
    path('<int:pk>/delete/', task_delete_view),
    path('<int:pk>/update/', task_complete_action_view),
]
