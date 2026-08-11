import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "./reveal";

const faqs = [
  {
    question: "Berapa lama garansi yang diberikan?",
    answer:
      "Unit baru mendapat garansi resmi hingga 12 bulan, unit second mendapat garansi toko hingga 3 bulan. Detail cakupan garansi dijelaskan saat konsultasi. TODO: sesuaikan durasi & cakupan dengan kebijakan garansi asli.",
  },
  {
    question: "Bagaimana cara beli unit secara online?",
    answer:
      "Hubungi kami via WhatsApp dengan menyebutkan produk yang diminati, tim kami akan bantu cek stok, kirim foto/video unit, dan atur pengiriman ke lokasi Anda.",
  },
  {
    question: "Bagaimana cara menjual unit Apple saya?",
    answer:
      "Kirimkan detail unit (model, tahun, kondisi) via WhatsApp atau datang langsung ke cabang terdekat. Tim kami akan cek fisik & fungsi lalu menawarkan harga.",
  },
  {
    question: "Metode pembayaran apa saja yang tersedia?",
    answer:
      "Tunai, transfer bank, dan cicilan (syarat & ketentuan berlaku). Tanyakan opsi cicilan yang tersedia saat konsultasi dengan tim kami.",
  },
  {
    question: "Apakah bisa tukar tambah unit lama?",
    answer:
      "Bisa. Unit lama Anda akan dicek kondisinya, lalu nilainya dipotongkan dari harga unit baru yang diinginkan.",
  },
];

export function FAQ() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal className="text-center">
        <p className="text-sm font-medium text-brand-700">FAQ</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
          Pertanyaan yang sering ditanyakan
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}
