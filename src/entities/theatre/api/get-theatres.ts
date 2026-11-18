import { dummyTheatres } from "../lib/dummy-theatres";
import type { Theatre } from "../model/types";

export async function getTheatres(): Promise<Theatre[]> {
  return dummyTheatres;
}

export async function getTheatreById(id: string): Promise<Theatre | undefined> {
  return dummyTheatres.find((theatre) => theatre.id === id);
}
