"use client";

import { useActionState } from "react";
import Image from "next/image";
import { login, type LoginState } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(login, undefined);

  return (
    <main className="flex min-h-full flex-1 items-center justify-center bg-secondary/30 px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="flex justify-center">
          <Image src="/logo.png" alt="Mumtaz MacBook Store" width={160} height={52} className="h-10 w-auto" />
        </div>
        <h1 className="mt-6 text-center text-xl font-semibold text-foreground">Admin Login</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Masuk untuk kelola produk toko.
        </p>

        <form action={formAction} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" autoComplete="username" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>

          {state?.error && <p className="text-sm text-destructive">{state.error}</p>}

          <Button type="submit" disabled={pending} className="mt-2 w-full bg-brand-700 text-white hover:bg-brand-600">
            {pending ? "Memproses…" : "Masuk"}
          </Button>
        </form>
      </div>
    </main>
  );
}
