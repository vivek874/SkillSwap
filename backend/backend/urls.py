from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from accounts import views
from accounts.views import MyProfileView, RegisterView,SkillMatchSearchView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from accounts.views import SkillMatchSearchView
router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'profiles', views.ProfileViewSet)
router.register(r'skills', views.SkillViewSet)
router.register(r'user-skills', views.UserSkillViewSet)
router.register(r'skill-requests', views.SkillRequestViewSet)
router.register(r'reviews', views.ReviewViewSet , basename='review')
router.register(r'messages', views.MessageViewSet)



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterView.as_view(), name='register'), 
    path('api/search/', SkillMatchSearchView.as_view(), name='skill_search'),
    path('api/my-profile/', MyProfileView.as_view(), name='my-profile'),
    
]