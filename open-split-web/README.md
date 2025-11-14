# Open Split Web

Next.js web application for Open Split - AI-powered expense sharing and bill splitting.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Authentication & Database**: Supabase
- **State Management**: Zustand (minimal client state)
- **Data Fetching**: React Query (optional, client-side caching)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/              # Auth pages (login, signup)
│   │   ├── login/
│   │   ├── signup/
│   │   └── actions.ts       # Auth server actions
│   ├── (dashboard)/         # Protected dashboard pages
│   │   ├── groups/
│   │   ├── expenses/
│   │   ├── profile/
│   │   ├── layout.tsx       # Dashboard layout with sidebar
│   │   └── page.tsx         # Dashboard home
│   ├── layout.tsx           # Root layout
│   └── globals.css
├── components/
│   ├── ui/                  # Shadcn UI components
│   ├── forms/               # Form components
│   ├── navigation/          # Navbar & Sidebar
│   ├── groups/              # Group-related components
│   ├── expenses/            # Expense-related components
│   └── profile/             # Profile components
├── lib/
│   ├── supabase/
│   │   ├── client.ts        # Browser Supabase client
│   │   ├── server.ts        # Server Supabase client
│   │   └── middleware.ts    # Auth middleware
│   ├── api.ts               # FastAPI OCR client
│   ├── store.ts             # Zustand stores
│   └── utils.ts             # Utility functions
├── hooks/
│   ├── useUser.ts
│   └── useSidebar.ts
├── types/
│   ├── user.ts
│   ├── groups.ts
│   ├── expenses.ts
│   └── ocr.ts
├── utils/
│   ├── format.ts
│   └── validations.ts
└── middleware.ts            # Next.js middleware
```

## 🏗️ Architecture Principles

### ✅ DO

1. **Use Server Actions for all mutations** (create/update/delete)
2. **Use Supabase server client** for all database operations
3. **Server Components by default** - only use Client Components when needed
4. **FastAPI only for OCR/AI parsing** - all other operations via Supabase

### ❌ DON'T

1. **Never create API routes** in `/app/api/`
2. **Never use Supabase service keys** in client-side code
3. **Never store sensitive data** in client state

## 🔧 Setup

### Prerequisites

- Node.js 20+
- Yarn
- Supabase account
- FastAPI backend running (for OCR features)

### Installation

1. Clone the repository:
```bash
cd open-split-web
```

2. Install dependencies:
```bash
yarn install
```

3. Create `.env.local` file:
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# FastAPI Backend (for OCR only)
NEXT_PUBLIC_API_URL=http://localhost:8000

# Optional: For OAuth redirects
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Run the development server:
```bash
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## 📊 Supabase Database Schema

### Tables Needed

```sql
-- profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  contact_number TEXT,
  bank_account_name TEXT,
  bank_account_number TEXT,
  gcash_number TEXT,
  instapay_qr_url TEXT,
  profile_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- groups table
CREATE TABLE groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  created_by UUID REFERENCES auth.users NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- group_members table
CREATE TABLE group_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID REFERENCES groups ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  role TEXT CHECK (role IN ('admin', 'member')),
  joined_at TIMESTAMPTZ DEFAULT NOW()
);

-- expenses table
CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID REFERENCES groups ON DELETE CASCADE,
  created_by UUID REFERENCES auth.users NOT NULL,
  description TEXT NOT NULL,
  notes TEXT,
  total_amount DECIMAL(10, 2) NOT NULL,
  date DATE NOT NULL,
  receipt_url TEXT,
  ocr_text TEXT,
  parsed_items JSONB,
  split_mode TEXT CHECK (split_mode IN ('equal', 'percentage', 'amount', 'item')),
  splits JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Storage Buckets

- `avatars` - Profile images
- `payment-qr` - InstaPay QR codes
- `receipts` - Receipt images

## 🔐 Authentication Flow

1. User signs up/logs in via Supabase Auth
2. Middleware checks session on each request
3. Protected routes redirect to `/login` if not authenticated
4. Session managed via HTTP-only cookies

## 📝 Key Features

### Authentication
- [x] Email/password login
- [x] Email/password signup
- [x] Google OAuth
- [x] Session management via middleware

### Profile Management
- [x] View/edit profile information
- [x] Upload profile image
- [x] Add payment details (bank, GCash)
- [x] Upload InstaPay QR code

### Groups
- [x] List user groups
- [x] Create new group
- [x] View group details
- [ ] Invite members
- [ ] Manage group settings

### Expenses
- [x] List all expenses
- [x] Create expense manually
- [x] Upload receipt for OCR parsing
- [ ] Split expenses (equal/percentage/item-level)
- [ ] Track balances

### Receipt OCR
- [x] Upload receipt image
- [x] Image preview
- [ ] OCR text extraction (FastAPI)
- [ ] AI-parsed items
- [ ] Editable parsed data

## 🛠️ Development

### Adding New Pages

1. Create page in appropriate route group
2. Use Server Components by default
3. Create Server Actions for data mutations
4. Add client interactivity with "use client" directive

### Server Actions Pattern

```typescript
"use server";

import { createServerClient } from "@/lib/supabase/server";

export async function myAction(formData: FormData) {
  const supabase = await createServerClient();
  
  // Your logic here
  
  revalidatePath("/your-path");
  return { success: true };
}
```

### Client Component Pattern

```typescript
"use client";

import { useState } from "react";
import { myAction } from "./actions";

export function MyForm() {
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    await myAction(formData);
    
    setLoading(false);
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

## 🎨 Adding Shadcn Components

```bash
npx shadcn@latest add [component-name]
```

## 📦 Building for Production

```bash
yarn build
yarn start
```

## 🧪 Testing

```bash
# Add your test commands here
yarn test
```

## 🤝 Contributing

1. Follow the established architecture patterns
2. Use TypeScript for type safety
3. Keep components small and focused
4. Use Server Actions for mutations
5. Document complex logic

## 📄 License

MIT

---

**Note**: This is a scaffold. Business logic and full database integration will be implemented in subsequent phases.
