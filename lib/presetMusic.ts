// Lagu preset untuk undangan pernikahan
// URL bisa diisi dengan link dari Supabase Storage atau CDN setelah upload
// Format: upload file MP3 ke Supabase Storage bucket 'wedding-music' lalu paste URL di sini

export interface PresetSong {
  id: string
  title: string
  artist: string
  genre: string
  url: string // URL MP3 dari Supabase Storage
  duration?: string
}

export const presetSongs: PresetSong[] = [
  {
    id: 'a-thousand-years',
    title: 'A Thousand Years',
    artist: 'Christina Perri (Instrumental)',
    genre: 'Romantis',
    url: '', // Isi dengan URL setelah upload ke Supabase Storage
    duration: '4:45',
  },
  {
    id: 'perfect',
    title: 'Perfect',
    artist: 'Ed Sheeran (Instrumental)',
    genre: 'Romantis',
    url: '',
    duration: '4:23',
  },
  {
    id: 'cant-help-falling',
    title: "Can't Help Falling in Love",
    artist: 'Elvis Presley (Instrumental)',
    genre: 'Klasik',
    url: '',
    duration: '3:01',
  },
  {
    id: 'all-of-me',
    title: 'All of Me',
    artist: 'John Legend (Instrumental)',
    genre: 'Romantis',
    url: '',
    duration: '4:29',
  },
  {
    id: 'marry-you',
    title: 'Marry You',
    artist: 'Bruno Mars (Instrumental)',
    genre: 'Ceria',
    url: '',
    duration: '3:50',
  },
  {
    id: 'thinking-out-loud',
    title: 'Thinking Out Loud',
    artist: 'Ed Sheeran (Instrumental)',
    genre: 'Romantis',
    url: '',
    duration: '4:41',
  },
  {
    id: 'gamelan-jawa',
    title: 'Gamelan Pernikahan',
    artist: 'Traditional Jawa',
    genre: 'Tradisional',
    url: '',
    duration: '5:00',
  },
  {
    id: 'sunda-wedding',
    title: 'Degung Pernikahan',
    artist: 'Traditional Sunda',
    genre: 'Tradisional',
    url: '',
    duration: '4:30',
  },
]
