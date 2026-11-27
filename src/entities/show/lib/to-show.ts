import type { ShowDto } from "../model/show-dto";
import type { Show } from "../model/types";

export function toShow(dto: ShowDto): Show {
  const lowestMinor = Math.min(...dto.prices.map((price) => price.amountMinor));

  return {
    id: dto.id,
    movieId: dto.movieId,
    movieTitle: dto.movieTitle,
    theatreId: dto.theatreId,
    theatreName: dto.theatreName,
    screenId: dto.screenId,
    screenName: dto.screenName,
    city: dto.city,
    startsAt: dto.startsAt,
    // Prices arrive in paise.
    priceFrom: Number.isFinite(lowestMinor) ? lowestMinor / 100 : 0,
    // The API has no seat counts per show yet (that needs the booking module),
    // so every show reads as available until it does.
    availability: "available",
  };
}
