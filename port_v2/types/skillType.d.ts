export interface Skill {
  _id: string;
  name: string;
  category: "frontend" | "backend" | "database" | "tools";
  iconUrl?: string;
  color?: string;
  order?: number;
  /** 1 = learning, 2 = comfortable, 3 = daily. Used by the About page. */
  level?: 1 | 2 | 3;
}
