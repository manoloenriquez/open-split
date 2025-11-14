# Getting Started with Open Split Web

## 🎉 Scaffold Complete!

Your Open Split web frontend has been fully scaffolded and is ready for development. All UI components, layouts, and page structures are in place.

## ✅ What's Working

1. **✨ Full UI scaffold** - All pages and components created
2. **🏗️ Project structure** - Organized and ready for development
3. **🎨 Shadcn UI** - Complete component library installed
4. **🔧 TypeScript** - Full type safety throughout
5. **📦 All dependencies** - Installed and configured
6. **✅ Build passes** - Project builds successfully
7. **🚫 Zero linter errors** - Clean codebase

## 🚀 Quick Start (3 Steps)

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Wait for it to initialize
4. Go to Settings → API
5. Copy your:
   - Project URL
   - Anon/Public Key

### Step 2: Set Up Environment

Create `.env.local` in the `open-split-web` directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key-here
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Step 3: Run the App

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📊 Set Up the Database

Run this SQL in your Supabase SQL Editor (complete script in `SETUP.md`):

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
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

-- Groups table
CREATE TABLE groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  created_by UUID REFERENCES auth.users NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Group members table
CREATE TABLE group_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID REFERENCES groups ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  role TEXT CHECK (role IN ('admin', 'member')) DEFAULT 'member',
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(group_id, user_id)
);

-- Expenses table
CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID REFERENCES groups ON DELETE CASCADE,
  created_by UUID REFERENCES auth.users NOT NULL,
  description TEXT NOT NULL,
  notes TEXT,
  total_amount DECIMAL(10, 2) NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  receipt_url TEXT,
  ocr_text TEXT,
  parsed_items JSONB,
  split_mode TEXT CHECK (split_mode IN ('equal', 'percentage', 'amount', 'item')) DEFAULT 'equal',
  splits JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

> **Note**: Full SQL with indexes and RLS policies in `SETUP.md`

## 🎨 What You Can Do Right Now

### Try the UI

1. Visit `/login` - See the login page
2. Visit `/signup` - See the signup page
3. Visit `/` - See the dashboard (will redirect to login)
4. Visit `/profile` - See profile page structure
5. Visit `/groups` - See groups interface
6. Visit `/expenses` - See expenses interface

### Explore the Code

```bash
src/
├── app/               # All pages
├── components/        # Reusable components
├── lib/              # Supabase & utilities
├── hooks/            # Custom React hooks
├── types/            # TypeScript types
└── utils/            # Helper functions
```

## 📝 What Needs Implementation

While the UI is complete, these features need backend logic:

### 1. Authentication (Server Actions Ready)
- ✅ UI Complete
- ⏳ Need: Environment variables configured
- 📄 File: `src/app/(auth)/actions.ts`

### 2. Groups CRUD
- ✅ UI Complete
- ⏳ Need: Server actions implementation
- 📄 Create actions in: `src/app/(dashboard)/groups/actions.ts`

### 3. Expenses CRUD
- ✅ UI Complete
- ⏳ Need: Server actions implementation
- 📄 Create actions in: `src/app/(dashboard)/expenses/actions.ts`

### 4. Receipt OCR
- ✅ UI Complete
- ⏳ Need: FastAPI integration
- 📄 Already set up in: `src/lib/api.ts`

### 5. Bill Splitting Logic
- ✅ Types defined
- ⏳ Need: Calculation algorithms
- 📄 Implement in: expense creation flow

## 🔨 Development Workflow

### Adding a New Feature

1. **Create server action** (if needed)
```typescript
// src/app/(dashboard)/[feature]/actions.ts
"use server";

import { createServerClient } from "@/lib/supabase/server";

export async function myAction(formData: FormData) {
  const supabase = await createServerClient();
  // Your logic here
  revalidatePath("/your-path");
}
```

2. **Update the component**
```typescript
// src/components/[feature]/my-form.tsx
"use client";

import { myAction } from "@/app/(dashboard)/[feature]/actions";

export function MyForm() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await myAction(formData);
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Adding Shadcn Components

```bash
npx shadcn@latest add [component-name]
```

Available: badge, button, card, checkbox, dropdown, input, select, textarea, toast, etc.

## 📚 Documentation

- **README.md** - Complete project overview and architecture
- **SETUP.md** - Detailed setup instructions with SQL
- **SCAFFOLD_SUMMARY.md** - Complete list of what's been built
- **env.example** - Environment variable template

## 🧪 Testing the Scaffold

### 1. Verify Build
```bash
yarn build
```
Should complete without errors ✅

### 2. Check Linting
```bash
yarn lint
```
Should show no errors ✅

### 3. Start Dev Server
```bash
yarn dev
```
Should start on http://localhost:3000 ✅

## 🎯 Recommended Next Steps

### Immediate (Do First)
1. ✅ Set up Supabase project
2. ✅ Configure environment variables
3. ✅ Run database migrations (SETUP.md)
4. ✅ Test authentication flow

### Short Term (This Week)
5. ⏳ Implement groups CRUD server actions
6. ⏳ Implement expenses CRUD server actions
7. ⏳ Connect FastAPI OCR endpoint
8. ⏳ Test full user flow end-to-end

### Medium Term (Next Week)
9. ⏳ Implement bill splitting calculations
10. ⏳ Add member invitation flow
11. ⏳ Implement settlement tracking
12. ⏳ Add real-time updates

### Long Term (Future)
13. ⏳ Add comprehensive tests
14. ⏳ Implement notifications
15. ⏳ Add export/reporting features
16. ⏳ Deploy to production

## 🆘 Troubleshooting

### "Missing Supabase environment variables"
→ Create `.env.local` with your Supabase credentials

### "Middleware redirect loop"
→ Clear cookies and restart dev server

### "Cannot find module '@/components/...'"
→ Check that paths in `tsconfig.json` are correct (should be `"@/*": ["./src/*"]`)

### Build fails
→ Make sure all environment variables are set, even with placeholder values

## 💡 Tips

- **Use Server Components by default** - Only add `"use client"` when needed
- **Server Actions for mutations** - Never create API routes in `/app/api/`
- **Supabase for everything except OCR** - Only use FastAPI for receipt parsing
- **Type everything** - TypeScript types are already defined in `/types`
- **Reuse components** - Check `/components` before creating new ones

## 🎉 You're Ready!

The scaffold is complete and the foundation is solid. Now you can focus on building the actual business logic without worrying about:

- ✅ Project setup
- ✅ Component libraries
- ✅ Routing structure
- ✅ Authentication flow
- ✅ UI design
- ✅ Type definitions
- ✅ File organization

**Happy coding! 🚀**

---

Need help? Check the other documentation files:
- Architecture details → `README.md`
- Complete setup → `SETUP.md`
- What's included → `SCAFFOLD_SUMMARY.md`

