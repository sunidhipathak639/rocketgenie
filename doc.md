I've thoroughly navigated through the Rocket Genie website and identified several critical issues:
​

Website Issues Found:
1. Search Functionality Broken
​
The search bar accepts input but doesn't work when pressing Enter

No search results page is displayed

The live search feature appears to be non-functional

2. Login/Sign Up Button Not Working
​
Clicking the "Login/Sign Up" button shows a loading spinner but doesn't navigate anywhere

No modal or login page opens

The functionality is completely broken

3. Enquire Now Buttons Don't Function
​
The "Enquire Now" buttons throughout the site (especially in the "Popular Searches" section) display a loading spinner when clicked

They don't navigate to any form or show any action

These CTAs are essentially non-functional

4. City Selector Dropdown Issue
The "All Cities" dropdown selector shows a loading state when clicked

The list of cities doesn't display properly

Users cannot select different cities

5. Missing Navigation Header on About Us Page
​
The About Us page (/about-us.php) loads WITHOUT the top navigation bar

Users cannot easily navigate to other pages from the About Us section

Inconsistent with other pages that have the header

6. Multiple Broken Links in Blog/Featured Sections
​
Many blog section links point to "/index.php#" which doesn't go anywhere

Carousel/featured content links appear non-functional

These are placeholder links that were never properly implemented

Key Functionality Issues Summary:
Search - Completely non-functional

Authentication - Login button doesn't work

Contact/Enquiry Forms - Enquire Now buttons don't function

Filtering - City selector broken

Navigation - Missing header on some pages

Internal Links - Many placeholder/broken links throughout

The website appears to have several backend integration issues and incomplete functionality implementations, particularly with forms, search, and user authentication features.

now i have redesign this intire website in next js with payload as backend


go give me the proper artitucture of the frontend and the backend with the fixes
ROCKET GENIE - COMPLETE REDESIGN ARCHITECTURE
Next.js Frontend + Payload CMS Backend
PART 1: FRONTEND ARCHITECTURE (Next.js 14+)
Project Structure
text
rocket-genie-frontend/
├── app/
│   ├── layout.tsx                 # Root layout with providers
│   ├── page.tsx                   # Homepage
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   └── reset-password/[token]/page.tsx
│   ├── (main)/
│   │   ├── categories/[slug]/page.tsx
│   │   ├── search/page.tsx
│   │   ├── business/[id]/page.tsx
│   │   ├── about-us/page.tsx
│   │   ├── contact-us/page.tsx
│   │   ├── career-opportunities/page.tsx
│   │   ├── investor-relations/page.tsx
│   │   ├── advertise/page.tsx
│   │   ├── free-business-listing/page.tsx
│   │   ├── blog/page.tsx
│   │   └── blog/[slug]/page.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/page.tsx
│   │   ├── my-listings/page.tsx
│   │   ├── my-profile/page.tsx
│   │   └── settings/page.tsx
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── search/route.ts
│       ├── categories/route.ts
│       └── revalidate/route.ts
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── Breadcrumb.tsx
│   ├── forms/
│   │   ├── SearchForm.tsx
│   │   ├── LoginForm.tsx
│   │   ├── EnquireForm.tsx
│   │   ├── ContactForm.tsx
│   │   └── ListingForm.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── CategoriesGrid.tsx
│   │   ├── PopularSearches.tsx
│   │   ├── TestimonialCarousel.tsx
│   │   └── BlogSection.tsx
│   ├── cards/
│   │   ├── BusinessCard.tsx
│   │   ├── CategoryCard.tsx
│   │   ├── BlogCard.tsx
│   │   └── TestimonialCard.tsx
│   └── shared/
│       ├── CitySelector.tsx
│       ├── RatingStars.tsx
│       ├── LoadingSpinner.tsx
│       ├── Button.tsx
│       ├── Modal.tsx
│       └── Toast.tsx
├── lib/
│   ├── api-client.ts              # Axios/fetch wrapper
│   ├── auth.ts                    # NextAuth config
│   ├── constants.ts               # Constants & config
│   ├── utils.ts                   # Utility functions
│   ├── hooks.ts                   # Custom hooks
│   └── validators.ts              # Zod schemas
├── hooks/
│   ├── useAuth.ts
│   ├── useSearch.ts
│   ├── useCity.ts
│   ├── useEnquiry.ts
│   └── useDebounce.ts
├── store/
│   ├── auth-store.ts              # Zustand
│   ├── city-store.ts
│   ├── search-store.ts
│   └── ui-store.ts
├── types/
│   ├── index.ts
│   ├── api.ts
│   ├── business.ts
│   └── user.ts
├── styles/
│   ├── globals.css
│   ├── variables.css
│   └── tailwind.config.ts
└── public/
    ├── images/
    ├── icons/
    └── fonts/
