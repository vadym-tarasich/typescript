import { Storage } from "./notesStorage";

export interface ListFilters {
  keyword: string;
  order: "asc" | "desc";
}

export interface ListRecord {
  id: string;
  name: string;
  date: string;
  favouriteDish: {
    name: string;
    note?: string;
  };
  grades: number[];
}

declare global {
  interface Window {
    NotesStorage: Storage;
  }
}
