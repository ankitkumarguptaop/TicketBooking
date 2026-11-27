import type { MovieCertificateDto, MovieDto } from "../model/movie-dto";
import type { MovieSummary, PosterTone } from "../model/types";

const certificateLabel: Record<MovieCertificateDto, string> = {
  U: "U",
  UA_7: "UA 7+",
  UA_13: "UA 13+",
  UA_16: "UA 16+",
  A: "A",
  S: "S",
};

const languageNames = new Intl.DisplayNames(["en"], { type: "language" });

const posterTones: PosterTone[] = ["violet", "teal", "orange", "green", "berry", "slate"];

/** Same movie, same colour on every page. */
function pickPosterTone(id: string): PosterTone {
  let hash = 0;
  for (const char of id) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return posterTones[hash % posterTones.length];
}

/** Maps the API shape to the one the UI uses. `todayKey` is YYYY-MM-DD in India time. */
export function toMovie(dto: MovieDto, todayKey: string): MovieSummary {
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    genres: dto.genres,
    language: dto.language ? (languageNames.of(dto.language) ?? dto.language) : null,
    certificate: dto.certificate ? certificateLabel[dto.certificate] : null,
    durationMinutes: dto.runtimeMinutes,
    releaseDate: dto.releaseDate,
    posterUrl: dto.posterUrl,
    posterTone: pickPosterTone(dto.id),
    // Date keys compare correctly as strings. No release date means it is already out.
    status: dto.releaseDate && dto.releaseDate > todayKey ? "coming-soon" : "now-showing",
  };
}
