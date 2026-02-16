import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  User, 
  Calendar, 
  Award, 
  Download, 
  LogOut, 
  Ticket, 
  Music, 
  Mic, 
  Code, 
  Palette, 
  Sparkles, 
  Star,
  CheckCircle,
  Phone,
  Smartphone,
  X,
  ArrowRight,
  Lock,
  BookOpen,
  Briefcase,
  FileSpreadsheet,
  QrCode,
  Crown,
  Gem,
  KeyRound,
  ShieldCheck,
  Gamepad2,
  Video,
  Gift,
  MessageSquare
} from 'lucide-react';

// --- Constants & Mock Data ---

const QUOTES = [
  "Rights. Justice. Action. For ALL Women and Girls.",
  "Here's to strong women: May we know them. May we be them. May we raise them.",
  "There is no limit to what we, as women, can accomplish.",
  "A woman is the full circle. Within her is the power to create, nurture and transform.",
  "She believed she could, so she did.",
  "Grace. Dignity. Power. You are everything.",
  "Empower a woman, empower a nation.",
  "Women are the real architects of society.",
  "A girl should be two things: who and what she wants.",
  "The future is female.",
  "Celebrate her today, respect her every day."
];

// --- STUDENT EVENTS (Original) ---
const STUDENT_EVENTS = [
  {
    id: 1,
    title: "Rhythm Queens",
    type: "Dance",
    category: "Both",
    maxTeamSize: 4,
    icon: <Music className="w-6 h-6" />,
    description: "Showcase your moves! Solo or group dance battle.",
    color: "from-pink-500 to-rose-500",
    theme: "royal-gold"
  },
  {
    id: 2,
    title: "Melody Muses",
    type: "Singing",
    category: "Solo",
    maxTeamSize: 1,
    icon: <Mic className="w-6 h-6" />,
    description: "The voice of the year. Solo vocal performance.",
    color: "from-red-500 to-orange-500",
    theme: "platinum-elite"
  },
  {
    id: 3,
    title: "Tech Diva",
    type: "Hackathon",
    category: "Team",
    maxTeamSize: 4,
    icon: <Code className="w-6 h-6" />,
    description: "2-hour coding sprint. Solve real-world problems.",
    color: "from-purple-500 to-indigo-500",
    theme: "cyber-diamond"
  },
  {
    id: 4,
    title: "Canvas Magic",
    type: "Art",
    category: "Solo",
    maxTeamSize: 1,
    icon: <Palette className="w-6 h-6" />,
    description: "Live painting competition. Theme: 'Empowerment'.",
    color: "from-yellow-500 to-amber-600",
    theme: "golden-frame"
  },
  {
    id: 5,
    title: "Drama Queens",
    type: "Skit",
    category: "Team",
    maxTeamSize: 4,
    icon: <Sparkles className="w-6 h-6" />,
    description: "Theatrical performance. Express yourself.",
    color: "from-teal-500 to-emerald-500",
    theme: "theatre-red"
  },
  {
    id: 6,
    title: "Fashionista",
    type: "Ramp Walk",
    category: "Solo",
    maxTeamSize: 1,
    icon: <Star className="w-6 h-6" />,
    description: "Elegance on the ramp. Theme: 'Traditional Twist'.",
    color: "from-fuchsia-500 to-pink-600",
    theme: "rose-gold"
  }
];

// --- TEACHER EVENTS (New from Schedule) ---
// IDs start at 100 to avoid conflict
const TEACHER_EVENTS = [
  {
    id: 101,
    title: "Fun Games",
    type: "Entertainment",
    category: "Both", // Assuming both for fun games
    maxTeamSize: 4,
    icon: <Gamepad2 className="w-6 h-6" />,
    description: "Feb 25 | 9:30 AM - 11:00 AM. Interactive fun activities.",
    color: "from-teal-500 to-green-500",
    theme: "cyber-diamond"
  },
  {
    id: 102,
    title: "Dumb Charades",
    type: "Acting",
    category: "Team",
    maxTeamSize: 4,
    icon: <Sparkles className="w-6 h-6" />,
    description: "Feb 25 | 2:00 PM - 4:00 PM. Act it out, let them guess!",
    color: "from-violet-500 to-purple-500",
    theme: "theatre-red"
  },
  {
    id: 103,
    title: "Reels",
    type: "Digital",
    category: "Solo",
    maxTeamSize: 1,
    icon: <Video className="w-6 h-6" />,
    description: "Feb 26 | 9:30 AM - 11:00 AM. Create creative short videos.",
    color: "from-pink-500 to-rose-500",
    theme: "rose-gold"
  },
  {
    id: 104,
    title: "Lucky Corner",
    type: "Luck",
    category: "Solo",
    maxTeamSize: 1,
    icon: <Gift className="w-6 h-6" />,
    description: "Feb 26 | 1:00 PM - 1:30 PM. Test your luck!",
    color: "from-amber-400 to-yellow-500",
    theme: "golden-frame"
  },
  {
    id: 105,
    title: "Debate",
    type: "Speaking",
    category: "Solo",
    maxTeamSize: 1,
    icon: <MessageSquare className="w-6 h-6" />,
    description: "Feb 26 | 2:00 PM - 4:00 PM. Voice your opinions.",
    color: "from-red-500 to-orange-500",
    theme: "platinum-elite"
  },
  {
    id: 106,
    title: "Singing - Solo",
    type: "Music",
    category: "Solo",
    maxTeamSize: 1,
    icon: <Mic className="w-6 h-6" />,
    description: "Feb 27 | 9:30 AM - 11:00 AM. Solo vocal performance.",
    color: "from-blue-500 to-cyan-500",
    theme: "royal-gold"
  },
  {
    id: 107,
    title: "Singing - Group",
    type: "Music",
    category: "Team",
    maxTeamSize: 6,
    icon: <Music className="w-6 h-6" />,
    description: "Feb 27 | 11:00 AM - 12:30 PM. Group harmony.",
    color: "from-indigo-500 to-blue-600",
    theme: "royal-gold"
  },
  {
    id: 108,
    title: "Dance - Solo",
    type: "Dance",
    category: "Solo",
    maxTeamSize: 1,
    icon: <Star className="w-6 h-6" />,
    description: "Feb 27 | 1:30 PM - 2:30 PM. Solo dance performance.",
    color: "from-fuchsia-500 to-pink-600",
    theme: "rose-gold"
  },
  {
    id: 109,
    title: "Dance - Group",
    type: "Dance",
    category: "Team",
    maxTeamSize: 8,
    icon: <Users className="w-6 h-6" />,
    description: "Feb 27 | 2:30 PM - 4:00 PM. Group choreography.",
    color: "from-rose-500 to-red-600",
    theme: "theatre-red"
  }
];

