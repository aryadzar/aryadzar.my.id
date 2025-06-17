import { Link } from "react-router-dom";
import BackHome from "@/utils/BackHome";
import { extractFirstImage } from "@/utils/thumbnail-ext";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import Loading from "@/components/loading";
import MetaTags from "@/utils/MetaTags";
import { generateSlug } from "@/utils/slug-helper";
import { Loader2 } from "lucide-react";

// let debounceTimeout: any;

export default function ProjectPage() {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [searchQuery, setSearchQuery] = useState("");
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  async function fetchPosts(query = "", page = "") {
    const isSearch = query.trim() !== "";
    if (!page) setIsLoading(true);
    else setIsFetchingMore(true);

    setIsSearching(isSearch);

    try {
      const endpoint = isSearch ? "/posts/search" : "/posts";
      const params: any = {
        q: query,
        orderBy: "published",
        maxResults: 100,
        labels : "Project"
      };
      if (!isSearch && page) {
        params.pageToken = page;
      }
      if (!isSearch) {
        params.labels = "Project"; // hanya saat fetch biasa
      }
      const res = await api.get(endpoint, { params });
      const items = res.data.items || [];
      const filtered = isSearch
                      ? items.filter((item: any) => item.labels?.includes("Project"))
                      : items;
      console.log(items);
      const formattedPosts = filtered.map((item: any) => ({
        id: item.id,
        title: item.title,
        image: extractFirstImage(item.content) ?? "/placeholder.svg",
        date: new Date(item.published).toLocaleDateString(),
        excerpt: item.content.replace(/<[^>]+>/g, "").slice(0, 120) + "...",
        slug: generateSlug(item.title, item.id),
        category: item.labels?.[0] || "General",
      }));

      setBlogPosts((prev) => (page ? [...prev, ...formattedPosts] : formattedPosts));
      setNextPageToken(isSearch ? null : res.data.nextPageToken || null);
    } catch (err) {
      console.error("Failed to fetch blog posts:", err);
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  }

  // Trigger fetch on initial load & when searchQuery changes
  // useEffect(() => {
  //   if (searchQuery.trim() === "") {
  //     fetchPosts("", "");
  //   } else {
  //     if (debounceTimeout) clearTimeout(debounceTimeout);
  //     debounceTimeout = setTimeout(() => {
  //       fetchPosts(searchQuery);
  //     }, 500);
  //   }
  // }, [searchQuery]);
  
  //sementara masih pakai ini
  useEffect(() => {
    fetchPosts("", "");
  }, []);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.offsetHeight;

      if (
        scrollTop + windowHeight >= fullHeight - 300 &&
        nextPageToken &&
        !isLoading &&
        !isFetchingMore &&
        !isSearching
      ) {
        fetchPosts("", nextPageToken);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [nextPageToken, isLoading, isFetchingMore, isSearching]);

  // Auto-load if page height is too short (important for mobile)
  useEffect(() => {
    if (
      document.documentElement.scrollHeight <= window.innerHeight &&
      nextPageToken &&
      !isLoading &&
      !isFetchingMore &&
      !isSearching
    ) {
      fetchPosts("", nextPageToken);
    }
  }, [blogPosts, nextPageToken]);

  if (isLoading && blogPosts.length === 0) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
            {/* Background decoration */}
      <MetaTags
        title="Blog Arya Dzaky"
        description="Portofolio Arya Dzaky"
        image="/foto_profile.jpg"
        name="Blog Arya Dzaky"
      />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <BackHome />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-8">Projects</h1>

        {/* <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search blog..."
          className="w-full mb-12 px-4 py-3 bg-gray-900 border border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-600"
        /> */}
      <div className="absolute inset-0 pointer-events-none  bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />

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
                <h2 className="text-xl font-bold mb-2 group-hover:text-violet-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-300">{post.excerpt}</p>
              </Link>
            </article>
          ))}
        </div>

            {isFetchingMore && (
              <div className="flex items-center justify-center mt-12 py-8">
                <div className="flex items-center space-x-3 text-gray-400">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-sm font-medium">Loading more articles...</span>
                </div>
              </div>
            )}
      </div>
    </div>
  );
}
