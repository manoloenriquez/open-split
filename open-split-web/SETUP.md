# Open Split Web - Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
cd open-split-web
yarn install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to finish setting up
3. Go to **Settings** → **API** to get your credentials:
   - Project URL
   - Anon/Public Key

### 3. Configure Environment Variables

Create a `.env.local` file in the `open-split-web` directory:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# FastAPI Backend (for OCR only)
NEXT_PUBLIC_API_URL=http://localhost:8000

# Optional: For OAuth redirects
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Set Up Database Tables

Run these SQL commands in your Supabase SQL Editor:

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

-- Create indexes
CREATE INDEX idx_group_members_group_id ON group_members(group_id);
CREATE INDEX idx_group_members_user_id ON group_members(user_id);
CREATE INDEX idx_expenses_group_id ON expenses(group_id);
CREATE INDEX idx_expenses_created_by ON expenses(created_by);
CREATE INDEX idx_expenses_date ON expenses(date);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Groups policies
CREATE POLICY "Users can view groups they belong to"
  ON groups FOR SELECT
  USING (
    id IN (
      SELECT group_id FROM group_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create groups"
  ON groups FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Group admins can update groups"
  ON groups FOR UPDATE
  USING (
    id IN (
      SELECT group_id FROM group_members 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Group members policies
CREATE POLICY "Users can view members of their groups"
  ON group_members FOR SELECT
  USING (
    group_id IN (
      SELECT group_id FROM group_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Group admins can add members"
  ON group_members FOR INSERT
  WITH CHECK (
    group_id IN (
      SELECT group_id FROM group_members 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Expenses policies
CREATE POLICY "Users can view expenses in their groups"
  ON expenses FOR SELECT
  USING (
    group_id IN (
      SELECT group_id FROM group_members WHERE user_id = auth.uid()
    ) OR created_by = auth.uid()
  );

CREATE POLICY "Users can create expenses"
  ON expenses FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Expense creators can update their expenses"
  ON expenses FOR UPDATE
  USING (auth.uid() = created_by);

CREATE POLICY "Expense creators can delete their expenses"
  ON expenses FOR DELETE
  USING (auth.uid() = created_by);
```

### 5. Set Up Storage Buckets

In Supabase Dashboard, go to **Storage** and create these buckets:

1. **avatars** (public)
   - For profile images
   
2. **payment-qr** (public)
   - For InstaPay QR codes
   
3. **receipts** (private)
   - For receipt images

### 6. Enable Google OAuth (Optional)

1. Go to **Authentication** → **Providers** in Supabase
2. Enable Google provider
3. Add your Google OAuth credentials
4. Add authorized redirect URLs:
   - `http://localhost:3000/auth/callback` (development)
   - Your production URL (when deployed)

### 7. Run the Development Server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 8. Test the Application

1. Go to `/signup` to create an account
2. Fill in your profile at `/profile`
3. Create a group at `/groups/create`
4. Add an expense at `/expenses/create`

## 🔧 Troubleshooting

### Middleware Redirect Loop

If you're experiencing redirect loops:
1. Check that your Supabase URL and keys are correct
2. Clear your browser cookies
3. Restart the dev server

### Database Connection Issues

1. Verify your `NEXT_PUBLIC_SUPABASE_URL` is correct
2. Check that your `NEXT_PUBLIC_SUPABASE_ANON_KEY` is the **anon key**, not the service key
3. Ensure Row Level Security policies are properly set up

### OCR Not Working

The FastAPI backend needs to be running for OCR features:

```bash
cd ../api
pip install -r requirements.txt
uvicorn main:app --reload
```

## 📚 Next Steps

1. Review the `README.md` for architecture details
2. Implement server actions for groups and expenses
3. Add real-time features with Supabase Realtime
4. Implement bill splitting logic
5. Add payment settlement tracking

## 🆘 Need Help?

- Check the [Supabase Documentation](https://supabase.com/docs)
- Review [Next.js App Router docs](https://nextjs.org/docs/app)
- Consult [Shadcn UI docs](https://ui.shadcn.com)

