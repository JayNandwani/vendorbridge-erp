# VendorBridge ERP

Dependency-free VendorBridge procurement and vendor management ERP prototype based on the provided problem statement and Excalidraw mockup.

## Run

Open `index.html` in a browser. No install step is required.

## Implemented Screens

- Login and registration with role selection, validation, session state, and forgot-password feedback.
- Dashboard with active RFQs, pending approvals, purchase orders, overdue invoices, trends, and quick actions.
- Vendor management with registration, GST/contact/category fields, status tracking, search, and filters.
- RFQ creation with title, category, deadline, line items, attachments, vendor assignment, send, and draft save.
- Vendor quotation submission with pricing, delivery, GST, payment terms, notes, drafts, and submitted quotations.
- Quotation comparison with side-by-side vendor cards, lowest-price highlighting, delivery/rating/payment comparison, and approval initiation.
- Approval workflow with staged timeline, approve/reject actions, remarks, status transitions, and document generation.
- Purchase order and invoice screen with tax calculations, totals, print, email, mark-paid, and generated PDF download.
- Activity and logs page with category filters and immutable audit trail behavior.
- Reports and analytics with spend summaries, vendor metrics, monthly trend, and CSV export.

## Architecture Notes

- `index.html`, `styles.css`, and `app.js` form a static single-page app with seeded ERP data and `localStorage` persistence.
- `schema.sql` describes the backend data model for users, vendors, RFQs, quotations, approvals, POs, invoices, and activity logs.
- `activity_logs` is intentionally write-once: the schema has no soft-delete fields and includes triggers preventing update/delete operations.
