export interface UsesItem {
  _id: string;
  name: string;
  description?: string;
  category: "editor" | "terminal" | "devops" | "design" | "browser" | "hardware";
  iconUrl?: string;
  link?: string;
  order?: number;
}
