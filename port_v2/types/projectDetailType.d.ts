export interface ProjectDetail {
  success: boolean;
  project: Project;
  slug: string;
}

export interface Project {
  _id: string;
  categories: Category[];
  description: Description[];
  liveUrl: any;
  publishedAt: string;
  repoUrl: any;
  shortDesc: string;
  slug: Slug2;
  thumbnail: string;
  title: string;
}

export interface Category {
  _id: string;
  slug: Slug;
  title: string;
}

export interface Slug {
  _type: string;
  current: string;
}

export interface Description {
  _key: string;
  _type: string;
  children?: Children[];
  markDefs?: any[];
  style?: string;
  asset?: Asset;
}

export interface Children {
  _key: string;
  _type: string;
  marks: any[];
  text: string;
}

export interface Asset {
  _ref: string;
  _type: string;
}

export interface Slug2 {
  _type: string;
  current: string;
}
