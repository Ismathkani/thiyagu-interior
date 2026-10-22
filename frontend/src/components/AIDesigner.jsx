import React, { useState, useRef } from 'react';
import { 
  Sparkles, Upload, Wand2, RefreshCw, Download, 
  MessageSquare, Check, Layers, Image as ImageIcon,
  Eraser, Cpu, ArrowRight, ChevronLeft, Sliders
} from 'lucide-react';
import { transformAIDesign, getWhatsAppUrl } from '../api';

// Visual Style Cards with high-resolution interior representations
const STYLE_OPTIONS = [
  {
    name: 'Modern',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80',
    desc: 'Linen sectionals, walnut textures, matte black accents, and warm daylight.'
  },
  {
    name: 'Japandi',
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80',
    desc: 'Platform beds, earthy textiles, cane webbing, and minimalist calm.'
  },
  {
    name: 'Scandinavian',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
    desc: 'Light oak, crisp white cabinetry, quartz counters, and airy daylight.'
  },
  {
    name: 'Mid-Century Modern',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80',
    desc: 'Walnut desks, tapered legs, muted sage accents, and warm task lights.'
  },
  {
    name: 'Luxury',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    desc: 'Bookmatched marble, fluted wood paneling, velvet upholstery, gold trim.'
  },
  {
    name: 'Industrial',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80',
    desc: 'Exposed brick, black steel windows, warm cognac leather, concrete finish.'
  },
  {
    name: 'Coastal',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
    desc: 'White linen, jute rugs, washed timbers, and serene beach atmosphere.'
  },
  {
    name: 'Minimal',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80',
    desc: 'Micro-cement, handle-free custom joinery, hidden LED strip illumination.'
  },
  {
    name: 'Traditional',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80',
    desc: 'Ornate teak moldings, vintage brass pulls, warm Persian carpets, rich timber.'
  },
  {
    name: 'Contemporary',
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=600&q=80',
    desc: 'Curved silhouettes, fluted walnut partitions, recessed track lighting.'
  }
];

const ROOM_TYPES = [
  'Living Room',
  'Bedroom',
  'Kitchen',
  'Dining Room',
  'Bathroom',
  'Home Office',
  'Outdoor / Patio'
];

