export interface BlogDetail {
  success: boolean;
  blog: Blog;
  slug: string;
}

export interface Blog {
  _id: string;
  categories: Category[];
  content: Content[];
  excerpt: string;
  publishedAt: string;
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

export interface Content {
  _key: string;
  _type: string;
  children: Children[];
  markDefs: any[];
  code?: string;
  style: string;
}

export interface Children {
  _key: string;
  _type: string;
  marks: any[];
  text: string;
}

export interface Slug2 {
  _type: string;
  current: string;
}
