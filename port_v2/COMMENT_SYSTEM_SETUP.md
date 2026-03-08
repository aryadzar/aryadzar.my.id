# Comment System with Keycloak Authentication

## 🎉 Fitur yang Telah Diimplementasikan

### ✅ Authentication
- [x] Keycloak authentication dengan keycloak-js
- [x] Hidden iframe untuk silent SSO (token refresh tanpa reload)
- [x] Token persistence di localStorage
- [x] Auto token refresh setiap 60 detik
- [x] Toast notifications untuk login/logout/errors

### ✅ Comment System
- [x] Sanity schema dengan proper references (aman untuk slug changes)
- [x] CRUD operations untuk comments
- [x] Nested replies (max 3 levels)
- [x] Edit/delete own comments
- [x] Soft delete support
- [x] Character limit (5000 chars)
- [x] Real-time updates dengan React Query

### ✅ UI Components
- [x] CommentSection - Main wrapper
- [x] CommentList - Display all comments
- [x] CommentItem - Single comment dengan actions
- [x] CommentForm - Add/edit comment
- [x] AuthGuard - Login requirement
- [x] LoginButton/LogoutButton components

### ✅ Integrations
- [x] AuthProvider di root layout
- [x] CommentSection di project detail page
- [x] CommentSection di blog detail page
- [x] Translations (English & Indonesian)
- [x] Toast notifications dengan sonner

---

## 📋 File yang Dibuat

### Authentication (7 files)
```
lib/keycloak.ts                          # Keycloak instance & functions
lib/keycloakConfig.ts                    # Keycloak configuration
contexts/AuthProvider.tsx                # Authentication context
components/auth/LoginButton.tsx          # Login button
components/auth/LogoutButton.tsx         # Logout button
components/auth/AuthGuard.tsx            # Auth wrapper component
public/silent-check-sso.html             # Hidden iframe for silent SSO
```

### Sanity Schema (1 file)
```
sanity/schemaTypes/comment.ts           # Comment document schema
```

### API Routes (2 files)
```
app/api/[lang]/comments/route.ts        # GET (list), POST (create)
app/api/[lang]/comments/[id]/route.ts   # GET, PATCH, DELETE single comment
```

### UI Components (5 files)
```
components/comments/CommentSection.tsx   # Main comment section wrapper
components/comments/CommentList.tsx      # List of comments
components/comments/CommentItem.tsx      # Single comment with actions
components/comments/CommentForm.tsx      # Add/edit comment form
components/auth/AuthGuard.tsx            # Login requirement wrapper
```

### Libraries & Hooks (3 files)
```
lib/api/comments.ts                      # API client functions
hooks/useComments.ts                     # Custom hook for comments
```

### Configuration (3 files)
```
.env.example                             # Environment variables template
messages/en.json                         # English translations
messages/id.json                         # Indonesian translations
```

---

## 🔧 Setup Instructions

### 1. Keycloak Configuration

#### Step 1: Install dan Setup Keycloak Server

Jika belum punya Keycloak server:

```bash
# Menggunakan Docker
docker run -p 8080:8080 \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:latest \
  start-dev
```

Atau download dari: https://www.keycloak.org/downloads

#### Step 2: Create Realm di Keycloak

1. Login ke Keycloak Admin Console: `http://localhost:8080`
2. Create new realm (misal: `portfolio`)

#### Step 3: Create Client

1. Go to: Clients → Create client
2. Client ID: `portfolio-client` (atau sesuai keinginan)
3. Client authentication: ON
4. Authentication flow:
   - Standard Flow: ON
   - Direct Access Grants: OFF
   - Implicit Flow: OFF
   - Web origins: `http://localhost:3000` (dan production URLs)
   - Valid redirect URIs: `http://localhost:3000/*`
   - Valid post logout redirect URIs: `http://localhost:3000`

#### Step 4: Create User (Optional untuk testing)

