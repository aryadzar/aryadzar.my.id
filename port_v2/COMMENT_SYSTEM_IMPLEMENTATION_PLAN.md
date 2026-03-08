# Implementation Plan: Comment System with Keycloak Authentication

## Overview
Add comment and reply functionality to `/projects/[slug]` and `/blog/[slug]` pages with Keycloak authentication using keycloak-js library with hidden iframe approach.

## Tech Stack
- **Authentication**: Keycloak with keycloak-js (npm package)
- **Database**: Sanity.io (existing CMS)
- **State Management**: TanStack React Query (existing)
- **UI**: Tailwind CSS + Radix UI (existing)

## Architecture

### 1. Keycloak Integration
**Files to create:**
- `lib/keycloak.ts` - Keycloak instance configuration
- `lib/keycloakConfig.ts` - Keycloak settings
- `contexts/AuthProvider.tsx` - Authentication context provider
- `components/auth/LoginButton.tsx` - Login button component
- `components/auth/LogoutButton.tsx` - Logout button component
- `components/auth/AuthGuard.tsx` - Authentication wrapper component

**Environment variables needed:**
```env
NEXT_PUBLIC_KEYCLOAK_URL=https://your-keycloak-server.com/auth
NEXT_PUBLIC_KEYCLOAK_REALM=your-realm
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=your-client-id
```

**Implementation approach:**
- Use keycloak-js with `silentCheckSsoRedirectUri` for hidden iframe authentication
- Store tokens in memory (not localStorage for security)
- Auto-refresh tokens using iframe in background
- Provide auth context to entire app

### 2. Sanity Schema

**Create `schemas/comment.ts`:**
```typescript
{
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    { name: 'contentType', type: 'string' }, // 'blog' or 'project'
    { name: 'contentSlug', type: 'string' }, // slug of blog/project
    { name: 'author', type: 'object' }, // { name, email, preferred_username }
    { name: 'content', type: 'text' },
    { name: 'parentId', type: 'reference', to: [{ type: 'comment' }] }, // for replies
    { name: 'createdAt', type: 'datetime' },
    { name: 'updatedAt', type: 'datetime' }
  ]
}
```

### 3. API Routes Structure

**Create API endpoints:**
```
app/api/[locale]/comments/
├── route.ts                    // GET (list), POST (create)
├── [id]/route.ts              // GET (one), PATCH (update), DELETE
├── by-slug/
│   └── [type]/[slug]/route.ts // GET comments by content type and slug
└── replies/
    └── [id]/route.ts          // GET replies for a comment
```

### 4. UI Components

**Create comment components:**
- `components/comments/CommentList.tsx` - List all comments
- `components/comments/CommentItem.tsx` - Single comment with replies
- `components/comments/CommentForm.tsx` - Form to add/edit comment
- `components/comments/ReplySection.tsx` - Reply form and replies list
- `components/comments/CommentSection.tsx` - Main comment section wrapper

**Features:**
- Display comments with author name, timestamp, and content
- Nested replies (up to 3 levels)
- Edit/delete own comments
- Like/upvote (optional)
- Real-time updates using Sanity Live
- Markdown support for content

### 5. Integration Points

**For `app/(public)/[locale]/projects/[slug]/page.tsx`:**
```tsx
import CommentSection from '@/components/comments/CommentSection'

export default function ProjectDetail({ params }) {
  return (
    <>
      {/* Existing content */}
      <CommentSection type="project" slug={params.slug} />
    </>
  )
}
```

**For `app/(public)/[locale]/blog/[slug]/page.tsx`:**
```tsx
import CommentSection from '@/components/comments/CommentSection'

export default function BlogDetail({ params }) {
  return (
    <>
      {/* Existing content */}
      <CommentSection type="blog" slug={params.slug} />
    </>
  )
}
```

## Implementation Steps

