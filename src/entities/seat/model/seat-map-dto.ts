export type SeatCategoryDto = "REGULAR" | "PREMIUM" | "RECLINER";

/** The fields of GET /shows/:id that the seat map needs. */
export type ShowPricingDto = {
  screenId: string;
  prices: { category: SeatCategoryDto; amountMinor: number }[];
};

/** GET /screens/:id/layout: where the chairs are, not who has them. */
export type ScreenLayoutDto = {
  seats: {
    id: string;
    row: string;
    number: number;
    category: SeatCategoryDto;
    gridRow: number;
    gridCol: number;
  }[];
};
