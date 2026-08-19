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

export type Testimonial = {
  id: string;
  name: string;
  city: string;
  rating: number;
  comment: string;
};

// TODO: ganti dengan testimoni pelanggan asli (nama, kota, rating, komentar) sebelum go-live.
export const testimonials: Testimonial[] = [
  {
    id: "testi-1",
    name: "Rizal",
    city: "Surabaya",
    rating: 5,
    comment:
      "Beli MacBook Pro second di sini, kondisinya bener-bener mulus sesuai deskripsi. Garansinya juga jelas.",
  },
  {
    id: "testi-2",
    name: "Dinda",
    city: "Semarang",
    rating: 5,
    comment:
      "Proses tukar tambah iPad lama ke yang baru cepat, harganya juga wajar. Pelayanan ramah.",
  },
  {
    id: "testi-3",
    name: "Farhan",
    city: "Bandung",
    rating: 4,
    comment:
      "Konsultasi via WhatsApp responsif, dibantu pilih spek Mac Mini sesuai kebutuhan kerja.",
  },
  {
    id: "testi-4",
    name: "Salsabila",
    city: "Yogyakarta",
    rating: 5,
    comment:
      "Datang langsung ke store Jogja, unitnya bisa dicoba dulu sebelum bayar. Jadi lebih yakin belinya.",
  },
  {
    id: "testi-5",
    name: "Bagas",
    city: "Malang",
    rating: 5,
    comment:
      "Sudah 3 kali beli di sini, dari iMac sampai AirPods, semua original dan pengiriman rapi.",
  },
  {
    id: "testi-6",
    name: "Putri",
    city: "Jakarta",
    rating: 4,
    comment:
      "Harga bersaing dibanding toko lain, admin juga sabar jawab pertanyaan detail soal baterai health.",
  },
  {
    id: "testi-7",
    name: "Yusuf",
    city: "Solo",
    rating: 5,
    comment:
      "Klaim garansi MacBook Air kemarin diproses cepat tanpa ribet. Recommended buat beli Apple second.",
  },
];

// TODO: ganti link sosial media dengan akun asli, atau hapus yang tidak dipakai.
export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/mumtaz.computer/" },
  { label: "TikTok", href: "https://www.tiktok.com/@mumtazcomputer" },
] as const;
