type Props = {
  author: string;
  rating: number;
  verifiedBooking: boolean;
  text: string;
};

export function ReviewCard({ author, rating, verifiedBooking, text }: Props) {
  return (
    <article className="flex flex-col gap-2 rounded-lg bg-card p-5">
      <header className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-sm font-semibold">{author}</h3>
          {verifiedBooking && <p className="text-xs text-success">Verified booking</p>}
        </div>
        <p className="text-xs font-semibold text-primary">
          <span className="sr-only">Rated </span>
          {rating} / 5
        </p>
      </header>
      <p className="text-sm leading-relaxed">{text}</p>
    </article>
  );
}
