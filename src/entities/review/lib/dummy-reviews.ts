type ReviewTemplate = {
  author: string;
  rating: number;
  text: string;
};

// From the Figma "02 Movie detail" screen; reused for every released movie.
export const reviewTemplates: ReviewTemplate[] = [
  { author: "Meera S.", rating: 5, text: "Tense from the first minute. The sound design alone is worth the ticket." },
  { author: "Rohit V.", rating: 4, text: "Great second half. The first act takes its time." },
  { author: "Ananya K.", rating: 4, text: "Watched in a recliner hall. Visuals are stunning." },
];
