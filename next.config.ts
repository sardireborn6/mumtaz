import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @libsql/client (dipakai lewat @prisma/adapter-libsql) melakukan dynamic
  // require di dalam foldernya sendiri — webpack (fallback saat Turbopack
  // native binary tidak tersedia, mis. glibc lama di shared hosting) mencoba
  // membundel semua file yang cocok termasuk README.md dan gagal parse.
  // Externalize supaya di-require native oleh Node saat runtime, bukan dibundel.
  serverExternalPackages: ["@libsql/client", "@prisma/adapter-libsql", "libsql"],
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
