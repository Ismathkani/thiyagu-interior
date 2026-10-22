from rest_framework import serializers
from .models import Project, ProjectImage, Service, Testimonial, ContactEnquiry, AIDesign, SiteSetting

class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ['id', 'image', 'caption', 'order']


class ProjectSerializer(serializers.ModelSerializer):
    images = ProjectImageSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'category', 'location', 
            'short_description', 'client_requirement', 'materials_used', 
            'cover_image', 'before_image', 'after_image', 'is_featured', 
            'images', 'created_at'
        ]


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'title', 'slug', 'short_description', 'image', 'starting_price', 'key_features', 'order']


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'client_name', 'location', 'rating', 'review', 'project_type', 'avatar', 'created_at']


class ContactEnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactEnquiry
        fields = ['id', 'name', 'mobile_number', 'location', 'service_required', 'budget_range', 'message', 'status', 'created_at']
        read_only_fields = ['id', 'status', 'created_at']


class AIDesignSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIDesign
        fields = ['id', 'room_type', 'interior_style', 'mode', 'original_image', 'generated_image', 'prompt_used', 'created_at']
        read_only_fields = ['id', 'created_at']


class SiteSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSetting
        fields = '__all__'
