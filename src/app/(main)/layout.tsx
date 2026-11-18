import { Header } from "@/widgets/header";

export default function MainLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col pb-16">{children}</main>
    </>
  );
}
