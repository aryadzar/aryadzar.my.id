import { defineQuery } from "next-sanity";

export const BLOG_QUERY = defineQuery(`
      *[_type == "blog" && slug.current == $slug && publishedAt <= now() && language == $locale ][0]{
        _id,
        _type,
        title,
        slug,
        "thumbnail" : coverImage.asset->url,
        excerpt,
        content[]{
          ...,
          _type == "videoBlock" => {
            ...,
            "url": video.asset->url
          }
        },
        categories[]->{_id, title, slug},
        publishedAt
      }
`);
