import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth.models import User
from django.utils.text import slugify
from api.models import Project, ProjectImage, Service, Testimonial, SiteSetting

def run():
    print("[*] Seeding Thiyagu Interior database...")

    # 1. Superuser
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@thiyaguinterior.com', 'admin123')
        print("[+] Superuser created: admin / admin123")
    else:
        print("[+] Superuser admin already exists.")

    # 2. Site Setting
    SiteSetting.objects.all().delete()
    SiteSetting.objects.create(
        business_name="Thiyagu Interior",
        tagline="Designs Your Dream • Make Your Space Beautiful",
        whatsapp_number="918675108994",
        phone_number="+91 86751 08994",
        email="contact@thiyaguinterior.com",
        address="No. 45, Woodcraft Avenue, Chennai, Tamil Nadu - 600040",
        instagram_url="https://instagram.com",
        facebook_url="https://facebook.com",
        google_maps_url="https://maps.google.com"
    )
    print("[+] Site settings configured.")

    # 3. Services (All 10 required services)
    Service.objects.all().delete()
    services_data = [
        {
            "title": "Modular Kitchen",
            "short_description": "Ergonomic, heat & water-resistant kitchens built with boiling-water-proof ply, soft-close Blum hinges, and quartz countertops.",
            "image": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
            "starting_price": "From ₹1.75 Lakhs",
            "key_features": "Hydraulic lift-ups, Tandem box drawers, Corner carousel units, Quartz splashback, 10-Year Warranty",
            "order": 1
        },
        {
            "title": "Custom Wardrobes",
            "short_description": "Floor-to-ceiling customized wardrobes, sliding aluminum profiles, walk-in closets, and built-in dresser units.",
            "image": "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
            "starting_price": "From ₹85,000",
            "key_features": "Soft-close sliding, Integrated sensor LED strips, Velvet accessory trays, Concealed vanity",
            "order": 2
        },
        {
            "title": "Living Room Interiors",
            "short_description": "Luxurious living spaces featuring acoustic fluted wood paneling, designer partitions, and custom focal walls.",
            "image": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
            "starting_price": "From ₹1.2 Lakhs",
            "key_features": "Charcoal fluted slats, Veneer accents, Ambient cove lighting, Floating marble ledges",
            "order": 3
        },
        {
            "title": "Bedroom Interiors",
            "short_description": "Serene bedroom sanctuaries with custom upholstered headboards, seamless wall paneling, and floating nightstands.",
            "image": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
            "starting_price": "From ₹1.1 Lakhs",
            "key_features": "Acoustic fabric headboard, Integrated ambient illumination, Hidden wire channels, PU matte finish",
            "order": 4
        },
        {
            "title": "TV Units",
            "short_description": "Contemporary entertainment consoles with stone-finish louvers, floating credenzas, and zero-wire visual management.",
            "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
            "starting_price": "From ₹45,000",
            "key_features": "Backlit Italian marble finish, Fluted walnut accents, Concealed HDMI conduit, Soft-push drawers",
            "order": 5
        },
        {
            "title": "False Ceiling",
            "short_description": "Architectural gypsum false ceilings, perimeter warm cove lighting, and magnetic track light integrations.",
            "image": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
            "starting_price": "From ₹110 / sq.ft",
            "key_features": "Saint-Gobain Gyproc, 3000K warm cove strips, Magnetic recessed tracks, Zero crack guarantee",
            "order": 6
        },
        {
            "title": "Office Interiors",
            "short_description": "Productive home offices and executive suites featuring ergonomic solid wood desks and acoustic bookshelf wall units.",
            "image": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
            "starting_price": "From ₹75,000",
            "key_features": "Solid walnut workstation, Cable management grommets, Display shelving with warm spotlights",
            "order": 7
        },
        {
            "title": "Custom Furniture",
            "short_description": "Bespoke handcrafted carpentry: teak dining tables, custom credenzas, bar cabinets, and artistic consoles.",
            "image": "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80",
            "starting_price": "Custom Quote",
            "key_features": "100% Seasoned Teak & Walnut, Hand-rubbed organic oil polish, Mortise and tenon joinery",
            "order": 8
        },
        {
            "title": "Renovation",
            "short_description": "Full structural and woodwork restoration, revamping old apartments into state-of-the-art modern living spaces.",
            "image": "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
            "starting_price": "From ₹2.5 Lakhs",
            "key_features": "Complete demolition & rebuild, Flooring replacement, Electrical & plumbing re-routing",
            "order": 9
        },
        {
            "title": "Complete Home Interior",
            "short_description": "End-to-end turnkey interior solutions: 3D design, precision factory manufacturing, on-site carpentry, and final handover.",
            "image": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
            "starting_price": "From ₹4.5 Lakhs (2BHK/3BHK)",
            "key_features": "Turnkey delivery in 45 days, Dedicated site supervisor, Deep cleaning before handover",
            "order": 10
        }
    ]

    for s in services_data:
        Service.objects.create(
            title=s["title"],
            slug=slugify(s["title"]),
            short_description=s["short_description"],
            image=s["image"],
            starting_price=s["starting_price"],
            key_features=s["key_features"],
            order=s["order"]
        )
    print(f"[+] {len(services_data)} Services created.")

    # 4. Completed Projects with Before & After images
    Project.objects.all().delete()
    projects_data = [
        {
            "title": "The Grand Walnut Residence",
            "category": "Living Room",
            "location": "Anna Nagar, Chennai",
            "short_description": "A magnificent open-plan living and dining hall featuring floor-to-ceiling smoked walnut wall paneling and custom credenzas.",
            "client_requirement": "Client wanted an ultra-luxurious, warm living space for hosting guests, with hidden wiring, natural wood tones, and ambient mood lighting.",
            "materials_used": "Natural American Walnut Veneer, High-density HDF, Hafele soft-push hardware, 2800K LED warm architectural cove.",
            "cover_image": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
            "before_image": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
            "after_image": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
            "is_featured": True,
            "gallery": [
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80"
            ]
        },
        {
            "title": "Chef's Delight Modular Kitchen",
            "category": "Kitchen",
            "location": "Adyar, Chennai",
            "short_description": "U-shaped modular kitchen with anti-scratch acrylic shutters, calacatta gold quartz worktop, and dedicated spice pull-outs.",
            "client_requirement": "Homeowner required maximum ergonomic storage, zero oil staining risk, and a sleek island breakfast counter for morning coffee.",
            "materials_used": "710 Marine Grade BWP Plywood, 1.5mm High-Gloss Acrylic, Blum Tandembox Antaro drawers, Faber chimney integration.",
            "cover_image": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
            "before_image": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
            "after_image": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
            "is_featured": True,
            "gallery": [
                "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80"
            ]
        },
        {
            "title": "Minimalist Japandi Master Suite",
            "category": "Bedroom",
            "location": "ECR Beach Road, Chennai",
            "short_description": "Soothing master bedroom featuring a custom low-profile oak platform bed, cane-fluted accents, and hidden cove lighting.",
            "client_requirement": "Client sought a tranquil, clutter-free haven inspired by Japanese minimalism and Scandinavian warmth.",
            "materials_used": "European White Oak, Natural hand-woven cane webbing, PU matte clear coat, linen wall upholstery.",
            "cover_image": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
            "before_image": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
            "after_image": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
            "is_featured": True,
            "gallery": [
                "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80"
            ]
        },
        {
            "title": "Floor-to-Ceiling Walk-in Wardrobe",
            "category": "Wardrobe",
            "location": "Velachery, Chennai",
            "short_description": "Bespoke 10-foot tall glass and dark walnut wardrobe with automated sensor lights and velvet-lined jewelry drawers.",
            "client_requirement": "Complete his-and-hers separate organizing compartments, tie racks, shoe carousels, and mirror finish sliding doors.",
            "materials_used": "Ebony stained veneer, Black anodized aluminum glass profiles, Bronze fluted glass, Hettich sliding fittings.",
            "cover_image": "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
            "before_image": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
            "after_image": "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
            "is_featured": True,
            "gallery": [
                "https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=800&q=80"
            ]
        },
        {
            "title": "Floating Acoustic TV & Media Wall",
            "category": "TV Unit",
            "location": "Nungambakkam, Chennai",
            "short_description": "Integrated 75-inch TV entertainment unit with sound-absorbing charcoal acoustic louvers and floating marble shelf.",
            "client_requirement": "Clean theatrical look with completely invisible wiring for consoles, soundbar, and router.",
            "materials_used": "Statuario composite quartz slab, Charcoal acoustic felt louvers, Push-to-open floating credenza.",
            "cover_image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
            "before_image": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
            "after_image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
            "is_featured": True,
            "gallery": [
                "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80"
            ]
        },
        {
            "title": "Executive Walnut Home Library & Office",
            "category": "Office",
            "location": "Alwarpet, Chennai",
            "short_description": "A tailored home workspace featuring a solid walnut executive desk, perimeter bookshelves, and warm reading nooks.",
            "client_requirement": "Quiet work sanctuary suitable for daily video conferences, with ample book storage and warm illumination.",
            "materials_used": "Solid Walnut & Teak, Brass hardware accents, Matte sage acoustic wall panels, Integrated cable grommets.",
            "cover_image": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
            "before_image": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
            "after_image": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
            "is_featured": True,
            "gallery": [
                "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
            ]
        },
        {
            "title": "Artisanal Teak Wood Dining Suite",
            "category": "Furniture",
            "location": "Kilpauk, Chennai",
            "short_description": "Handcrafted 8-seater live-edge teak dining table accompanied by custom upholstered ergonomic dining chairs.",
            "client_requirement": "Heirloom-grade carpentry table that showcases natural timber grains and will last for generations.",
            "materials_used": "100% Single-slab Reclaimed Teak, Matte polyurethane sealant, Hand-stitched cognac leather.",
            "cover_image": "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80",
            "before_image": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
            "after_image": "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80",
            "is_featured": True,
            "gallery": [
                "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80"
            ]
        },
        {
            "title": "Turnkey 3BHK Luxury Villa Interior",
            "category": "Complete Home",
            "location": "OMR, Chennai",
            "short_description": "Comprehensive turnkey interior spanning 2,800 sq.ft: modular kitchen, 3 designer bedrooms, foyer wooden rafters, and false ceilings.",
            "client_requirement": "Complete end-to-end design and execution within 50 days before the family's housewarming ceremony.",
            "materials_used": "IS:710 Marine Ply, Merino High-Pressure Laminates, Hettich hardware, Saint-Gobain ceilings.",
            "cover_image": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
            "before_image": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
            "after_image": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
            "is_featured": True,
            "gallery": [
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
            ]
        }
    ]

    for p in projects_data:
        gallery_images = p.pop('gallery', [])
        project = Project.objects.create(
            title=p["title"],
            slug=slugify(p["title"]),
            category=p["category"],
            location=p["location"],
            short_description=p["short_description"],
            client_requirement=p["client_requirement"],
            materials_used=p["materials_used"],
            cover_image=p["cover_image"],
            before_image=p["before_image"],
            after_image=p["after_image"],
            is_featured=p["is_featured"]
        )
        for idx, img_url in enumerate(gallery_images):
            ProjectImage.objects.create(
                project=project,
                image=img_url,
                caption=f"{project.title} Detail {idx+1}",
                order=idx+1
            )
    print(f"[+] {len(projects_data)} Projects created.")

    # 5. Verified Client Reviews
    Testimonial.objects.all().delete()
    testimonials_data = [
        {
            "client_name": "Karthik Subramanian",
            "location": "Anna Nagar, Chennai",
            "rating": 5,
            "review": "Thiyagu Interior completely exceeded our expectations! Their carpentry team took care of every mm of our modular kitchen and living room TV unit. The quality of walnut finish and soft-close fittings is truly five-star.",
            "project_type": "Complete 3BHK Turnkey Interior",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
        },
        {
            "client_name": "Priya & Rajesh Narayanan",
            "location": "Adyar, Chennai",
            "rating": 5,
            "review": "The AI Room visualizer on their site helped us see our kitchen concept before approving the quote. The final finish matches the 3D render 100%. Handover was done 4 days ahead of schedule!",
            "project_type": "Modular Kitchen & Wardrobes",
            "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
        },
        {
            "client_name": "Dr. Ananya Sundaram",
            "location": "OMR, Chennai",
            "rating": 5,
            "review": "Bespoke craftsmanship at its finest. Master carpenter Thiyagu and his crew built our master bedroom platform bed and study unit with extreme precision. Transparent pricing with zero hidden costs.",
            "project_type": "Master Bedroom & Study Room",
            "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
        },
        {
            "client_name": "Venkatesh Raghavan",
            "location": "Velachery, Chennai",
            "rating": 5,
            "review": "Their attention to wood grain selection and edge-banding is what sets them apart from regular interior firms. Very polite team, neat site work, and hassle-free WhatsApp communication throughout.",
            "project_type": "Living Room & False Ceiling",
            "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
        }
    ]

    for t in testimonials_data:
        Testimonial.objects.create(
            client_name=t["client_name"],
            location=t["location"],
            rating=t["rating"],
            review=t["review"],
            project_type=t["project_type"],
            avatar=t["avatar"]
        )
    print(f"[+] {len(testimonials_data)} Testimonials created.")
    print("[+] Database seeding completed successfully!")

if __name__ == '__main__':
    run()
