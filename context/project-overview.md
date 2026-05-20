# Project Overview: Metro-City Diagnostics Website

## Overview
Metro-City Diagnostics is a leading diagnostic center and pathology laboratory located on Birbal Bazar (Meherpur) in Silchar, Assam. This project involves building a fast, modern, and locally-optimized marketing and patient-facing website to convey clinical authority and warmth. The primary objective is to make it simple for patients across Silchar and the Barak Valley to find services, view timings, book appointments online, and contact the clinic directly.

## Goals
1. **Drive Bookings:** Achieve $\ge$ 30 online appointment bookings/month within 3 months of launch.
2. **SEO Dominance:** Rank in the top 3 on Google Search for "diagnostic center Silchar" and "pathology lab Silchar".
3. **FAQ Deflection:** Reduce customer support call volumes for routine FAQs by $\ge$ 20% by displaying clear operational information.
4. **Build Trust:** Keep bounce rate < 50% and time-on-page > 90s through premium branding, authentic ratings, and clinical credentials.
5. **Mobile First:** Ensure $\ge$ 70% of mobile traffic is served with a Largest Contentful Paint (LCP) under 2.5 seconds.

## Core User Flow
1. **Acquisition:** A local patient searches Google for a test (e.g., "blood test Meherpur" or "ultrasound Silchar") or enters the URL directly and lands on the homepage.
2. **Investigation:** The patient reviews services, packages, prices, or FAQs, verifying credentials (accreditations, doctor profiles, Google ratings).
3. **Booking Action:** The patient clicks "Book a Test" (Gold CTA) or selects "Book this test" from the services grid.
4. **Form Submission:** The patient fills in their name, phone number, desired test, preferred date, and home collection preference (with address).
5. **Confirmation:** The patient receives a success message indicating the clinic will call them within 30 minutes to confirm.
6. **Fulfillment:** The booking request is dispatched immediately to the clinic's email and WhatsApp fallback system.

## Features

### 1. Marketing & Trust Pages
* **Homepage:** Dynamic hero displaying rating badges, a 3-step workflow, trust metrics (years operating, tests per month), reviews carousel, and basic maps/hours.
* **About Us:** Narrative on clinic history, doctor profiles (Pathologists, Radiologists), and a list of lab equipment.
* **Doctors / Consultants:** A list of credentials and specialties of the medical directors.

### 2. Services Catalog
* **Services Grid:** Filterable list categorized by pathology, radiology, cardiac, and imaging.
* **Service Detail Pages:** Dynamic paths (`/services/[slug]`) describing the test purpose, prep instructions (e.g., fasting), turnaround times, and sample type.

### 3. Utility & Actions
* **Online Booking Form:** Simple input validator (react-hook-form + zod) submitting to email and WhatsApp alerts.
* **Contact & Directions:** Live Google Maps embeds, opening hours table, click-to-call links, and landmarks directions (Vivekananda statue, Cachar District Hospital, NIT Silchar).
* **FAQ Accordion:** Grouped questions about collection prep, reports, and payments.

## Scope

### In Scope
* A highly responsive, mobile-first Next.js 16 + Tailwind v4 site.
* Programmatic SEO metadata mapping and JSON-LD markup.
* Sitemap.xml and robots.txt generation.
* Client-side form validation with backend notifications via Resend/email fallback.

### Out of Scope (v1)
* Full patient portal with login and report downloading (planned for v2).
* Online payment gateway integration.
* LIMS (Laboratory Information Management System) or EMR syncing.
* Multilingual UI toggles (English-only for v1).

## Success Criteria
1. A user can fill out the booking form and trigger a verification email within 60 seconds.
2. All pages score $\ge$ 90 on Lighthouse Performance (mobile) and $\ge$ 95 on Accessibility.
3. Every interactive button is easily clickable on standard mobile viewports ($\ge$ 44x44px touch targets).
4. No PHI (Protected Health Information) is collected, stored, or logged on servers.