### Phase 1: Authentication Setup
1. Install keycloak-js: `npm install keycloak-js`
2. Create Keycloak configuration files
3. Create AuthProvider context
4. Add AuthProvider to root layout
5. Create login/logout button components
6. Test authentication flow

### Phase 2: Database & API
1. Add comment schema to Sanity
2. Create API routes for CRUD operations
3. Add authentication middleware to API routes
4. Test API endpoints

### Phase 3: UI Components
1. Create CommentForm component (with auth check)
2. Create CommentItem component (with reply support)
3. Create CommentList component
4. Create ReplySection component
5. Create CommentSection wrapper

### Phase 4: Integration
1. Integrate into project detail page
2. Integrate into blog detail page
3. Test both pages
4. Add loading states and error handling
5. Add real-time updates with Sanity Live

### Phase 5: Polish
1. Add animations (Framer Motion)
2. Improve accessibility
3. Add form validation
4. Add error toasts
5. Optimize performance
6. Add translations (i18n)

## Keycloak Hidden Iframe Setup

**Keycloak configuration for silent SSO:**
```typescript
const keycloakConfig = {
  url: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
  realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM,
  clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
  'silent-check-sso-redirect-uri': `${window.location.origin}/silent-check-sso.html`,
  'check-sso-login': false,
  'check-sso': true,
  'silent-check-sso': true
}
```

**Create `public/silent-check-sso.html`:**
```html
<html>
<body>
<script>
  parent.postMessage(location.href, location.origin)
</script>
</body>
</html>
```

## Data Flow

### Creating a Comment:
1. User clicks "Add Comment"
2. Check authentication (show login if not authenticated)
3. Display CommentForm
4. User submits form
5. POST to `/api/comments`
6. API validates token with Keycloak
7. Save to Sanity
8. Update React Query cache
9. Show in UI

### Creating a Reply:
1. User clicks "Reply" on a comment
2. Show ReplyForm under the comment
3. User submits reply
4. POST to `/api/comments` with `parentId`
5. Save to Sanity linked to parent comment
6. Update UI with new reply

## Security Considerations

1. **Token Validation**: Always validate tokens server-side with Keycloak
2. **User Authorization**: Only allow users to edit/delete their own comments
3. **XSS Prevention**: Sanitize comment content (no HTML, or use markdown)
4. **Rate Limiting**: Limit comment creation frequency
5. **Moderation**: Add flags for reported comments
6. **CORS**: Configure CORS properly for API routes

## Optional Enhancements

1. Comment editing (time-limited, e.g., 5 minutes)
2. Comment deletion (soft delete with moderator recovery)
3. Comment voting/liking
4. Comment sorting (newest, oldest, most liked)
5. Comment search
6. User profile pages
7. Email notifications for replies
8. Admin moderation panel
9. Spam detection
10. Rich text editor with markdown support

## Files to Create

### Authentication
- `lib/keycloak.ts`
- `lib/keycloakConfig.ts`
- `contexts/AuthProvider.tsx`
- `components/auth/LoginButton.tsx`
- `components/auth/LogoutButton.tsx`
- `components/auth/AuthGuard.tsx`
- `public/silent-check-sso.html`

### Database & API
- `schemas/comment.ts`
- `app/api/[locale]/comments/route.ts`
- `app/api/[locale]/comments/[id]/route.ts`
- `app/api/[locale]/comments/by-slug/[type]/[slug]/route.ts`
- `app/api/[locale]/comments/replies/[id]/route.ts`

### UI Components
- `components/comments/CommentSection.tsx`
- `components/comments/CommentList.tsx`
- `components/comments/CommentItem.tsx`
- `components/comments/CommentForm.tsx`
- `components/comments/ReplySection.tsx`

### Utilities
- `lib/api/comments.ts` - API client functions
- `hooks/useComments.ts` - Custom hook for comment operations
- `hooks/useAuth.ts` - Custom hook for auth state

---

**Ready to proceed with implementation?**