Key Technologies
Framework: Next.js 14 (App Router)

Styling: Tailwind CSS + shadcn/ui

State Management: Zustand + TanStack Query

Authentication: NextAuth.js v5

Validation: Zod

HTTP Client: Axios

Forms: React Hook Form

Analytics: Next.js Analytics + Posthog

PART 2: BACKEND ARCHITECTURE (Payload CMS)
Project Structure
text
rocket-genie-backend/
├── src/
│   ├── collections/
│   │   ├── Users.ts               # User collection with roles
│   │   ├── Businesses.ts          # Business listings
│   │   ├── Categories.ts          # Service categories
│   │   ├── Cities.ts              # Cities
│   │   ├── Reviews.ts             # Reviews & ratings
│   │   ├── Enquiries.ts           # Enquiry submissions
│   │   ├── Blog.ts                # Blog posts
│   │   ├── SearchLogs.ts          # Search tracking
│   │   └── Testimonials.ts        # Testimonials
│   ├── globals/
│   │   ├── Settings.ts            # Site settings
│   │   ├── Navigation.ts          # Nav config
│   │   ├── SocialLinks.ts         # Social media
│   │   └── FAQs.ts                # FAQ management
│   ├── blocks/
│   │   ├── HeroBlock.ts
│   │   ├── CategoriesBlock.ts
│   │   ├── CTABlock.ts
│   │   └── TestimonialBlock.ts
│   ├── hooks/
│   │   ├── beforeCreate.ts
│   │   ├── afterRead.ts
│   │   └── beforeChange.ts
│   ├── access/
│   │   ├── isAdmin.ts
│   │   ├── isAuth.ts
│   │   └── isOwner.ts
│   ├── fields/
│   │   ├── richTextField.ts
│   │   ├── metaFields.ts
│   │   └── seoFields.ts
│   ├── middleware/
│   │   ├── corsMiddleware.ts
│   │   ├── rateLimiter.ts
│   │   └── authMiddleware.ts
│   ├── utilities/
│   │   ├── search.ts
│   │   ├── elasticsearch.ts       # Optional
│   │   ├── cache.ts
│   │   └── email.ts
│   ├── seed.ts                    # Database seeding
│   └── payload.config.ts          # Payload config
├── .env.example
├── tsconfig.json
├── Dockerfile
└── docker-compose.yml
PART 3: DATABASE SCHEMA (Collections)
1. Users Collection
typescript
{
  id: string (UUID)
  email: string (unique)
  password: string (encrypted)
  phone: string
  firstName: string
  lastName: string
  profileImage?: string
  role: enum ['user', 'business', 'admin']
  businessProfile?: ref(Businesses)
  city: ref(Cities)
  isEmailVerified: boolean
  isPhoneVerified: boolean
  status: enum ['active', 'suspended', 'deleted']
  preferences: {
    newsletter: boolean
    notifications: boolean
    language: string
  }
  createdAt: date
  updatedAt: date
}
2. Businesses Collection
typescript
{
  id: string (UUID)
  owner: ref(Users) - required
  name: string - required
  description: richText
  category: ref(Categories) - required
  city: ref(Cities) - required
  address: string
  phone: string[]
  email: string[]
  website?: string
  images: media[]
  businessHours: {
    monday: { open: time, close: time, closed: boolean }
    // ... for all days
  }
  rating: decimal (0-5)
  reviewCount: number
  verified: boolean
  featured: boolean
  status: enum ['active', 'pending', 'suspended']
  seo: {
    title: string
    description: string
    keywords: string[]
  }
  createdAt: date
  updatedAt: date
}
3. Categories Collection
typescript
{
  id: string (UUID)
  name: string - required, unique
  slug: string - required, unique
  description: text
  icon: media
  image: media
  parentCategory?: ref(Categories)
  subCategories: ref(Categories)[]
  featured: boolean
  order: number
  seo: {
    title: string
    description: string
  }
  createdAt: date
  updatedAt: date
}
4. Cities Collection
typescript
{
  id: string (UUID)
  name: string - required, unique
  slug: string - required, unique
  state: string
  country: string
  latitude: decimal
  longitude: decimal
  businesses: ref(Businesses)[]
  businessCount: number
  active: boolean
  createdAt: date
  updatedAt: date
}
5. Enquiries Collection
typescript
{
  id: string (UUID)
  businessId: ref(Businesses) - required
  userId?: ref(Users)
  name: string - required
  email: string - required
  phone: string - required
  message: richText - required
  category?: string
  priority: enum ['low', 'medium', 'high']
  status: enum ['new', 'in-progress', 'resolved', 'closed']
  response?: richText
  respondedBy?: ref(Users)
  respondedAt?: date
  createdAt: date
  updatedAt: date
}
6. Reviews Collection
typescript
{
  id: string (UUID)
  business: ref(Businesses) - required
  user: ref(Users) - required
  rating: number (1-5) - required
  title: string
  comment: richText
  verified: boolean
  helpful: number (default: 0)
  images: media[]
  status: enum ['pending', 'approved', 'rejected']
  approvedAt?: date
  createdAt: date
  updatedAt: date
}
7. Blog Collection
typescript
{
  id: string (UUID)
  title: string - required
  slug: string - required, unique
  excerpt: string
  content: richText - required
  author: ref(Users) - required
  featuredImage: media
  category: ref(BlogCategory)
  tags: string[]
  status: enum ['draft', 'published', 'archived']
  seo: {
    title: string
    description: string
    keywords: string[]
  }
  viewCount: number (default: 0)
  publishedAt: date
  createdAt: date
  updatedAt: date
}
PART 4: API ENDPOINTS
Authentication Endpoints
text
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh-token
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
GET    /api/auth/me
POST   /api/auth/verify-email
POST   /api/auth/verify-phone
Search Endpoints ⭐ FIX #1
text
GET    /api/search?q=query&city=city_id&category=cat_id&page=1&limit=20
       - Response: { results: Business[], total, page, pageSize }
       - Debounced on frontend
       - Server-side caching enabled
       - Full-text search on PostgreSQL/Elasticsearch