// --- Styles (Light Mode Premium & Luxury Ticket Styles) ---
const CustomStyles = () => (
  <style>{`
    @keyframes gradient-xy {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    
    /* Dynamic Background Animation */
    .animate-gradient-bg {
      background: linear-gradient(-45deg, #ffe4e6, #fae8ff, #fff7ed, #ecfccb, #ffe4e6);
      background-size: 400% 400%;
      animation: gradient-xy 12s ease infinite;
    }
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    
    /* Hide Default Cursor on Desktop */
    @media (min-width: 768px) {
      body, a, button, input {
        cursor: none !important;
      }
    }

    .glass-panel {
      background: rgba(255, 255, 255, 0.65);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(255, 255, 255, 0.9);
      box-shadow: 0 8px 32px 0 rgba(169, 58, 86, 0.15);
    }
    .glass-card {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.8);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .glass-card:hover {
      background: rgba(255, 255, 255, 0.95);
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 20px 40px rgba(244, 63, 94, 0.2);
      border-color: #fff;
    }
    .premium-text {
      background: linear-gradient(to right, #9f1239, #db2777, #9f1239);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      background-size: 200% auto;
      animation: gradient-xy 3s linear infinite;
    }
    /* 3D Text Animation */
    .text-3d-float {
      color: #be123c;
      text-shadow: 
        0 1px 0 #fda4af, 
        0 2px 0 #fda4af, 
        0 3px 0 #fda4af, 
        0 4px 0 #fda4af, 
        0 6px 1px rgba(0,0,0,0.1), 
        0 0 5px rgba(0,0,0,0.1), 
        0 1px 3px rgba(0,0,0,0.3);
      animation: float 4s ease-in-out infinite alternate;
    }
    .input-field {
      background: rgba(255,255,255,0.6);
      border: 1px solid rgba(255,255,255,0.8);
      color: #881337; 
      transition: all 0.2s;
    }
    .input-field::placeholder {
      color: rgba(136, 19, 55, 0.4);
    }
    .input-field:focus {
      background: rgba(255,255,255,0.95);
      border-color: #f472b6;
      box-shadow: 0 0 0 4px rgba(244, 114, 182, 0.1);
      outline: none;
    }
    
    /* --- LUXURY TICKET TEXTURES & GRADIENTS --- */
    
    /* Text Gradients */
    .text-gold-gradient {
      background: linear-gradient(to bottom, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      text-shadow: 0px 1px 2px rgba(0,0,0,0.3);
    }
    .text-silver-gradient {
      background: linear-gradient(to bottom, #C0C0C0, #EAEAEA, #8899A6, #EAEAEA, #C0C0C0);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      text-shadow: 0px 1px 2px rgba(0,0,0,0.3);
    }
    .text-diamond-gradient {
      background: linear-gradient(to bottom, #E0F7FA, #FFFFFF, #B2EBF2, #FFFFFF, #E0F7FA);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      text-shadow: 0 0 5px rgba(255,255,255,0.5);
    }
    .text-rose-gold-gradient {
      background: linear-gradient(to bottom, #DF9C9D, #FFD1D1, #B76E79, #FFD1D1, #DF9C9D);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    /* Ticket Bases */
    .ticket-base {
      position: relative;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      transition: transform 0.3s;
    }
    
    /* Theme: Royal Gold */
    .theme-royal-gold {
      background: radial-gradient(circle at center, #1a1a1a 0%, #000000 100%);
      border: 2px solid #BF953F;
      border-image: linear-gradient(to right, #BF953F, #FCF6BA, #BF953F) 1;
    }
    .theme-royal-gold::before {
      content: '';
      position: absolute;
      top: 4px; left: 4px; right: 4px; bottom: 4px;
      border: 1px solid #BF953F;
      opacity: 0.5;
    }

    /* Theme: Platinum Elite */
    .theme-platinum-elite {
      background: radial-gradient(circle at center, #3a3a3a 0%, #111 100%);
      border: 2px solid #C0C0C0;
      box-shadow: 0 0 15px rgba(192,192,192,0.3);
    }
    .theme-platinum-elite::after {
      content: '';
      position: absolute;
      top: -50%; left: -50%; width: 200%; height: 200%;
      background: linear-gradient(45deg, transparent 45%, rgba(255,255,255,0.1) 50%, transparent 55%);
      animation: shimmer 4s infinite linear;
    }

    /* Theme: Cyber Diamond */
    .theme-cyber-diamond {
      background: radial-gradient(circle at 80% 20%, #002244 0%, #000 100%);
      border: 1px solid #00BFFF;
      box-shadow: 0 0 20px rgba(0, 191, 255, 0.2);
    }
    .theme-cyber-diamond .diamond-accent {
      background: linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1));
      backdrop-filter: blur(5px);
      border: 1px solid rgba(255,255,255,0.3);
    }

    /* Theme: Golden Frame */
    .theme-golden-frame {
      background: #0f0f0f;
      border: 8px solid #000;
      box-shadow: inset 0 0 0 2px #d4af37;
    }
    .ornament-corner {
      position: absolute;
      width: 40px; height: 40px;
      border-top: 3px solid #d4af37;
      border-left: 3px solid #d4af37;
    }

    /* Theme: Theatre Red */
    .theme-theatre-red {
      background: radial-gradient(circle, #500000 0%, #2b0000 100%);
      border-top: 4px solid #d4af37;
      border-bottom: 4px solid #d4af37;
    }
    
    /* Theme: Rose Gold */
    .theme-rose-gold {
      background: linear-gradient(135deg, #2c1a1a 0%, #000 100%);
      border: 1px solid #B76E79;
    }

    /* Print Styles */
    @media print {
      body * { visibility: hidden; }
      body { cursor: auto !important; } /* Restore cursor for print dialog */
      .ticket-container, .ticket-container * { visibility: visible; }
      .ticket-container {
        position: fixed;
        left: 50%; top: 50%;
        transform: translate(-50%, -50%) scale(1);
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: white;
        height: 100vh;
      }
      .print-hide { display: none !important; }
      * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    }
  `}</style>
);

