export type UsesCategory =
  | "workstation"
  | "furniture"
  | "accessories"
  | "applications"
  | "subscriptions";

export interface UsesItem {
  _id: string;
  name: string;
  description?: string;
  specs?: string;
  /**
   * The five categories above. Documents saved before the redesign may still
   * carry an older value (editor, terminal, devops, design, browser, hardware);
   * use normalizeUsesCategory() from constants/uses-data before grouping.
   */
  category: string;
  iconUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageLqip?: string;
  link?: string;
  order?: number;
}
