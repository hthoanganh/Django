from django.db import models
from django.contrib.auth.models import User # Để biết ai là tác giả

class Post(models.Model):
    title = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, unique=True) # Dùng cho URL thân thiện
    author = models.ForeignKey(User, on_delete= models.CASCADE, related_name='blog_posts')
    content = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True) # Tự động đặt ngày giờ khi tạo
    updated_on = models.DateTimeField(auto_now=True) # Tự động cập nhật ngày giờ khi sửa
    status = models.IntegerField(choices=((0, "Draft"), (1, "Publish")), default=0)

    class Meta:
        ordering = ['-created_on'] # Sắp xếp bài viết theo thứ tự mới nhất lên đầu

    def __str__(self):
        return self.title

class About(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title