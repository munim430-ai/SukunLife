# Jules Implementation Master Script for Sukunlife "Super-App"

This script provides Jules with a detailed, sprint-by-sprint breakdown of tasks to transform Sukunlife into the envisioned "Spiritual Super-App." All tasks are derived from the `SukunLife_Super_App_Blueprint.md` and should be implemented with an "Apple-style" minimalist premium aesthetic.

---

## Jules: Getting Started

1.  **Clone Repository**: `gh repo clone munim430-ai/SukunLife SukunLife`
2.  **Install Dependencies**: `cd SukunLife && pnpm install`
3.  **Review Blueprint**: Familiarize yourself with `SukunLife_Super_App_Blueprint.md` for the overall vision.

---

## Sprint 1: Core UI/UX & Navigation (Foundation)

**Goal**: Establish the premium visual foundation and the new 5-tab navigation structure.

### Tasks:

1.  **Update Tailwind Configuration**: 
    *   **File**: `tailwind.config.ts`
    *   **Action**: Update color palette to natural, organic tones (Sage, Sand, Deep Slate). Define new spacing, shadow, and typography scales to match "Apple-style" minimalist premiumism. Integrate `SF Pro` as primary UI font and `Playfair Display` for headings.

2.  **Implement 5-Tab Bottom Navigation**: 
    *   **File**: `src/App.tsx` or `src/components/Layout.tsx` (depending on current structure)
    *   **Action**: Create a new 5-tab bottom navigation bar component. Each tab should correspond to: `Home`, `Nazar`, `Shop`, `Knowledge`, `More`. Ensure smooth transitions and micro-animations on tab selection.

3.  **Design Home Tab Components**: 
    *   **File**: `src/pages/Home.tsx` (or similar)
    *   **Action**: 
        *   Implement the **Top Navbar** for booking functionality (Ruqyah, Hijama, Counseling appointments).
        *   Create a prominent **Profile Card** component (like bKash) displaying user name, avatar, and membership status. Use glassmorphism for its background.
        *   Develop the **Spiritual Health Check** interactive module below the profile card.


---

## Sprint 2: Mass Adoption Features & Insforge Integration

**Goal**: Integrate core backend services with Insforge and implement key mass-adoption features.

### Tasks:

1.  **Insforge Authentication Integration**: 
    *   **File**: `src/lib/insforge.ts` (new file), `src/components/Profile.tsx`, `src/pages/Auth.tsx`
    *   **Action**: Replace existing Firebase Auth logic with Insforge Authentication. Implement Google Sign-in, Email/Password, and Phone Number (OTP) Login. For now, use **mock authentication data** for UI/UX development and local testing. Ensure secure token handling and session management will be implemented when real credentials are provided.

2.  **Insforge Database Migration**: 
    *   **File**: Insforge Dashboard (manual setup), `src/api/data.ts` (new file)
    *   **Action**: Create Insforge Postgres tables for `users`, `appointments`, `products`, `courses`, `resources`, `hadiths`, `community_posts`, `subscriptions`. For now, use **mock data** for these tables to facilitate UI/UX development. Develop API service layer to fetch data from Insforge, initially using mock data.

3.  **Nazar Shield Functionality**: 
    *   **File**: `src/pages/Nazar.tsx` (new file), `src/components/NazarShieldMeter.tsx`
    *   **Action**: Implement the "Nazar Shield" UI with a visual "Protection Level" meter. Develop logic for free users (3x/week) and Pro users (7x/week). Implement visual cues (e.g., meter dropping, status changing to "Vulnerable") when free user limits are reached.

4.  **Verified Practitioner Database & Scanner**: 
    *   **File**: `src/pages/VerifiedPractitioners.tsx` (new file), Insforge Dashboard
    *   **Action**: Develop the UI for searching and displaying Verified & Certified Ruqyah Practitioners. Implement a mechanism (e.g., QR code scanner or search by name) to verify practitioners against the Insforge database.

5.  **Topic Based Hadith Engine**: 
    *   **File**: `src/pages/Knowledge.tsx`, `src/components/HadithCard.tsx`
    *   **Action**: Create the `TopicBasedHadith` component. Build a searchable grid of "Life Topics." When a topic is selected, display curated Sahih Hadiths. Each Hadith should be presented on a beautiful, shareable "Apple-style" card. Also, integrate the **AI-Powered Zakat Calculator** component on this tab. Ensure it includes a loading animation (e.g., "Sukun AI is analyzing your assets...") to convey an "AI-powered" feel.

