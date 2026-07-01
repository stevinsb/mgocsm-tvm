"use client";

import React, { useState, useEffect } from "react";
import { db, EventItem, BlogPost, GalleryItem, LeadershipMember, NewsletterItem, Announcement } from "@/lib/db";
import {
  Shield, LayoutDashboard, Calendar, FileText, Image as ImageIcon,
  Users, LogOut, Plus, Trash2, Edit2, BookOpen, Bell, Loader2, Check, X
} from "lucide-react";

type Tab = "overview" | "events" | "blog" | "gallery" | "leadership" | "newsletters" | "announcements";

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, type }: { message: string; type: "success" | "error" }) {
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl shadow-lg text-white text-sm font-bold font-inter transition-all ${type === "success" ? "bg-emerald-600" : "bg-red-600"}`}>
      {type === "success" ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
      {message}
    </div>
  );
}

// ─── Reusable Input ───────────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white outline-none focus:border-gold transition-colors";

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Data states
  const [events, setEvents] = useState<EventItem[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [leadership, setLeadership] = useState<LeadershipMember[]>([]);
  const [newsletters, setNewsletters] = useState<NewsletterItem[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  // Edit state
  const [editingItem, setEditingItem] = useState<any>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    setIsAuthenticated(db.isAdminAuthenticated());
  }, []);

  useEffect(() => {
    if (isAuthenticated) loadAll();
  }, [isAuthenticated]);

  const loadAll = async () => {
    setLoading(true);
    const [ev, bl, ga, le, nl, an] = await Promise.all([
      db.getEvents(), db.getBlogPosts(), db.getGallery(),
      db.getLeadership(), db.getNewsletters(), db.getAnnouncements(),
    ]);
    setEvents(ev); setBlogPosts(bl); setGallery(ga);
    setLeadership(le); setNewsletters(nl); setAnnouncements(an);
    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (db.loginAdmin(email, password)) {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Invalid credentials.");
    }
  };

  // ─── LOGIN SCREEN ──────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center p-4">
        <div className="bg-white dark:bg-dark-card rounded-3xl shadow-2xl p-10 w-full max-w-md flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Shield className="w-10 h-10 text-gold" />
            <h1 className="font-poppins font-extrabold text-2xl text-navy dark:text-white">Admin Panel</h1>
            <p className="text-slate-400 text-sm font-inter">MGOCSM Trivandrum Diocese</p>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Field label="Email">
              <input className={inputCls} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@mgocsmtvm.org" required />
            </Field>
            <Field label="Password">
              <input className={inputCls} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
            </Field>
            {loginError && <p className="text-red-500 text-xs font-inter">{loginError}</p>}
            <button type="submit" className="bg-navy text-white font-bold py-3 rounded-xl hover:bg-navy-light transition-colors mt-2">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ─── SIDEBAR NAV ───────────────────────────────────────────────────────────
  const navItems: { id: Tab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "events", label: "Events", icon: <Calendar className="w-4 h-4" />, count: events.length },
    { id: "newsletters", label: "Newsletters", icon: <BookOpen className="w-4 h-4" />, count: newsletters.length },
    { id: "leadership", label: "Leadership", icon: <Users className="w-4 h-4" />, count: leadership.length },
    { id: "gallery", label: "Gallery", icon: <ImageIcon className="w-4 h-4" />, count: gallery.length },
    { id: "blog", label: "Blog", icon: <FileText className="w-4 h-4" />, count: blogPosts.length },
    { id: "announcements", label: "Announcements", icon: <Bell className="w-4 h-4" />, count: announcements.length },
  ];

  return (
    <div className="min-h-screen bg-light-gray dark:bg-dark-bg flex">
      {toast && <Toast message={toast.message} type={toast.type} />}

      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-navy text-white flex flex-col min-h-screen sticky top-0">
        <div className="px-6 py-8 border-b border-white/10">
          <p className="font-poppins font-black text-base tracking-tight">MGOCSM TVM</p>
          <p className="text-gold text-xs font-inter mt-0.5">Admin Dashboard</p>
        </div>
        <nav className="flex flex-col gap-1 p-4 flex-grow">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setEditingItem(null); }}
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-inter font-medium transition-colors ${activeTab === item.id ? "bg-gold text-navy-dark font-bold" : "hover:bg-white/10 text-slate-300"}`}
            >
              <span className="flex items-center gap-3">{item.icon}{item.label}</span>
              {item.count !== undefined && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeTab === item.id ? "bg-navy text-white" : "bg-white/10 text-slate-300"}`}>
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={() => { db.logoutAdmin(); setIsAuthenticated(false); }} className="flex items-center gap-2 text-slate-300 hover:text-white text-sm font-inter w-full px-4 py-2.5 rounded-xl hover:bg-white/10 transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 text-gold animate-spin" />
          </div>
        ) : (
          <>
            {/* ── OVERVIEW ── */}
            {activeTab === "overview" && (
              <div className="flex flex-col gap-8">
                <h1 className="font-poppins font-extrabold text-2xl text-navy dark:text-white">Overview</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { label: "Events", value: events.length, color: "bg-blue-50 text-blue-700" },
                    { label: "Newsletters", value: newsletters.length, color: "bg-yellow-50 text-yellow-700" },
                    { label: "Leadership", value: leadership.length, color: "bg-green-50 text-green-700" },
                    { label: "Gallery Items", value: gallery.length, color: "bg-purple-50 text-purple-700" },
                    { label: "Blog Posts", value: blogPosts.length, color: "bg-pink-50 text-pink-700" },
                    { label: "Announcements", value: announcements.length, color: "bg-orange-50 text-orange-700" },
                  ].map(stat => (
                    <div key={stat.label} className={`rounded-2xl p-6 ${stat.color} flex flex-col gap-1`}>
                      <span className="text-3xl font-poppins font-black">{stat.value}</span>
                      <span className="text-xs font-bold uppercase tracking-wider opacity-70">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── EVENTS ── */}
            {activeTab === "events" && (
              <EventsPanel
                events={events}
                editingItem={editingItem}
                setEditingItem={setEditingItem}
                onSave={async (data: any, id?: string) => {
                  if (id) await db.updateEvent({ ...data, id });
                  else await db.addEvent(data);
                  setEvents(await db.getEvents());
                  setEditingItem(null);
                  showToast(id ? "Event updated!" : "Event added!");
                }}
                onDelete={async (id: string) => {
                  await db.deleteEvent(id);
                  setEvents(await db.getEvents());
                  showToast("Event deleted.", "error");
                }}
              />
            )}

            {/* ── NEWSLETTERS ── */}
            {activeTab === "newsletters" && (
              <NewslettersPanel
                newsletters={newsletters}
                editingItem={editingItem}
                setEditingItem={setEditingItem}
                onSave={async (data: any, id?: string) => {
                  if (id) await db.updateNewsletter({ ...data, id });
                  else await db.addNewsletter(data);
                  setNewsletters(await db.getNewsletters());
                  setEditingItem(null);
                  showToast(id ? "Newsletter updated!" : "Newsletter added!");
                }}
                onDelete={async (id: string) => {
                  await db.deleteNewsletter(id);
                  setNewsletters(await db.getNewsletters());
                  showToast("Newsletter deleted.", "error");
                }}
              />
            )}

            {/* ── LEADERSHIP ── */}
            {activeTab === "leadership" && (
              <LeadershipPanel
                leadership={leadership}
                editingItem={editingItem}
                setEditingItem={setEditingItem}
                onSave={async (data: any, id?: string) => {
                  if (id) await db.updateLeadershipMember({ ...data, id });
                  else await db.addLeadershipMember(data);
                  setLeadership(await db.getLeadership());
                  setEditingItem(null);
                  showToast(id ? "Member updated!" : "Member added!");
                }}
                onDelete={async (id: string) => {
                  await db.deleteLeadershipMember(id);
                  setLeadership(await db.getLeadership());
                  showToast("Member deleted.", "error");
                }}
              />
            )}

            {/* ── GALLERY ── */}
            {activeTab === "gallery" && (
              <GalleryPanel
                gallery={gallery}
                editingItem={editingItem}
                setEditingItem={setEditingItem}
                onSave={async (data: any) => {
                  await db.addGalleryItem(data);
                  setGallery(await db.getGallery());
                  setEditingItem(null);
                  showToast("Gallery item added!");
                }}
                onDelete={async (id: string) => {
                  await db.deleteGalleryItem(id);
                  setGallery(await db.getGallery());
                  showToast("Item deleted.", "error");
                }}
              />
            )}

            {/* ── BLOG ── */}
            {activeTab === "blog" && (
              <BlogPanel
                blogPosts={blogPosts}
                editingItem={editingItem}
                setEditingItem={setEditingItem}
                onSave={async (data: any, id?: string) => {
                  if (id) await db.updateBlogPost({ ...data, id });
                  else await db.addBlogPost(data);
                  setBlogPosts(await db.getBlogPosts());
                  setEditingItem(null);
                  showToast(id ? "Post updated!" : "Post added!");
                }}
                onDelete={async (id: string) => {
                  await db.deleteBlogPost(id);
                  setBlogPosts(await db.getBlogPosts());
                  showToast("Post deleted.", "error");
                }}
              />
            )}

            {/* ── ANNOUNCEMENTS ── */}
            {activeTab === "announcements" && (
              <AnnouncementsPanel
                announcements={announcements}
                onSave={async (data: any) => {
                  await db.addAnnouncement(data);
                  setAnnouncements(await db.getAnnouncements());
                  showToast("Announcement added!");
                }}
                onDelete={async (id: string) => {
                  await db.deleteAnnouncement(id);
                  setAnnouncements(await db.getAnnouncements());
                  showToast("Announcement deleted.", "error");
                }}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

// ─── EVENTS PANEL ─────────────────────────────────────────────────────────────
function EventsPanel({ events, editingItem, setEditingItem, onSave, onDelete }: any) {
  const blank = { title: "", description: "", date: "", time: "", location: "", image: "", isFeatured: false, isPast: false, registrationOpen: true, registrationUrl: "", countdownTarget: "" };
  const [form, setForm] = useState(blank);

  useEffect(() => {
    if (editingItem) setForm(editingItem);
    else setForm(blank);
  }, [editingItem]);

  const f = (k: string) => (e: any) => setForm((p: any) => ({ ...p, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-poppins font-extrabold text-2xl text-navy dark:text-white">Events & Activities</h1>

      {/* Form */}
      <div className="bg-white dark:bg-dark-card rounded-3xl p-6 border border-slate-200/40 dark:border-slate-800/40 shadow-sm">
        <h2 className="font-poppins font-bold text-base text-navy dark:text-white mb-5">{editingItem ? "Edit Event" : "Add New Event"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Title"><input className={inputCls} value={form.title} onChange={f("title")} placeholder="Event title" /></Field>
          <Field label="Date"><input className={inputCls} type="date" value={form.date} onChange={f("date")} /></Field>
          <Field label="Time"><input className={inputCls} value={form.time} onChange={f("time")} placeholder="2:00 PM" /></Field>
          <Field label="Location"><input className={inputCls} value={form.location} onChange={f("location")} placeholder="Venue name" /></Field>
          <Field label="Image URL"><input className={inputCls} value={form.image} onChange={f("image")} placeholder="/image.jpg or https://..." /></Field>
          <Field label="Registration URL"><input className={inputCls} value={form.registrationUrl} onChange={f("registrationUrl")} placeholder="https://forms.google.com/..." /></Field>
          <Field label="Countdown Target"><input className={inputCls} type="datetime-local" value={form.countdownTarget} onChange={f("countdownTarget")} /></Field>
          <Field label="Description"><textarea className={inputCls} rows={3} value={form.description} onChange={f("description")} placeholder="Event description..." /></Field>
        </div>
        <div className="flex gap-6 mt-4 flex-wrap">
          {[["isFeatured", "Featured"], ["isPast", "Past Event"], ["registrationOpen", "Registration Open"]].map(([k, label]) => (
            <label key={k} className="flex items-center gap-2 text-sm font-inter text-slate-600 dark:text-slate-300 cursor-pointer">
              <input type="checkbox" checked={(form as any)[k]} onChange={f(k)} className="w-4 h-4 accent-gold" />
              {label}
            </label>
          ))}
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={() => onSave(form, editingItem?.id)} className="bg-navy text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-navy-light transition-colors">
            {editingItem ? "Update Event" : "Add Event"}
          </button>
          {editingItem && <button onClick={() => setEditingItem(null)} className="border border-slate-200 dark:border-slate-700 px-6 py-2.5 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancel</button>}
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col gap-3">
        {events.map((ev: EventItem) => (
          <div key={ev.id} className="bg-white dark:bg-dark-card rounded-2xl p-5 border border-slate-200/40 dark:border-slate-800/40 flex items-center justify-between gap-4 shadow-sm">
            <div className="flex flex-col gap-1">
              <span className="font-poppins font-bold text-sm text-navy dark:text-white">{ev.title}</span>
              <span className="text-xs text-slate-400 font-inter">{ev.date} · {ev.location}</span>
              <div className="flex gap-2 mt-1 flex-wrap">
                {ev.isFeatured && <span className="text-[10px] bg-gold/10 text-gold border border-gold/20 px-2 py-0.5 rounded-full font-bold">Featured</span>}
                {ev.isPast && <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold">Past</span>}
                {ev.registrationOpen && <span className="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-bold">Reg. Open</span>}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => setEditingItem(ev)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-gold/10 text-slate-500 hover:text-gold transition-colors"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => onDelete(ev.id)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-red-50 text-slate-500 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        {events.length === 0 && <p className="text-slate-400 text-sm font-inter text-center py-8">No events yet. Add one above.</p>}
      </div>
    </div>
  );
}

// ─── NEWSLETTERS PANEL ────────────────────────────────────────────────────────
function NewslettersPanel({ newsletters, editingItem, setEditingItem, onSave, onDelete }: any) {
  const blank = { issue: "", title: "Gregorian Voice", month: "", coverColor: "#0F2D5C", description: "", highlights: "", downloadUrl: "", previewUrl: "", size: "", isFeatured: false };
  const [form, setForm] = useState(blank);

  useEffect(() => {
    if (editingItem) setForm({ ...editingItem, highlights: (editingItem.highlights ?? []).join("\n") });
    else setForm(blank);
  }, [editingItem]);

  const f = (k: string) => (e: any) => setForm((p: any) => ({ ...p, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const handleSave = () => {
    onSave({ ...form, highlights: form.highlights.split("\n").map((s: string) => s.trim()).filter(Boolean) }, editingItem?.id);
  };

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-poppins font-extrabold text-2xl text-navy dark:text-white">Newsletters</h1>

      <div className="bg-white dark:bg-dark-card rounded-3xl p-6 border border-slate-200/40 dark:border-slate-800/40 shadow-sm">
        <h2 className="font-poppins font-bold text-base text-navy dark:text-white mb-5">{editingItem ? "Edit Newsletter" : "Add New Newsletter"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Issue (e.g. Issue 04)"><input className={inputCls} value={form.issue} onChange={f("issue")} placeholder="Issue 04" /></Field>
          <Field label="Title"><input className={inputCls} value={form.title} onChange={f("title")} placeholder="Gregorian Voice" /></Field>
          <Field label="Month (e.g. June 2026)"><input className={inputCls} value={form.month} onChange={f("month")} placeholder="June 2026" /></Field>
          <Field label="Cover Color (hex)"><input className={inputCls} type="color" value={form.coverColor} onChange={f("coverColor")} /></Field>
          <Field label="Download URL (PDF link)"><input className={inputCls} value={form.downloadUrl} onChange={f("downloadUrl")} placeholder="https://drive.google.com/..." /></Field>
          <Field label="File Size"><input className={inputCls} value={form.size} onChange={f("size")} placeholder="2.5 MB" /></Field>
          <Field label="Description"><textarea className={inputCls} rows={3} value={form.description} onChange={f("description")} placeholder="Brief summary of this issue..." /></Field>
          <Field label="Highlights (one per line)"><textarea className={inputCls} rows={4} value={form.highlights} onChange={f("highlights")} placeholder={"Retreat Report\nMetropolitan's Message\nBible Quiz Results"} /></Field>
        </div>
        <div className="mt-4">
          <label className="flex items-center gap-2 text-sm font-inter text-slate-600 dark:text-slate-300 cursor-pointer">
            <input type="checkbox" checked={form.isFeatured} onChange={f("isFeatured")} className="w-4 h-4 accent-gold" />
            Mark as Latest Issue (Featured)
          </label>
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={handleSave} className="bg-navy text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-navy-light transition-colors">
            {editingItem ? "Update Newsletter" : "Add Newsletter"}
          </button>
          {editingItem && <button onClick={() => setEditingItem(null)} className="border border-slate-200 dark:border-slate-700 px-6 py-2.5 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancel</button>}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {newsletters.map((nl: NewsletterItem) => (
          <div key={nl.id} className="bg-white dark:bg-dark-card rounded-2xl p-5 border border-slate-200/40 dark:border-slate-800/40 flex items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center" style={{ backgroundColor: nl.coverColor }}>
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-poppins font-bold text-sm text-navy dark:text-white">{nl.issue} — {nl.month}</span>
                <span className="text-xs text-slate-400 font-inter line-clamp-1">{nl.description}</span>
                {nl.isFeatured && <span className="text-[10px] bg-gold/10 text-gold border border-gold/20 px-2 py-0.5 rounded-full font-bold w-fit mt-1">Latest Issue</span>}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => setEditingItem(nl)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-gold/10 text-slate-500 hover:text-gold transition-colors"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => onDelete(nl.id)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-red-50 text-slate-500 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        {newsletters.length === 0 && <p className="text-slate-400 text-sm font-inter text-center py-8">No newsletters yet. Add one above.</p>}
      </div>
    </div>
  );
}

// ─── LEADERSHIP PANEL ─────────────────────────────────────────────────────────
function LeadershipPanel({ leadership, editingItem, setEditingItem, onSave, onDelete }: any) {
  const blank = { name: "", position: "", photo: "", linkedin: "", order: 1 };
  const [form, setForm] = useState(blank);

  useEffect(() => {
    if (editingItem) setForm(editingItem);
    else setForm(blank);
  }, [editingItem]);

  const f = (k: string) => (e: any) => setForm((p: any) => ({ ...p, [k]: k === "order" ? Number(e.target.value) : e.target.value }));

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-poppins font-extrabold text-2xl text-navy dark:text-white">Leadership</h1>

      <div className="bg-white dark:bg-dark-card rounded-3xl p-6 border border-slate-200/40 dark:border-slate-800/40 shadow-sm">
        <h2 className="font-poppins font-bold text-base text-navy dark:text-white mb-5">{editingItem ? "Edit Member" : "Add Member"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Full Name"><input className={inputCls} value={form.name} onChange={f("name")} placeholder="Name" /></Field>
          <Field label="Position"><input className={inputCls} value={form.position} onChange={f("position")} placeholder="President" /></Field>
          <Field label="Photo URL"><input className={inputCls} value={form.photo} onChange={f("photo")} placeholder="/photo.jpg or https://..." /></Field>
          <Field label="LinkedIn URL (optional)"><input className={inputCls} value={form.linkedin} onChange={f("linkedin")} placeholder="https://linkedin.com/in/..." /></Field>
          <Field label="Display Order"><input className={inputCls} type="number" value={form.order} onChange={f("order")} min={1} /></Field>
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={() => onSave(form, editingItem?.id)} className="bg-navy text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-navy-light transition-colors">
            {editingItem ? "Update Member" : "Add Member"}
          </button>
          {editingItem && <button onClick={() => setEditingItem(null)} className="border border-slate-200 dark:border-slate-700 px-6 py-2.5 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancel</button>}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {leadership.map((m: LeadershipMember) => (
          <div key={m.id} className="bg-white dark:bg-dark-card rounded-2xl p-5 border border-slate-200/40 dark:border-slate-800/40 flex items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-4">
              <img src={m.photo} alt={m.name} className="w-12 h-12 rounded-2xl object-cover bg-slate-100" onError={e => { (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(m.name); }} />
              <div>
                <p className="font-poppins font-bold text-sm text-navy dark:text-white">{m.name}</p>
                <p className="text-xs text-slate-400">{m.position} · Order {m.order}</p>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => setEditingItem(m)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-gold/10 text-slate-500 hover:text-gold transition-colors"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => onDelete(m.id)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-red-50 text-slate-500 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        {leadership.length === 0 && <p className="text-slate-400 text-sm font-inter text-center py-8">No members yet.</p>}
      </div>
    </div>
  );
}

// ─── GALLERY PANEL ────────────────────────────────────────────────────────────
function GalleryPanel({ gallery, onSave, onDelete }: any) {
  const blank = { title: "", url: "", type: "image" as "image" | "video", category: "Camp" };
  const [form, setForm] = useState(blank);
  const f = (k: string) => (e: any) => setForm((p: any) => ({ ...p, [k]: e.target.value }));

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-poppins font-extrabold text-2xl text-navy dark:text-white">Gallery</h1>

      <div className="bg-white dark:bg-dark-card rounded-3xl p-6 border border-slate-200/40 dark:border-slate-800/40 shadow-sm">
        <h2 className="font-poppins font-bold text-base text-navy dark:text-white mb-5">Add Gallery Item</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Title"><input className={inputCls} value={form.title} onChange={f("title")} placeholder="Photo title" /></Field>
          <Field label="Image / Video URL"><input className={inputCls} value={form.url} onChange={f("url")} placeholder="/image.jpg or https://..." /></Field>
          <Field label="Type">
            <select className={inputCls} value={form.type} onChange={f("type")}>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </Field>
          <Field label="Category">
            <select className={inputCls} value={form.category} onChange={f("category")}>
              {["Camp", "Retreat", "Conference", "Sports", "Charity", "Prayer", "Event"].map(c => <option key={c}>{c}</option>)}
            </select>
          </Field>
        </div>
        <button onClick={() => { onSave(form); setForm(blank); }} className="mt-5 bg-navy text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-navy-light transition-colors">
          Add to Gallery
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map((item: GalleryItem) => (
          <div key={item.id} className="relative group rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 aspect-square">
            <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3">
              <p className="text-white text-xs font-bold text-center line-clamp-2">{item.title}</p>
              <button onClick={() => onDelete(item.id)} className="p-2 bg-red-500 rounded-xl text-white hover:bg-red-600 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {gallery.length === 0 && <p className="text-slate-400 text-sm font-inter col-span-4 text-center py-8">No gallery items yet.</p>}
      </div>
    </div>
  );
}

// ─── BLOG PANEL ───────────────────────────────────────────────────────────────
function BlogPanel({ blogPosts, editingItem, setEditingItem, onSave, onDelete }: any) {
  const blank = { title: "", slug: "", excerpt: "", content: "", author: "", date: new Date().toISOString().split("T")[0], image: "", tags: "" };
  const [form, setForm] = useState(blank);

  useEffect(() => {
    if (editingItem) setForm({ ...editingItem, tags: (editingItem.tags ?? []).join(", ") });
    else setForm(blank);
  }, [editingItem]);

  const f = (k: string) => (e: any) => setForm((p: any) => ({ ...p, [k]: e.target.value }));

  const handleSave = () => {
    onSave({ ...form, tags: form.tags.split(",").map((s: string) => s.trim()).filter(Boolean) }, editingItem?.id);
  };

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-poppins font-extrabold text-2xl text-navy dark:text-white">Blog Posts</h1>

      <div className="bg-white dark:bg-dark-card rounded-3xl p-6 border border-slate-200/40 dark:border-slate-800/40 shadow-sm">
        <h2 className="font-poppins font-bold text-base text-navy dark:text-white mb-5">{editingItem ? "Edit Post" : "Add New Post"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Title"><input className={inputCls} value={form.title} onChange={f("title")} placeholder="Post title" /></Field>
          <Field label="Slug (URL)"><input className={inputCls} value={form.slug} onChange={f("slug")} placeholder="post-slug" /></Field>
          <Field label="Author"><input className={inputCls} value={form.author} onChange={f("author")} placeholder="Author name" /></Field>
          <Field label="Date"><input className={inputCls} type="date" value={form.date} onChange={f("date")} /></Field>
          <Field label="Cover Image URL"><input className={inputCls} value={form.image} onChange={f("image")} placeholder="/image.jpg or https://..." /></Field>
          <Field label="Tags (comma separated)"><input className={inputCls} value={form.tags} onChange={f("tags")} placeholder="Faith, Retreat, Students" /></Field>
          <Field label="Excerpt"><textarea className={inputCls} rows={2} value={form.excerpt} onChange={f("excerpt")} placeholder="Short summary..." /></Field>
          <Field label="Content"><textarea className={inputCls} rows={5} value={form.content} onChange={f("content")} placeholder="Full post content..." /></Field>
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={handleSave} className="bg-navy text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-navy-light transition-colors">
            {editingItem ? "Update Post" : "Add Post"}
          </button>
          {editingItem && <button onClick={() => setEditingItem(null)} className="border border-slate-200 dark:border-slate-700 px-6 py-2.5 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancel</button>}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {blogPosts.map((p: BlogPost) => (
          <div key={p.id} className="bg-white dark:bg-dark-card rounded-2xl p-5 border border-slate-200/40 dark:border-slate-800/40 flex items-center justify-between gap-4 shadow-sm">
            <div>
              <p className="font-poppins font-bold text-sm text-navy dark:text-white">{p.title}</p>
              <p className="text-xs text-slate-400">{p.author} · {p.date}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => setEditingItem(p)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-gold/10 text-slate-500 hover:text-gold transition-colors"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => onDelete(p.id)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-red-50 text-slate-500 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        {blogPosts.length === 0 && <p className="text-slate-400 text-sm font-inter text-center py-8">No posts yet.</p>}
      </div>
    </div>
  );
}

// ─── ANNOUNCEMENTS PANEL ──────────────────────────────────────────────────────
function AnnouncementsPanel({ announcements, onSave, onDelete }: any) {
  const blank = { title: "", message: "", date: new Date().toISOString().split("T")[0], isActive: true };
  const [form, setForm] = useState(blank);
  const f = (k: string) => (e: any) => setForm((p: any) => ({ ...p, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-poppins font-extrabold text-2xl text-navy dark:text-white">Announcements</h1>

      <div className="bg-white dark:bg-dark-card rounded-3xl p-6 border border-slate-200/40 dark:border-slate-800/40 shadow-sm">
        <h2 className="font-poppins font-bold text-base text-navy dark:text-white mb-5">Add Announcement</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Title"><input className={inputCls} value={form.title} onChange={f("title")} placeholder="Announcement title" /></Field>
          <Field label="Date"><input className={inputCls} type="date" value={form.date} onChange={f("date")} /></Field>
          <Field label="Message"><textarea className={inputCls} rows={3} value={form.message} onChange={f("message")} placeholder="Announcement details..." /></Field>
        </div>
        <label className="flex items-center gap-2 text-sm font-inter text-slate-600 dark:text-slate-300 cursor-pointer mt-4">
          <input type="checkbox" checked={form.isActive} onChange={f("isActive")} className="w-4 h-4 accent-gold" />
          Active (visible on website)
        </label>
        <button onClick={() => { onSave(form); setForm(blank); }} className="mt-5 bg-navy text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-navy-light transition-colors">
          Post Announcement
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {announcements.map((a: Announcement) => (
          <div key={a.id} className="bg-white dark:bg-dark-card rounded-2xl p-5 border border-slate-200/40 dark:border-slate-800/40 flex items-center justify-between gap-4 shadow-sm">
            <div>
              <p className="font-poppins font-bold text-sm text-navy dark:text-white">{a.title}</p>
              <p className="text-xs text-slate-400 line-clamp-1">{a.message}</p>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold mt-1 inline-block ${a.isActive ? "bg-green-50 text-green-600" : "bg-slate-100 text-slate-400"}`}>
                {a.isActive ? "Active" : "Inactive"}
              </span>
            </div>
            <button onClick={() => onDelete(a.id)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-red-50 text-slate-500 hover:text-red-500 transition-colors shrink-0"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
        {announcements.length === 0 && <p className="text-slate-400 text-sm font-inter text-center py-8">No announcements yet.</p>}
      </div>
    </div>
  );
}