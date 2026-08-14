import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { BranchSelectorDialog } from "./branch-selector-dialog";
import { Reveal } from "./reveal";

const steps = [
  {
    number: "01",
    title: "Konsultasi via WhatsApp",
    description:
      "Ceritakan kebutuhan Anda — mau beli unit baru, jual unit lama, atau tukar tambah.",
  },
  {
    number: "02",
    title: "Cek unit & kesepakatan harga",
    description:
      "Tim kami cek fisik & fungsi unit (untuk jual/tukar tambah), lalu sepakati harga bersama.",
  },
  {
    number: "03",
    title: "Transaksi di cabang terdekat",
    description: "Datang ke salah satu dari cabang, atau atur pengiriman ke lokasi Anda.",
  },
  {
    number: "04",
    title: "Garansi & dukungan purna jual",
    description: "Unit Anda dilengkapi garansi resmi dan bisa konsultasi teknis kapan saja.",
  },
];

export function Process() {
  return (
    <section className="bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="max-w-xl">
          <p className="text-sm font-medium text-brand-700">Proses Beli / Jual / Tukar Tambah</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
            Empat langkah sederhana, transparan dari awal
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <span className="text-sm font-semibold text-brand-700">{step.number}</span>
                <h3 className="mt-2 font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-10 flex justify-center">
          <BranchSelectorDialog customMessage="Halo, saya ingin mulai proses beli/jual/tukar-tambah unit Apple.">
            <Button size="lg" className="bg-brand-700 text-white hover:bg-brand-600">
              <WhatsAppIcon className="size-4" />
              Mulai Sekarang via WhatsApp
            </Button>
          </BranchSelectorDialog>
        </Reveal>
      </div>
    </section>
  );
}
