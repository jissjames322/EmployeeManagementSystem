from rest_framework.routers import DefaultRouter
from . import views
from django.urls import path
#from rest_framework

router = DefaultRouter()
router.register(r'employees', views.EmployeeViewSet, basename='employee')
router.register(r'departments', views.DepartmentViewSet, basename='department')
router.register(r'userdetails',views.UserDetailsViewSet)

urlpatterns=[
    path("signup/",views.SignupAPIView.as_view(),name="user-signup"),
    path("login/",views.LoginAPIView.as_view(),name="user-login")
]

urlpatterns += router.urls