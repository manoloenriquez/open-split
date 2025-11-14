# 🧮 **Open Split**

### _AI-Powered Bill Splitting App (Web + Mobile + FastAPI)_

Open Split is an open-source, AI-assisted expense sharing platform inspired by Splitwise — but with one major upgrade:

### 📸 **Take a picture of a receipt → AI extracts all items automatically.**

This removes the hassle of manually typing line items when splitting bills with friends, family, or groups.

This repository contains **all components** of the project:

- Web app (Next.js)
- Mobile app (React Native)
- FastAPI backend (OCR + AI receipt extraction)

---

# 📁 **Project Structure**

```
open-split/
│
├── api/                  # FastAPI backend for OCR + AI extraction
│
├── open-split-web/       # Web client (React / Next.js)
│
└── open-split-mobile/    # Mobile client (React Native)
```

Each folder will contain its own README and setup instructions.

---

# 🎯 **Project Vision**

The goal of Open Split is to make expense splitting:

### ✔️ Faster

Just snap a picture or upload a receipt.

### ✔️ Smarter

AI extracts and structures the receipt data (items, totals, merchant).

### ✔️ Simpler

Clean UI and automatic calculations reduce the friction of splitting bills.

### ✔️ Cross-Platform

Both **web** and **mobile** clients use the same **FastAPI backend**.

---

# 🚀 **Tech Stack Overview**

### **Frontend**

- Web: React / Next.js
- Mobile: React Native (Expo)
- State management: Zustand
- Data fetching: React Query
- UI libraries: React Native Paper / MUI / Tailwind (optional)

### **Backend**

- FastAPI (Python)
- Routes for OCR processing
- AI-powered text → structured JSON transformation

### **AI & OCR**

- OCR: Google ML Kit (mobile) or backend OCR fallback
- AI: GPT-4o mini / Claude Haiku / Gemini Flash
- Optional: Local LLM using Ollama (Llama 3 / Phi-3)

---

# 🧱 **MVP Features**

### **Phase 1 — Core MVP**

- Upload or snap a photo of a receipt
- OCR extracts raw text
- FastAPI receives text → AI model parses:
  - Merchant name
  - Items & prices
  - Subtotal, tax, total
- Outputs structured JSON to the web client
- UI displays editable list of items

### **Phase 2 — Web App**

- User accounts (Supabase or custom backend)
- Create groups
- Add expenses
- Split bills
- Track balances

### **Phase 3 — Mobile App**

- Camera scanning
- Offline mode
- Push notifications
- Realtime updates

---

# 🏗️ **Installation (Monorepo Workspace)**

Clone the repo:

```bash
git clone https://github.com/manoloenriquez/open-split.git
cd open-split
```

Then install each component:

### **Backend**

```bash
cd api
pip install -r requirements.txt
uvicorn main:app --reload
```

### **Web**

```bash
cd open-split-web
npm install
npm run dev
```

### **Mobile**

```bash
cd open-split-mobile
npm install
npx expo start
```

---

# 🌍 **Why This Project Matters**

This project showcases:

- AI engineering
- OCR systems
- Mobile + web development
- API architecture
- Structured text extraction
- Real-world product design

Perfect for:

- Building a strong software portfolio
- Open-source contribution
- Showcasing cross-platform engineering skills

---

# 🤝 **Contributing**

Contributions, issues, and feature requests are welcome.  
Feel free to open a pull request or report a bug.

---

# 📄 **License**

Licensed under the MIT License — free to use, modify, and distribute.

---

# 👤 **Author**

**Manolo Enriquez**  
Creator of Open Split
