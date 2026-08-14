// TODO: ganti seluruh nilai placeholder di file ini dengan data asli Mumtaz MacBook Store.

export const siteConfig = {
  name: "Mumtaz MacBook Store",
  group: "Mumtaz Group",
  tagline: "Orriginal Apple, bergaransi",
  // TODO: ganti nomor WhatsApp utama (format 62xxxxxxxxxx, tanpa "+" atau "0" di depan)
  whatsappNumber: "6285177153913",
  // TODO: ganti nomor telepon utama untuk tombol "Telepon"
  phoneNumber: "6285177153913",
  foundedYear: 2019, // TODO: ganti tahun berdiri asli
  unitsSold: "15.000+", // TODO: ganti angka unit terjual asli (atau hapus klaim jika belum ada datanya)
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
    id: "Pusat",
    name: "Mumtaz MacBook Store Jogja",
    address: "Jl. Anggajaya 2 No.110, Sanggrahan, Condongcatur, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55283",
    hours: "Senin–Minggu, 09.00–21.00 WIB",
    whatsappNumber: siteConfig.whatsappNumber,
    mapsUrl: "https://maps.app.goo.gl/W3AgKZF5f4eyTzYt6",
  },
  {
    id: "cabang-1",
    name: "Mumtaz MacBook Store Surabaya",
    address: "Jl. Rungkut Menanggal Harapan B No.J-5, Rungkut Menanggal, Kec. Gn. Anyar, Surabaya, Jawa Timur 60293",
    hours: "Senin–Minggu, 09.00–21.00 WIB",
    whatsappNumber: siteConfig.whatsappNumber,
    mapsUrl: "https://maps.app.goo.gl/TyKhpiY4snMCWvmd9",
  },
  {
    id: "cabang-2",
    name: "Mumtaz MacBook Store Semarang",
    address: "Jl. Tirto Agung No.52, Pedalangan, Kec. Banyumanik, Kota Semarang, Jawa Tengah 50268",
    hours: "Senin–Minggu, 09.00–21.00 WIB",
    whatsappNumber: siteConfig.whatsappNumber,
    mapsUrl: "https://maps.app.goo.gl/kk97gbbzNGhkHCpc9",
  },

];

// TODO: ganti link sosial media dengan akun asli, atau hapus yang tidak dipakai.
export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/mumtaz.computer/" },
  { label: "TikTok", href: "https://www.tiktok.com/@mumtazcomputer" },
] as const;
