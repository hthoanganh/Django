# blog/views.py

from django.shortcuts import render, get_object_or_404
from .models import Post


# View cho trang giới thiệu
def intro(request):
    return render(request, 'blog/intro.html')


# View cho danh sách bài viết
def post_list(request):
    # Lấy TẤT CẢ các bài viết có status là 1 (Published)
    posts = Post.objects.filter(status=1).order_by('-created_on')
    # Gửi danh sách 'posts' đến template
    return render(request, 'blog/post_list.html', {'posts': posts})

# View cho chi tiết bài viết
def post_detail(request, slug):
    post = get_object_or_404(Post, slug=slug, status=1)
    # (Logic cho comment có thể thêm vào đây sau)
    return render(request, 'blog/post_detail.html', {'post': post})