from django.contrib import admin
from .models import Project, ProjectImage, Service, Testimonial, ContactEnquiry, AIDesign, SiteSetting

class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 2

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'location', 'is_featured', 'created_at')
    list_filter = ('category', 'is_featured', 'created_at')
    search_fields = ('title', 'location', 'materials_used', 'short_description')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [ProjectImageInline]

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'starting_price', 'order')
    list_editable = ('order',)
    search_fields = ('title', 'short_description')
    prepopulated_fields = {'slug': ('title',)}

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('client_name', 'rating', 'project_type', 'location', 'created_at')
    list_filter = ('rating', 'created_at')
    search_fields = ('client_name', 'review')

@admin.register(ContactEnquiry)
class ContactEnquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'mobile_number', 'service_required', 'budget_range', 'status', 'created_at')
    list_filter = ('status', 'service_required', 'created_at')
    search_fields = ('name', 'mobile_number', 'location', 'message')
    list_editable = ('status',)

@admin.register(AIDesign)
class AIDesignAdmin(admin.ModelAdmin):
    list_display = ('room_type', 'interior_style', 'mode', 'created_at')
    list_filter = ('room_type', 'interior_style', 'mode')

@admin.register(SiteSetting)
class SiteSettingAdmin(admin.ModelAdmin):
    list_display = ('business_name', 'whatsapp_number', 'phone_number', 'email')
