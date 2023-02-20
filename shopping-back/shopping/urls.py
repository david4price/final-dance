from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from product.views import handler404, handler500
from django.urls import re_path
from django.views.generic import TemplateView

schema_view = get_schema_view(
    openapi.Info(
        title="API",
        default_version='v1',
        description="API documentation",
        contact=openapi.Contact(email="cubit_cakes.0u@icloud.com"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

# handler404 = 'product.views.handler404'
# handler500 = 'product.views.handler500'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('product.urls')),
    # path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('404/', handler404, name='handler404'),
    path('500/', handler500, name='handler500'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

