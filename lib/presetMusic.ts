// Lagu preset untuk undangan pernikahan
export interface PresetSong {
  id: string
  title: string
  artist: string
  genre: string
  url: string
  duration?: string
}

const base = 'https://rrlveqcnmhzknacyozdh.supabase.co/storage/v1/object/public/wedding-photos/music/d87c8b96-6e6a-4360-8d47-cf88bdcff6ed'

export const presetSongs: PresetSong[] = [
  {
    id: 'a-thousand-years',
    title: 'A Thousand Years',
    artist: 'Christina Perri',
    genre: 'Romantis',
    url: `${base}/Christina%20Perri%20-%20A%20Thousand%20Years.mp3`,
    duration: '4:45',
  },
  {
    id: 'perfect',
    title: 'Perfect',
    artist: 'Ed Sheeran',
    genre: 'Romantis',
    url: `${base}/Ed%20Sheeran%20-%20Perfect%20(Lyrics).mp3`,
    duration: '4:23',
  },
  {
    id: 'cant-help-falling',
    title: "Can't Help Falling in Love",
    artist: 'Elvis Presley',
    genre: 'Klasik',
    url: `${base}/Elvis%20Presley%20-%20Can%20t%20Help%20Falling%20in%20Love%20(Lyrics).mp3`,
    duration: '3:01',
  },
  {
    id: 'all-of-me',
    title: 'All of Me',
    artist: 'John Legend',
    genre: 'Romantis',
    url: `${base}/John%20Legend%20-%20All%20of%20Me%20(Lyrics).mp3`,
    duration: '4:29',
  },
  {
    id: 'thinking-out-loud',
    title: 'Thinking Out Loud',
    artist: 'Ed Sheeran',
    genre: 'Romantis',
    url: `${base}/Ed%20Sheeran%20-%20Thinking%20Out%20Loud%20(Official%20Lyric%20Video).mp3`,
    duration: '4:41',
  },
  {
    id: 'gamelan-jawa',
    title: 'Gamelan Pernikahan',
    artist: 'Traditional Jawa',
    genre: 'Tradisional',
    url: `${base}/Gamelan%20Pernikahan.mp3`,
    duration: '5:00',
  },
  {
    id: 'mojang-priangan',
    title: 'Mojang Priangan',
    artist: 'Traditional Sunda',
    genre: 'Tradisional',
    url: `${base}/Mojang%20Priangan%20-%20Mojang%20Priangan%20(A%20Girl%20from%20Priangan).mp3`,
    duration: '4:30',
  },
  {
    id: 'komang',
    title: 'Komang',
    artist: 'Raim Laode',
    genre: 'Romantis',
    url: 'https://rrlveqcnmhzknacyozdh.supabase.co/storage/v1/object/public/wedding-photos/music/KOMANG%20-%20RAIM%20LAODE%20LYRIC%20OFFICIAL.mp3',
    duration: '4:00',
  },
  {
    id: 'cinta-terakhir',
    title: 'Cinta Terakhir',
    artist: 'Ari Lasso',
    genre: 'Romantis',
    url: 'https://rrlveqcnmhzknacyozdh.supabase.co/storage/v1/object/public/wedding-photos/music/Cinta%20Terakhir%20-%20Ari%20Lasso%20Live%20Cover%20Good%20people%20Music%20(1).mp3',
    duration: '4:00',
  },
]
