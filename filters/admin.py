from django.contrib import admin

# Register your models here.
from filters.models import User,Filter,Predefined_Filter,Step

admin.site.register(User)
admin.site.register(Filter)
admin.site.register(Predefined_Filter)
admin.site.register(Step)
