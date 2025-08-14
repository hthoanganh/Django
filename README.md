# 🐍 Django Blog Project  

Một ứng dụng web **Django** được xây dựng để quản lý blog, bao gồm hiển thị bài viết, chi tiết bài viết, và giao diện được tùy biến với HTML, CSS, và JavaScript.  
Dự án này được thiết kế theo chuẩn **Django MVC (Model-View-Template)**, dễ mở rộng và bảo trì.  

---

## 📂 Cấu trúc thư mục

```plaintext
mysite/
│
├── blog/                  # Ứng dụng chính quản lý bài viết
│   ├── migrations/        # File migration database
│   ├── templates/         # Template HTML
│   │   └── blog/
│   │       ├── base.html
│   │       ├── intro.html
│   │       ├── post_detail.html
│   │       └── post_list.html
│   ├── __init__.py
│   ├── admin.py           # Cấu hình admin Django
│   ├── apps.py
│   ├── models.py          # Khai báo model
│   ├── tests.py
│   ├── urls.py            # Định tuyến cho blog
│   └── views.py           # Xử lý logic hiển thị
│
├── mysite/                # Cấu hình Django chính
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
├── polls/                 # Ứng dụng phụ (nếu có)
├── profile_pics/          # Lưu trữ ảnh profile
│
├── static/                # File tĩnh (CSS, JS, Images)
│   └── blog/
│       ├── css/
│       │   └── style.css
│       ├── images/
│       │   ├── cloud.png
│       │   ├── hoanganh.jpg
│       │   └── nen.png
│       └── js/
│           └── main.js
│
├── db.sqlite3              # Database SQLite
├── manage.py               # Lệnh quản lý Django
└── .gitattributes

```

🚀 Tính năng

Trang chủ blog: Liệt kê tất cả các bài viết.

Trang chi tiết: Hiển thị nội dung chi tiết từng bài viết.

Template kế thừa: Sử dụng base.html làm nền tảng.

Static files: CSS, JS, hình ảnh riêng cho blog.

Admin panel: Quản lý bài viết trực tiếp từ Django Admin.

Cấu trúc gọn gàng: Tách biệt code backend, template và static.