1. Go to: Users → Add user
2. Enable email verification
3. Set password di Credentials tab

### 2. Environment Variables

Copy `.env.example` ke `.env.local` dan update nilai-nilainya:

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID="your-sanity-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_BASE_URL=http://localhost:3000
SANITY_API_READ_TOKEN="your-sanity-read-token"
SANITY_PREVIEW_SECRET="your-preview-secret-token"

# Spotify
SPOTIFY_CLIENT_ID="your-spotify-client-id"
SPOTIFY_CLIENT_SECRET="your-spotify-client-secret"
SPOTIFY_REFRESH_TOKEN="your-spotify-refresh-token"

# Keycloak Authentication
NEXT_PUBLIC_KEYCLOAK_URL="http://localhost:8080"  # URL Keycloak server
NEXT_PUBLIC_KEYCLOAK_REALM="portfolio"            # Nama realm
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID="portfolio-client" # Client ID
```

### 3. Sanity CMS Setup

Comment schema sudah ditambahkan ke `sanity/schemaTypes/index.ts`.

Buka Sanity Studio (`http://localhost:3000/studio`) dan:

1. Comments akan muncul di sidebar
2. Anda bisa view, edit, dan moderate comments
3. Comments ter-automatically link ke blog/project documents via references

### 4. Run Development Server

```bash
cd port_v2
npm run dev
```

---

## 🎯 How to Use

### For Users

#### Viewing Comments
1. Buka halaman project atau blog
2. Scroll ke bawah setelah konten utama
3. Comments section akan muncul dengan semua komentar

#### Adding Comment
1. Login dulu (klik tombol Login)
2. Akan di-redirect ke Keycloak login page
3. Setelah login, comment form akan muncul
4. Tulis komentar dan klik "Post Comment"

#### Replying to Comment
1. Klik tombol "Reply" pada komentar
2. Reply form akan muncul di bawah komentar tersebut
3. Tulis balasan dan klik "Post Reply"

#### Editing Own Comment
1. Klik tombol "⋯" (tiga titik) pada komentar Anda
2. Pilih "Edit"
3. Edit form akan muncul
4. Update dan klik "Update Comment"

#### Deleting Own Comment
1. Klik tombol "⋯" (tiga titik) pada komentar Anda
2. Pilih "Delete"
3. Konfirmasi di dialog
4. Comment akan di-soft delete

### For Developers

#### Using CommentSection Component

```tsx
import { CommentSection } from "@/components/comments/CommentSection";

function MyPage() {
  // Gunakan _id dari Sanity document
  const postId = "blog-or-project-id-from-sanity";

  return <CommentSection postId={postId} />;
}
```

#### Using Auth Context

```tsx
import { useAuth } from "@/contexts/AuthProvider";

function MyComponent() {
  const { user, isAuthenticated, login, logout, token } = useAuth();

  if (!isAuthenticated) {
    return <button onClick={login}>Login</button>;
  }

  return (
    <div>
      <p>Welcome, {user?.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

#### Using Comments Hook

```tsx
import { useComments } from "@/hooks/useComments";

