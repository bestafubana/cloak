from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, Http404
from django.shortcuts import render

from filters.models import Predefined_Filter

# Create your views here.
def index(request):
    latest_filter_list = Predefined_Filter.objects.order_by('-id')[:5]
    # template = loader.get_template('filters/index.html')
    context = {'latest_filter_list': latest_filter_list}
    return render(request, 'filters/index.html', context)


def test1(request):
    return HttpResponse("bleh.")    

def test2(request, param1):
    return HttpResponse("The value of the numeric param is %s" % param1)       

def detail(request, filter_id):
    try:
        filter = Predefined_Filter.objects.get(pk=filter_id)
    except Predefined_Filter.DoesNotExist:
        raise Http404
    return render(request, 'filters/detail.html', {'filter': filter}) 


def login_view(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(username=username, password=password)
    message = ""
    if user is not None:
        if user.is_active:
            login(request, user)
            message = "You successfuly logged in"
        else:
            # Return a 'disabled account' error message
            message = "This account is disabled"
    else:
        message = "Wrong username/password credentials"
        # Return an 'invalid login' error message.
    return render(request, 'index.html', {'message': message})    

def logout_view(request):
    logout(request)
    return render(request, 'index.html')








