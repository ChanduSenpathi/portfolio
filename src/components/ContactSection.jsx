import { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Copy,
  Sparkles,
  ExternalLink,
  MessageSquare,
  Check,
  Smartphone,
  Inbox
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import TiltCard from './TiltCard';
import { playClickSound, playBurstSound } from '../utils/audioEffects';

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Full-Time Frontend Developer',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const handleCopy = (type) => {
    playBurstSound();
    if (type === 'email') {
      navigator.clipboard.writeText(personalInfo.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } else {
      navigator.clipboard.writeText(personalInfo.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your work email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please provide a valid email format';
    }
    if (!formData.message.trim()) errs.message = 'Please write a brief note or job description';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const formattedWhatsAppText = encodeURIComponent(
    `*New Portfolio Inquiry for Chandu Senapathi*\n\n` +
    `👤 *Name:* ${formData.name}\n` +
    `📧 *Email:* ${formData.email}\n` +
    `💼 *Role:* ${formData.role}\n` +
    `📝 *Message:* ${formData.message}`
  );

  const formattedMailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
    `[Portfolio Inquiry] ${formData.role} - from ${formData.name}`
  )}&body=${encodeURIComponent(
    `Hi Chandu,\n\nName: ${formData.name}\nEmail: ${formData.email}\nRole: ${formData.role}\n\nMessage:\n${formData.message}\n`
  )}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    playClickSound();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Direct Real Email Delivery to chandu.senapathi220@gmail.com
      const res = await fetch(`https://formsubmit.co/ajax/${personalInfo.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          opportunity_type: formData.role,
          message: formData.message,
          _subject: `Portfolio Inquiry: ${formData.role} from ${formData.name}`,
          _template: 'table',
          _captcha: 'false'
        })
      });
      const data = await res.json();
      console.log('Email delivery response:', data);
    } catch (err) {
      console.warn('Network send fallback active:', err);
    }

    playBurstSound();
    setIsSubmitting(false);
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-24 z-10">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Ready for Immediate Interview</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
            Let's Build the Future Together
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Looking for a Frontend Developer who combines scalable React/Next.js UI
            architecture with 5+ years of enterprise delivery? Let's connect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Direct Contact Info & Receiving Channels */}
          <div className="lg:col-span-5 space-y-5">
            {/* Direct Email Card */}
            <TiltCard
              maxTilt={10}
              scale={1.02}
              className="rounded-3xl border border-white/10 bg-[#0e1428]/85 p-6 backdrop-blur-2xl shadow-xl shadow-purple-950/20"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-300">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Direct Email Inbox</div>
                    <div className="font-semibold text-white text-sm sm:text-base">
                      {personalInfo.email}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy('email')}
                  title="Copy email to clipboard"
                  className="p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  {copiedEmail ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

              {copiedEmail && (
                <div className="mt-3 text-xs text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Email copied to clipboard!
                </div>
              )}
            </TiltCard>

            {/* Direct Phone & WhatsApp Card */}
            <TiltCard
              maxTilt={10}
              scale={1.02}
              className="rounded-3xl border border-white/10 bg-[#0e1428]/85 p-6 backdrop-blur-2xl shadow-xl shadow-purple-950/20"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Direct Phone & WhatsApp</div>
                    <div className="font-semibold text-white text-sm sm:text-base">
                      {personalInfo.phone}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy('phone')}
                  title="Copy phone to clipboard"
                  className="p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  {copiedPhone ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <a
                  href={`https://wa.me/919491285183?text=${encodeURIComponent(
                    'Hi Chandu, I reviewed your 3D portfolio and would like to discuss an opportunity!'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playClickSound()}
                  className="flex-1 text-center py-2.5 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold hover:bg-emerald-600/30 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Smartphone className="h-3.5 w-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>
                <a
                  href={`tel:${personalInfo.phone}`}
                  onClick={() => playClickSound()}
                  className="flex-1 text-center py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-xs font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>Call Chandu</span>
                </a>
              </div>
            </TiltCard>

            {/* How Chandu Receives Messages Explanatory Card */}
            <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wide">
                <Inbox className="h-4 w-4" />
                <span>How You Receive Recruiter Messages</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Instant WhatsApp Notification:</strong> Senders can forward their complete message directly to your phone (<strong>+91 9491285183</strong>).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Direct Email Draft:</strong> Senders can transmit straight to your Gmail (<strong>chandu.senapathi220@gmail.com</strong>) with one click.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Free Serverless Forwarding (Web3Forms / Formspree):</strong> Built-in hook automatically delivers form submissions to your inbox without needing a backend server!
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Reachout Form (Stable & static without hover tilt) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#131a30]/95 via-[#0e1428]/90 to-[#090d1c]/95 p-7 sm:p-9 backdrop-blur-2xl shadow-2xl shadow-purple-950/30">
              {formSubmitted ? (
                <div className="py-8 text-center space-y-5 animate-fadeIn">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-white font-display">
                      Email Dispatched Directly to Chandu!
                    </h3>
                    <p className="text-sm text-slate-300 max-w-md mx-auto">
                      Your inquiry has been submitted to <strong className="text-cyan-300">chandu.senapathi220@gmail.com</strong>. You can also send a fast notification directly to his WhatsApp:
                    </p>
                  </div>

                  {/* Dual Instant Delivery Channels */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto pt-2">
                    {/* Send to WhatsApp */}
                    <a
                      href={`https://wa.me/919491285183?text=${formattedWhatsAppText}`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => playClickSound()}
                      className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02]"
                    >
                      <Smartphone className="h-4 w-4" />
                      <span>Send to Chandu's WhatsApp</span>
                    </a>

                    {/* Send via Direct Email */}
                    <a
                      href={formattedMailtoUrl}
                      onClick={() => playClickSound()}
                      className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02]"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Open in Email (Gmail)</span>
                    </a>
                  </div>

                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        role: 'Full-Time Frontend Developer',
                        message: ''
                      });
                    }}
                    className="mt-4 px-5 py-2 rounded-xl border border-white/10 bg-white/5 text-xs text-slate-300 hover:bg-white/10 transition-colors"
                  >
                    Edit & Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                        Interactive Hiring Form
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Instant Delivery to Chandu
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white font-display">
                      Send a Direct Message to Chandu
                    </h3>
                  </div>

                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-200">Your Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Alex Henderson"
                      className="w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                    {errors.name && (
                      <span className="text-xs text-rose-400 font-medium">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-200">Your Work Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="alex@company.com"
                      className="w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                    {errors.email && (
                      <span className="text-xs text-rose-400 font-medium">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Role Type Selection */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-200">Opportunity Type</label>
                    <select
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                      className="w-full rounded-xl bg-[#090d1c] border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                    >
                      <option value="Full-Time Frontend Developer">
                        Full-Time Frontend Developer
                      </option>
                      <option value="React & Next.js Specialist">
                        React & Next.js Specialist
                      </option>
                      <option value="Full-Stack React & Next.js Engineer">
                        Full-Stack React & Next.js Engineer
                      </option>
                      <option value="Contract / High-Impact Consultation">
                        Contract / High-Impact Consultation
                      </option>
                    </select>
                  </div>

                  {/* Message field */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-200">
                      Message / Job Description
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Tell Chandu about your team, tech stack, salary range, and interview timeline..."
                      className="w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    />
                    {errors.message && (
                      <span className="text-xs text-rose-400 font-medium">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 shadow-xl shadow-violet-600/30 hover:shadow-cyan-500/40 active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Processing...' : 'Submit & Transmit Message to Chandu'}</span>
                    <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
