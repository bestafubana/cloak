from django.conf.urls import patterns, url

from filters import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^test1/$', views.test1, name='test1'),
    url(r'^test2/(?P<param1>\d+)/$', views.test2, name='test2'),
    url(r'^(?P<filter_id>\d+)/$', views.detail, name='detail'),
)