// One-tap quick sample rooms for users without an immediate photo
const SAMPLE_ROOMS = [
  { label: 'Unfurnished Living Room', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80', type: 'Living Room' },
  { label: 'Empty Bedroom Shell', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80', type: 'Bedroom' },
  { label: 'Raw Kitchen Space', url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1000&q=80', type: 'Kitchen' },
  { label: 'Empty Study Room', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80', type: 'Home Office' }
];

export default function AIDesigner({ settings }) {
  const [step, setStep] = useState(1);
  const [roomImage, setRoomImage] = useState(SAMPLE_ROOMS[0].url);
  const [roomType, setRoomType] = useState('Living Room');
  const [selectedStyle, setSelectedStyle] = useState('Modern');
  const [aiMode, setAiMode] = useState('redesign'); // 'redesign', 'empty_room', 'realistic_render'
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultData, setResultData] = useState(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);
  const sliderRef = useRef(null);

  // File Upload Handler (Mobile camera/gallery or Desktop drag-drop)
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setRoomImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Drag and drop events
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setRoomImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Generate Action with realistic progress simulation
  const handleGenerate = async () => {
    setIsGenerating(true);
    setProgress(15);
    setStep(4);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 92;
        }
        return prev + 18;
      });
    }, 400);

    try {
      const data = await transformAIDesign({
        room_type: roomType,
        interior_style: selectedStyle,
        mode: aiMode,
        original_image: roomImage
      });

      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setResultData(data);
        setIsGenerating(false);
        setStep(5); // Result view
      }, 500);
    } catch (err) {
      clearInterval(interval);
      setIsGenerating(false);
      alert('AI transformation encountered an issue. Using cached photorealistic render.');
      // Graceful fallback to guarantee user gets the experience
      setResultData({
        room_type: roomType,
        interior_style: selectedStyle,
        mode: aiMode,
        original_image: roomImage,
        generated_image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80',
        whatsapp_message: `Hi, I created an interior concept (${roomType} - ${selectedStyle}) using your AI designer and I'm interested in getting this design built by Thiyagu Interior. Please contact me.`
      });
      setStep(5);
    }
  };

  // Draggable slider interaction for Touch and Mouse
  const handleSliderMove = (clientX) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPos(percent);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleSliderMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleSliderMove(e.clientX);
  };

  const whatsappMessage = resultData?.whatsapp_message || 
    "Hi, I created an interior concept using your AI designer and I'm interested in getting this design built. Please contact me.";
  const whatsappUrl = getWhatsAppUrl(settings?.whatsapp_number, whatsappMessage);

  return (
    <section id="ai-designer" style={{ padding: '6rem 0', backgroundColor: '#F5EFE9' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', marginBottom: '0.75rem' }}>
            <span className="badge-gold">
              <Sparkles size={13} /> Thiyagu Interior AI Studio
            </span>
          </div>
          <h2 className="section-title">Visualize Your Dream Interior with AI</h2>
          <p className="section-subtitle">
            Upload your room and discover how your space could look before we build it. Powered by bespoke architectural prompts tailored for Indian homes and luxury spaces.
          </p>
        </div>

        {/* Studio Box */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid rgba(197, 160, 89, 0.25)',
            boxShadow: 'var(--shadow-lg)',
            overflow: 'hidden',
          }}
        >
          {/* Step Progress Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              backgroundColor: '#1E1C1A',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {[
              { num: 1, label: '1. Upload Photo' },
              { num: 2, label: '2. Room Type' },
              { num: 3, label: '3. Choose Style' },
              { num: 4, label: '4. AI Design' },
            ].map((s) => (
              <button
                key={s.num}
                onClick={() => {
                  if (step !== 4 && s.num < step) setStep(s.num);
                }}
                disabled={step === 4}
                style={{
                  padding: '1rem 0.5rem',
                  fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
                  fontWeight: 600,
                  textAlign: 'center',
                  color: (step >= s.num || (step === 5 && s.num === 4)) ? '#DFB76C' : '#878078',
                  backgroundColor: step === s.num ? 'rgba(197, 160, 89, 0.12)' : 'transparent',
                  borderBottom: step === s.num ? '3px solid #C5A059' : '3px solid transparent',
                  cursor: (step !== 4 && s.num < step) ? 'pointer' : 'default',
                  transition: 'all 0.2s ease',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div style={{ padding: 'clamp(1.25rem, 4vw, 3rem)' }}>
            
            {/* ================= STEP 1: UPLOAD PHOTO ================= */}
            {step === 1 && (
              <div className="animate-fade-in">
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Step 1: Upload Your Room Photo</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    Take a picture of your existing unfurnished room, or select one of our pre-loaded room templates.
                  </p>
                </div>

                {/* Upload Zone */}
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: '2px dashed #C5A059',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: '#FAF8F5',
                    transition: 'all 0.25s ease',
                    marginBottom: '2rem',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F5EFE9')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FAF8F5')}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    capture="environment"
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                  />

                  {roomImage ? (
                    <div style={{ maxWidth: '420px', margin: '0 auto' }}>
                      <img
                        src={roomImage}
                        alt="Selected Room"
                        style={{
                          width: '100%',
                          height: '240px',
                          objectFit: 'cover',
                          borderRadius: 'var(--radius-md)',
                          boxShadow: 'var(--shadow-md)',
                          marginBottom: '1rem',
                        }}
                      />
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#258448', fontWeight: 600, fontSize: '0.9rem' }}>
                        <Check size={18} /> Room photo ready! Click to change
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div
                        style={{
                          width: '64px',
                          height: '64px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(197, 160, 89, 0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 1rem auto',
                          color: '#C5A059',
                        }}
                      >
                        <Upload size={28} />
                      </div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                        Click to Upload or Drag & Drop Photo
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#7E766D' }}>
                        Supports JPG, PNG, WebP (or capture with phone camera)
                      </div>
                    </div>
                  )}
                </div>

                {/* Instant Sample Rooms */}
                <div style={{ marginBottom: '2.5rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#7E766D', marginBottom: '0.85rem' }}>
                    Or Pick a Ready Room Template:
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
                    {SAMPLE_ROOMS.map((sample) => (
                      <div
                        key={sample.label}
                        onClick={() => {
                          setRoomImage(sample.url);
                          setRoomType(sample.type);
                        }}
                        style={{
                          borderRadius: 'var(--radius-sm)',
                          overflow: 'hidden',
                          border: roomImage === sample.url ? '2px solid #C5A059' : '1px solid var(--border-light)',
                          cursor: 'pointer',
                          transition: 'transform 0.2s ease',
                          position: 'relative',
                        }}
                      >
                        <img src={sample.url} alt={sample.label} style={{ height: '90px', width: '100%', objectFit: 'cover' }} />
                        <div style={{ padding: '0.5rem', fontSize: '0.75rem', fontWeight: 600, backgroundColor: '#FFFFFF', textAlign: 'center' }}>
                          {sample.label}
                        </div>
                        {roomImage === sample.url && (
                          <div style={{ position: 'absolute', top: '6px', right: '6px', backgroundColor: '#C5A059', borderRadius: '50%', padding: '2px', color: '#FFFFFF' }}>
                            <Check size={12} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next Button */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => setStep(2)}
                    disabled={!roomImage}
                    className="btn btn-gold"
                    style={{ minWidth: '180px' }}
                  >
                    Next: Room Type <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* ================= STEP 2: ROOM TYPE ================= */}
            {step === 2 && (
              <div className="animate-fade-in">
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Step 2: Choose Room Type</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    Select the architectural space you are designing so the AI optimizes furniture ergonomics and layout.
                  </p>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                    gap: '1rem',
                    marginBottom: '2.5rem',
                  }}
                >
                  {ROOM_TYPES.map((type) => {
                    const isSelected = roomType === type;
                    return (
                      <button
                        key={type}
                        onClick={() => setRoomType(type)}
                        style={{
                          padding: '1.25rem 1rem',
                          borderRadius: 'var(--radius-md)',
                          border: isSelected ? '2px solid #C5A059' : '1px solid var(--border-light)',
                          backgroundColor: isSelected ? 'rgba(197, 160, 89, 0.1)' : '#FAF8F5',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontWeight: 600,
                          color: isSelected ? '#1A1918' : '#57524D',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <Layers size={22} color={isSelected ? '#C5A059' : '#878078'} />
                        <span>{type}</span>
                        {isSelected && <span style={{ fontSize: '0.7rem', color: '#C5A059', fontWeight: 700 }}>SELECTED</span>}
                      </button>
                    );
                  })}
                </div>

                {/* Back / Next */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button onClick={() => setStep(1)} className="btn btn-outline">
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button onClick={() => setStep(3)} className="btn btn-gold" style={{ minWidth: '180px' }}>
                    Next: Choose Style <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* ================= STEP 3: CHOOSE STYLE & AI TOOLS ================= */}
            {step === 3 && (
              <div className="animate-fade-in">
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Step 3: Select Interior Style & AI Mode</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    Pick your preferred luxury design style or select a specialized transformation tool.
                  </p>
                </div>

                {/* AI Specialized Modes Switcher */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                    marginBottom: '2.5rem',
                    backgroundColor: '#FAF8F5',
                    padding: '1rem',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-light)',
                  }}
                >
                  <div
                    onClick={() => setAiMode('redesign')}
                    style={{
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: aiMode === 'redesign' ? '#FFFFFF' : 'transparent',
                      boxShadow: aiMode === 'redesign' ? 'var(--shadow-sm)' : 'none',
                      border: aiMode === 'redesign' ? '1.5px solid #C5A059' : '1.5px solid transparent',
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                  >
                    <Wand2 size={22} color="#C5A059" style={{ margin: '0 auto 0.4rem auto' }} />
                    <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>Redesign Room Style</div>
                    <div style={{ fontSize: '0.75rem', color: '#7E766D', marginTop: '0.2rem' }}>
                      Keeps walls/doors, transforms furniture & lighting
                    </div>
                  </div>

                  <div
                    onClick={() => setAiMode('empty_room')}
                    style={{
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: aiMode === 'empty_room' ? '#FFFFFF' : 'transparent',
                      boxShadow: aiMode === 'empty_room' ? 'var(--shadow-sm)' : 'none',
                      border: aiMode === 'empty_room' ? '1.5px solid #C5A059' : '1.5px solid transparent',
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                  >
                    <Eraser size={22} color="#C5A059" style={{ margin: '0 auto 0.4rem auto' }} />
                    <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>"Empty My Room"</div>
                    <div style={{ fontSize: '0.75rem', color: '#7E766D', marginTop: '0.2rem' }}>
                      Declutters furniture while preserving architecture
                    </div>
                  </div>

                  <div
                    onClick={() => setAiMode('realistic_render')}
                    style={{
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: aiMode === 'realistic_render' ? '#FFFFFF' : 'transparent',
                      boxShadow: aiMode === 'realistic_render' ? 'var(--shadow-sm)' : 'none',
                      border: aiMode === 'realistic_render' ? '1.5px solid #C5A059' : '1.5px solid transparent',
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                  >
                    <Cpu size={22} color="#C5A059" style={{ margin: '0 auto 0.4rem auto' }} />
                    <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>Realistic Render</div>
                    <div style={{ fontSize: '0.75rem', color: '#7E766D', marginTop: '0.2rem' }}>
                      Transforms 3D sketch or clay model into photoreal room
                    </div>
                  </div>
                </div>

                {/* Visual Style Cards */}
                <div style={{ marginBottom: '2.5rem' }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', color: '#1A1918' }}>
                    Choose Style Direction:
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                      gap: '1.25rem',
                    }}
                  >
                    {STYLE_OPTIONS.map((st) => {
                      const isSelected = selectedStyle === st.name;
                      return (
                        <div
                          key={st.name}
                          onClick={() => setSelectedStyle(st.name)}
                          style={{
                            borderRadius: 'var(--radius-md)',
                            overflow: 'hidden',
                            border: isSelected ? '2px solid #C5A059' : '1px solid var(--border-light)',
                            boxShadow: isSelected ? 'var(--shadow-gold)' : 'var(--shadow-sm)',
                            cursor: 'pointer',
                            backgroundColor: '#FFFFFF',
                            transition: 'all 0.25s ease',
                            transform: isSelected ? 'translateY(-3px)' : 'none',
                          }}
                        >
                          <div style={{ height: '130px', position: 'relative' }}>
                            <img src={st.image} alt={st.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            {isSelected && (
                              <div
                                style={{
                                  position: 'absolute',
                                  top: '8px',
                                  right: '8px',
                                  backgroundColor: '#C5A059',
                                  borderRadius: '50%',
                                  padding: '4px',
                                  color: '#FFFFFF',
                                }}
                              >
                                <Check size={14} />
                              </div>
                            )}
                          </div>
                          <div style={{ padding: '0.85rem' }}>
                            <div style={{ fontWeight: 700, fontSize: '1rem', color: isSelected ? '#8C6A2E' : '#1A1918' }}>
                              {st.name}
                            </div>
                            <div style={{ fontSize: '0.74rem', color: '#78726A', marginTop: '0.25rem', lineHeight: 1.4 }}>
                              {st.desc}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Back / Generate */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button onClick={() => setStep(2)} className="btn btn-outline">
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button onClick={handleGenerate} className="btn btn-gold" style={{ padding: '1rem 2.2rem', fontSize: '1.05rem' }}>
                    <Sparkles size={18} /> Generate AI Interior Design
                  </button>
                </div>
              </div>
            )}

            {/* ================= STEP 4: GENERATION LOADING ================= */}
            {step === 4 && (
              <div style={{ textAlign: 'center', padding: '4rem 1rem' }} className="animate-fade-in">
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'var(--gold-gradient)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 2rem auto',
                    boxShadow: 'var(--shadow-gold)',
                    animation: 'pulseFloat 2s infinite ease-in-out',
                  }}
                >
                  <Sparkles size={38} color="#1A1918" />
                </div>

                <h3 style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>
                  Architecting Your {selectedStyle} {roomType}...
                </h3>
                <p style={{ color: '#7E766D', maxWidth: '500px', margin: '0 auto 2rem auto', fontSize: '0.95rem' }}>
                  Preserving room perspective and dimensions while rendering custom walnut carpentry, modular fittings, and bespoke lighting.
                </p>

                {/* Progress Bar */}
                <div
                  style={{
                    width: '100%',
                    maxWidth: '460px',
                    height: '10px',
                    backgroundColor: '#EBE5DE',
                    borderRadius: '9999px',
                    margin: '0 auto 1.5rem auto',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${progress}%`,
                      height: '100%',
                      background: 'var(--gold-gradient)',
                      transition: 'width 0.4s ease',
                    }}
                  />
                </div>

                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#C5A059' }}>
                  {progress}% Complete
                </div>
              </div>
            )}

            {/* ================= STEP 5: RESULT PAGE & BEFORE/AFTER SLIDER ================= */}
            {step === 5 && resultData && (
              <div className="animate-fade-in">
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <span className="badge-gold">
                      {resultData.interior_style} Style • {resultData.room_type}
                    </span>
                    <h3 style={{ fontSize: '1.6rem', marginTop: '0.4rem' }}>
                      Your AI Designed Space
                    </h3>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => setStep(3)}
                      className="btn btn-outline"
                      style={{ padding: '0.65rem 1.1rem', fontSize: '0.85rem' }}
                    >
                      <Sliders size={15} /> Change Style
                    </button>
                    <button
                      onClick={() => setStep(1)}
                      className="btn btn-outline"
                      style={{ padding: '0.65rem 1.1rem', fontSize: '0.85rem' }}
                    >
                      <RefreshCw size={15} /> Start New
                    </button>
                  </div>
                </div>

                {/* Interactive Before / After Comparison Slider */}
                <div
                  ref={sliderRef}
                  className="ba-slider-container"
                  style={{ height: 'clamp(320px, 50vw, 540px)', marginBottom: '2rem' }}
                  onMouseDown={() => setIsDragging(true)}
                  onMouseUp={() => setIsDragging(false)}
                  onMouseLeave={() => setIsDragging(false)}
                  onMouseMove={handleMouseMove}
                  onTouchStart={() => setIsDragging(true)}
                  onTouchEnd={() => setIsDragging(false)}
                  onTouchMove={handleTouchMove}
                >
                  {/* Generated After Image (Full Background) */}
                  <img
                    src={resultData.generated_image}
                    alt="AI Generated Design"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />

                  {/* Original Before Image (Clipped overlay) */}
                  <div
                    className="ba-before-wrapper"
                    style={{ width: `${sliderPos}%` }}
                  >
                    <img
                      src={resultData.original_image}
                      alt="Original Room"
                      style={{
                        width: sliderRef.current ? `${sliderRef.current.clientWidth}px` : '1000px',
                        maxWidth: 'none',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>

                  {/* Tags */}
                  <div className="ba-tag ba-tag-before">Original Room</div>
                  <div className="ba-tag ba-tag-after">AI Generated Design</div>

                  {/* Slider Divider Handle */}
                  <div
                    className="ba-handle"
                    style={{ left: `${sliderPos}%` }}
                  >
                    <div className="ba-handle-btn">
                      <Sliders size={18} />
                    </div>
                  </div>
                </div>

                {/* Prompt Info */}
                <div
                  style={{
                    backgroundColor: '#FAF8F5',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    fontSize: '0.86rem',
                    color: '#655E57',
                    marginBottom: '2rem',
                    lineHeight: 1.5,
                  }}
                >
                  <strong style={{ color: '#1A1918' }}>Craftsmanship Prompt:</strong> {resultData.prompt_used}
                </div>

                {/* Action Buttons & Major CTA */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                  }}
                >
                  {/* Key CTA: Get This Interior Built -> opens WhatsApp */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-gold"
                    style={{
                      width: '100%',
                      padding: '1.15rem',
                      fontSize: '1.1rem',
                      justifyContent: 'center',
                    }}
                  >
                    <MessageSquare size={22} fill="#1A1918" />
                    Get This Interior Built by Thiyagu Interior
                  </a>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
                    <a
                      href={resultData.generated_image}
                      target="_blank"
                      download={`thiyagu_interior_${resultData.room_type}.jpg`}
                      className="btn btn-outline"
                      style={{ justifyContent: 'center' }}
                    >
                      <Download size={16} /> Download Design
                    </a>

                    <button
                      onClick={handleGenerate}
                      className="btn btn-outline"
                      style={{ justifyContent: 'center' }}
                    >
                      <RefreshCw size={16} /> Generate Again
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
