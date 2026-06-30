import { supabase } from "./supabase";
import { bibleVerses, dailyPrayers } from "./seedData";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  isFeatured: boolean;
  isPast: boolean;
  registrationOpen: boolean;
  registrationUrl?: string;
  countdownTarget?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  url: string;
  type: "image" | "video";
  category: string;
}

export interface LeadershipMember {
  id: string;
  name: string;
  position: string;
  photo: string;
  linkedin?: string;
  order: number;
}

export interface NewsletterItem {
  id: string;
  issue: string;
  title: string;
  month: string;
  coverColor: string;
  description: string;
  highlights: string[];
  downloadUrl: string;
  previewUrl?: string;
  size: string;
  isFeatured: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  date: string;
  isActive: boolean;
}

export interface Registration {
  id: string;
  eventId?: string;
  eventTitle?: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userParish: string;
  type: "member" | "volunteer" | "event";
  status: "Pending" | "Approved" | "Rejected";
  date: string;
}

// ─── Helper: map snake_case rows from Supabase to camelCase ──────────────────

const mapEvent = (r: any): EventItem => ({
  id: r.id,
  title: r.title,
  description: r.description,
  date: r.date,
  time: r.time,
  location: r.location,
  image: r.image,
  isFeatured: r.is_featured,
  isPast: r.is_past,
  registrationOpen: r.registration_open,
  registrationUrl: r.registration_url,
  countdownTarget: r.countdown_target,
});

const mapBlog = (r: any): BlogPost => ({
  id: r.id,
  title: r.title,
  slug: r.slug,
  excerpt: r.excerpt,
  content: r.content,
  author: r.author,
  date: r.date,
  image: r.image,
  tags: r.tags ?? [],
});

const mapGallery = (r: any): GalleryItem => ({
  id: r.id,
  title: r.title,
  url: r.url,
  type: r.type,
  category: r.category,
});

const mapLeadership = (r: any): LeadershipMember => ({
  id: r.id,
  name: r.name,
  position: r.position,
  photo: r.photo,
  linkedin: r.linkedin,
  order: r.order,
});

const mapNewsletter = (r: any): NewsletterItem => ({
  id: r.id,
  issue: r.issue,
  title: r.title,
  month: r.month,
  coverColor: r.cover_color,
  description: r.description,
  highlights: r.highlights ?? [],
  downloadUrl: r.download_url,
  previewUrl: r.preview_url,
  size: r.size,
  isFeatured: r.is_featured,
});

const mapAnnouncement = (r: any): Announcement => ({
  id: r.id,
  title: r.title,
  message: r.message,
  date: r.date,
  isActive: r.is_active,
});

// ─── DB object ────────────────────────────────────────────────────────────────

