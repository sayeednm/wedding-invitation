export interface Profile {
  id: string
  email: string
  is_premium: boolean
  created_at: string
}

export interface Invitation {
  id: string
  user_id: string
  slug: string
  template_id: string
  bride_name: string | null
  groom_name: string | null
  groom_full_name: string | null
  groom_father: string | null
  groom_mother: string | null
  groom_instagram: string | null
  bride_full_name: string | null
  bride_father: string | null
  bride_mother: string | null
  bride_instagram: string | null
  event_date: string | null
  location_name: string | null
  location_maps_url: string | null
  akad_date: string | null
  akad_location: string | null
  akad_maps_url: string | null
  music_url: string | null
  cover_photo_url: string | null
  couple_photo_url: string | null
  opening_text: string | null
  groom_photo_url: string | null
  bride_photo_url: string | null
  cover_type: 'gradient' | 'photo' | 'pattern' | null
  silhouette_variant: 'standing' | 'holding' | 'romantic' | null
  photo_frame: 'circle' | 'oval' | 'rounded' | 'hexagon' | 'diamond' | null
  dresscode_enabled: boolean | null
  photo_mode: 'single' | 'individual' | null
  dresscode_color: string | null
  dresscode_note: string | null
  quran_verse: string | null
  quran_surah: string | null
  video_url: string | null
  love_story: string | null
  live_streaming_url: string | null
  is_published: boolean
  created_at: string
  updated_at: string
  digital_gifts?: DigitalGift[]
  guestbook?: GuestbookEntry[]
  gallery?: GalleryPhoto[]
  couple_photos?: { id: string; photo_url: string; person: 'groom' | 'bride' | 'couple'; sort_order: number }[]
}

export interface GalleryPhoto {
  id: string
  invitation_id: string
  photo_url: string
  caption: string | null
  sort_order: number
  created_at: string
}

export interface DigitalGift {
  id: string
  invitation_id: string
  bank_name: string | null
  account_number: string | null
  account_holder: string | null
  qris_url: string | null
}

export interface GuestbookEntry {
  id: string
  invitation_id: string
  guest_name: string
  message: string | null
  attendance_status: 'hadir' | 'tidak_hadir' | 'mungkin'
  created_at: string
}

export interface Order {
  id: string
  user_id: string
  order_id: string
  amount: number
  status: 'pending' | 'success' | 'failed'
  created_at: string
}

export type TemplateId = 'luxury' | 'floral' | 'midnight'