GET    /api/search/suggestions?q=query
       - Returns autocomplete suggestions

GET    /api/search/filters
       - Returns available filters (cities, categories, price ranges)
Business Endpoints
text
GET    /api/businesses                    # List with pagination
GET    /api/businesses/:id                # Single business details
POST   /api/businesses                    # Create (auth required)
PUT    /api/businesses/:id                # Update (owner/admin)
DELETE /api/businesses/:id                # Delete (owner/admin)
GET    /api/businesses/:id/reviews        # Get reviews
POST   /api/businesses/:id/reviews        # Add review (auth required)
GET    /api/businesses/:id/enquiries      # Get enquiries (owner)
Categories Endpoints
text
GET    /api/categories                    # All categories with hierarchy
GET    /api/categories/:slug              # Single category with businesses
GET    /api/categories/:slug/businesses   # Businesses in category (paginated)
Cities Endpoints ⭐ FIX #2
text
GET    /api/cities                        # List all cities with counts
GET    /api/cities/:slug                  # Single city details
GET    /api/cities/:slug/categories       # Categories in city
Enquiry Endpoints ⭐ FIX #3
text
POST   /api/enquiries                     # Submit enquiry (form validation)
GET    /api/enquiries/:id                 # Get enquiry (owner/admin)
PUT    /api/enquiries/:id/respond         # Respond to enquiry (owner/admin)
GET    /api/enquiries/business/:id        # Get enquiries for business (owner)
User Endpoints
text
GET    /api/users/profile                 # Current user profile
PUT    /api/users/profile                 # Update profile
POST   /api/users/change-password         # Change password
GET    /api/users/:id                     # Public user profile
Blog Endpoints
text
GET    /api/blog                          # All published posts
GET    /api/blog/:slug                    # Single post
POST   /api/blog                          # Create (admin)
PUT    /api/blog/:id                      # Update (admin)
DELETE /api/blog/:id                      # Delete (admin)
PART 5: FIXES FOR IDENTIFIED ISSUES
Issue #1: Search Functionality ❌ → ✅
Problem: Search bar doesn't work, no results displayed

Frontend Fix:

typescript
// hooks/useSearch.ts
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from './useDebounce';

export const useSearch = (query: string, city?: string) => {
  const debouncedQuery = useDebounce(query, 500);
  
  return useQuery({
    queryKey: ['search', debouncedQuery, city],
    queryFn: async () => {
      if (!debouncedQuery) return [];
      const { data } = await apiClient.get('/api/search', {
        params: { q: debouncedQuery, city }
      });
      return data.results;
    },
    enabled: !!debouncedQuery,
  });
};

// components/forms/SearchForm.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearch } from '@/hooks/useSearch';

export const SearchForm = ({ city }: { city?: string }) => {
  const [query, setQuery] =
