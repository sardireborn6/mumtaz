"use client";

import * as React from "react";
import { MapPin, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { branches as defaultBranches, buildWhatsAppLink, type Branch } from "@/lib/config/site";

interface BranchSelectorDialogProps {
  children: React.ReactNode;
  customMessage?: string;
  branches?: Branch[];
}

export function BranchSelectorDialog({
  children,
  customMessage = "Halo, saya ingin konsultasi tentang unit Apple.",
  branches = defaultBranches,
}: BranchSelectorDialogProps) {
  const branchList = branches.length > 0 ? branches : defaultBranches;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Pilih Cabang Terdekat
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Silakan pilih cabang yang ingin Anda hubungi via WhatsApp:
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 flex flex-col gap-3">
          {branchList.map((branch) => {
            const waUrl = buildWhatsAppLink(
              `${customMessage} (${branch.name})`,
              branch.whatsappNumber
            );

            return (
              <a
                key={branch.id}
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1.5 rounded-2xl border border-border bg-card p-4 transition-all hover:border-brand-600/50 hover:bg-muted/50 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-foreground group-hover:text-brand-700 transition-colors">
                    {branch.name}
                  </h4>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <WhatsAppIcon className="size-3.5 fill-current" />
                    Chat WA
                  </span>
                </div>
                <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="mt-0.5 size-3.5 shrink-0 text-brand-700" />
                  <span className="line-clamp-2">{branch.address}</span>
                </p>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="size-3.5 shrink-0 text-brand-700" />
                  <span>{branch.hours}</span>
                </p>
              </a>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
