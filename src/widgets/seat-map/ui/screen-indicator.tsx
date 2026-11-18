export function ScreenIndicator() {
  return (
    <div aria-hidden className="mx-auto flex w-full max-w-md flex-col items-center gap-2">
      <div className="h-1.5 w-full rounded-full bg-linear-to-r from-secondary via-primary/70 to-primary" />
      <p className="text-[0.625rem] tracking-[0.3em] text-muted-foreground uppercase">Screen this way</p>
    </div>
  );
}
