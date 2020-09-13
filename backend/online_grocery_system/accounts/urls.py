from django.urls import path, include

from rest_framework.routers import DefaultRouter

from accounts import views


router= DefaultRouter()
router.register('profile',views.UsersViewSet)

urlpatterns=[
    path('',include(router.urls)),
    path('login/',views.UserLoginAPIView.as_view()),
]
