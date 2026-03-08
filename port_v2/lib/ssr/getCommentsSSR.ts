"use server";

import { sanityFetch } from "@/sanity/lib/live";

export interface Comment {
  _id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: {
    sub: string;
    name: string;
    email?: string;
    preferred_username?: string;
  };
  parentId?: string | null;
  postId: string;
  postType?: string;
}

export async function getCommentsSSR(postId: string, lang: string): Promise<Comment[]> {
  const query = `
    *[_type == "comment" && !isDeleted && relatedPost._ref == $postId] | order(createdAt desc) {
      _id,
      content,
      createdAt,
      updatedAt,
      "author": {
        sub,
        name,
        email,
        preferred_username
      },
      "parentId": parentId._ref,
      "postId": relatedPost._ref,
      "postType": relatedPost._type
    }
  `;

  const { data } = await sanityFetch({
    query,
    params: { postId, lang },
  });

  return data || [];
}

export async function getCommentSSR(id: string): Promise<Comment | null> {
  const query = `
    *[_id == $id && _type == "comment" && !isDeleted][0]{
      _id,
      content,
      createdAt,
      updatedAt,
      "author": {
        sub,
        name,
        email,
        preferred_username
      },
      "parentId": parentId._ref,
      "postId": relatedPost._ref,
      "postType": relatedPost._type
    }
  `;

  const { data } = await sanityFetch({
    query,
    params: { id },
  });

  return data;
}
