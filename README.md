# Rocket Genie Redesign

Next.js 15 (App Router) + Payload CMS 3.0

## Features Implemented

- **Unified Header & Footer**: Fixed navigation issues and missing header on about page.
- **Search (Fix #1)**: Integrated search form with city context and results page.
- **Auth (Fix #2)**: Standardized Login/Signup pages.
- **Enquiry System (Fix #3)**: Functional Enquiry modal and form.
- **City Selector (Fix #4)**: Dynamic city selection using Zustand for state management.
- **Full Database Schema**: Businesses, Categories, Cities, Users, Reviews, Enquiries, and Blog collections.

## Getting Started

1.  Run `npm install`
2.  Set up your `.env` (POSTGRES_URL, PAYLOAD_SECRET)
3.  Run `npm run dev`
4.  Visit `/admin` to seed data
