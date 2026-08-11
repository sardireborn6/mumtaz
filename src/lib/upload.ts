import "server-only";
import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

/** Simpan foto yang diupload admin ke public/uploads, kembalikan array URL relatif. */
export async function saveUploadedImages(files: File[]): Promise<string[]> {
  const valid = files.filter((f) => f && f.size > 0);
  if (valid.length === 0) return [];

  for (const file of valid) {
    if (!file.type.startsWith("image/")) {
      throw new Error(`File "${file.name}" bukan gambar.`);
    }
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`File "${file.name}" lebih dari 5MB.`);
    }
  }

  await mkdir(UPLOAD_DIR, { recursive: true });

  const urls: string[] = [];
  for (const file of valid) {
    const ext = path.extname(file.name) || ".jpg";
    const filename = `${crypto.randomUUID()}${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(UPLOAD_DIR, filename), buffer);
    urls.push(`/uploads/${filename}`);
  }
  return urls;
}

/** Hapus file foto dari disk (best-effort, tidak melempar error kalau file sudah tidak ada). */
export async function deleteUploadedImage(url: string) {
  if (!url.startsWith("/uploads/")) return;
  try {
    await unlink(path.join(process.cwd(), "public", url));
  } catch {
    // File mungkin sudah tidak ada — abaikan.
  }
}
