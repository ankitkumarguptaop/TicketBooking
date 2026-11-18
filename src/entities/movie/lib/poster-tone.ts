import type { PosterTone } from "../model/types";

// Full class names so Tailwind can find them when scanning the source.
export const posterToneClassName: Record<PosterTone, string> = {
  violet: "from-poster-violet-from to-poster-violet-to",
  teal: "from-poster-teal-from to-poster-teal-to",
  orange: "from-poster-orange-from to-poster-orange-to",
  green: "from-poster-green-from to-poster-green-to",
  berry: "from-poster-berry-from to-poster-berry-to",
  slate: "from-poster-slate-from to-poster-slate-to",
};
