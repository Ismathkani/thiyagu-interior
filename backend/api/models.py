from django.db import models

class Project(models.Model):
    CATEGORY_CHOICES = [
        ('Kitchen', 'Kitchen'),
        ('Bedroom', 'Bedroom'),
        ('Living Room', 'Living Room'),
        ('Wardrobe', 'Wardrobe'),
        ('TV Unit', 'TV Unit'),
        ('Office', 'Office'),
        ('Furniture', 'Furniture'),
        ('Complete Home', 'Complete Home'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='Living Room')
    location = models.CharField(max_length=150, help_text="e.g. Anna Nagar, Chennai")
    short_description = models.TextField()
    client_requirement = models.TextField(blank=True, help_text="What the homeowner requested")
    materials_used = models.TextField(blank=True, help_text="e.g. Marine Ply, German Soft-Close, Walnut Veneer")
    cover_image = models.CharField(max_length=500, help_text="URL or path to project hero image")
    before_image = models.CharField(max_length=500, blank=True, null=True, help_text="URL or path to Before image")
    after_image = models.CharField(max_length=500, blank=True, null=True, help_text="URL or path to After image")
    is_featured = models.BooleanField(default=True, help_text="Show on homepage")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} ({self.category})"


class ProjectImage(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='images')
    image = models.CharField(max_length=500)
    caption = models.CharField(max_length=200, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return f"Image for {self.project.title}"


class Service(models.Model):
    title = models.CharField(max_length=120)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    short_description = models.TextField()
    image = models.CharField(max_length=500)
    starting_price = models.CharField(max_length=100, blank=True, default="Custom Quote")
    key_features = models.TextField(blank=True, help_text="Comma-separated or bullet list of highlights")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'title']

    def __str__(self):
        return self.title


class Testimonial(models.Model):
    client_name = models.CharField(max_length=120)
    location = models.CharField(max_length=120, blank=True)
    rating = models.PositiveIntegerField(default=5)
    review = models.TextField()
    project_type = models.CharField(max_length=120, default="Modular Kitchen & Interior")
    avatar = models.CharField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.client_name} - {self.rating}★"


class ContactEnquiry(models.Model):
    STATUS_CHOICES = [
        ('New', 'New'),
        ('Contacted', 'Contacted'),
        ('Site Visit Scheduled', 'Site Visit Scheduled'),
        ('Converted', 'Converted'),
        ('Closed', 'Closed'),
    ]

    name = models.CharField(max_length=150)
    mobile_number = models.CharField(max_length=20)
    location = models.CharField(max_length=150, blank=True)
    service_required = models.CharField(max_length=100, default='Complete Home Interior')
    budget_range = models.CharField(max_length=100, blank=True)
    message = models.TextField(blank=True)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='New')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Enquiry from {self.name} ({self.mobile_number})"


class AIDesign(models.Model):
    ROOM_CHOICES = [
        ('Living Room', 'Living Room'),
        ('Bedroom', 'Bedroom'),
        ('Kitchen', 'Kitchen'),
        ('Dining Room', 'Dining Room'),
        ('Bathroom', 'Bathroom'),
        ('Home Office', 'Home Office'),
        ('Outdoor / Patio', 'Outdoor / Patio'),
    ]

    STYLE_CHOICES = [
        ('Modern', 'Modern'),
        ('Japandi', 'Japandi'),
        ('Scandinavian', 'Scandinavian'),
        ('Mid-Century Modern', 'Mid-Century Modern'),
        ('Luxury', 'Luxury'),
        ('Industrial', 'Industrial'),
        ('Coastal', 'Coastal'),
        ('Minimal', 'Minimal'),
        ('Traditional', 'Traditional'),
        ('Contemporary', 'Contemporary'),
    ]

    room_type = models.CharField(max_length=50, choices=ROOM_CHOICES, default='Living Room')
    interior_style = models.CharField(max_length=50, choices=STYLE_CHOICES, default='Modern')
    mode = models.CharField(max_length=50, default='redesign', help_text="redesign, empty_room, realistic_render")
    original_image = models.TextField(help_text="Base64 or image URL")
    generated_image = models.TextField(help_text="Base64 or image URL")
    prompt_used = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.room_type} in {self.interior_style} ({self.mode})"


class SiteSetting(models.Model):
    business_name = models.CharField(max_length=150, default="Thiyagu Interior")
    tagline = models.CharField(max_length=200, default="Designs Your Dream • Make Your Space Beautiful")
    whatsapp_number = models.CharField(max_length=20, default="918675108994", help_text="With country code, no spaces or special symbols e.g. 918675108994")
    phone_number = models.CharField(max_length=30, default="+91 86751 08994")
    email = models.EmailField(default="contact@thiyaguinterior.com")
    address = models.CharField(max_length=255, default="No. 45, Woodcraft Avenue, Chennai, Tamil Nadu - 600040")
    instagram_url = models.URLField(blank=True, default="https://instagram.com")
    facebook_url = models.URLField(blank=True, default="https://facebook.com")
    google_maps_url = models.URLField(blank=True, default="https://maps.google.com")

    def __str__(self):
        return f"Site Settings: {self.business_name}"
