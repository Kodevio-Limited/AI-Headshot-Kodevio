from django.urls import path
from .views import CsrfView, AdminLoginView, AdminLogoutView, ChangePasswordView, SessionCheckView

urlpatterns = [
    path("csrf/", CsrfView.as_view(), name="auth-csrf"),
    path("login/", AdminLoginView.as_view(), name="auth-login"),
    path("logout/", AdminLogoutView.as_view(), name="auth-logout"),
    path("change-password/", ChangePasswordView.as_view(), name="auth-change-password"),
    path("session/", SessionCheckView.as_view(), name="auth-session"),
]
