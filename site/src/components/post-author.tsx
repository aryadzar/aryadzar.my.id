// components/post/PostAuthor.tsx

interface PostAuthorProps {
  name: string
  imageUrl?: string
  publishedDate: string
}

export default function PostAuthor({ name, imageUrl, publishedDate }: PostAuthorProps) {
  return (
    <div className="flex items-center gap-4 mt-6 mb-6">
      <img
        src={imageUrl || "/default-avatar.png"}
        alt={name}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="text-sm text-gray-300">
        <p className="font-medium">{name}</p>
        <p className="text-xs text-gray-400">
          Published At {" "}
          {new Date(publishedDate).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  )
}
