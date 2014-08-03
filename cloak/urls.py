from django.conf.urls import patterns, include, url
from django.views.generic.base import TemplateView


from filters import views
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
	url(r'^$', TemplateView.as_view(template_name='index.html'), name='index'),
	url(r'^logout$', views.logout_view, name='logout'),
	url(r'^login$', views.login_view, name='login'),
    url(r'^filters/', include('filters.urls')),
    url(r'^admin/', include(admin.site.urls)),
)

