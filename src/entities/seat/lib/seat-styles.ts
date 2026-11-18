export type SeatVisualState = "available" | "selected" | "held" | "booked";

export const seatStateClassName: Record<SeatVisualState, string> = {
  available: "border-success/50 text-success hover:bg-success/10",
  selected: "border-primary bg-primary font-bold text-primary-foreground",
  held: "border-primary/40 bg-primary/25 text-primary/50",
  booked: "border-secondary bg-secondary text-muted-foreground/40",
};

export const seatStateLabel: Record<SeatVisualState, string> = {
  available: "Available",
  selected: "Selected",
  held: "Held by someone",
  booked: "Booked",
};
