import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="grid min-h-svh lg:grid-cols-[4fr_3fr]">
      <aside className="relative isolate  flex-col justify-between overflow-hidden bg-background p-16 lg:flex">
        <Image
          src="/login-background.png"
          alt=""
          fill
          preload
          sizes="60vw"
          className="-z-20 object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-linear-to-t from-background via-background/50 to-background/30"
        />

        <Link href="/" className="font-heading text-2xl font-bold tracking-tight">
          Balcony
        </Link>
        <div className="flex max-w-2xl flex-col gap-4">
          <p className="font-heading text-5xl font-bold leading-tight tracking-tight">
            Every seat is the best seat when you pick it yourself.
          </p>
          <p className="text-sm text-secondary-foreground">
            Live seat maps, a 10 minute hold while you pay, and instant tickets.
          </p>
        </div>
      </aside>

      <main className="flex flex-col p-6">
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-100">{children}</div>
        </div>
      </main>
    </div>
  );
}
