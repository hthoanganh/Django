from django.contrib import admin
from .models import Post, About # <-- Đảm bảo đã import 2 model

# Đoạn code này để tùy biến hiển thị, có thể copy y hệt
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'status', 'created_on')
    list_filter = ("status",)
    search_fields = ['title', 'content']
    prepopulated_fields = {'slug': ('title',)}

# HAI DÒNG QUAN TRỌNG NHẤT ĐỂ HIỂN THỊ MODEL
admin.site.register(Post, PostAdmin)
admin.site.register(About)