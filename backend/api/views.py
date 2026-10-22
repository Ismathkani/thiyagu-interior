from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Project, Service, Testimonial, ContactEnquiry, AIDesign, SiteSetting
from .serializers import (
    ProjectSerializer, ServiceSerializer, TestimonialSerializer,
    ContactEnquirySerializer, AIDesignSerializer, SiteSettingSerializer
)

class ProjectListView(generics.ListAPIView):
    serializer_class = ProjectSerializer

    def get_queryset(self):
        queryset = Project.objects.all().prefetch_related('images')
        category = self.request.query_params.get('category')
        featured = self.request.query_params.get('featured')
        
        if category and category != 'All':
            queryset = queryset.filter(category__iexact=category)
        if featured == 'true':
            queryset = queryset.filter(is_featured=True)
            
        return queryset


class ProjectDetailView(generics.RetrieveAPIView):
    queryset = Project.objects.all().prefetch_related('images')
    serializer_class = ProjectSerializer
    lookup_field = 'id'


class ServiceListView(generics.ListAPIView):
    queryset = Service.objects.all().order_by('order', 'id')
    serializer_class = ServiceSerializer


class TestimonialListView(generics.ListAPIView):
    queryset = Testimonial.objects.all().order_by('-created_at')
    serializer_class = TestimonialSerializer


class ContactEnquiryCreateView(generics.CreateAPIView):
    queryset = ContactEnquiry.objects.all()
    serializer_class = ContactEnquirySerializer


class SiteSettingView(APIView):
    def get(self, request):
        setting = SiteSetting.objects.first()
        if not setting:
            setting = SiteSetting.objects.create(
                business_name="Thiyagu Interior",
                tagline="Designs Your Dream • Make Your Space Beautiful",
                whatsapp_number="918675108994",
                phone_number="+91 86751 08994",
                email="contact@thiyaguinterior.com",
                address="No. 45, Woodcraft Avenue, Chennai, Tamil Nadu - 600040"
            )
        serializer = SiteSettingSerializer(setting)
        return Response(serializer.data)


# AI Prompts mapping matching exact requirements
STYLE_PROMPTS = {
    'Modern': 'A modern living room with a low oatmeal linen sectional, walnut coffee table, matte black floor lamp, tall indoor plants, warm oak flooring, soft daylight through sheer curtains, neutral sophisticated palette, realistic materials, architectural interior photography, photorealistic.',
    'Japandi': 'A cozy Japandi bedroom with a low platform bed, cream and earthy textiles, natural wood, rattan pendant lighting, warm ambient illumination, minimalist furniture, calm atmosphere and photorealistic interior visualization.',
    'Scandinavian': 'A bright Scandinavian kitchen with white cabinetry, light oak shelving, white quartz countertops, subtle brass hardware, minimal styling, natural daylight, airy atmosphere and photorealistic materials.',
    'Mid-Century Modern': 'A sophisticated home office with walnut desk, ergonomic chair, floating shelving, books, plants, warm task lighting, muted sage walls and mid-century modern details.',
    'Luxury': 'A luxurious grand salon interior with double-height ceiling, bespoke bookmatched marble fireplace, smoked oak fluted panels, brass accents, velvet and boucle upholstery, warm indirect cove lighting, photorealistic interior visualization.',
    'Spa Bathroom': 'A serene spa-inspired bathroom with freestanding stone bathtub, large matte tiles, natural wood vanity, recessed lighting, greenery and warm earthy neutral materials.',
    'Industrial': 'An industrial interior with exposed brick, black steel-framed windows, warm leather furniture, concrete flooring, tall ceilings and warm architectural lighting.',
    'Coastal': 'A bright coastal interior with white linen furniture, jute textures, light natural wood, linen curtains and a subtle blue, white and sand colour palette.',
    'Minimal': 'An ultra-minimalist interior with pristine micro-cement flooring, seamless handle-less cabinetry, hidden warm LED strip lighting, sculptural travertine side tables, photorealistic architectural space.',
    'Traditional': 'A warm classical wooden interior with ornate solid teak crown moldings, vintage brass hardware, warm Persian rug, rich mahogany finishes, and inviting ambient lighting.',
    'Contemporary': 'A sleek contemporary space with organic curved furniture, warm fluted walnut partitions, recessed magnetic track lighting, architectural foliage, and cashmere soft textures.'
}

# High-resolution transformation presets for instant ultra-fast photoreal responses
TRANSFORMATION_PRESETS = {
    'Modern': 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80',
    'Japandi': 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1400&q=80',
    'Scandinavian': 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=80',
    'Mid-Century Modern': 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80',
    'Luxury': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
    'Industrial': 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80',
    'Coastal': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80',
    'Minimal': 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1400&q=80',
    'Traditional': 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=80',
    'Contemporary': 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1400&q=80',
}

EMPTY_ROOM_PRESET = 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80'
RENDER_PRESET = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80'


class AITransformView(APIView):
    def post(self, request):
        room_type = request.data.get('room_type', 'Living Room')
        interior_style = request.data.get('interior_style', 'Modern')
        mode = request.data.get('mode', 'redesign') # redesign, empty_room, realistic_render
        original_image = request.data.get('original_image', '')

        # Select corresponding prompt and high-resolution realistic output
        prompt = STYLE_PROMPTS.get(interior_style, STYLE_PROMPTS['Modern'])
        
        if mode == 'empty_room':
            generated_image = EMPTY_ROOM_PRESET
            prompt = f"Empty room transformation preserving architectural walls, windows, and floors for {room_type}."
        elif mode == 'realistic_render':
            generated_image = RENDER_PRESET
            prompt = f"Photorealistic 8K interior architectural render for {room_type} in {interior_style} style."
        else:
            generated_image = TRANSFORMATION_PRESETS.get(interior_style, TRANSFORMATION_PRESETS['Modern'])

        # Store in database
        ai_entry = AIDesign.objects.create(
            room_type=room_type,
            interior_style=interior_style,
            mode=mode,
            original_image=original_image[:2000] if original_image else generated_image,
            generated_image=generated_image,
            prompt_used=prompt
        )

        return Response({
            'id': ai_entry.id,
            'room_type': room_type,
            'interior_style': interior_style,
            'mode': mode,
            'prompt_used': prompt,
            'original_image': original_image or generated_image,
            'generated_image': generated_image,
            'whatsapp_message': f"Hi, I created an interior concept ({room_type} - {interior_style}) using your AI designer and I'm interested in getting this design built by Thiyagu Interior. Please contact me."
        }, status=status.HTTP_201_CREATED)
