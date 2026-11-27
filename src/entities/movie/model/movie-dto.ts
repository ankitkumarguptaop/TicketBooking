export type MovieCertificateDto = "U" | "UA_7" | "UA_13" | "UA_16" | "A" | "S";

/** A movie as GET /movies and GET /movies/:id return it. */
export type MovieDto = {
  id: string;
  title: string;
  description: string | null;
  genres: string[];
  /** ISO 639-1 code, e.g. "hi". */
  language: string | null;
  runtimeMinutes: number | null;
  certificate: MovieCertificateDto | null;
  releaseDate: string | null;
  posterUrl: string | null;
};