export const db = {

  // ── EVENTS ──────────────────────────────────────────────────────────────────
  getEvents: async (): Promise<EventItem[]> => {
    const { data, error } = await supabase.from("events").select("*").order("date", { ascending: true });
    if (error) { console.error(error); return []; }
    return (data ?? []).map(mapEvent);
  },

  addEvent: async (event: Omit<EventItem, "id">): Promise<EventItem | null> => {
    const { data, error } = await supabase.from("events").insert([{
      id: `evt-${Date.now()}`,
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      image: event.image,
      is_featured: event.isFeatured,
      is_past: event.isPast,
      registration_open: event.registrationOpen,
      registration_url: event.registrationUrl ?? null,
      countdown_target: event.countdownTarget ?? null,
    }]).select().single();
    if (error) { console.error(error); return null; }
    return mapEvent(data);
  },

  updateEvent: async (event: EventItem): Promise<void> => {
    const { error } = await supabase.from("events").update({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      image: event.image,
      is_featured: event.isFeatured,
      is_past: event.isPast,
      registration_open: event.registrationOpen,
      registration_url: event.registrationUrl ?? null,
      countdown_target: event.countdownTarget ?? null,
    }).eq("id", event.id);
    if (error) console.error(error);
  },

  deleteEvent: async (id: string): Promise<void> => {
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) console.error(error);
  },

  // ── BLOG ────────────────────────────────────────────────────────────────────
  getBlogPosts: async (): Promise<BlogPost[]> => {
    const { data, error } = await supabase.from("blog").select("*").order("date", { ascending: false });
    if (error) { console.error(error); return []; }
    return (data ?? []).map(mapBlog);
  },

  addBlogPost: async (post: Omit<BlogPost, "id">): Promise<BlogPost | null> => {
    const { data, error } = await supabase.from("blog").insert([{
      id: `blog-${Date.now()}`,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      date: post.date,
      image: post.image,
      tags: post.tags,
    }]).select().single();
    if (error) { console.error(error); return null; }
    return mapBlog(data);
  },

  updateBlogPost: async (post: BlogPost): Promise<void> => {
    const { error } = await supabase.from("blog").update({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      date: post.date,
      image: post.image,
      tags: post.tags,
    }).eq("id", post.id);
    if (error) console.error(error);
  },

  deleteBlogPost: async (id: string): Promise<void> => {
    const { error } = await supabase.from("blog").delete().eq("id", id);
    if (error) console.error(error);
  },

  // ── GALLERY ─────────────────────────────────────────────────────────────────
  getGallery: async (): Promise<GalleryItem[]> => {
    const { data, error } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
    if (error) { console.error(error); return []; }
    return (data ?? []).map(mapGallery);
  },

  addGalleryItem: async (item: Omit<GalleryItem, "id">): Promise<GalleryItem | null> => {
    const { data, error } = await supabase.from("gallery").insert([{
      id: `gal-${Date.now()}`,
      title: item.title,
      url: item.url,
      type: item.type,
      category: item.category,
    }]).select().single();
    if (error) { console.error(error); return null; }
    return mapGallery(data);
  },

  deleteGalleryItem: async (id: string): Promise<void> => {
    const { error } = await supabase.from("gallery").delete().eq("id", id);
    if (error) console.error(error);
  },

  // ── LEADERSHIP ──────────────────────────────────────────────────────────────
  getLeadership: async (): Promise<LeadershipMember[]> => {
    const { data, error } = await supabase.from("leadership").select("*").order("order", { ascending: true });
    if (error) { console.error(error); return []; }
    return (data ?? []).map(mapLeadership);
  },

  addLeadershipMember: async (member: Omit<LeadershipMember, "id">): Promise<LeadershipMember | null> => {
    const { data, error } = await supabase.from("leadership").insert([{
      id: `lead-${Date.now()}`,
      name: member.name,
      position: member.position,
      photo: member.photo,
      linkedin: member.linkedin ?? null,
      order: member.order,
    }]).select().single();
    if (error) { console.error(error); return null; }
    return mapLeadership(data);
  },

  updateLeadershipMember: async (member: LeadershipMember): Promise<void> => {
    const { error } = await supabase.from("leadership").update({
      name: member.name,
      position: member.position,
      photo: member.photo,
      linkedin: member.linkedin ?? null,
      order: member.order,
    }).eq("id", member.id);
    if (error) console.error(error);
  },

  deleteLeadershipMember: async (id: string): Promise<void> => {
    const { error } = await supabase.from("leadership").delete().eq("id", id);
    if (error) console.error(error);
  },

  // ── NEWSLETTERS ─────────────────────────────────────────────────────────────
  getNewsletters: async (): Promise<NewsletterItem[]> => {
    const { data, error } = await supabase.from("newsletters").select("*").order("created_at", { ascending: false });
    if (error) { console.error(error); return []; }
    return (data ?? []).map(mapNewsletter);
  },

  addNewsletter: async (nl: Omit<NewsletterItem, "id">): Promise<NewsletterItem | null> => {
    const { data, error } = await supabase.from("newsletters").insert([{
      id: `nl-${Date.now()}`,
      issue: nl.issue,
      title: nl.title,
      month: nl.month,
      cover_color: nl.coverColor,
      description: nl.description,
      highlights: nl.highlights,
      download_url: nl.downloadUrl,
      preview_url: nl.previewUrl ?? null,
      size: nl.size,
      is_featured: nl.isFeatured,
    }]).select().single();
    if (error) { console.error(error); return null; }
    return mapNewsletter(data);
  },

  updateNewsletter: async (nl: NewsletterItem): Promise<void> => {
    const { error } = await supabase.from("newsletters").update({
      issue: nl.issue,
      title: nl.title,
      month: nl.month,
      cover_color: nl.coverColor,
      description: nl.description,
      highlights: nl.highlights,
      download_url: nl.downloadUrl,
      preview_url: nl.previewUrl ?? null,
      size: nl.size,
      is_featured: nl.isFeatured,
    }).eq("id", nl.id);
    if (error) console.error(error);
  },

  deleteNewsletter: async (id: string): Promise<void> => {
    const { error } = await supabase.from("newsletters").delete().eq("id", id);
    if (error) console.error(error);
  },

  // ── ANNOUNCEMENTS ───────────────────────────────────────────────────────────
  getAnnouncements: async (): Promise<Announcement[]> => {
    const { data, error } = await supabase.from("announcements").select("*").order("date", { ascending: false });
    if (error) { console.error(error); return []; }
    return (data ?? []).map(mapAnnouncement);
  },

  addAnnouncement: async (ann: Omit<Announcement, "id">): Promise<Announcement | null> => {
    const { data, error } = await supabase.from("announcements").insert([{
      id: `ann-${Date.now()}`,
      title: ann.title,
      message: ann.message,
      date: ann.date,
      is_active: ann.isActive,
    }]).select().single();
    if (error) { console.error(error); return null; }
    return mapAnnouncement(data);
  },

  deleteAnnouncement: async (id: string): Promise<void> => {
    const { error } = await supabase.from("announcements").delete().eq("id", id);
    if (error) console.error(error);
  },

  // ── BIBLE VERSE & PRAYERS ───────────────────────────────────────────────────
  getRandomBibleVerse: () => {
    const index = new Date().getDate() % bibleVerses.length;
    return bibleVerses[index];
  },

  getRandomDailyPrayer: () => {
    const index = new Date().getDate() % dailyPrayers.length;
    return dailyPrayers[index];
  },

  // ── ADMIN AUTH ──────────────────────────────────────────────────────────────
  isAdminAuthenticated: (): boolean => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("mg_admin_auth") === "true";
  },

  loginAdmin: (email: string, password: string): boolean => {
    if (email === "mgocsm.tvmdiocese@gmail.com" && password === "mgocsmtvm@2026") {
      localStorage.setItem("mg_admin_auth", "true");
      return true;
    }
    return false;
  },

  logoutAdmin: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("mg_admin_auth");
    }
  },
};