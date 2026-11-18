import type { MovieSummary } from "../model/types";

export type DummyShow = {
  /** Days from today: 0 is today, 1 is tomorrow, and so on. */
  dayOffset: number;
  time: string;
};

const eveningShows = (...days: number[]): DummyShow[] =>
  days.flatMap((dayOffset) => [
    { dayOffset, time: "15:30" },
    { dayOffset, time: "21:00" },
  ]);

export const featuredMovieId = "orbit-nine";

// Mirrors the Figma "01 Home" screen. Replace with the real API once it exists.
export const dummyMovies: MovieSummary[] = [
  {
    id: "monsoon-protocol",
    title: "Monsoon Protocol",
    tagline: "A city drowning in rain, and a code that should never have been sent.",
    genre: "Thriller",
    languages: ["Hindi"],
    certificate: "UA",
    rating: 4.4,
    status: "now-showing",
    posterTone: "violet",
    durationMinutes: 142,
    ratingCount: 9840,
    description:
      "When a cipher hidden in a weather report starts predicting floods, a junior analyst has one monsoon to find who is sending it.",
    formats: ["2D", "Dolby Atmos"],
  },
  {
    id: "the-last-lighthouse",
    title: "The Last Lighthouse",
    tagline: "One keeper. One storm. One last light.",
    genre: "Drama",
    languages: ["English"],
    certificate: "U",
    rating: 4.1,
    status: "now-showing",
    posterTone: "teal",
    durationMinutes: 128,
    ratingCount: 6210,
    description:
      "The last keeper of a lighthouse refuses to leave as a storm closes in, and the coast guard sends his estranged daughter to bring him home.",
    formats: ["2D"],
  },
  {
    id: "paper-kites",
    title: "Paper Kites",
    tagline: "Two rival families, one rooftop and a very windy festival.",
    genre: "Comedy",
    languages: ["Hindi"],
    certificate: "U",
    rating: 3.9,
    status: "now-showing",
    posterTone: "orange",
    durationMinutes: 118,
    ratingCount: 4390,
    description:
      "Two feuding families share one rooftop during the kite festival. Only one of them can win, and neither knows their kids are in love.",
    formats: ["2D"],
  },
  {
    id: "orbit-nine",
    title: "Orbit Nine",
    tagline: "Nine astronauts. One signal from home that should not exist.",
    genre: "Sci-fi",
    languages: ["English", "Hindi"],
    certificate: "UA",
    rating: 4.6,
    status: "now-showing",
    posterTone: "green",
    durationMinutes: 151,
    ratingCount: 12480,
    description:
      "Nine astronauts on a deep-space relay station receive a signal from home that should not exist. As the crew splits over what it means, the station itself begins to answer back.",
    formats: ["2D", "IMAX", "Dolby Atmos"],
  },
  {
    id: "saffron-road",
    title: "Saffron Road",
    tagline: "A road trip across the south, and a love story that takes the long way.",
    genre: "Romance",
    languages: ["Tamil"],
    certificate: "UA",
    rating: 4.0,
    status: "now-showing",
    posterTone: "berry",
    durationMinutes: 135,
    ratingCount: 7020,
    description:
      "A wedding photographer and a runaway groom share a car from Chennai to Kanyakumari, and a playlist neither of them chose.",
    formats: ["2D", "Dolby Atmos"],
  },
  {
    id: "night-shift-404",
    title: "Night Shift 404",
    tagline: "The office is empty. The logs say otherwise.",
    genre: "Horror",
    languages: ["Hindi"],
    certificate: "A",
    rating: 3.7,
    status: "coming-soon",
    posterTone: "slate",
    durationMinutes: 109,
    ratingCount: 0,
    description:
      "A night-shift engineer notices log entries from colleagues who never came in. Then the entries start describing her.",
    formats: ["2D", "Dolby Atmos"],
  },
  {
    id: "paper-kites-2",
    title: "Paper Kites 2",
    tagline: "The families are back, and so is the wind.",
    genre: "Comedy",
    languages: ["Hindi"],
    certificate: "U",
    rating: 3.9,
    status: "coming-soon",
    posterTone: "orange",
    durationMinutes: 121,
    ratingCount: 0,
    description:
      "The families are back on the same rooftop, and this year the wind has picked a side.",
    formats: ["2D"],
  },
  {
    id: "monsoon-protocol-reloaded",
    title: "Monsoon Reloaded",
    tagline: "The rain never stopped.",
    genre: "Thriller",
    languages: ["Hindi"],
    certificate: "UA",
    rating: 4.4,
    status: "coming-soon",
    posterTone: "violet",
    durationMinutes: 138,
    ratingCount: 0,
    description:
      "Months after the floods, the cipher returns, and this time it names the analyst.",
    formats: ["2D", "IMAX"],
  },
  {
    id: "saffron-skies",
    title: "Saffron Skies",
    tagline: "The road ends. The journey does not.",
    genre: "Romance",
    languages: ["Tamil"],
    certificate: "U",
    rating: 4.0,
    status: "coming-soon",
    posterTone: "berry",
    durationMinutes: 129,
    ratingCount: 0,
    description:
      "Years after their road trip, two strangers meet again on a flight that cannot land.",
    formats: ["2D"],
  },
  {
    id: "lighthouse-keepers",
    title: "The Lighthouse Keepers",
    tagline: "Every light has a story.",
    genre: "Drama",
    languages: ["English"],
    certificate: "U",
    rating: 4.1,
    status: "coming-soon",
    posterTone: "teal",
    durationMinutes: 124,
    ratingCount: 0,
    description:
      "An anthology of five keepers, five storms and five lights that never went out.",
    formats: ["2D"],
  },
];

// Fake showtimes per movie id. Coming-soon movies have none.
export const dummyShows: Record<string, DummyShow[]> = {
  "monsoon-protocol": eveningShows(0, 1, 2),
  "the-last-lighthouse": eveningShows(1, 5, 6),
  "paper-kites": eveningShows(0, 3),
  "orbit-nine": eveningShows(0, 1, 2, 3, 4, 5, 6),
  "saffron-road": eveningShows(2, 3),
};