// --- Components ---

// 0. Custom Cursor Component (Circle Style)
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    // Only enable logic on non-touch devices to save performance
    if (window.matchMedia("(pointer: fine)").matches) {
      const moveCursor = (e) => {
        const { clientX, clientY } = e;
        
        // Main cursor (Circle)
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
        }
        
        // Follower (Larger Circle) - Set position directly
        if (followerRef.current) {
           followerRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
        }
      };

      const handleMouseOver = (e) => {
        // Expand cursor on interactive elements
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('button') || e.target.closest('input')) {
          followerRef.current?.classList.add('scale-125', 'bg-rose-500/10', 'border-rose-500');
          followerRef.current?.classList.remove('scale-100', 'border-rose-300');
          cursorRef.current?.classList.add('scale-50'); 
        } else {
          followerRef.current?.classList.remove('scale-125', 'bg-rose-500/10', 'border-rose-500');
          followerRef.current?.classList.add('scale-100', 'border-rose-300');
          cursorRef.current?.classList.remove('scale-50');
        }
      };

      window.addEventListener('mousemove', moveCursor);
      window.addEventListener('mouseover', handleMouseOver);

      return () => {
        window.removeEventListener('mousemove', moveCursor);
        window.removeEventListener('mouseover', handleMouseOver);
      };
    }
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block overflow-hidden">
      {/* Main Circle */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-3 h-3 bg-rose-600 rounded-full shadow-[0_0_15px_rgba(225,29,72,0.9)] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out will-change-transform"
      />
      {/* Trailing Circle Frame */}
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-12 h-12 border border-rose-300 rounded-full transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) -translate-x-1/2 -translate-y-1/2 will-change-transform"
      />
    </div>
  );
};