function MyComponent() {
  const {
    comments,
    isLoadingComments,
    createComment,
    updateComment,
    deleteComment,
  } = useComments(postId);

  const handlePostComment = async () => {
    await createComment({ content: "Great post!" });
  };

  return (
    <div>
      {comments.map(comment => (
        <div key={comment._id}>{comment.content}</div>
      ))}
    </div>
  );
}
```

---

## 🔒 Security Features

1. **Token Validation**: Token validated di server-side
2. **User Authorization**: Hanya bisa edit/delete komentar sendiri
3. **XSS Prevention**: Content sanitized, no HTML input
4. **Rate Limiting**: (TODO - bisa ditambah)
5. **Soft Delete**: Comments tidak permanen dihapus (bisa di-recover)
6. **Reference-based Links**: Menggunakan Sanity _id, bukan slug (safe dari slug changes)

---

## 📊 Data Structure

### Sanity Comment Document

```javascript
{
  _id: "comment-123",
  _type: "comment",
  relatedPost: {
    _type: "reference",
    _ref: "blog-456" // atau "project-789"
  },
  author: {
    sub: "user-id-from-keycloak",
    name: "John Doe",
    email: "john@example.com",
    preferred_username: "johndoe"
  },
  content: "Great article!",
  parentId: null, // atau reference ke parent comment untuk replies
  createdAt: "2025-01-31T10:00:00Z",
  updatedAt: "2025-01-31T10:00:00Z",
  isDeleted: false
}
```

---

## 🌐 API Endpoints

### Get Comments
```
GET /api/en/comments?postId=blog-123
```

### Create Comment
```
POST /api/en/comments
Authorization: Bearer <token>
Body: {
  content: "comment text",
  postId: "blog-123",
  parentId: "comment-456" // optional, untuk replies
}
```

### Update Comment
```
PATCH /api/en/comments/comment-123
Authorization: Bearer <token>
Body: {
  content: "updated comment text"
}
```

### Delete Comment
```
DELETE /api/en/comments/comment-123
Authorization: Bearer <token>
```

---

## 🐛 Troubleshooting

### Comments tidak muncul
- Check Sanity studio untuk memastikan comment documents ter-create
- Check browser console untuk errors
- Verify `postId` yang d-pass ke CommentSection adalah valid Sanity _id

### Login tidak berfungsi
- Verify Keycloak server is running
- Check environment variables
- Check Keycloak client configuration (web origins, redirect URIs)
- Check browser console untuk error messages

### Token tidak refresh
- Verify `silent-check-sso.html` exists di `public/` folder
- Check Keycloak client configuration
- Verify Keycloak URL is correct

### CORS errors
- Update Keycloak client Web Origins
- Update Valid Redirect URIs di Keycloak client settings

---

## 🔄 Production Checklist

Sebelum deploy ke production:

- [ ] Update Keycloak URL ke production server
- [ ] Update web origins & redirect URIs di Keycloak
- [ ] Enable HTTPS untuk Keycloak
- [ ] Update environment variables di production
- [ ] Test login/logout flow
- [ ] Test comment creation, edit, delete
- [ ] Test reply functionality
- [ ] Verify token refresh works
- [ ] Check rate limiting (jika ditambahkan)
- [ ] Setup backup untuk Sanity database
- [ ] Test di multiple browsers

---

## 🎨 Customization

### Change max comment levels
Edit `CommentItem.tsx`:
```tsx
const canReply = level < 3; // Ubah angka 3 ke level yang diinginkan
```

### Change character limit
Edit `route.ts` files di API dan update validation:
```tsx
if (content.length > 5000) { // Ubah 5000 ke limit yang diinginkan
```

### Change auto-refresh interval
Edit `lib/keycloak.ts`:
```tsx
}, 60000); // Ubah 60000 (60 detik) ke interval yang diinginkan
```

---

## 📝 Notes

- Comment system menggunakan **Sanity references** untuk link ke blog/project documents
- Ini berarti jika slug berubah, comments tidak akan rusak
- **Soft delete** digunakan, jadi comments tidak permanen hilang
- **Token disimpan di localStorage** untuk persistence
- **Hidden iframe** digunakan untuk silent SSO (token refresh tanpa user interaction)

---

## 🙏 Credits

Dibuat dengan:
- Keycloak untuk authentication
- Sanity CMS untuk data storage
- React Query untuk state management
- Next.js 16 App Router
- Shadcn/UI components (sonner untuk toast)
- Framer Motion untuk animations

---

## 📞 Support

Jika ada masalah atau pertanyaan, cek:
1. Troubleshooting section di atas
2. Keycloak documentation: https://www.keycloak.org/documentation
3. Sanity documentation: https://www.sanity.io/docs

Happy coding! 🚀
