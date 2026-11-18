import type { Theatre } from "../model/types";

// Mirrors the Figma "02 Movie detail" screen.
export const dummyTheatres: Theatre[] = [
  { id: "pvr-orion", name: "PVR Orion Mall", area: "Rajajinagar", distanceKm: 4.2, cancellationAvailable: true },
  { id: "galaxy-indiranagar", name: "Galaxy Cinemas", area: "Indiranagar", distanceKm: 6.8, cancellationAvailable: true },
  { id: "lumiere-koramangala", name: "Lumiere Screens", area: "Koramangala", distanceKm: 9.1, cancellationAvailable: true },
];
