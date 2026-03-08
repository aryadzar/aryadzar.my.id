# Auth.js with Keycloak OAuth - Setup Documentation

## 🎉 What Changed?

Migrasi dari **keycloak-js** (dengan hidden iframe) ke **Auth.js** (NextAuth.js v5) dengan **OAuth flow**.

### Why Auth.js?
- ✅ Tidak perlu hidden iframe
- ✅ OAuth flow lebih standar dan modern
- ✅ Lebih mudah di-maintain
- ✅ Session management lebih baik
- ✅ Lebih secure (server-side session validation)
- ✅ Auto token refresh handled oleh Auth.js

---

## 📋 File yang Dibuat/Diupdate

### Baru (4 files):
```
lib/auth.ts                           # Auth.js configuration
app/api/auth/[...nextauth]/route.ts   # Auth.js API route handler
types/auth.d.ts                        # TypeScript types untuk Auth.js
AUTH_JS_SETUP.md                      # Documentation ini
```

### Diupdate (4 files):
```
contexts/AuthProvider.tsx             # Sekarang pakai Auth.js session
app/api/[lang]/comments/route.ts      # Pakai auth() untuk validation
app/api/[lang]/comments/[id]/route.ts # Pakai auth() untuk validation
.env.local                            # Tambah Auth.js credentials
```

### Dihapus (5 files):
```
lib/keycloak.ts                       ❌ Tidak diperlukan
lib/keycloakConfig.ts                 ❌ Tidak diperlukan
public/silent-check-sso.html          ❌ Tidak diperlukan
components/auth/LoginButton.tsx       ❌ Tidak diperlukan
components/auth/LogoutButton.tsx      ❌ Tidak diperlukan
```

---

## 🔧 Setup Instructions

### 1. Keycloak Client Configuration

Pastikan Keycloak client Anda sudah dikonfigurasi dengan benar:

**Keycloak Admin Console → Clients → [Your Client]:**

```
Client ID: frontend-prod-portfolio
Client Authentication: ON
Authorization Enabled: ON

Valid Redirect URIs:
  http://localhost:3000/api/auth/callback/keycloak
  https://yourdomain.com/api/auth/callback/keycloak

Valid Post Logout Redirect URIs:
  http://localhost:3000
  https://yourdomain.com

Web Origins:
  http://localhost:3000
  https://yourdomain.com
```

### 2. Generate Credentials

Di Keycloak Admin Console, perhatikan:
- **Client Secret** → untuk `KEYCLOAK_CLIENT_SECRET`
- **Token** → (optional) untuk `KEYCLOAK_TOKEN`

Generate `AUTH_SECRET`:
```bash
openssl rand -base64 32
```

### 3. Update Environment Variables

Tambahkan ke `.env.local`:

```bash
# Keycloak OAuth for Auth.js
NEXT_PUBLIC_KEYCLOAK_URL="https://your-keycloak-server.com/auth"
NEXT_PUBLIC_KEYCLOAK_REALM="your-realm"
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID="your-client-id"

KEYCLOAK_CLIENT_SECRET="your-client-secret-from-keycloak"
KEYCLOAK_TOKEN="your-token-from-keycloak"              # Optional
AUTH_SECRET="generate-with-openssl-rand-base64-32"    # Required!
```

### 4. Development vs Production

**Development (localhost):**
```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**Production:**
```bash
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

---

## 🎯 How It Works

### Authentication Flow (OAuth):

1. **User clicks Login**
   ```
   User → AuthProvider.login() → signIn("keycloak")
   ```

2. **Redirect to Keycloak**
   ```
   Browser → Keycloak Login Page
   ```

3. **User authenticates**
   ```
   Keycloak validates credentials
   ```

4. **Callback with code**
   ```
   Keycloak → /api/auth/callback/keycloak?code=...
   ```

5. **Exchange code for tokens**
   ```
   Auth.js exchanges code → access_token
   ```

6. **Create session**
   ```
   Auth.js creates encrypted session (JWT)
   ```

7. **Redirect back**
   ```
   Auth.js → callbackUrl (original page)
   ```

### Session Validation (Server-side):

```typescript
// Di API routes
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Access user data
  const userId = session.user.id;
  const userName = session.user.name;
  const userEmail = session.user.email;

  // Proceed with request...
}
```

### Session Usage (Client-side):

