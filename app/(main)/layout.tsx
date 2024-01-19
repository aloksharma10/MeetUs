import NavigationSidebar from "@/components/navigation/navigation-sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full z-30 flex-col fixed inset-y-0 w-[290px]">
        <NavigationSidebar />
      </div>
      <main className="h-full md:pl-[290px]">{children}</main>
    </div>
  );
}
