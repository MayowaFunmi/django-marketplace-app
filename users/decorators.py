from functools import wraps
from django.contrib import messages
from django.shortcuts import render


def superuser_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        if request.user.is_superuser:
            return view_func(request, *args, **kwargs)
        else:
            messages.error(request, 'You are not authorized to access this page')
            return render(request, 'users/unauthorized.html')
    return _wrapped_view


def is_service_provider(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        if request.user.groups.filter(name='Service Provider').exists():
            return view_func(request, *args, **kwargs)
        else:
            messages.error(request, 'You are not authorized to access this page')
            return render(request, 'users/unauthorized.html')
    return _wrapped_view
