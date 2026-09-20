export interface Photo {
  _id: string;
  caption: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  location?: string;
  alt?: string;
  url: string;
  width: number;
  height: number;
  /** Tiny blurred preview from Sanity, used while the photo loads. */
  lqip?: string;
}
