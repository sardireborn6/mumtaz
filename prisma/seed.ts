// Seed database dengan produk dummy + 1 akun admin default.
// TODO: ganti data produk di bawah dengan data asli sebelum go-live.
import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
});
const prisma = new PrismaClient({ adapter });

const products = [
  {
    id: "macbook-pro-14-m3-pro",
    name: 'MacBook Pro 14" M3 Pro',
    category: "MacBook",
    variant: "M3 Pro, 18GB/512GB",
    condition: "Second",
    conditionGrade: "Mulus",
    chip: "Apple M3 Pro",
    ram: "18GB",
    storage: "512GB SSD",
    price: 28500000,
    stock: 2,
    branchIds: ["cabang-1", "cabang-2"],
    warrantyMonths: 3,
    description:
      "Unit resmi, baterai health 95%+, sudah dicek fisik & fungsi menyeluruh sebelum dijual kembali.",
    createdAt: "2026-08-01",
  },
  {
    id: "imac-24-m3",
    name: 'iMac 24" M3',
    category: "iMac",
    variant: "M3, 8GB/256GB",
    condition: "Baru",
    conditionGrade: null,
    chip: "Apple M3",
    ram: "8GB",
    storage: "256GB SSD",
    price: 21500000,
    stock: 4,
    branchIds: ["cabang-1", "cabang-3"],
    warrantyMonths: 12,
    description: "Garansi resmi 1 tahun, segel baru, siap kirim ke seluruh Jawa.",
    createdAt: "2026-07-20",
  },
  {
    id: "macbook-air-13-m2",
    name: 'MacBook Air 13" M2',
    category: "MacBook",
    variant: "M2, 8GB/256GB",
    condition: "Second",
    conditionGrade: "Good",
    chip: "Apple M2",
    ram: "8GB",
    storage: "256GB SSD",
    price: 13900000,
    stock: 3,
    branchIds: ["cabang-2", "cabang-4"],
    warrantyMonths: 3,
    description: "Cocok untuk kerja & kuliah sehari-hari, minor sign of use, fungsi 100%.",
    createdAt: "2026-07-15",
  },
  {
    id: "mac-mini-m4",
    name: "Mac Mini M4",
    category: "Mac Mini",
    variant: "M4, 16GB/256GB",
    condition: "Baru",
    conditionGrade: null,
    chip: "Apple M4",
    ram: "16GB",
    storage: "256GB SSD",
    price: 12500000,
    stock: 5,
    branchIds: ["cabang-1", "cabang-2", "cabang-3", "cabang-4"],
    warrantyMonths: 12,
    description: "Generasi terbaru, garansi resmi, tersedia di semua cabang.",
    createdAt: "2026-08-05",
  },
  {
    id: "ipad-pro-11-m4",
    name: 'iPad Pro 11" M4',
    category: "iPad",
    variant: "M4, 256GB, WiFi",
    condition: "Baru",
    conditionGrade: null,
    chip: "Apple M4",
    ram: "8GB",
    storage: "256GB",
    price: 17900000,
    stock: 3,
    branchIds: ["cabang-3"],
    warrantyMonths: 12,
    description: "Layar Ultra Retina XDR, garansi resmi, cocok untuk desain & produktivitas.",
    createdAt: "2026-06-28",
  },
  {
    id: "macbook-pro-16-m3-max",
    name: 'MacBook Pro 16" M3 Max',
    category: "MacBook",
    variant: "M3 Max, 36GB/1TB",
    condition: "Second",
    conditionGrade: "Mulus",
    chip: "Apple M3 Max",
    ram: "36GB",
    storage: "1TB SSD",
    price: 42000000,
    stock: 1,
    branchIds: ["cabang-1"],
    warrantyMonths: 3,
    description: "Spesifikasi tertinggi untuk video editing & rendering berat, stok terbatas.",
    createdAt: "2026-05-10",
  },
  {
    id: "imac-24-m1-second",
    name: 'iMac 24" M1',
    category: "iMac",
    variant: "M1, 8GB/256GB",
    condition: "Second",
    conditionGrade: "Good",
    chip: "Apple M1",
    ram: "8GB",
    storage: "256GB SSD",
    price: 14900000,
    stock: 2,
    branchIds: ["cabang-4"],
    warrantyMonths: 3,
    description: "Pilihan hemat untuk kebutuhan kantor & belajar, layar dan bodi mulus.",
    createdAt: "2026-04-22",
  },
  {
    id: "ipad-air-11-m2-second",
    name: 'iPad Air 11" M2',
    category: "iPad",
    variant: "M2, 128GB, WiFi",
    condition: "Second",
    conditionGrade: "Fair",
    chip: "Apple M2",
    ram: "8GB",
    storage: "128GB",
    price: 9500000,
    stock: 0,
    branchIds: ["cabang-2"],
    warrantyMonths: 3,
    description: "Unit fungsi normal dengan tanda pemakaian pada bodi, cocok untuk daily use.",
    createdAt: "2026-03-18",
  },
  {
    id: "mac-mini-m2-second",
    name: "Mac Mini M2",
    category: "Mac Mini",
    variant: "M2, 8GB/256GB",
    condition: "Second",
    conditionGrade: "Mulus",
    chip: "Apple M2",
    ram: "8GB",
    storage: "256GB SSD",
    price: 6900000,
    stock: 4,
    branchIds: ["cabang-3"],
    warrantyMonths: 3,
    description: "Opsi paling terjangkau untuk masuk ke ekosistem Mac, kondisi mulus.",
    createdAt: "2026-02-14",
  },
];

