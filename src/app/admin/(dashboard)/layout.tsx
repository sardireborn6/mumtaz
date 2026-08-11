import { verifySession } from "@/lib/auth/session";
import { SidebarNav } from "@/components/admin/sidebar-nav";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  await verifySession();

  return (
    <div className="flex min-h-full flex-1 flex-col sm:flex-row">
      <SidebarNav />
      <main className="flex-1 bg-secondary/20 p-6 sm:p-10">{children}</main>
    </div>
  );
}
