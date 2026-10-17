# Shenaly Rent a Car - Management System

A dedicated fleet and rental operations platform designed for **Shenaly Rent a Car** ([shenalyrentacar.com](https://shenalyrentacar.com/)). Built specifically to manage small-to-midsize fleets in Sri Lanka, streamline compliance, safeguard against return damage disputes, and calculate real-time net profit per vehicle.

---

## Project Structure

```text
├── frontend/             # React + Tailwind CSS Admin Web Portal
│   ├── public/           # Static assets, logos
│   └── src/
│       ├── assets/       # Media & icons
│       ├── components/   # UI component library (cards, tables, modals)
│       ├── features/     # Dashboard, Vehicles, Renters, Rentals, Payments, Costs, WhatsApp
│       ├── services/     # API client endpoints
│       └── utils/        # LKR currency formatters, date & ID helpers
│
├── backend/              # Node.js + Express REST API
│   ├── src/
│   │   ├── config/       # DB, AWS S3, WhatsApp API configuration
│   │   ├── controllers/  # Request handlers
│   │   ├── models/       # Mongoose schemas (Vehicle, Renter, Rental, Cost, Payment)
│   │   ├── routes/       # API route definitions
│   │   ├── services/     # S3 storage, WhatsApp Cloud API, profit calculations
│   │   └── utils/        # Logger, ID generator (e.g. SR-0146)
│   └── tests/            # Integration & unit test suites
│
├── shared/               # Cross-tier constants & types
│   └── constants/        # Sri Lankan document types, vehicle statuses, payment methods
│
├── docs/                 # Architecture, DB schema, and API documentation
├── scripts/              # Database seeding and migration scripts
│
└── shenaly-rent-a-car-demo.html  # Standalone interactive client demo with dummy authentication
```

---

## Client Interactive Demo

For immediate client demonstration with zero server setup:
1. Open **`shenaly-rent-a-car-demo.html`** directly in any web browser (Chrome, Edge, Safari).
2. Use the **Dummy Authentication** switcher to toggle between **Admin** (`admin@shenaly.lk`) and **Staff** (`staff@shenaly.lk`).
3. Add, edit, and explore live entries for vehicles, renters, active rentals, photo inspections, expense logs, and WhatsApp weekly reports.
4. Data is persistently stored in the browser's `localStorage` and can be reset or exported at any time.

---

## Technology Stack

- **Frontend**: React, Tailwind CSS, Lucide Icons, Vite
- **Backend**: Node.js, Express, Mongoose (MongoDB)
- **Cloud Storage**: AWS S3 (secure pre-signed URLs for NIC/Passport/Driving Permits & Vehicle inspection photos)
- **Messaging**: WhatsApp Business Cloud API (Meta)


## Next.js operations app

Run `npm install` and `npm run dev` from `frontend/`. Use the **Booking Calendar** tab for the monthly fleet schedule, manual reservations, advance payments, booking details, handover check-in, and cancellations. Available calendar dates can be clicked to prefill a booking. Rental date ranges use the return date as the next available pickup date.

The header's **Guest Registration** link opens `/?view=register` (also `/?mode=guest`). Guests can register resident or tourist details, preview documents, choose dates and a vehicle, and save or share a confirmation voucher through WhatsApp. Open `/?view=calendar` to link directly to the fleet schedule.

This is a browser-local demo: existing saved app records are preserved, and new reservations use the same local storage as rentals, renters, and payments. Reservations become active rentals only at handover. Cancellation retains payment history; refunds require separate reconciliation. Fresh demo data includes an example online reservation; existing browser data is not replaced.

Guest submissions from another device are **not synchronized to staff**. Document selection previews files locally; files are not uploaded. Inspections remain simulated. Shared production bookings and secure document storage require backend implementation.

Validation: run `npm test` and `npm run build` inside `frontend/`. For a separate build alongside a running development server, use `SHENALY_BUILD_DIR=.next-calendar npm run build` and the same environment variable with `npm run start`.