async function seedProducts() {
  for (const p of products) {
    await prisma.product.upsert({
      where: { id: p.id },
      update: {},
      create: {
        id: p.id,
        name: p.name,
        category: p.category,
        variant: p.variant,
        condition: p.condition,
        conditionGrade: p.conditionGrade,
        chip: p.chip,
        ram: p.ram,
        storage: p.storage,
        price: p.price,
        stock: p.stock,
        branchIds: JSON.stringify(p.branchIds),
        warrantyMonths: p.warrantyMonths,
        description: p.description,
        active: true,
        createdAt: new Date(p.createdAt),
      },
    });
  }
  console.log(`Seeded ${products.length} produk.`);
}

async function seedAdmin() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    console.warn(
      "ADMIN_USERNAME / ADMIN_PASSWORD tidak diset di .env.local — akun admin dilewati. " +
        "Isi dulu env var itu lalu jalankan `npm run db:seed` lagi."
    );
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.adminUser.upsert({
    where: { username },
    update: { passwordHash },
    create: { username, passwordHash },
  });
  console.log(`Akun admin "${username}" siap dipakai login.`);
}

const defaultBranches = [
  {
    id: "Pusat",
    name: "Mumtaz MacBook Store Jogja",
    address: "Jl. Anggajaya 2 No.110, Sanggrahan, Condongcatur, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55283",
    hours: "Senin–Minggu, 09.00–21.00 WIB",
    whatsappNumber: "6285177153913",
    mapsUrl: "https://maps.app.goo.gl/W3AgKZF5f4eyTzYt6",
    order: 1,
  },
  {
    id: "cabang-1",
    name: "Mumtaz MacBook Store Surabaya",
    address: "Jl. Rungkut Menanggal Harapan B No.J-5, Rungkut Menanggal, Kec. Gn. Anyar, Surabaya, Jawa Timur 60293",
    hours: "Senin–Minggu, 09.00–21.00 WIB",
    whatsappNumber: "6285177153913",
    mapsUrl: "https://maps.app.goo.gl/TyKhpiY4snMCWvmd9",
    order: 2,
  },
  {
    id: "cabang-2",
    name: "Mumtaz MacBook Store Semarang",
    address: "Jl. Tirto Agung No.52, Pedalangan, Kec. Banyumanik, Kota Semarang, Jawa Tengah 50268",
    hours: "Senin–Minggu, 09.00–21.00 WIB",
    whatsappNumber: "6285177153913",
    mapsUrl: "https://maps.app.goo.gl/kk97gbbzNGhkHCpc9",
    order: 3,
  },
];

async function seedBranches() {
  for (const b of defaultBranches) {
    await prisma.branch.upsert({
      where: { id: b.id },
      update: {
        name: b.name,
        address: b.address,
        hours: b.hours,
        whatsappNumber: b.whatsappNumber,
        mapsUrl: b.mapsUrl,
        order: b.order,
      },
      create: {
        id: b.id,
        name: b.name,
        address: b.address,
        hours: b.hours,
        whatsappNumber: b.whatsappNumber,
        mapsUrl: b.mapsUrl,
        order: b.order,
      },
    });
  }
  console.log(`Seeded ${defaultBranches.length} cabang.`);
}

const defaultTestimonials = [
  {
    id: "testi-1",
    name: "Rizal",
    city: "Surabaya",
    rating: 5,
    comment:
      "Beli MacBook Pro second di sini, kondisinya bener-bener mulus sesuai deskripsi. Garansinya juga jelas.",
    order: 1,
  },
  {
    id: "testi-2",
    name: "Dinda",
    city: "Semarang",
    rating: 5,
    comment: "Proses tukar tambah iPad lama ke yang baru cepat, harganya juga wajar. Pelayanan ramah.",
    order: 2,
  },
  {
    id: "testi-3",
    name: "Farhan",
    city: "Bandung",
    rating: 4,
    comment: "Konsultasi via WhatsApp responsif, dibantu pilih spek Mac Mini sesuai kebutuhan kerja.",
    order: 3,
  },
  {
    id: "testi-4",
    name: "Salsabila",
    city: "Yogyakarta",
    rating: 5,
    comment:
      "Datang langsung ke store Jogja, unitnya bisa dicoba dulu sebelum bayar. Jadi lebih yakin belinya.",
    order: 4,
  },
  {
    id: "testi-5",
    name: "Bagas",
    city: "Malang",
    rating: 5,
    comment: "Sudah 3 kali beli di sini, dari iMac sampai AirPods, semua original dan pengiriman rapi.",
    order: 5,
  },
  {
    id: "testi-6",
    name: "Putri",
    city: "Jakarta",
    rating: 4,
    comment:
      "Harga bersaing dibanding toko lain, admin juga sabar jawab pertanyaan detail soal baterai health.",
    order: 6,
  },
  {
    id: "testi-7",
    name: "Yusuf",
    city: "Solo",
    rating: 5,
    comment: "Klaim garansi MacBook Air kemarin diproses cepat tanpa ribet. Recommended buat beli Apple second.",
    order: 7,
  },
];

async function seedTestimonials() {
  for (const t of defaultTestimonials) {
    await prisma.testimonial.upsert({
      where: { id: t.id },
      update: {
        name: t.name,
        city: t.city,
        rating: t.rating,
        comment: t.comment,
        order: t.order,
      },
      create: {
        id: t.id,
        name: t.name,
        city: t.city,
        rating: t.rating,
        comment: t.comment,
        order: t.order,
        active: true,
      },
    });
  }
  console.log(`Seeded ${defaultTestimonials.length} testimoni.`);
}

async function main() {
  await seedProducts();
  await seedAdmin();
  await seedBranches();
  await seedTestimonials();
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
