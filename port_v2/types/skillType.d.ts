export interface Skill {
  _id: string;
  name: string;
  category: "frontend" | "backend" | "database" | "tools";
  iconUrl?: string;
  color?: string;
  order?: number;
}
