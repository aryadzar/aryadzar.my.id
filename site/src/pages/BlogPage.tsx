import { Link } from "react-router-dom"
import BackHome from "@/utils/BackHome"
import { extractFirstImage } from "@/utils/thumbnail-ext"
import { useEffect, useState } from "react"
import { api } from "@/utils/api"
import Loading from "@/components/loading"
import MetaTags from "@/utils/MetaTags"
import { generateSlug } from "@/utils/slug-helper"



export default function BlogPage() {
    const [blogPosts, setBlogPosts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await api.get(`/posts`, { 
          params: {
            orderBy: "published", // Urut dari yang terbaru
          }
        });
        const items = res.data.items || [];

        const formattedPosts: any[] = items.map((item: any) => ({
          id: item.id,
          title: item.title,
          image: extractFirstImage(item.content) ?? "/placeholder.svg",
          date: new Date(item.published).toLocaleDateString(),
          excerpt: item.content.replace(/<[^>]+>/g, "").slice(0, 120) + "...",
          slug: generateSlug(item.title, item.id), // or create a slug from title if needed
        }));

        console.log(items);

        setBlogPosts(formattedPosts);
      } catch (err) {
        console.error("Failed to fetch blog posts:", err);
      }finally{
        setIsLoading(false);

      }
    }

    fetchPosts();
  }, []);
    if (isLoading){
      return <Loading/>
    } 
  return (
    <div className="min-h-screen bg-black text-white">
            <MetaTags
          title="Blog Arya Dzaky"
          description="Portofolio Arya Dzaky"
          image="/foto_profile.jpg"
          name="Blog Arya Dzaky"
      />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <BackHome/>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-16">Blog</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="group">
              <Link to={`/blog/${post.slug}`} className="block">
                <div className="relative h-48 mb-4 overflow-hidden rounded-2xl">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3 bg-violet-600 px-3 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-2">{post.date}</p>
                <h2 className="text-xl font-bold mb-2 group-hover:text-violet-400 transition-colors">{post.title}</h2>
                <p className="text-gray-300">{post.excerpt}</p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

// import { Link } from "react-router-dom";
// import BackHome from "@/utils/BackHome";
// import { extractFirstImage } from "@/utils/thumbnail-ext";
// import { useEffect, useState } from "react";
// import { api } from "@/utils/api";
// import Loading from "@/components/loading";
// import MetaTags from "@/utils/MetaTags";
// import { generateSlug } from "@/utils/slug-helper";

// let debounceTimeout: any;

// export default function BlogPage() {
//   const [blogPosts, setBlogPosts] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [pageToken, setPageToken] = useState<string | null>(null);
//   const [nextPageToken, setNextPageToken] = useState<string | null>(null);
//   const [isSearching, setIsSearching] = useState(false);

//   useEffect(() => {
//     if (searchQuery.trim() === "") {
//       fetchPosts("", "");
//     } else {
//       if (debounceTimeout) clearTimeout(debounceTimeout);
//       debounceTimeout = setTimeout(() => {
//         fetchPosts(searchQuery);
//       }, 500);
//     }
//   }, [searchQuery]);

//   async function fetchPosts(query = "", page = "") {
//     setIsLoading(true);
//     const isSearch = query.trim() !== "";
//     setIsSearching(isSearch);

//     try {
//       const endpoint = isSearch ? "/posts/search" : "/posts";
//       const params: any = {
//         q: query,
//         orderBy: "published",
//         maxResults : 6
//       };
//       if (!isSearch && page) {
//         params.pageToken = page;
//       }

//       const res = await api.get(endpoint, { params });

//       const items = res.data.items || [];
//       const formattedPosts = items.map((item: any) => ({
//         id: item.id,
//         title: item.title,
//         image: extractFirstImage(item.content) ?? "/placeholder.svg",
//         date: new Date(item.published).toLocaleDateString(),
//         excerpt: item.content.replace(/<[^>]+>/g, "").slice(0, 120) + "...",
//         slug: generateSlug(item.title, item.id),
//         category: item.labels?.[0] || "General",
//       }));

//       setBlogPosts(formattedPosts);
//       setNextPageToken(isSearch ? null : res.data.nextPageToken || null);
//     } catch (err) {
//       console.error("Failed to fetch blog posts:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   if (isLoading && blogPosts.length === 0) {
//     return <Loading />;
//   }

//   return (
//     <div className="min-h-screen bg-black text-white">
//       <MetaTags
//         title="Blog Arya Dzaky"
//         description="Portofolio Arya Dzaky"
//         image="/foto_profile.jpg"
//         name="Blog Arya Dzaky"
//       />
//       <div className="max-w-6xl mx-auto px-6 py-12">
//         <div className="mb-8">
//           <BackHome />
//         </div>

//         <h1 className="text-4xl md:text-5xl font-bold mb-8">Blog</h1>

//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           placeholder="Search blog..."
//           className="mb-12 px-4 py-2 w-full rounded-xl bg-gray-800 text-white placeholder-gray-400"
//         />

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {blogPosts.map((post) => (
//             <article key={post.id} className="group">
//               <Link to={`/blog/${post.slug}`} className="block">
//                 <div className="relative h-48 mb-4 overflow-hidden rounded-2xl">
//                   <img
//                     src={post.image || "/placeholder.svg"}
//                     alt={post.title}
//                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                   />
//                   <div className="absolute top-3 left-3 bg-violet-600 px-3 py-1 rounded-full text-xs font-medium">
//                     {post.category}
//                   </div>
//                 </div>
//                 <p className="text-sm text-gray-400 mb-2">{post.date}</p>
//                 <h2 className="text-xl font-bold mb-2 group-hover:text-violet-400 transition-colors">
//                   {post.title}
//                 </h2>
//                 <p className="text-gray-300">{post.excerpt}</p>
//               </Link>
//             </article>
//           ))}
//         </div>

//         {nextPageToken && !isSearching && (
//           <div className="mt-12 text-center">
//             <button
//               onClick={() => {
//                 setPageToken(nextPageToken);
//                 fetchPosts("", nextPageToken);
//               }}
//               className="px-6 py-2 bg-violet-700 text-white rounded-xl hover:bg-violet-800"
//             >
//               Next Page
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
