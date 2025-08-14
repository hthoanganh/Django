from django.urls import path
from . import views

urlpatterns = [
    path('', views.intro, name='intro'),            # ← Trang giới thiệu (index.html)
    path('bai-viet/', views.post_list, name='post_list'),
    path('bai-viet/<slug:slug>/', views.post_detail, name='post_detail'),
]