// 1. Auth Component (Login/Signup/Forgot)
const Auth = ({ users, onLogin, onRegisterUser, onResetPassword }) => {
  const [mode, setMode] = useState('login'); // 'login', 'signup', 'forgot'
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [currentQuote, setCurrentQuote] = useState('');
  
  // Set random quote on mount
  useEffect(() => {
    const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    setCurrentQuote(randomQuote);
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    dept: '',
    yearSec: '',
    uniqueId: '', // RegNo for student, StaffId for teacher
    phone: '',
    password: '',
    masterCode: '' // Only for teacher signup
  });

  const resetForm = () => {
    setFormData({
      name: '', dept: '', yearSec: '', uniqueId: '', phone: '', password: '', masterCode: ''
    });
    setError('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // --- LOGIN LOGIC ---
    if (mode === 'login') {
      const user = users.find(u => u.uniqueId === formData.uniqueId && u.role === role);
      if (user && user.password === formData.password) {
        onLogin(user);
      } else {
        setError("Invalid Credentials. Please check your ID and Password.");
      }
    } 
    
    // --- FORGOT PASSWORD LOGIC ---
    else if (mode === 'forgot') {
      if (!formData.uniqueId || !formData.phone || !formData.password) {
        setError("Please enter ID, Phone and New Password.");
        return;
      }
      
      const user = users.find(u => u.uniqueId === formData.uniqueId && u.role === role);
      
      if (!user) {
        setError("User not found.");
        return;
      }
      
      // VERIFICATION STEP: Match Phone Number
      if (user.phone !== formData.phone) {
        setError("Verification Failed: Phone number does not match our records.");
        return;
      }

      onResetPassword(user.uniqueId, formData.password);
      alert("Password Reset Successfully! Please login with your new password.");
      setMode('login');
      resetForm();
    }

    // --- SIGNUP LOGIC ---
    else {
      if (!formData.name || !formData.uniqueId || !formData.password || !formData.phone || !formData.dept) {
        setError("Please fill all required fields.");
        return;
      }
      if (role === 'student' && !formData.yearSec) {
        setError("Year & Section is required for students.");
        return;
      }
      if (role === 'teacher' && formData.masterCode !== 'admin') {
        setError("Invalid Teacher Master Code.");
        return;
      }
      
      // Check Uniqueness
      if (users.some(u => u.uniqueId === formData.uniqueId)) {
        setError(`${role === 'student' ? 'Register Number' : 'Staff ID'} already exists!`);
        return;
      }

      // Create User
      const newUser = {
        name: formData.name,
        dept: formData.dept,
        yearSec: role === 'student' ? formData.yearSec : null,
        uniqueId: formData.uniqueId,
        phone: formData.phone,
        password: formData.password,
        role: role
      };
      
      onRegisterUser(newUser);
      alert("Account created successfully! Please Sign In.");
      setMode('login');
      resetForm();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full max-w-lg mx-auto p-4 animate-float">
      
      {/* 3D Quote Section */}
      <div className="mb-10 text-center px-4 max-w-2xl mx-auto perspective-1000">
        <h2 className="text-2xl md:text-4xl font-black text-3d-float leading-tight tracking-wide font-serif italic drop-shadow-xl transform transition-all hover:scale-105 duration-500 cursor-default">
          "{currentQuote}"
        </h2>
      </div>

      <div className="glass-panel w-full p-8 rounded-3xl relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-pink-200/50">
        {/* Decorative blobs */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-300/40 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-rose-300/40 rounded-full blur-2xl animate-pulse"></div>

        <div className="relative z-10">
          <div className="text-center mb-6">
             <h2 className="text-3xl font-bold premium-text tracking-wider mb-2">
               {mode === 'login' ? 'Welcome Back' : mode === 'forgot' ? 'Reset Password' : 'Create Account'}
             </h2>
             <p className="text-rose-800/60 text-sm font-medium">Women's Day Celebration Portal</p>
          </div>

          {/* Role Toggle */}
          <div className="flex bg-white/40 rounded-full p-1 mb-6 border border-white/50 backdrop-blur-sm">
            <button
              type="button"
              onClick={() => {setRole('student'); resetForm();}}
              className={`flex-1 py-2 rounded-full text-sm font-bold transition-all duration-300 ${role === 'student' ? 'bg-white text-rose-600 shadow-md transform scale-105' : 'text-rose-900/50 hover:text-rose-700'}`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => {setRole('teacher'); resetForm();}}
              className={`flex-1 py-2 rounded-full text-sm font-bold transition-all duration-300 ${role === 'teacher' ? 'bg-white text-rose-600 shadow-md transform scale-105' : 'text-rose-900/50 hover:text-rose-700'}`}
            >
              Teacher
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Login Mode */}
            {mode === 'login' && (
              <>
                <div>
                  <label className="text-rose-900/70 text-xs uppercase tracking-widest font-bold ml-1">
                    {role === 'student' ? 'Register Number' : 'Staff ID'}
                  </label>
                  <input
                    name="uniqueId"
                    value={formData.uniqueId}
                    onChange={handleChange}
                    type="text"
                    className="w-full input-field rounded-xl px-4 py-3"
                    placeholder={role === 'student' ? "Register Number" : "Staff ID"}
                  />
                </div>
                <div>
                  <label className="text-rose-900/70 text-xs uppercase tracking-widest font-bold ml-1">Password</label>
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    className="w-full input-field rounded-xl px-4 py-3"
                    placeholder="Password"
                  />
                </div>
                <div className="text-right">
                  <button 
                    type="button"
                    onClick={() => {setMode('forgot'); resetForm();}}
                    className="text-xs text-rose-500 font-bold hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
              </>
            )}

            {/* Forgot Password Mode */}
            {mode === 'forgot' && (
              <div className="space-y-4">
                <div className="bg-rose-50 p-3 rounded-xl border border-rose-100 flex items-start gap-3">
                   <ShieldCheck className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                   <p className="text-xs text-rose-800">
                     Security Check: Please enter your Registered ID and the exact Phone Number linked to your account to verify your identity.
                   </p>
                </div>
                <div>
                  <label className="text-rose-900/70 text-xs uppercase tracking-widest font-bold ml-1">
                    {role === 'student' ? 'Register Number' : 'Staff ID'}
                  </label>
                  <input
                    name="uniqueId"
                    value={formData.uniqueId}
                    onChange={handleChange}
                    type="text"
                    className="w-full input-field rounded-xl px-4 py-3"
                    placeholder="Enter ID"
                  />
                </div>
                <div>
                  <label className="text-rose-900/70 text-xs uppercase tracking-widest font-bold ml-1">Registered Phone Number</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="text"
                    className="w-full input-field rounded-xl px-4 py-3"
                    placeholder="9876543210"
                    maxLength={10}
                  />
                </div>
                <div>
                  <label className="text-rose-900/70 text-xs uppercase tracking-widest font-bold ml-1">New Password</label>
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    className="w-full input-field rounded-xl px-4 py-3"
                    placeholder="Create New Password"
                  />
                </div>
              </div>
            )}

            {/* Signup Mode */}
            {mode === 'signup' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="text-rose-900/70 text-xs uppercase tracking-widest font-bold ml-1">Full Name</label>
                  <input name="name" value={formData.name} onChange={handleChange} className="w-full input-field rounded-xl px-4 py-2" placeholder="Jane Doe" />
                </div>
                
                <div>
                  <label className="text-rose-900/70 text-xs uppercase tracking-widest font-bold ml-1">
                    {role === 'student' ? 'Reg Number' : 'Staff ID'}
                  </label>
                  <input name="uniqueId" value={formData.uniqueId} onChange={handleChange} className="w-full input-field rounded-xl px-4 py-2" placeholder={role === 'student' ? "Reg No" : "Staff ID"} />
                </div>

                <div>
                  <label className="text-rose-900/70 text-xs uppercase tracking-widest font-bold ml-1">Department</label>
                  <input name="dept" value={formData.dept} onChange={handleChange} className="w-full input-field rounded-xl px-4 py-2" placeholder="CSE, IT, ECE..." />
                </div>

                {role === 'student' && (
                  <div className="md:col-span-2">
                    <label className="text-rose-900/70 text-xs uppercase tracking-widest font-bold ml-1">Year & Section</label>
                    <input name="yearSec" value={formData.yearSec} onChange={handleChange} className="w-full input-field rounded-xl px-4 py-2" placeholder="III - A" />
                  </div>
                )}

                <div className="md:col-span-2">
                  <label className="text-rose-900/70 text-xs uppercase tracking-widest font-bold ml-1">Phone Number</label>
                  <input name="phone" value={formData.phone} onChange={handleChange} className="w-full input-field rounded-xl px-4 py-2" placeholder="9876543210" maxLength={10} />
                </div>

                <div className="md:col-span-2">
                  <label className="text-rose-900/70 text-xs uppercase tracking-widest font-bold ml-1">Create Password</label>
                  <input name="password" type="password" value={formData.password} onChange={handleChange} className="w-full input-field rounded-xl px-4 py-2" placeholder="Create Password" />
                </div>

                {role === 'teacher' && (
                  <div className="md:col-span-2 bg-yellow-50 p-2 rounded-xl border border-yellow-100">
                    <label className="text-yellow-700 text-xs uppercase tracking-widest font-bold ml-1">Teacher Master Code</label>
                    <input name="masterCode" type="password" value={formData.masterCode} onChange={handleChange} className="w-full input-field rounded-xl px-4 py-2" placeholder="Teacher Master Code" />
                  </div>
                )}
              </div>
            )}

            {error && <p className="text-red-500 text-xs text-center bg-red-100 py-2 rounded-lg border border-red-200">{error}</p>}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-pink-500/30 transform hover:scale-[1.02] active:scale-95 transition-all duration-300 mt-2 flex items-center justify-center gap-2"
            >
              {mode === 'login' ? 'Sign In' : mode === 'forgot' ? 'Reset Password' : 'Create Account'}
            </button>
            
            <div className="text-center mt-4">
               <button 
                  type="button" 
                  onClick={() => {setMode(mode === 'signup' ? 'login' : 'signup'); resetForm();}}
                  className="text-sm text-rose-600 font-semibold hover:underline"
               >
                 {mode === 'signup' ? "Already have an account? Sign In" : "New here? Sign Up"}
               </button>
               {mode === 'forgot' && (
                 <div className="mt-2">
                   <button 
                      type="button" 
                      onClick={() => {setMode('login'); resetForm();}}
                      className="text-xs text-gray-500 hover:text-rose-500"
                   >
                     Cancel & Return to Login
                   </button>
                 </div>
               )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// 2. Ticket Component - MULTI-THEME LUXURY EDITION (Mobile Optimized)
const TicketView = ({ registration, event, user }) => {
  // Mobile Scaling Logic
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      // 750px is the ticket width. We add 40px buffer for padding.
      const availableWidth = window.innerWidth - 40; 
      // If screen is smaller than ticket, scale down. Max scale is 1.
      const newScale = Math.min(1, availableWidth / 750);
      setScale(newScale);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Theme logic
  const theme = event.theme || 'royal-gold';
  
  // Dynamic class assignment
  const themeClasses = {
    'royal-gold': 'theme-royal-gold',
    'platinum-elite': 'theme-platinum-elite',
    'cyber-diamond': 'theme-cyber-diamond',
    'golden-frame': 'theme-golden-frame',
    'theatre-red': 'theme-theatre-red',
    'rose-gold': 'theme-rose-gold'
  };
  
  const textGradientClass = {
    'royal-gold': 'text-gold-gradient',
    'platinum-elite': 'text-silver-gradient',
    'cyber-diamond': 'text-diamond-gradient',
    'golden-frame': 'text-gold-gradient',
    'theatre-red': 'text-gold-gradient',
    'rose-gold': 'text-rose-gold-gradient'
  }[theme];

  return (
    <div className="flex flex-col items-center w-full overflow-hidden">
      {/* Container applies the scale transform. 
          Dynamic negative margin removes the whitespace created by scaling down a large div. */}
      <div 
        className="ticket-container transition-transform duration-300 origin-top"
        style={{ 
          transform: `scale(${scale})`,
          marginBottom: `${(280 * scale) - 280}px` // 280 is height of ticket
        }}
      >
        
        {/* Main Ticket Card */}
        <div className={`ticket-base ${themeClasses[theme]} w-[750px] h-[280px] rounded-xl flex shadow-2xl relative text-white`}>
          
          {/* Theme Specific Ornaments */}
          {theme === 'royal-gold' && (
             <>
                <div className="absolute top-2 left-2 w-16 h-16 border-t-2 border-l-2 border-[#BF953F] rounded-tl-xl"></div>
                <div className="absolute bottom-2 right-2 w-16 h-16 border-b-2 border-r-2 border-[#BF953F] rounded-br-xl"></div>
                <Crown className="absolute top-4 right-1/3 text-[#BF953F] opacity-20 w-32 h-32 rotate-12" />
             </>
          )}
          {theme === 'cyber-diamond' && (
             <Gem className="absolute bottom-[-20px] left-1/3 text-cyan-400 opacity-20 w-48 h-48 animate-pulse" />
          )}

          {/* LEFT SIDE (Main Event Info) - 75% width */}
          <div className="w-[75%] p-8 relative flex flex-col justify-between border-r border-dashed border-white/20">
            
            {/* Header */}
            <div className="z-10">
               <div className="flex justify-between items-start">
                 <div>
                    <h3 className={`font-serif tracking-[0.3em] text-[10px] uppercase mb-1 opacity-80 ${theme === 'cyber-diamond' ? 'text-cyan-300' : 'text-[#BF953F]'}`}>
                      VIP Exclusive Access
                    </h3>
                    <h1 className={`text-5xl font-black uppercase leading-none tracking-wide ${textGradientClass}`}>
                      {event.title}
                    </h1>
                 </div>
                 <div className={`p-2 rounded-full border border-white/20 bg-black/30 backdrop-blur-md`}>
                   {React.cloneElement(event.icon, { className: `w-8 h-8 ${textGradientClass.replace('text', 'text')}` })}
                 </div>
               </div>
               
               <div className="mt-2 flex gap-3">
                  <span className="bg-white/10 px-3 py-1 text-[10px] font-bold tracking-widest uppercase border border-white/20 rounded-sm">
                    {event.type}
                  </span>
                  <span className="bg-white/10 px-3 py-1 text-[10px] font-bold tracking-widest uppercase border border-white/20 rounded-sm">
                    {registration.teamName ? 'Team Entry' : 'Solo Entry'}
                  </span>
               </div>
            </div>

            {/* Student Limited Details */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 z-10 my-4">
               <div>
                  <p className="text-white/40 text-[9px] uppercase tracking-widest">Name</p>
                  <p className="font-serif text-lg font-bold truncate tracking-wide">{user.name}</p>
               </div>
               <div>
                  <p className="text-white/40 text-[9px] uppercase tracking-widest">ID</p>
                  <p className="font-mono text-sm tracking-wider opacity-90">{user.uniqueId}</p>
               </div>
               <div>
                  <p className="text-white/40 text-[9px] uppercase tracking-widest">Dept</p>
                  <p className="text-sm font-bold opacity-90">{user.dept}</p>
               </div>
               <div>
                 <p className="text-white/40 text-[9px] uppercase tracking-widest">Seat</p>
                 <p className={`font-bold text-lg ${textGradientClass}`}>VIP FRONT ROW</p>
               </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-end z-10 border-t border-white/10 pt-2">
               <div className="text-white/50 text-[10px] uppercase tracking-widest font-mono">
                  March 8, 2026 • 09:00 AM • Auditorium A
               </div>
               <div className="flex items-center gap-2">
                  <Star size={10} className="fill-current text-white/50" />
                  <span className={`font-bold text-xs tracking-[0.2em] ${textGradientClass}`}>ADMIT ONE</span>
                  <Star size={10} className="fill-current text-white/50" />
               </div>
            </div>
          </div>

          {/* RIGHT SIDE (Stub) - 25% width */}
          <div className="w-[25%] relative bg-black/20 backdrop-blur-sm p-4 flex flex-col items-center justify-center border-l border-white/10">
             {/* Cutout circles for stub effect */}
             <div className="absolute -left-3 top-[-10px] w-6 h-6 bg-[#fdf4ff] rounded-full"></div>
             <div className="absolute -left-3 bottom-[-10px] w-6 h-6 bg-[#fdf4ff] rounded-full"></div>

             <h2 className={`text-xl font-black mb-4 text-center ${textGradientClass}`}>
               {theme.includes('platinum') ? 'PLATINUM' : theme.includes('diamond') ? 'DIAMOND' : 'ROYAL'}
             </h2>
             
             <div className="bg-white p-2 rounded mb-3 shadow-lg">
                <QrCode size={64} className="text-black" />
             </div>
             
             <div className="text-center w-full">
               <p className="text-white/30 text-[8px] uppercase tracking-widest mb-1">Ticket No</p>
               <p className="font-mono text-lg tracking-widest text-white/80 border-b border-white/10 pb-1 w-full text-center">
                 {Math.floor(100000 + Math.random() * 900000)}
               </p>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// 3. Admin Dashboard (Excel Downloads)
const AdminDashboard = ({ registrations, events, allUsers }) => {
  
  const generateCSV = (data, filename) => {
    let csvContent = "data:text/csv;charset=utf-8,";
    // Header
    csvContent += "Event,Participant Name,ID,Department,Year/Sec,Phone,Role,Team Name,Teammates\n";

    data.forEach(reg => {
      // Find full user details for this registration
      const userDetails = allUsers.find(u => u.uniqueId === reg.userId);
      const eventDetails = events.find(e => e.id === reg.eventId);
      
      const teammates = reg.members ? reg.members.map(m => `${m.name}(${m.regNo})`).join("; ") : "N/A";
      
      const row = [
        eventDetails?.title || 'Unknown',
        userDetails?.name || reg.userName,
        reg.userId,
        userDetails?.dept || 'N/A',
        userDetails?.yearSec || 'N/A',
        userDetails?.phone || 'N/A',
        reg.userRole,
        reg.teamName || "N/A",
        teammates
      ].map(field => `"${field}"`).join(","); // Quote fields to handle commas in data

      csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAll = () => {
    generateCSV(registrations, "PSNA_WomensDay_All_Registrations.csv");
  };

  const downloadEvent = (eventId, eventTitle) => {
    const eventRegs = registrations.filter(r => r.eventId === eventId);
    generateCSV(eventRegs, `PSNA_${eventTitle.replace(/\s+/g, '_')}_Registrations.csv`);
  };

  const getEventStats = (eventId) => {
    return registrations.filter(r => r.eventId === eventId).length;
  };

  return (
    <div className="space-y-6 animate-float">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-rose-900">Admin Dashboard</h2>
          <p className="text-gray-500 text-sm">Overview & Reports</p>
        </div>
        <button 
          onClick={downloadAll}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl shadow-lg transition-all font-bold"
        >
          <FileSpreadsheet size={20} /> Download All Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <div key={event.id} className="glass-card p-6 rounded-2xl relative overflow-hidden group border-white flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl text-white bg-gradient-to-br ${event.color} shadow-md`}>
                  {event.icon}
                </div>
                <button 
                  onClick={() => downloadEvent(event.id, event.title)}
                  className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                  title="Download Event Report"
                >
                  <Download size={20} />
                </button>
              </div>
              <h3 className="text-gray-800 font-bold text-lg">{event.title}</h3>
              <p className="text-gray-500 text-sm mt-1 mb-4">{event.type}</p>
            </div>
            
            <div>
              <div className="flex items-end gap-2 mb-2">
                 <span className="text-4xl font-bold text-gray-800 leading-none">{getEventStats(event.id)}</span>
                 <span className="text-gray-500 text-sm mb-1">registrations</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${event.color}`} 
                  style={{ width: `${Math.min(getEventStats(event.id) * 10, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="glass-panel p-6 rounded-2xl mt-8 bg-white/60">
        <h3 className="text-rose-900 font-bold mb-4 border-b border-rose-100 pb-2">Recent Activity</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead>
              <tr className="text-gray-400 border-b border-gray-200">
                <th className="pb-3 pl-2">Event</th>
                <th className="pb-3">Name</th>
                <th className="pb-3">ID</th>
                <th className="pb-3">Dept</th>
                <th className="pb-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {registrations.slice().reverse().slice(0, 5).map((reg, idx) => {
                const user = allUsers.find(u => u.uniqueId === reg.userId);
                return (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-white/50 transition-colors">
                    <td className="py-3 pl-2 font-bold text-rose-700">
                      {events.find(e => e.id === reg.eventId)?.title}
                    </td>
                    <td className="py-3 font-medium text-gray-800">{reg.userName}</td>
                    <td className="py-3 font-mono text-xs">{reg.userId}</td>
                    <td className="py-3 text-xs">{user?.dept || '-'}</td>
                    <td className="py-3 text-xs text-gray-400">{new Date(reg.timestamp).toLocaleDateString()}</td>
                  </tr>
                );
              })}
              {registrations.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-400 italic">No registrations found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// 4. Registration Modal
const RegistrationModal = ({ event, user, onClose, onRegister }) => {
  const [details, setDetails] = useState({
    teamName: '',
    members: [] 
  });
  const [participationType, setParticipationType] = useState(event.category === 'Both' ? '' : event.category);

  const addMember = () => {
    if (details.members.length < event.maxTeamSize - 1) { 
      setDetails({
        ...details,
        members: [...details.members, { name: '', regNo: '' }]
      });
    }
  };

  const updateMember = (index, field, value) => {
    const updated = [...details.members];
    updated[index][field] = value;
    setDetails({ ...details, members: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ ...details, participationType, eventId: event.id });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative glass-panel w-full max-w-2xl rounded-3xl p-8 max-h-[90vh] overflow-y-auto bg-white border border-white shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
          <X size={24} />
        </button>

        <div className="mb-6">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${event.color} text-white shadow-md`}>
            {event.type}
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">{event.title}</h2>
          <p className="text-gray-500 text-sm mt-1">{event.description}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="bg-rose-50 rounded-xl p-4 border border-rose-100 flex items-center gap-4">
              <div className="bg-rose-100 p-2 rounded-full">
                 <User size={20} className="text-rose-600" />
              </div>
              <div>
                  <p className="text-xs text-rose-500 font-bold uppercase">Participant</p>
                  <p className="text-rose-900 font-bold">{user.name}</p>
                  <p className="text-xs text-rose-800/60 font-mono">ID: {user.uniqueId} | Dept: {user.dept}</p>
              </div>
          </div>

          {event.category === 'Both' && (
            <div>
              <label className="text-gray-500 text-xs uppercase font-bold pl-1 mb-2 block">Participation Type</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setParticipationType('Solo')}
                  className={`flex-1 py-3 rounded-xl border font-bold transition-all ${participationType === 'Solo' ? 'bg-rose-500 border-rose-500 text-white shadow-md' : 'border-gray-200 text-gray-400 hover:bg-gray-50'}`}
                >
                  Solo
                </button>
                <button
                  type="button"
                  onClick={() => setParticipationType('Team')}
                  className={`flex-1 py-3 rounded-xl border font-bold transition-all ${participationType === 'Team' ? 'bg-rose-500 border-rose-500 text-white shadow-md' : 'border-gray-200 text-gray-400 hover:bg-gray-50'}`}
                >
                  Team
                </button>
              </div>
            </div>
          )}

          {(participationType === 'Team' || event.category === 'Team') && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-gray-800 font-bold">Team Details</h3>
                <span className="text-xs text-gray-500">Max {event.maxTeamSize} members including you</span>
              </div>
              
              <div>
                <label className="text-gray-500 text-xs uppercase font-bold pl-1">Team Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-gray-800 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none mt-1"
                  value={details.teamName}
                  onChange={e => setDetails({...details, teamName: e.target.value})}
                />
              </div>

              <div className="space-y-3">
                <p className="text-xs text-gray-500">Teammates (You are automatically included)</p>
                {details.members.map((member, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input 
                      placeholder="Name"
                      required
                      className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-800 text-sm"
                      value={member.name}
                      onChange={e => updateMember(idx, 'name', e.target.value)}
                    />
                    <input 
                      placeholder="Reg No"
                      required
                      className="w-1/3 bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-800 text-sm"
                      value={member.regNo}
                      onChange={e => updateMember(idx, 'regNo', e.target.value)}
                    />
                    <button 
                      type="button"
                      onClick={() => {
                        const newMembers = details.members.filter((_, i) => i !== idx);
                        setDetails({...details, members: newMembers});
                      }}
                      className="p-2 text-red-400 hover:text-red-500 bg-red-50 rounded-lg"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                
                {details.members.length < event.maxTeamSize - 1 && (
                  <button 
                    type="button"
                    onClick={addMember}
                    className="text-sm text-rose-500 hover:text-rose-600 font-bold flex items-center gap-1"
                  >
                    + Add Teammate
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="w-full bg-rose-600 text-white font-bold py-4 rounded-xl hover:bg-rose-700 transition-all shadow-lg shadow-rose-200"
            >
              Confirm Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App = () => {
  // CENTRAL STATE (Acts as database)
  const [users, setUsers] = useState([]); // All registered users
  const [registrations, setRegistrations] = useState([]); // All event registrations
  const [currentUser, setCurrentUser] = useState(null); // Currently logged in user
  
  const [view, setView] = useState('events'); 
  const [selectedEvent, setSelectedEvent] = useState(null); 

  useEffect(() => {
    if (!currentUser) setView('events');
  }, [currentUser]);

  const handleRegisterUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    // Data (users & registrations) is NOT cleared here, persisting data across sessions
  };

  const handleResetPassword = (uniqueId, newPassword) => {
    // In a real app, this would be an API call. Here we update local state.
    setUsers(users.map(u => u.uniqueId === uniqueId ? { ...u, password: newPassword } : u));
  };

  const getMyRegistrations = () => {
    if (!currentUser) return [];
    return registrations.filter(r => r.userId === currentUser.uniqueId);
  };

  // Determine which events to show based on user role
  const getAvailableEvents = () => {
    if (!currentUser) return [];
    return currentUser.role === 'teacher' ? TEACHER_EVENTS : STUDENT_EVENTS;
  };

  // Combine events for Admin view
  const getAllEvents = () => {
    return [...STUDENT_EVENTS, ...TEACHER_EVENTS];
  };

  const handleEventRegister = (details) => {
    if (getMyRegistrations().length >= 3) {
      alert("You can only register for a maximum of 3 events!");
      return;
    }
    if (getMyRegistrations().some(r => r.eventId === details.eventId)) {
      alert("You are already registered for this event!");
      return;
    }

    const newRegistration = {
      id: Date.now(),
      userId: currentUser.uniqueId,
      userName: currentUser.name,
      userRole: currentUser.role,
      ...details,
      timestamp: new Date().toISOString()
    };

    setRegistrations([...registrations, newRegistration]);
    setSelectedEvent(null);
    setView('tickets'); 
  };

  return (
    <div className="min-h-screen font-sans overflow-x-hidden relative selection:bg-rose-200 selection:text-rose-900 animate-gradient-bg">
      <CustomStyles />
      <CustomCursor />
      
      {/* Background Floating Orbs */}
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-rose-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-[25rem] h-[25rem] bg-pink-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/4 left-1/2 w-[35rem] h-[35rem] bg-amber-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 glass-panel p-6 rounded-3xl bg-white/70">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-gray-100 shadow-md">
                <img src="/psna-logo.png" alt="PSNA Logo" className="w-full h-full object-cover" />
                <span className="text-red-800 font-bold text-xs absolute">PSNA</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 leading-none">PSNA</h1>
              <p className="text-rose-800/60 text-sm tracking-widest uppercase mt-1 font-semibold">College of Engineering & Technology</p>
            </div>
          </div>
          
          <div className="text-center md:text-right">
             <h2 className="text-xl md:text-2xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-700 italic font-bold">
               Women's Day Celebration 2026
             </h2>
             <p className="text-rose-600 font-bold text-xs md:text-sm mt-1 tracking-wider uppercase drop-shadow-sm">
                Rights. Justice. Action. For ALL Women and Girls.
             </p>
             {currentUser && (
               <div className="flex items-center justify-center md:justify-end gap-3 mt-2 text-sm text-gray-500 font-medium">
                 <User size={14} />
                 <span>{currentUser.name} | {currentUser.uniqueId}</span>
               </div>
             )}
          </div>
        </header>

        {/* View Router */}
        {!currentUser ? (
          <Auth users={users} onLogin={handleLogin} onRegisterUser={handleRegisterUser} onResetPassword={handleResetPassword} />
        ) : (
          <div className="flex-1 flex flex-col">
            {/* Navigation */}
            <nav className="flex flex-wrap justify-center gap-4 mb-10">
              <button 
                onClick={() => setView('events')} 
                className={`px-6 py-3 rounded-2xl flex items-center gap-2 transition-all duration-300 font-bold ${view === 'events' ? 'bg-rose-600 text-white shadow-lg shadow-rose-200 transform scale-105' : 'glass-card text-gray-600 hover:bg-white hover:text-rose-600'}`}
              >
                <Calendar size={18} /> Events
              </button>
              
              <button 
                onClick={() => setView('tickets')} 
                className={`px-6 py-3 rounded-2xl flex items-center gap-2 transition-all duration-300 font-bold ${view === 'tickets' ? 'bg-rose-600 text-white shadow-lg shadow-rose-200 transform scale-105' : 'glass-card text-gray-600 hover:bg-white hover:text-rose-600'}`}
              >
                <Ticket size={18} /> My Entries
                {getMyRegistrations().length > 0 && (
                  <span className="bg-white text-rose-600 text-[10px] w-5 h-5 rounded-full flex items-center justify-center ml-1 border border-rose-100">
                    {getMyRegistrations().length}
                  </span>
                )}
              </button>

              {currentUser.role === 'teacher' && (
                <button 
                  onClick={() => setView('admin')} 
                  className={`px-6 py-3 rounded-2xl flex items-center gap-2 transition-all duration-300 font-bold ${view === 'admin' ? 'bg-rose-600 text-white shadow-lg shadow-rose-200 transform scale-105' : 'glass-card text-gray-600 hover:bg-white hover:text-rose-600'}`}
                >
                  <Users size={18} /> Admin Dashboard
                </button>
              )}

              <button 
                onClick={handleLogout} 
                className="px-6 py-3 rounded-2xl glass-card text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all ml-auto border-red-100"
              >
                <LogOut size={18} />
              </button>
            </nav>

            {/* Content Area */}
            <main className="flex-1 relative">
              
              {/* Events View - Shows dynamic list based on role */}
              {view === 'events' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
                  {getAvailableEvents().map(event => {
                    const isRegistered = getMyRegistrations().some(r => r.eventId === event.id);
                    const isFull = getMyRegistrations().length >= 3;

                    return (
                      <div key={event.id} className="glass-card rounded-3xl overflow-hidden group flex flex-col h-full relative bg-white/60">
                        <div className={`h-32 bg-gradient-to-br ${event.color} relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-white/10"></div>
                          <div className="absolute -bottom-6 right-6 w-16 h-16 bg-white/40 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/50 shadow-xl transform rotate-12 group-hover:rotate-0 transition-all duration-500">
                            {event.icon}
                          </div>
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-white/30 backdrop-blur-sm rounded-full text-xs font-bold text-white border border-white/40 uppercase tracking-wide shadow-sm">
                              {event.type}
                            </span>
                          </div>
                        </div>

                        <div className="p-6 pt-10 flex-1 flex flex-col">
                          <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-rose-600 transition-colors">{event.title}</h3>
                          <p className="text-gray-500 text-sm mb-6 flex-1 leading-relaxed">{event.description}</p>
                          
                          <div className="flex items-center gap-4 text-xs text-gray-400 mb-6 font-mono uppercase tracking-wider font-semibold">
                            <span className="flex items-center gap-1">
                              <User size={12} /> {event.category}
                            </span>
                            {event.maxTeamSize > 1 && (
                              <span className="flex items-center gap-1">
                                <Users size={12} /> Max {event.maxTeamSize}
                              </span>
                            )}
                          </div>

                          <button 
                            disabled={isRegistered || (isFull && !isRegistered)}
                            onClick={() => setSelectedEvent(event)}
                            className={`w-full py-4 rounded-xl font-bold uppercase tracking-wider text-xs transition-all duration-300 shadow-lg ${
                              isRegistered 
                                ? 'bg-emerald-100 text-emerald-600 border border-emerald-200 cursor-default'
                                : isFull 
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  : `bg-gradient-to-r ${event.color} text-white hover:shadow-rose-300 hover:scale-[1.02]`
                            }`}
                          >
                            {isRegistered ? 'Registered' : isFull ? 'Limit Reached (3)' : 'Register Now'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tickets View */}
              {view === 'tickets' && (
                <div className="max-w-4xl mx-auto">
                   <h2 className="text-3xl font-bold text-center mb-10 text-rose-800">My Event Passes</h2>
                   {getMyRegistrations().length === 0 ? (
                     <div className="text-center py-20 glass-panel rounded-3xl bg-white/50">
                       <Award size={64} className="mx-auto text-rose-200 mb-4" />
                       <p className="text-gray-500 text-lg">You haven't registered for any events yet.</p>
                       <button onClick={() => setView('events')} className="mt-4 text-rose-500 font-bold hover:underline">Browse Events</button>
                     </div>
                   ) : (
                     <div className="space-y-8 flex flex-col items-center">
                       {getMyRegistrations().map(reg => (
                         <TicketView 
                            key={reg.id} 
                            registration={reg} 
                            user={currentUser}
                            // Search in both lists to find event details
                            event={getAllEvents().find(e => e.id === reg.eventId)} 
                          />
                       ))}
                     </div>
                   )}
                </div>
              )}

              {/* Admin View */}
              {view === 'admin' && currentUser.role === 'teacher' && (
                <AdminDashboard 
                  registrations={registrations} 
                  events={getAllEvents()} 
                  allUsers={users} 
                />
              )}

            </main>
          </div>
        )}
      </div>

      <footer className="relative z-10 py-6 text-center text-rose-900/40 text-xs mt-auto border-t border-rose-100">
        <p>&copy; 2026 PSNA College of Engineering & Technology. Designed for Women's Day.</p>
      </footer>

      {selectedEvent && (
        <RegistrationModal 
          event={selectedEvent} 
          user={currentUser} 
          onClose={() => setSelectedEvent(null)}
          onRegister={handleEventRegister}
        />
      )}

    </div>
  );
};

export default App;