```typescript
// Di components
import { useAuth } from "@/contexts/AuthProvider";

function MyComponent() {
  const { isAuthenticated, user, login, logout } = useAuth();

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

---

## 📊 Keycloak Client Settings

### Important Settings:

1. **Access Type**: `confidential`
2. **Standard Flow Enabled**: `ON`
3. **Direct Access Grants**: `OFF`
4. **Implicit Flow**: `OFF`
5. **Service Accounts Enabled**: `ON` (jika perlu)

### Mapper Configuration (Optional):

Untuk mendapatkan user data yang lengkap, tambahkan mappers di Keycloak:

**Client Scopes → user-metadata → Add Mapper:**

1. **User ID Mapper**:
   - Name: `user_id`
   - Mapper Type: `User Attribute`
   - User Attribute: `userId`
   - Token Claim Name: `sub`
   - Claim JSON Type: `String`

2. **Name Mapper**:
   - Name: `name`
   - Mapper Type: `User Property`
   - User Property: `firstName`
   - Token Claim Name: `name`

---

## 🔒 Security Features

### Session Security:
- ✅ Encrypted JWT session (dengan AUTH_SECRET)
- ✅ HTTP-only cookies
- ✅ CSRF protection
- ✅ Server-side session validation
- ✅ Automatic token refresh

### API Security:
- ✅ Setiap API call validates session
- ✅ Tidak perlu kirim token di headers
- ✅ Tidak perlu manual token refresh
- ✅ Tidak ada token di client storage

---

## 🐛 Troubleshooting

### Login tidak berfungsi:

**Error: "Callback URL mismatch"**
- Check Valid Redirect URIs di Keycloak
- Pastikan `NEXT_PUBLIC_BASE_URL` sesuai

**Error: "Client authentication failed"**
- Check `KEYCLOAK_CLIENT_SECRET` benar
- Pastikan Client Authentication = ON

**Error: "Invalid state"**
- Clear browser cookies
- Check `AUTH_SECRET` sama di semua environment

### Session tidak persist:

- Pastikan browser mengizinkan cookies
- Check `AUTH_SECRET` di-set dengan benar
- Check NextAuth session configuration

### Comments tidak bisa dipost:

- Check user sudah login
- Check API routes menggunakan `auth()` dengan benar
- Check browser console untuk errors

---

## 🧪 Testing

### Test Authentication:

```bash
# 1. Start dev server
npm run dev

# 2. Buka http://localhost:3000

# 3. Click login

# 4. Akan di-redirect ke Keycloak

# 5. Login dengan credentials Keycloak

# 6. Akan di-redirect kembali ke aplikasi

# 7. Session ter-create, bisa posting komentar
```

### Test API:

```bash
# Get comments (tanpa auth)
curl http://localhost:3000/api/en/comments?postId=xxx

# Create comment (perlu auth)
# - Login dulu via browser
# - Session cookie akan otomatis terkirim
```

---

## 📝 Migration dari keycloak-js

### Yang Berubah:

**Sebelumnya (keycloak-js):**
```typescript
// Init Keycloak
const keycloak = await initializeKeycloak();

// Login
await keycloak.login();

// Get token
const token = keycloak.token;

// API call dengan Bearer token
fetch("/api/comments", {
  headers: { Authorization: `Bearer ${token}` }
});
```

**Sekarang (Auth.js):**
```typescript
// Init - otomatis oleh Auth.js
// Tidak perlu manual init

// Login
await signIn("keycloak");

// Get session
const session = await auth();

// API call - session otomatis terkirim via cookies
fetch("/api/comments"); // Session cookie auto-attached
```

### Yang Tidak Berubah:

- ✅ User interface sama
- ✅ Comments functionality sama
- ✅ Sanity schema sama
- ✅ UI components sama

---

## 🎨 Customization

### Ubah Session Max Age:

Di `lib/auth.ts`:
```typescript
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
});
```

### Ubah Callback URL:

```typescript
await signIn("keycloak", {
  callbackUrl: "/custom-redirect"
});
```

### Tambah Provider Lain:

Di `lib/auth.ts`:
```typescript
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Keycloak({...}),
    Google({...}),
    GitHub({...}),
  ],
});
```

---

## 📚 Resources

- [Auth.js Documentation](https://authjs.dev/)
- [NextAuth.js v5 Docs](https://authjs.dev/reference/nextjs)
- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [OAuth 2.0 RFC](https://tools.ietf.org/html/rfc6749)

---

## ✅ Production Checklist

Sebelum deploy ke production:

- [ ] Set `AUTH_SECRET` dengan strong random value
- [ ] Update `NEXT_PUBLIC_BASE_URL` ke production domain
- [ ] Update Keycloak Valid Redirect URIs
- [ ] Update Keycloak Web Origins
- [ ] Enable HTTPS di Keycloak
- [ ] Test login flow di production
- [ ] Test comment creation/edit/delete
- [ ] Test logout flow
- [ ] Clear development cookies
- [ ] Monitor session expiration
- [ ] Setup error tracking (Sentry)

---

Happy coding! 🚀