6.  **Digital Protection Loop (Background Audio)**: 
    *   **File**: `src/components/AudioPlayer.tsx`, `src/lib/mcp_audio.ts` (new file)
    *   **Action**: Implement a persistent background audio player. For now, use **local placeholder audio files** or mock MCP calls. Ensure it works even when the screen is off and can be controlled from lock screen/notifications. Real MCP integration will occur when credentials are provided.

---

## Sprint 3: Monetization, Community & Advanced Knowledge

**Goal**: Implement revenue-generating features, community engagement, and advanced knowledge tools.

### Tasks:

1.  **Muslim Merchandise Online Store (Shop Tab)**: 
    *   **File**: `src/pages/Shop.tsx`, `src/components/ProductCard.tsx`, `src/components/Cart.tsx`, `src/pages/Checkout.tsx`
    *   **Action**: Build a fully functional e-commerce store. Implement dynamic product listings, categories, product details pages, shopping cart, and a secure checkout flow. For now, use **mock product data and a simulated checkout process**. Integrate with Insforge for product data and inventory management when real credentials are provided.

2.  **bKash/Nagad Recurring Payments for Sukun Premium**: 
    *   **File**: `src/pages/Premium.tsx`, `src/api/payments.ts` (new file)
    *   **Action**: Design a sleek "Sukun Premium" landing page within the app. For now, use **placeholder UI for bKash/Nagad payment flows** and a simulated subscription process. Integrate bKash/Nagad "Recurring Payment" APIs for monthly/yearly subscriptions and implement the "Barakah Gifting" feature when real credentials are provided.

3.  **Community Feed Implementation**: 
    *   **File**: `src/components/CommunityFeed.tsx`, `src/components/Post.tsx`, `src/components/Comment.tsx`
    *   **Action**: Develop the text-only community feed on the Home tab. Users can upload posts and comment. Implement "Verified Practitioner" badges for trusted users. Ensure robust moderation tools (Insforge Edge Functions).

4.  **Waz Search with YouTube Integration**: 
    *   **File**: `src/pages/Knowledge.tsx`, `src/components/WazPlayer.tsx`
    *   **Action**: Implement a search function for prominent speakers' Waz. For now, use **mock YouTube data** or a limited set of pre-defined videos. Integrate with YouTube API to pull relevant videos and develop a "Floating Mini-Player" when real credentials are provided.

5.  **Sadaqah for Shifa Integration**: 
    *   **File**: `src/components/SadaqahButton.tsx`, `src/api/payments.ts`
    *   **Action**: Implement the "Sadaqah for Shifa" feature. For now, use a **simulated transaction process**. Integrate one-click bKash/Nagad APIs when real credentials are provided. Ensure transactions are recorded and users receive confirmation.

6.  **Sukun AI Companion (Basic Integration)**: 
    *   **File**: `src/components/SukunAIChat.tsx`, `src/api/ai.ts` (new file)
    *   **Action**: Implement the basic chat interface for the "Sukun AI" companion. For now, it can provide pre-scripted responses or simple lookups. (Future: integrate with actual LLM via Insforge Edge Functions).

---

## General Instructions for Jules:

*   **Placeholder Strategy**: For all API keys and external service integrations (Insforge, bKash/Nagad, Stripe, YouTube, Twilio/MessageBird), Jules should initially use **mock data or placeholder values**. This allows for UI/UX development and local testing without requiring real credentials. Real API keys will be provided later through an "Assisted Collection" process.


*   **Code Quality**: Maintain high code quality, readability, and adherence to React/TypeScript best practices.
*   **Testing**: Implement unit and integration tests for critical components and API integrations.
*   **Version Control**: Use Git for version control, creating separate branches for each major feature or sprint task. Commit frequently with descriptive messages.
*   **Communication**: Report progress and any blockers regularly. Ask clarifying questions if any task is unclear.
*   **Performance**: Optimize for performance on mobile devices, especially for low-bandwidth environments.
*   **Security**: Ensure all API keys and sensitive information are handled securely (e.g., environment variables, Insforge secrets).

This script provides a clear, actionable roadmap. Good luck, Jules!
