"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, MapPin, LogOut } from "lucide-react";
import { logout } from "@/lib/auth/actions";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/produk", label: "Produk", icon: Package },
  { href: "/admin/cabang", label: "Cabang", icon: MapPin },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="flex w-full shrink-0 flex-col border-border bg-card sm:h-screen sm:w-56 sm:border-r">
      <div className="px-5 py-5">
        <p className="text-sm font-semibold text-foreground">Mumtaz Admin</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-3">
        {links.map((link) => {
          const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-brand-50 text-brand-700"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <link.icon className="size-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <form action={logout} className="border-t border-border p-3">
        <button
          type="submit"
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <LogOut className="size-4" />
          Logout
        </button>
      </form>
    </aside>
  );
}
