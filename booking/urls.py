from django.contrib import admin
from django.urls import path
from django.urls.conf import include
from . import views

app_name = 'booking'

urlpatterns = [
    path('', views.booking, name='booking'),
    path('floor/<slug:floor_slug>/', views.floor_booking, name='floor_booking'),
    path('profile/', views.profile, name='profile'),
    path('delete/', views.delete, name='delete_booking'),
    path('save_cell_content/', views.save_cell_content, name='save_cell_content'),
    path('download_excel/', views.download_table_as_excel, name='download_excel'),
    path('edit_user/', views.edit_user, name='edit_user'),
    path('change_password/', views.change_password, name='change_password'),
    path('download_log/', views.download_log, name='download_log'),
    path('testLog', views.download_log_2, name="dateLog"),
    path('user_log', views.download_log_user, name="user_download_log"),
    path('add_column/', views.add_column, name='add_column'),
]
