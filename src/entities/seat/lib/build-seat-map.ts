import type { ScreenLayoutDto, SeatCategoryDto, ShowPricingDto } from "../model/seat-map-dto";
import type { Seat, SeatSectionLayout, SeatTier } from "../model/types";

const tierByCategory: Record<SeatCategoryDto, SeatTier> = {
  RECLINER: "recliner",
  PREMIUM: "premium",
  REGULAR: "regular",
};

const tierLabel: Record<SeatTier, string> = {
  recliner: "Recliner",
  premium: "Premium",
  regular: "Regular",
};

/**
 * Turns the screen's chair positions and the show's prices into sections → rows → seats,
 * in the order the admin laid them out (grid row 0 first). A new section starts wherever
 * the seat category changes.
 */
export function buildSeatMap(show: ShowPricingDto, layout: ScreenLayoutDto) {
  const priceByTier = new Map(show.prices.map((price) => [tierByCategory[price.category], price.amountMinor / 100]));
  const ordered = [...layout.seats].sort((a, b) => a.gridRow - b.gridRow || a.gridCol - b.gridCol);
  const firstColumn = Math.min(...ordered.map((seat) => seat.gridCol));

  const sections: SeatSectionLayout[] = [];
  const seats: Seat[] = [];
  let section: SeatSectionLayout | undefined;
  let row: SeatSectionLayout["rows"][number] | undefined;
  let columnCount = 0;

  for (const dto of ordered) {
    const tier = tierByCategory[dto.category];
    const price = priceByTier.get(tier);

    if (section?.tier !== tier) {
      section = { id: `${tier}-${dto.gridRow}`, tier, label: tierLabel[tier], price: price ?? 0, rows: [] };
      sections.push(section);
      row = undefined;
    }
    if (row?.id !== String(dto.gridRow)) {
      row = { id: String(dto.gridRow), label: dto.row, seats: [] };
      section.rows.push(row);
    }

    const column = dto.gridCol - firstColumn + 1;
    columnCount = Math.max(columnCount, column);
    row.seats.push({ id: dto.id, number: dto.number, column });
    seats.push({
      id: dto.id,
      label: `${dto.row}${dto.number}`,
      row: dto.row,
      number: dto.number,
      tier,
      price: price ?? 0,
      // Held/booked come from the booking API, which doesn't exist yet. A seat
      // whose category has no price for this show can't be sold, so it shows as booked.
      status: price === undefined ? "booked" : "available",
    });
  }

  return { sections, columnCount, seats };
}
