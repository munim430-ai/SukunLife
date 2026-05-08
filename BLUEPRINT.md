# Sukun Care - Production App Blueprint

## 1. Product Requirements Document (PRD)
Sukun Care is a comprehensive spiritual wellness platform specializing in Islamic healing (Ruqyah, Hijama) and counseling. It bridges the gap between traditional spiritual practices and modern digital convenience.

### Target Audience
- Individuals seeking spiritual healing (Ruqyah).
- Users looking for Hijama (cupping) services.
- People requiring Islamic-centered counseling.
- Students interested in spiritual wellness courses.
- Customers of natural healing products.

## 2. Technical Architecture
- **Frontend**: React (Vite) - Mobile-responsive web app (optimizable for PWA/WebView).
- **Backend**: Express.js (Node.js) - Serving as the API proxy and Vite middleware.
- **Database**: Firebase Firestore (NoSQL) for real-time reactivity and scalability.
- **Auth**: Firebase Authentication (Google & Phone OTP).
- **Hosting**: Cloud Run (via AI Studio deployment).
- **Media**: Firebase Storage (Audio/Video).

## 3. Database Schema (Firestore)
Refer to `firebase-blueprint.json` for the formal schema. Key collections:
- `users`: Profiles, membership status.
- `appointments`: Booking data, status, practitioner notes.
- `assessments`: User self-evaluation history.
- `care_plans`: Guided daily tasks and progress.
- `products`: Ecommerce catalog.
- `courses`: Instructional content and enrollments.
- `resources`: Audio library (Ruqyah), articles, FAQs.

## 4. API Specification
- `POST /api/auth/otp`: Initiate phone verification.
- `GET /api/services`: List available wellness services.
- `POST /api/bookings`: Create a new appointment.
- `GET /api/content/resources`: Fetch audio/article library.
- `POST /api/assessments/submit`: Save self-assessment result.

## 5. UI/UX Navigation Flow
1. **Onboarding**: Splash -> Language -> Welcome -> Auth.
2. **Dashboard**: Unified view of health progress, upcoming sessions, and recommendations.
3. **Healing Path**: Self-Assessment -> Recommendation -> Booking -> Care Plan.
4. **Ecommerce**: Product Carousel -> Categories -> Cart -> Checkout.
5. **LMS**: Course List -> Lesson Player -> Quiz.

## 6. Security Plan
- Roles: `GUEST`, `USER`, `PRACTITIONER`, `ADMIN`.
- Data Isolation: Users can only read their own assessments and bookings.
- Content Protection: Premium audio/video restricted via Firestore rules.
- Audit Logs: All admin updates to stocks or bookings are logged.

## 7. Implementation Plan
- **Phase 1**: Core Infrastructure (Auth, Global State, Firebase Setup).
- **Phase 2**: Service Booking & Practitioner Dashboard.
- **Phase 3**: Self-Assessment Engine & Care Plans.
- **Phase 4**: Ecommerce Shop & Resource Library.
- **Phase 5**: Courses & Memberships.
- **Phase 6**: Admin Panel & Analytics.
