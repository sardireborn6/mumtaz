// Seed database dengan produk dummy + 1 akun admin default.
// TODO: ganti data produk di bawah dengan data asli sebelum go-live.
import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
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

async function main() {
  await seedProducts();
  await seedAdmin();
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
