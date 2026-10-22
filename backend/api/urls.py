from django.urls import path
from .views import (
    ProjectListView, ProjectDetailView, ServiceListView,
    TestimonialListView, ContactEnquiryCreateView, SiteSettingView,
    AITransformView
)

urlpatterns = [
    path('projects/', ProjectListView.as_view(), name='project-list'),
    path('projects/<int:id>/', ProjectDetailView.as_view(), name='project-detail'),
    path('services/', ServiceListView.as_view(), name='service-list'),
    path('testimonials/', TestimonialListView.as_view(), name='testimonial-list'),
    path('contact/', ContactEnquiryCreateView.as_view(), name='contact-create'),
    path('settings/', SiteSettingView.as_view(), name='site-settings'),
    path('ai/transform/', AITransformView.as_view(), name='ai-transform'),
]
