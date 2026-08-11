// TODO: ganti seluruh nilai placeholder di file ini dengan data asli Mumtaz MacBook Store.

export const siteConfig = {
  name: "Mumtaz MacBook Store",
  group: "Mumtaz Group",
  tagline: "Apple reseller terpercaya, bergaransi, 4 cabang di Jawa",
  // TODO: ganti nomor WhatsApp utama (format 62xxxxxxxxxx, tanpa "+" atau "0" di depan)
  whatsappNumber: "6281234567890",
  // TODO: ganti nomor telepon utama untuk tombol "Telepon"
  phoneNumber: "6281234567890",
  foundedYear: 2016, // TODO: ganti tahun berdiri asli
  unitsSold: "5.000+", // TODO: ganti angka unit terjual asli (atau hapus klaim jika belum ada datanya)
} as const;

export function buildWhatsAppLink(message: string, number: string = siteConfig.whatsappNumber) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Katalog", href: "/katalog" },
  { label: "Tentang", href: "/#tentang" },
  { label: "Cabang", href: "/#cabang" },
  { label: "Kontak", href: "/#kontak" },
] as const;

export type Branch = {
  id: string;
  name: string;
  address: string;
  hours: string;
  whatsappNumber: string;
  mapsUrl: string;
};

// TODO: ganti alamat, jam operasional, nomor WA, dan link Google Maps tiap cabang dengan data asli.
export const branches: Branch[] = [
  {
    id: "cabang-1",
    name: "Mumtaz MacBook Store — Cabang 1",
    address: "Alamat lengkap cabang 1 belum diisi, Kota, Provinsi",
    hours: "Senin–Sabtu, 09.00–20.00 WIB",
    whatsappNumber: siteConfig.whatsappNumber,
    mapsUrl: "https://maps.google.com",
  },
  {
    id: "cabang-2",
    name: "Mumtaz MacBook Store — Cabang 2",
    address: "Alamat lengkap cabang 2 belum diisi, Kota, Provinsi",
    hours: "Senin–Sabtu, 09.00–20.00 WIB",
    whatsappNumber: siteConfig.whatsappNumber,
    mapsUrl: "https://maps.google.com",
  },
  {
    id: "cabang-3",
    name: "Mumtaz MacBook Store — Cabang 3",
    address: "Alamat lengkap cabang 3 belum diisi, Kota, Provinsi",
    hours: "Senin–Sabtu, 09.00–20.00 WIB",
    whatsappNumber: siteConfig.whatsappNumber,
    mapsUrl: "https://maps.google.com",
  },
  {
    id: "cabang-4",
    name: "Mumtaz MacBook Store — Cabang 4",
    address: "Alamat lengkap cabang 4 belum diisi, Kota, Provinsi",
    hours: "Senin–Sabtu, 09.00–20.00 WIB",
    whatsappNumber: siteConfig.whatsappNumber,
    mapsUrl: "https://maps.google.com",
  },
];

// TODO: ganti link sosial media dengan akun asli, atau hapus yang tidak dipakai.
export const socials = [
  { label: "Instagram", href: "https://instagram.com/" },
  { label: "TikTok", href: "https://tiktok.com/" },
] as const;
