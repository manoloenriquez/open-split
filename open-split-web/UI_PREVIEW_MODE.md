# 🎨 UI Preview Mode

The app can now run **without Supabase environment variables** so you can preview the UI!

## ⚡ Quick Preview (No Setup Required)

Just run:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🎯 What You Can Preview

### ✅ All Pages Accessible
- `/login` - Login page with form and Google OAuth button
- `/signup` - Signup page with full name, email, password
- `/` - Dashboard with overview cards and quick actions
- `/profile` - Profile page with all payment fields
- `/groups` - Groups list page
- `/groups/create` - Create group form
- `/expenses` - Expenses list page
- `/expenses/create` - Create expense with manual entry & receipt upload tabs

### ✅ Interactive UI Elements
- ✨ Responsive sidebar (collapsible on mobile)
- ✨ Top navbar with user menu placeholder
- ✨ All forms with validation states
- ✨ Loading spinners and button states
- ✨ Error message displays
- ✨ Success notifications
- ✨ Receipt upload with drag-and-drop
- ✨ Image preview for receipts
- ✨ Tab switching (manual vs receipt)
- ✨ Modal/dialog components
- ✨ Dropdown menus
- ✨ Responsive layouts

## 🚫 What Won't Work (Expected)

Since there's no Supabase connection:
- ❌ Actual login/signup (forms will show errors)
- ❌ Data persistence
- ❌ Profile updates
- ❌ Creating groups/expenses
- ❌ User authentication
- ❌ Database queries

**This is intentional** - you're in UI preview mode!

## 🎨 Testing the UI

### Navigation
1. Click on sidebar links to navigate between pages
2. Try the mobile menu (resize browser to mobile width)
3. Test the responsive layout at different screen sizes

### Forms
1. Fill out login/signup forms (will show placeholder errors)
2. Try the profile form with all fields
3. Test the expense creation tabs
4. Upload an image in the receipt upload area

### Components
1. Check all button states (primary, outline, ghost)
2. View cards and their layouts
3. Test dropdowns and menus
4. Check table displays

## 🔧 When Ready to Connect Backend

Create `.env.local` and add real values:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-real-anon-key
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Then restart the dev server and everything will work!

## 💡 Pro Tips

1. **Use browser DevTools** to inspect components
2. **Resize the window** to test responsive behavior
3. **Check mobile view** using DevTools device emulation
4. **Test dark mode** (if your system uses it)
5. **View all routes** by typing URLs directly

## 📸 What to Check

### Design & Layout
- ✓ Spacing and padding looks good
- ✓ Colors are consistent
- ✓ Fonts are readable
- ✓ Buttons are properly sized
- ✓ Forms are well-aligned
- ✓ Cards have proper shadows/borders

### Responsiveness
- ✓ Mobile: Sidebar collapses to hamburger menu
- ✓ Tablet: Layout adjusts appropriately
- ✓ Desktop: Full sidebar visible
- ✓ Forms stack on mobile
- ✓ Tables scroll horizontally on mobile

### Interactions
- ✓ Buttons show hover states
- ✓ Forms show validation
- ✓ Links navigate correctly
- ✓ Modals open/close
- ✓ Dropdowns work
- ✓ File uploads show preview

## 🎉 Enjoy Exploring!

The entire UI is ready and functional. Once you add Supabase credentials, all the forms and features will come to life with real data!

---

**Note**: This preview mode is perfect for:
- Showing stakeholders the UI
- Getting design feedback
- Testing responsive layouts
- Verifying component behavior
- Making UI adjustments before backend setup

