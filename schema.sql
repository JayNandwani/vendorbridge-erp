-- VendorBridge Procurement & Vendor Management ERP schema
-- PostgreSQL-oriented, with immutable activity logs.

CREATE TABLE app_users (
  id BIGSERIAL PRIMARY KEY,
  first_name VARCHAR(80) NOT NULL,
  last_name VARCHAR(80) NOT NULL,
  email VARCHAR(180) NOT NULL UNIQUE,
  phone VARCHAR(40),
  password_hash TEXT NOT NULL,
  role VARCHAR(40) NOT NULL CHECK (role IN ('Procurement Officer', 'Vendor', 'Manager / Approver', 'Admin')),
  country VARCHAR(80),
  additional_info TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE vendors (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(180) NOT NULL,
  category VARCHAR(120) NOT NULL,
  gst_number VARCHAR(40) NOT NULL UNIQUE,
  contact_number VARCHAR(40) NOT NULL,
  email VARCHAR(180) NOT NULL,
  city VARCHAR(120),
  rating NUMERIC(2, 1) NOT NULL DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  status VARCHAR(24) NOT NULL DEFAULT 'Pending' CHECK (status IN ('Active', 'Pending', 'Blocked')),
  created_by BIGINT REFERENCES app_users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE rfqs (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(220) NOT NULL,
  category VARCHAR(120) NOT NULL,
  deadline DATE NOT NULL,
  description TEXT,
  status VARCHAR(24) NOT NULL DEFAULT 'Draft' CHECK (status IN ('Draft', 'Sent', 'Closed', 'Cancelled')),
  created_by BIGINT NOT NULL REFERENCES app_users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE rfq_line_items (
  id BIGSERIAL PRIMARY KEY,
  rfq_id BIGINT NOT NULL REFERENCES rfqs(id) ON DELETE CASCADE,
  item_name VARCHAR(220) NOT NULL,
  quantity NUMERIC(12, 2) NOT NULL CHECK (quantity > 0),
  unit VARCHAR(30) NOT NULL
);

CREATE TABLE rfq_vendor_assignments (
  rfq_id BIGINT NOT NULL REFERENCES rfqs(id) ON DELETE CASCADE,
  vendor_id BIGINT NOT NULL REFERENCES vendors(id),
  invited_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  status VARCHAR(24) NOT NULL DEFAULT 'Invited' CHECK (status IN ('Invited', 'Viewed', 'Submitted', 'Declined')),
  PRIMARY KEY (rfq_id, vendor_id)
);

CREATE TABLE rfq_attachments (
  id BIGSERIAL PRIMARY KEY,
  rfq_id BIGINT NOT NULL REFERENCES rfqs(id) ON DELETE CASCADE,
  file_name VARCHAR(240) NOT NULL,
  file_url TEXT NOT NULL,
  uploaded_by BIGINT NOT NULL REFERENCES app_users(id),
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE quotations (
  id BIGSERIAL PRIMARY KEY,
  rfq_id BIGINT NOT NULL REFERENCES rfqs(id) ON DELETE CASCADE,
  vendor_id BIGINT NOT NULL REFERENCES vendors(id),
  gst_percent NUMERIC(5, 2) NOT NULL DEFAULT 0,
  delivery_days INTEGER NOT NULL CHECK (delivery_days > 0),
  payment_terms VARCHAR(120),
  notes TEXT,
  status VARCHAR(24) NOT NULL DEFAULT 'Draft' CHECK (status IN ('Draft', 'Submitted', 'Selected', 'Rejected')),
  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (rfq_id, vendor_id)
);

CREATE TABLE quotation_line_items (
  id BIGSERIAL PRIMARY KEY,
  quotation_id BIGINT NOT NULL REFERENCES quotations(id) ON DELETE CASCADE,
  item_name VARCHAR(220) NOT NULL,
  quantity NUMERIC(12, 2) NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(14, 2) NOT NULL CHECK (unit_price >= 0)
);

CREATE TABLE approval_workflows (
  id BIGSERIAL PRIMARY KEY,
  quotation_id BIGINT NOT NULL REFERENCES quotations(id),
  status VARCHAR(32) NOT NULL DEFAULT 'Awaiting L1 approval'
    CHECK (status IN ('Awaiting L1 approval', 'Awaiting L2 approval', 'Approved', 'Rejected')),
  remarks TEXT,
  initiated_by BIGINT NOT NULL REFERENCES app_users(id),
  initiated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ
);

CREATE TABLE approval_steps (
  id BIGSERIAL PRIMARY KEY,
  workflow_id BIGINT NOT NULL REFERENCES approval_workflows(id) ON DELETE CASCADE,
  step_order INTEGER NOT NULL CHECK (step_order > 0),
  approver_id BIGINT NOT NULL REFERENCES app_users(id),
  status VARCHAR(24) NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected', 'Skipped')),
  remarks TEXT,
  acted_at TIMESTAMPTZ,
  UNIQUE (workflow_id, step_order)
);

CREATE TABLE purchase_orders (
  id BIGSERIAL PRIMARY KEY,
  po_number VARCHAR(40) NOT NULL UNIQUE,
  workflow_id BIGINT NOT NULL REFERENCES approval_workflows(id),
  quotation_id BIGINT NOT NULL REFERENCES quotations(id),
  status VARCHAR(32) NOT NULL DEFAULT 'Approved' CHECK (status IN ('Approved', 'Pending Payment', 'Paid', 'Cancelled')),
  po_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE invoices (
  id BIGSERIAL PRIMARY KEY,
  invoice_number VARCHAR(40) NOT NULL UNIQUE,
  purchase_order_id BIGINT NOT NULL REFERENCES purchase_orders(id),
  invoice_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE NOT NULL,
  subtotal NUMERIC(14, 2) NOT NULL CHECK (subtotal >= 0),
  cgst NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (cgst >= 0),
  sgst NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (sgst >= 0),
  grand_total NUMERIC(14, 2) NOT NULL CHECK (grand_total >= 0),
  status VARCHAR(32) NOT NULL DEFAULT 'Pending Payment' CHECK (status IN ('Pending Payment', 'Paid', 'Overdue', 'Cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Write-once audit table: intentionally no updated_at, deleted_at, or soft-delete flag.
CREATE TABLE activity_logs (
  id BIGSERIAL PRIMARY KEY,
  actor_user_id BIGINT REFERENCES app_users(id),
  entity_type VARCHAR(40) NOT NULL,
  entity_id BIGINT,
  event_type VARCHAR(80) NOT NULL,
  message TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_vendors_status ON vendors(status);
CREATE INDEX idx_rfqs_status_deadline ON rfqs(status, deadline);
CREATE INDEX idx_quotations_rfq ON quotations(rfq_id);
CREATE INDEX idx_activity_logs_entity ON activity_logs(entity_type, entity_id);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at DESC);

CREATE OR REPLACE FUNCTION prevent_activity_log_mutation()
RETURNS trigger AS $$
BEGIN
  RAISE EXCEPTION 'activity_logs are immutable and cannot be updated or deleted';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER activity_logs_no_update
BEFORE UPDATE ON activity_logs
FOR EACH ROW EXECUTE FUNCTION prevent_activity_log_mutation();

CREATE TRIGGER activity_logs_no_delete
BEFORE DELETE ON activity_logs
FOR EACH ROW EXECUTE FUNCTION prevent_activity_log_mutation();
