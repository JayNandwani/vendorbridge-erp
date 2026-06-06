const STORAGE_KEY = "vendorbridge-erp-state-v1";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "chart" },
  { id: "vendors", label: "Vendors", icon: "users" },
  { id: "rfqs", label: "RFQs", icon: "file" },
  { id: "quotations", label: "Quotations", icon: "send" },
  { id: "approvals", label: "Approvals", icon: "approve" },
  { id: "purchaseOrders", label: "Purchase orders", icon: "file" },
  { id: "invoices", label: "Invoices", icon: "file" },
  { id: "reports", label: "Reports", icon: "chart" },
  { id: "activity", label: "Activity", icon: "activity" }
];

const roleOptions = ["Procurement Officer", "Vendor", "Manager / Approver", "Admin"];

function seedState() {
  return {
    auth: {
      signedIn: false,
      mode: "login",
      message: "",
      user: {
        name: "Procurement Officer",
        email: "officer@vendorbridge.local",
        role: "Procurement Officer"
      }
    },
    view: "dashboard",
    vendorFilter: "All",
    vendorSearch: "",
    showVendorForm: false,
    quoteTab: "submit",
    logFilter: "All",
    rfqDraft: {
      title: "Office Furniture procurement Q2",
      category: "Furniture",
      deadline: "2025-06-15",
      description: "Ergonomic chairs and standing desks for 3rd floor.",
      vendorIds: ["vendor-1", "vendor-2"],
      lineItems: [
        { item: "Ergonomic chair", qty: 25, unit: "NOS" },
        { item: "Standing desks", qty: 10, unit: "NOS" }
      ]
    },
    quoteDraft: {
      rfqId: "rfq-1",
      vendorId: "vendor-1",
      gst: 18,
      delivery: 10,
      payment: "30 days",
      notes: "Payment terms: 20 days net. Warranty included.",
      rows: null
    },
    vendors: [
      {
        id: "vendor-1",
        name: "Infra Supplies Pvt Ltd",
        category: "Construction",
        gst: "27AABCS1429B1Z0",
        contact: "+91 98240 11880",
        email: "quotes@infrasupplies.example",
        city: "Surat",
        rating: 4.5,
        status: "Active"
      },
      {
        id: "vendor-2",
        name: "TechCore Ltd",
        category: "IT",
        gst: "24AAACT4470B1Z8",
        contact: "+91 99099 88442",
        email: "sales@techcore.example",
        city: "Ahmedabad",
        rating: 4.2,
        status: "Active"
      },
      {
        id: "vendor-3",
        name: "FastLog Transport",
        category: "Logistics",
        gst: "24AAFCT2256N1Z1",
        contact: "+91 98980 45002",
        email: "ops@fastlog.example",
        city: "Vadodara",
        rating: 3.8,
        status: "Blocked"
      },
      {
        id: "vendor-4",
        name: "OfficeNeed Co",
        category: "Stationery",
        gst: "24AADFO2200P1Z5",
        contact: "+91 99777 21101",
        email: "rfq@officeneed.example",
        city: "Rajkot",
        rating: 4.0,
        status: "Pending"
      }
    ],
    rfqs: [
      {
        id: "rfq-1",
        title: "Office Furniture procurement Q2",
        category: "Furniture",
        deadline: "2025-06-15",
        description: "Ergonomic chairs and standing desks for 3rd floor.",
        vendorIds: ["vendor-1", "vendor-2", "vendor-4"],
        status: "Sent",
        createdAt: "2025-05-19",
        lineItems: [
          { item: "Ergonomic chair", qty: 25, unit: "NOS" },
          { item: "Standing desks", qty: 10, unit: "NOS" }
        ],
        attachments: ["floor-plan.pdf", "material-specs.xlsx"]
      }
    ],
    quotes: [
      {
        id: "quote-1",
        rfqId: "rfq-1",
        vendorId: "vendor-1",
        gst: 18,
        delivery: 10,
        payment: "30 days",
        status: "Submitted",
        notes: "Payment terms: 20 days net. Warranty included.",
        rows: [
          { item: "Ergonomic chair", qty: 25, unitPrice: 3500 },
          { item: "Standing desks", qty: 10, unitPrice: 8200 }
        ]
      },
      {
        id: "quote-2",
        rfqId: "rfq-1",
        vendorId: "vendor-2",
        gst: 18,
        delivery: 14,
        payment: "30 days",
        status: "Submitted",
        notes: "Includes installation support.",
        rows: [
          { item: "Ergonomic chair", qty: 25, unitPrice: 3700 },
          { item: "Standing desks", qty: 10, unitPrice: 9200 }
        ]
      },
      {
        id: "quote-3",
        rfqId: "rfq-1",
        vendorId: "vendor-4",
        gst: 18,
        delivery: 7,
        payment: "15 days",
        status: "Submitted",
        notes: "Fastest delivery, limited color options.",
        rows: [
          { item: "Ergonomic chair", qty: 25, unitPrice: 3900 },
          { item: "Standing desks", qty: 10, unitPrice: 8800 }
        ]
      }
    ],
    approval: {
      id: "approval-1",
      rfqId: "rfq-1",
      quoteId: "quote-1",
      status: "Awaiting L2 approval",
      remarks: "",
      levels: [
        { name: "RFQ submitted", owner: "Procurement Officer", status: "done", date: "May 19, 2025" },
        { name: "L1 review", owner: "Rahul Mehta, Procurement Head", status: "done", date: "May 20, 10:32 AM" },
        { name: "L2 approval", owner: "Priya Shah, Finance Manager", status: "wait", date: "Assigned May 21" },
        { name: "Generate PO", owner: "System automation", status: "todo", date: "After approval" }
      ]
    },
    purchaseOrder: {
      number: "PO-2025-0068",
      date: "2025-05-21",
      status: "Pending Payment"
    },
    invoice: {
      number: "INV-2025-0068",
      date: "2025-05-22",
      dueDate: "2025-06-21",
      status: "Pending Payment"
    },
    logs: [
      {
        id: "log-1",
        type: "Approvals",
        title: "Quotation selected",
        detail: "Infra Supplies Pvt Ltd selected for Office Furniture procurement Q2.",
        at: "2025-05-23T21:15:00"
      },
      {
        id: "log-2",
        type: "Approvals",
        title: "Approval pending",
        detail: "PO-2025-0068 awaiting L2 approval by Priya Shah.",
        at: "2025-05-22T09:15:00"
      },
      {
        id: "log-3",
        type: "RFQ",
        title: "RFQ published",
        detail: "Office Furniture procurement Q2 sent to 3 vendors.",
        at: "2025-05-19T14:40:00"
      },
      {
        id: "log-4",
        type: "Vendors",
        title: "Vendor added",
        detail: "FastLog Transport registered and pending verification.",
        at: "2025-05-18T15:20:00"
      }
    ],
    report: {
      monthlySpend: [
        { month: "Dec", value: 190000 },
        { month: "Jan", value: 240000 },
        { month: "Feb", value: 210000 },
        { month: "Mar", value: 280000 },
        { month: "Apr", value: 330000 },
        { month: "May", value: 420000 }
      ],
      categories: [
        { name: "IT Hardware", value: 480000 },
        { name: "Furniture", value: 320000 },
        { name: "Stationery", value: 210000 },
        { name: "Logistics", value: 230000 }
      ]
    }
  };
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return seedState();
    return { ...seedState(), ...JSON.parse(saved) };
  } catch {
    return seedState();
  }
}

let state = loadState();
const app = document.getElementById("app");

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function icon(name) {
  return `<svg class="icon" aria-hidden="true"><use href="#i-${name}"></use></svg>`;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function id(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function money(value) {
  return `Rs. ${Number(value || 0).toLocaleString("en-IN")}`;
}

function formatDate(value) {
  if (!value) return "Not set";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function statusClass(status) {
  return String(status || "").toLowerCase().split(" ")[0].replace(/[^a-z]/g, "");
}

function getVendor(vendorId) {
  return state.vendors.find((vendor) => vendor.id === vendorId) || state.vendors[0];
}

function getRfq(rfqId) {
  return state.rfqs.find((rfq) => rfq.id === rfqId) || state.rfqs[0];
}

function getQuote(quoteId) {
  return state.quotes.find((quote) => quote.id === quoteId) || state.quotes[0];
}

function quoteTotals(quote) {
  const subtotal = (quote?.rows || []).reduce((sum, row) => {
    return sum + Number(row.qty || 0) * Number(row.unitPrice || 0);
  }, 0);
  const gstAmount = Math.round(subtotal * Number(quote?.gst || 0) / 100);
  return { subtotal, gstAmount, total: subtotal + gstAmount };
}

function ensureQuoteDraftRows() {
  const rfq = getRfq(state.quoteDraft.rfqId);
  if (!state.quoteDraft.rows || state.quoteDraft.rows.length !== rfq.lineItems.length) {
    state.quoteDraft.rows = rfq.lineItems.map((line) => ({
      item: line.item,
      qty: line.qty,
      unitPrice: 0
    }));
  }
}

function addLog(type, title, detail) {
  state.logs.unshift({
    id: id("log"),
    type,
    title,
    detail,
    at: new Date().toISOString()
  });
}

function render() {
  app.innerHTML = state.auth.signedIn ? renderShell() : renderAuth();
  saveState();
}

function renderAuth() {
  const isLogin = state.auth.mode === "login";
  return `
    <main class="auth-shell">
      <section class="auth-intro" aria-label="VendorBridge overview">
        <div class="brand-lockup">
          <div class="brand-mark">VB</div>
          <div class="brand-name">VendorBridge</div>
        </div>
        <h1>Procurement & Vendor Management ERP</h1>
        <p>Centralize vendors, RFQs, quotations, approvals, purchase orders, invoices, audit logs, and reporting in one structured workflow.</p>
        <div class="role-strip">
          ${roleOptions.map((role) => `
            <div class="role-pill">
              <strong>${escapeHtml(role)}</strong>
              <span>${roleDescription(role)}</span>
            </div>
          `).join("")}
        </div>
      </section>
      <section class="auth-card" aria-label="Authentication">
        <div class="auth-tabs">
          <button type="button" class="${isLogin ? "active" : ""}" data-auth-mode="login">Login</button>
          <button type="button" class="${!isLogin ? "active" : ""}" data-auth-mode="register">Register</button>
        </div>
        ${isLogin ? renderLoginForm() : renderRegisterForm()}
        <div class="msg ${state.auth.message.includes("successful") ? "ok" : ""}">${escapeHtml(state.auth.message)}</div>
      </section>
    </main>
  `;
}

function roleDescription(role) {
  return {
    "Procurement Officer": "RFQs, POs, invoices",
    "Vendor": "Quotes and RFQ status",
    "Manager / Approver": "Approve and monitor",
    "Admin": "Users and analytics"
  }[role] || "";
}

function renderLoginForm() {
  return `
    <div class="field-grid single">
      <div class="field">
        <label for="loginEmail">Email address</label>
        <input id="loginEmail" type="email" value="${escapeHtml(state.auth.user.email)}" autocomplete="email">
      </div>
      <div class="field">
        <label for="loginPassword">Password</label>
        <input id="loginPassword" type="password" value="vendorbridge" autocomplete="current-password">
      </div>
      <div class="field">
        <label for="loginRole">Role</label>
        <select id="loginRole">
          ${roleOptions.map((role) => `<option ${role === state.auth.user.role ? "selected" : ""}>${escapeHtml(role)}</option>`).join("")}
        </select>
      </div>
    </div>
    <div class="actions">
      <button class="btn primary" type="button" data-login>${icon("approve")} Login</button>
      <button class="btn ghost" type="button" data-forgot>Forgot password</button>
    </div>
  `;
}

function renderRegisterForm() {
  return `
    <div class="field-grid">
      <div class="field">
        <label for="regFirst">First name</label>
        <input id="regFirst" type="text" value="Jaynam">
      </div>
      <div class="field">
        <label for="regLast">Last name</label>
        <input id="regLast" type="text" value="Thakkar">
      </div>
      <div class="field">
        <label for="regEmail">Email address</label>
        <input id="regEmail" type="email" value="jaynam@vendorbridge.local">
      </div>
      <div class="field">
        <label for="regPhone">Phone number</label>
        <input id="regPhone" type="tel" value="+91 98765 43210">
      </div>
      <div class="field">
        <label for="regRole">Role</label>
        <select id="regRole">
          ${roleOptions.map((role) => `<option>${escapeHtml(role)}</option>`).join("")}
        </select>
      </div>
      <div class="field">
        <label for="regCountry">Country</label>
        <input id="regCountry" type="text" value="India">
      </div>
      <div class="field full">
        <label for="regInfo">Additional information</label>
        <textarea id="regInfo">Procurement team member responsible for vendor onboarding and RFQ management.</textarea>
      </div>
    </div>
    <div class="actions">
      <button class="btn primary" type="button" data-register>${icon("plus")} Register</button>
    </div>
  `;
}

function renderShell() {
  return `
    <div class="shell">
      <header class="topbar">
        <div class="top-brand"><span class="brand-mark">VB</span><span>VendorBridge</span></div>
        <div class="top-meta">Welcome back, ${escapeHtml(state.auth.user.role)} - procurement workspace</div>
        <div class="user-tools">
          <select class="role-select" data-role-select aria-label="Current role">
            ${roleOptions.map((role) => `<option ${role === state.auth.user.role ? "selected" : ""}>${escapeHtml(role)}</option>`).join("")}
          </select>
          <div class="avatar">${escapeHtml(initials(state.auth.user.name))}</div>
          <button class="btn slim ghost" type="button" data-logout>Logout</button>
        </div>
      </header>
      <div class="main">
        <aside class="sidebar" aria-label="Primary navigation">
          <nav class="nav-list">
            ${navItems.map((item) => `
              <button class="nav-item ${isActiveNav(item.id) ? "active" : ""}" type="button" data-view="${item.id}">
                ${icon(item.icon)}
                <span>${escapeHtml(item.label)}</span>
              </button>
            `).join("")}
          </nav>
        </aside>
        <main class="content">${renderView()}</main>
      </div>
    </div>
  `;
}

function initials(name) {
  return String(name || "VB").split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

function isActiveNav(id) {
  return state.view === id;
}

function renderView() {
  switch (state.view) {
    case "vendors":
      return renderVendors();
    case "rfqs":
      return renderRfqs();
    case "quotations":
      return renderQuotations();
    case "approvals":
      return renderApprovals();
    case "purchaseOrders":
    case "invoices":
      return renderDocuments();
    case "reports":
      return renderReports();
    case "activity":
      return renderActivity();
    case "dashboard":
    default:
      return renderDashboard();
  }
}

function renderDashboard() {
  const activeRfqs = state.rfqs.filter((rfq) => rfq.status !== "Draft").length;
  const pendingApprovals = state.approval.status.toLowerCase().includes("awaiting") ? 1 : 0;
  const quote = getQuote(state.approval.quoteId);
  const totals = quoteTotals(quote);
  return `
    <section class="view">
      <div class="section-head">
        <div>
          <h2>Dashboard</h2>
          <p>Today's overview across RFQs, approvals, purchase orders, invoices, and spend movement.</p>
        </div>
      </div>
      <div class="kpi-grid">
        ${kpi("12", "Active RFQs", "3 due this week")}
        ${kpi(String(pendingApprovals + 4), "Pending approvals", "Finance review in queue")}
        ${kpi(money(230000), "POs this month", "5 purchase orders")}
        ${kpi(String(activeRfqs + 2), "Overdue invoices", "Requires follow-up")}
      </div>
      <div class="grid-2">
        <section class="module">
          <div class="module-title-row">
            <h3>Recent Purchase Orders</h3>
            <span class="status ${statusClass(state.purchaseOrder.status)}">${escapeHtml(state.purchaseOrder.status)}</span>
          </div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>PO</th><th>Vendor</th><th>Amount</th><th>Status</th></tr></thead>
              <tbody>
                <tr><td>${escapeHtml(state.purchaseOrder.number)}</td><td>${escapeHtml(getVendor(quote.vendorId).name)}</td><td>${money(totals.total)}</td><td><span class="status approved">Approved</span></td></tr>
                <tr><td>PO-2025-0065</td><td>TechCore Ltd</td><td>${money(140000)}</td><td><span class="status pending">Pending</span></td></tr>
                <tr><td>PO-2025-0062</td><td>OfficeNeed Co</td><td>${money(34900)}</td><td><span class="status draft">Draft</span></td></tr>
              </tbody>
            </table>
          </div>
          <div class="actions">
            <button class="btn primary" type="button" data-view="rfqs">${icon("plus")} New RFQ</button>
            <button class="btn" type="button" data-view="vendors">${icon("users")} Add Vendor</button>
            <button class="btn" type="button" data-view="invoices">${icon("eye")} View Invoices</button>
          </div>
        </section>
        <section class="module">
          <h3>Spending Trends - last 6 months</h3>
          ${renderMiniChart(state.report.monthlySpend)}
        </section>
      </div>
    </section>
  `;
}

function kpi(value, label, hint) {
  return `<div class="kpi"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span><small>${escapeHtml(hint)}</small></div>`;
}

function renderMiniChart(items) {
  const max = Math.max(...items.map((item) => item.value), 1);
  return `
    <div class="mini-chart">
      ${items.map((item) => `<div class="mini-bar" style="height:${Math.max(18, Math.round(item.value / max * 142))}px"></div>`).join("")}
      <div class="mini-chart-labels">${items.map((item) => `<span>${escapeHtml(item.month)}</span>`).join("")}</div>
    </div>
  `;
}

function renderVendors() {
  const filters = ["All", "Active", "Pending", "Blocked"];
  const query = state.vendorSearch.toLowerCase();
  const vendors = state.vendors.filter((vendor) => {
    const statusMatch = state.vendorFilter === "All" || vendor.status === state.vendorFilter;
    const text = `${vendor.name} ${vendor.gst} ${vendor.category} ${vendor.contact}`.toLowerCase();
    return statusMatch && text.includes(query);
  });
  return `
    <section class="view wide">
      <div class="section-head">
        <div>
          <h2>Vendors</h2>
          <p>Manage supplier profiles, registrations, GST details, categories, and verification status.</p>
        </div>
        <div class="actions">
          <button class="btn primary" type="button" data-toggle-vendor-form>${icon("plus")} Add Vendor</button>
        </div>
      </div>
      <div class="search-row">
        <div class="search-box">
          ${icon("search")}
          <input class="search-input" type="search" data-vendor-search value="${escapeHtml(state.vendorSearch)}" placeholder="Search by name, GST number, category, or contact">
        </div>
        <div class="filter-tabs">
          ${filters.map((filter) => `<button type="button" class="${filter === state.vendorFilter ? "active" : ""}" data-vendor-filter="${filter}">${filter} (${countVendors(filter)})</button>`).join("")}
        </div>
      </div>
      ${state.showVendorForm ? renderVendorForm() : ""}
      <section class="module">
        <div class="table-wrap">
          <table>
            <thead><tr><th>Vendor Name</th><th>Category</th><th>GST No.</th><th>Contact No.</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              ${vendors.map((vendor) => `
                <tr>
                  <td><strong>${escapeHtml(vendor.name)}</strong><br><span class="muted">${escapeHtml(vendor.email)}</span></td>
                  <td>${escapeHtml(vendor.category)}</td>
                  <td>${escapeHtml(vendor.gst)}</td>
                  <td>${escapeHtml(vendor.contact)}</td>
                  <td><span class="status ${statusClass(vendor.status)}">${escapeHtml(vendor.status)}</span></td>
                  <td><button class="btn slim" type="button" data-view="rfqs">${icon("eye")} View</button></td>
                </tr>
              `).join("") || `<tr><td colspan="6"><div class="empty">No vendors match the selected filter.</div></td></tr>`}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  `;
}

function countVendors(filter) {
  if (filter === "All") return state.vendors.length;
  return state.vendors.filter((vendor) => vendor.status === filter).length;
}

function renderVendorForm() {
  return `
    <section class="module vendor-form">
      <h3>Vendor Registration</h3>
      <div class="field-grid">
        <div class="field"><label for="vendorName">Vendor name</label><input id="vendorName" type="text" value="GreenGrid Systems"></div>
        <div class="field"><label for="vendorCategory">Category</label><input id="vendorCategory" type="text" value="Electrical"></div>
        <div class="field"><label for="vendorGst">GST number</label><input id="vendorGst" type="text" value="24AAGCG1212B1Z7"></div>
        <div class="field"><label for="vendorContact">Contact number</label><input id="vendorContact" type="tel" value="+91 90990 33445"></div>
        <div class="field"><label for="vendorEmail">Email</label><input id="vendorEmail" type="email" value="bid@greengrid.example"></div>
        <div class="field"><label for="vendorStatus">Status</label><select id="vendorStatus"><option>Pending</option><option>Active</option><option>Blocked</option></select></div>
      </div>
      <div class="actions">
        <button class="btn primary" type="button" data-add-vendor>${icon("approve")} Save Vendor</button>
        <button class="btn ghost" type="button" data-toggle-vendor-form>Cancel</button>
      </div>
    </section>
  `;
}

function renderRfqs() {
  const draft = state.rfqDraft;
  return `
    <section class="view wide">
      <div class="section-head">
        <div>
          <h2>Create RFQs</h2>
          <p>Initiate a request for quotation with line items, deadline, attachments, and assigned vendors.</p>
        </div>
      </div>
      <div class="stepper">
        <div class="step complete" data-step="1"><span>RFQ details</span></div>
        <div class="step active" data-step="2"><span>Line items</span></div>
        <div class="step" data-step="3"><span>Assign vendors</span></div>
      </div>
      <div class="split-form">
        <section class="module">
          <div class="field-grid">
            <div class="field full"><label for="rfqTitle">RFQ title</label><input id="rfqTitle" type="text" data-rfq-prop="title" value="${escapeHtml(draft.title)}"></div>
            <div class="field"><label for="rfqCategory">Category</label><input id="rfqCategory" type="text" data-rfq-prop="category" value="${escapeHtml(draft.category)}"></div>
            <div class="field"><label for="rfqDeadline">Deadline</label><input id="rfqDeadline" type="date" data-rfq-prop="deadline" value="${escapeHtml(draft.deadline)}"></div>
            <div class="field full"><label for="rfqDescription">Description</label><textarea id="rfqDescription" data-rfq-prop="description">${escapeHtml(draft.description)}</textarea></div>
          </div>
          <div class="module-title-row">
            <h3>Line items</h3>
            <button class="btn slim" type="button" data-add-rfq-line>${icon("plus")} Add line item</button>
          </div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Item</th><th>Qty</th><th>Unit</th><th></th></tr></thead>
              <tbody>
                ${draft.lineItems.map((line, index) => `
                  <tr>
                    <td><input class="table-input" data-rfq-line-index="${index}" data-rfq-line-field="item" value="${escapeHtml(line.item)}"></td>
                    <td><input class="table-input" type="number" min="1" data-rfq-line-index="${index}" data-rfq-line-field="qty" value="${escapeHtml(line.qty)}"></td>
                    <td><input class="table-input" data-rfq-line-index="${index}" data-rfq-line-field="unit" value="${escapeHtml(line.unit)}"></td>
                    <td><button class="btn slim ghost" type="button" data-remove-rfq-line="${index}" ${draft.lineItems.length === 1 ? "disabled" : ""}>${icon("x")}</button></td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
          <div class="actions">
            <button class="btn primary" type="button" data-save-rfq="Sent">${icon("send")} Save & Send to Vendors</button>
            <button class="btn" type="button" data-save-rfq="Draft">${icon("file")} Save as Draft</button>
          </div>
        </section>
        <aside class="module">
          <h3>Assign vendors</h3>
          <div class="vendor-checks">
            ${state.vendors.map((vendor) => `
              <label class="check-row">
                <input type="checkbox" data-rfq-vendor="${vendor.id}" ${draft.vendorIds.includes(vendor.id) ? "checked" : ""}>
                <span><strong>${escapeHtml(vendor.name)}</strong><br><span class="muted">${escapeHtml(vendor.category)} - ${escapeHtml(vendor.city)}</span></span>
                <span class="status ${statusClass(vendor.status)}">${escapeHtml(vendor.status)}</span>
              </label>
            `).join("")}
          </div>
          <h3 style="margin-top:18px">Attachments</h3>
          <label class="dropzone">
            <input type="file" multiple hidden>
            Drag & drop files or click to upload
          </label>
        </aside>
      </div>
    </section>
  `;
}

function renderQuotations() {
  return `
    <section class="view wide">
      <div class="section-head">
        <div>
          <h2>Quotations</h2>
          <p>Vendors submit quotations, while procurement compares prices, delivery timelines, ratings, and terms.</p>
        </div>
        <div class="segmented">
          <button class="${state.quoteTab === "submit" ? "active" : ""}" type="button" data-quote-tab="submit">Submit</button>
          <button class="${state.quoteTab === "compare" ? "active" : ""}" type="button" data-quote-tab="compare">Compare</button>
        </div>
      </div>
      ${state.quoteTab === "submit" ? renderQuotationSubmit() : renderComparison()}
    </section>
  `;
}

function renderQuotationSubmit() {
  ensureQuoteDraftRows();
  const draft = state.quoteDraft;
  const rfq = getRfq(draft.rfqId);
  const totals = quoteTotals(draft);
  return `
    <div class="quote-grid">
      <section class="module">
        <h3>RFQ summary</h3>
        <div class="field-grid single">
          <div class="field">
            <label for="quoteRfq">RFQ</label>
            <select id="quoteRfq" data-quote-prop="rfqId">
              ${state.rfqs.map((item) => `<option value="${item.id}" ${item.id === draft.rfqId ? "selected" : ""}>${escapeHtml(item.title)}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <label for="quoteVendor">Vendor</label>
            <select id="quoteVendor" data-quote-prop="vendorId">
              ${state.vendors.map((vendor) => `<option value="${vendor.id}" ${vendor.id === draft.vendorId ? "selected" : ""}>${escapeHtml(vendor.name)}</option>`).join("")}
            </select>
          </div>
          <div class="field"><label for="quoteDelivery">Delivery days</label><input id="quoteDelivery" type="number" min="1" data-quote-prop="delivery" value="${escapeHtml(draft.delivery)}"></div>
          <div class="field"><label for="quoteGst">GST %</label><input id="quoteGst" type="number" min="0" data-quote-prop="gst" value="${escapeHtml(draft.gst)}"></div>
          <div class="field"><label for="quotePayment">Payment terms</label><input id="quotePayment" type="text" data-quote-prop="payment" value="${escapeHtml(draft.payment)}"></div>
          <div class="field"><label for="quoteNotes">Notes / terms</label><textarea id="quoteNotes" data-quote-prop="notes">${escapeHtml(draft.notes)}</textarea></div>
        </div>
      </section>
      <section class="module">
        <h3>Your quotation</h3>
        <p class="muted">RFQ: ${escapeHtml(rfq.title)} - deadline ${formatDate(rfq.deadline)}</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Item</th><th>Qty</th><th>Unit price</th><th>Total</th></tr></thead>
            <tbody>
              ${draft.rows.map((row, index) => `
                <tr>
                  <td>${escapeHtml(row.item)}</td>
                  <td><input class="table-input" type="number" min="1" data-quote-row-index="${index}" data-quote-row-field="qty" value="${escapeHtml(row.qty)}"></td>
                  <td><input class="table-input" type="number" min="0" data-quote-row-index="${index}" data-quote-row-field="unitPrice" value="${escapeHtml(row.unitPrice)}"></td>
                  <td>${money(Number(row.qty || 0) * Number(row.unitPrice || 0))}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
        <div class="totals">
          <div><span>Subtotal</span><strong>${money(totals.subtotal)}</strong></div>
          <div><span>GST (${escapeHtml(draft.gst)}%)</span><strong>${money(totals.gstAmount)}</strong></div>
          <div><span>Grand total</span><strong>${money(totals.total)}</strong></div>
        </div>
        <div class="actions">
          <button class="btn primary" type="button" data-submit-quote>${icon("send")} Submit Quotation</button>
          <button class="btn" type="button" data-save-quote-draft>${icon("file")} Save Draft</button>
        </div>
      </section>
    </div>
  `;
}

function renderComparison() {
  const rfq = getRfq(state.quoteDraft.rfqId);
  const quotes = state.quotes.filter((quote) => quote.rfqId === rfq.id);
  if (!quotes.length) {
    return `<div class="empty">No quotations have been received for this RFQ yet.</div>`;
  }
  const lowest = quotes.reduce((best, quote) => quoteTotals(quote).total < quoteTotals(best).total ? quote : best, quotes[0]);
  return `
    <section class="module">
      <div class="module-title-row">
        <div>
          <h3>Quotation Comparison</h3>
          <p class="muted">RFQ: ${escapeHtml(rfq.title)} - ${quotes.length} quotations received</p>
        </div>
        <span class="status active">Green = lowest price</span>
      </div>
      <div class="grid-3">
        ${quotes.map((quote) => renderQuoteCard(quote, quote.id === lowest.id)).join("")}
      </div>
      <p class="muted">Selecting a vendor initiates the approval workflow.</p>
    </section>
  `;
}

function renderQuoteCard(quote, isLowest) {
  const vendor = getVendor(quote.vendorId);
  const totals = quoteTotals(quote);
  return `
    <article class="quote-card ${isLowest ? "lowest" : ""}">
      <div class="quote-card-header">
        <strong>${escapeHtml(vendor.name)}</strong>
        <span>${escapeHtml(vendor.category)} - rating ${escapeHtml(vendor.rating)}/5</span>
      </div>
      <div class="quote-metric"><span>Subtotal</span><strong>${money(totals.subtotal)}</strong></div>
      <div class="quote-metric"><span>GST</span><strong>${escapeHtml(quote.gst)}%</strong></div>
      <div class="quote-metric"><span>Grand total</span><strong>${money(totals.total)}</strong></div>
      <div class="quote-metric"><span>Delivery</span><strong>${escapeHtml(quote.delivery)} days</strong></div>
      <div class="quote-metric"><span>Payment</span><strong>${escapeHtml(quote.payment)}</strong></div>
      <div class="actions">
        <button class="btn ${isLowest ? "primary" : ""}" type="button" data-select-quote="${quote.id}">${isLowest ? icon("approve") : icon("send")} ${isLowest ? "Select & Approve" : "Select"}</button>
      </div>
    </article>
  `;
}

function renderApprovals() {
  const quote = getQuote(state.approval.quoteId);
  const vendor = getVendor(quote.vendorId);
  const totals = quoteTotals(quote);
  return `
    <section class="view wide">
      <div class="section-head">
        <div>
          <h2>Approval Workflow</h2>
          <p>RFQ: ${escapeHtml(getRfq(quote.rfqId).title)} - Vendor: ${escapeHtml(vendor.name)} - ${money(totals.total)}</p>
        </div>
        <span class="status ${statusClass(state.approval.status)}">${escapeHtml(state.approval.status)}</span>
      </div>
      <div class="approval-layout">
        <section class="module">
          <h3>Approval chain</h3>
          <div class="timeline">
            ${state.approval.levels.map((level, index) => `
              <div class="timeline-item ${escapeHtml(level.status)}">
                <div class="timeline-dot">${index + 1}</div>
                <div class="timeline-copy">
                  <strong>${escapeHtml(level.name)}</strong>
                  <span>${escapeHtml(level.owner)}<br>${escapeHtml(level.date)}</span>
                </div>
              </div>
            `).join("")}
          </div>
          <div class="field" style="margin-top:18px">
            <label for="approvalRemarks">Approval remarks</label>
            <textarea id="approvalRemarks" data-approval-remarks placeholder="Add your comments or conditions">${escapeHtml(state.approval.remarks)}</textarea>
          </div>
          <div class="actions">
            <button class="btn primary" type="button" data-approve>${icon("approve")} Approve</button>
            <button class="btn danger" type="button" data-reject>${icon("x")} Reject</button>
          </div>
        </section>
        <aside class="module">
          <h3>Quotation summary</h3>
          <div class="quote-metric"><span>Vendor</span><strong>${escapeHtml(vendor.name)}</strong></div>
          <div class="quote-metric"><span>Total</span><strong>${money(totals.total)}</strong></div>
          <div class="quote-metric"><span>Delivery</span><strong>${escapeHtml(quote.delivery)} days</strong></div>
          <div class="quote-metric"><span>Rating</span><strong>${escapeHtml(vendor.rating)}/5</strong></div>
          <div class="note" style="margin-top:14px">Approvals move the workflow into purchase order and invoice generation. Rejections preserve an immutable audit event.</div>
        </aside>
      </div>
    </section>
  `;
}

function renderDocuments() {
  const quote = getQuote(state.approval.quoteId);
  const vendor = getVendor(quote.vendorId);
  const totals = quoteTotals(quote);
  const showingInvoice = state.view === "invoices";
  const title = showingInvoice ? "Purchase Order & Invoice" : "Purchase Order";
  return `
    <section class="view wide">
      <div class="section-head">
        <div>
          <h2>${title}</h2>
          <p>${escapeHtml(state.purchaseOrder.number)} auto-generated after approval.</p>
        </div>
        <div class="actions">
          <button class="btn" type="button" data-download-invoice>${icon("download")} Download PDF</button>
          <button class="btn" type="button" data-print>${icon("print")} Print</button>
          <button class="btn" type="button" data-email-invoice>${icon("mail")} Email invoice</button>
        </div>
      </div>
      <article class="doc">
        <div class="doc-head">
          <div>
            <h3>${showingInvoice ? escapeHtml(state.invoice.number) : escapeHtml(state.purchaseOrder.number)}</h3>
            <p class="muted">${showingInvoice ? "Invoice generated from purchase order" : "Approved procurement order"}</p>
          </div>
          <span class="status ${statusClass(state.invoice.status)}">${escapeHtml(state.invoice.status)}</span>
        </div>
        <div class="doc-meta">
          <div class="address-box">
            <strong>Bill to</strong>
            <span>Your Organization Name<br>123 Business Park, Ahmedabad<br>GSTIN: 25383438AFB</span>
          </div>
          <div class="address-box">
            <strong>Vendor</strong>
            <span>${escapeHtml(vendor.name)}<br>${escapeHtml(vendor.city)} industrial estate<br>GSTIN: ${escapeHtml(vendor.gst)}</span>
          </div>
          <div class="address-box">
            <strong>PO details</strong>
            <span>PO Number: ${escapeHtml(state.purchaseOrder.number)}<br>PO Date: ${formatDate(state.purchaseOrder.date)}</span>
          </div>
          <div class="address-box">
            <strong>Invoice details</strong>
            <span>Invoice Date: ${formatDate(state.invoice.date)}<br>Due Date: ${formatDate(state.invoice.dueDate)}</span>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Item</th><th>Qty</th><th>Unit price</th><th>Total</th></tr></thead>
            <tbody>
              ${quote.rows.map((row) => `
                <tr>
                  <td>${escapeHtml(row.item)}</td>
                  <td>${escapeHtml(row.qty)}</td>
                  <td>${money(row.unitPrice)}</td>
                  <td>${money(Number(row.qty) * Number(row.unitPrice))}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
        <div class="totals">
          <div><span>Subtotal</span><strong>${money(totals.subtotal)}</strong></div>
          <div><span>CGST (9%)</span><strong>${money(Math.round(totals.gstAmount / 2))}</strong></div>
          <div><span>SGST (9%)</span><strong>${money(Math.round(totals.gstAmount / 2))}</strong></div>
          <div><span>Grand total</span><strong>${money(totals.total)}</strong></div>
        </div>
        <div class="actions">
          <span class="status ${statusClass(state.invoice.status)}">Status: ${escapeHtml(state.invoice.status)}</span>
          <button class="btn primary" type="button" data-mark-paid>${icon("approve")} Mark as Paid</button>
        </div>
      </article>
    </section>
  `;
}

function renderActivity() {
  const filters = ["All", "RFQ", "Approvals", "Invoices", "Vendors"];
  const logs = state.logs.filter((log) => state.logFilter === "All" || log.type === state.logFilter);
  return `
    <section class="view wide">
      <div class="section-head">
        <div>
          <h2>Activity & Logs</h2>
          <p>Procurement audit trail with immutable, write-once entries.</p>
        </div>
        <div class="filter-tabs">
          ${filters.map((filter) => `<button type="button" class="${filter === state.logFilter ? "active" : ""}" data-log-filter="${filter}">${filter}</button>`).join("")}
        </div>
      </div>
      <div class="grid-2">
        <section class="module">
          <div class="log-list">
            ${logs.map((log) => `
              <article class="log-item">
                <div class="log-icon">${icon(logIcon(log.type))}</div>
                <div class="log-copy">
                  <strong>${escapeHtml(log.title)}</strong>
                  <span>${escapeHtml(log.detail)}</span>
                </div>
                <time class="log-date">${formatLogTime(log.at)}</time>
              </article>
            `).join("")}
          </div>
        </section>
        <aside class="note">Audit logs are immutable. The schema in this project stores activity records without update/delete fields or soft-delete flags.</aside>
      </div>
    </section>
  `;
}

function logIcon(type) {
  return {
    RFQ: "send",
    Approvals: "approve",
    Invoices: "file",
    Vendors: "users"
  }[type] || "activity";
}

function formatLogTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function renderReports() {
  const quote = getQuote(state.approval.quoteId);
  const activeVendors = state.vendors.filter((vendor) => vendor.status === "Active").length;
  const totalSpend = state.report.categories.reduce((sum, item) => sum + item.value, 0);
  const categoryMax = Math.max(...state.report.categories.map((item) => item.value), 1);
  return `
    <section class="view wide">
      <div class="section-head">
        <div>
          <h2>Reports & Analytics</h2>
          <p>Procurement insights for May 2025.</p>
        </div>
        <div class="actions">
          <button class="btn" type="button" data-export-report>${icon("download")} Export</button>
        </div>
      </div>
      <div class="kpi-grid">
        ${kpi(money(totalSpend), "Total spend", "Across four categories")}
        ${kpi(String(activeVendors), "Active vendors", "Verified supplier base")}
        ${kpi("94%", "PO fulfillment", "On-time completion")}
        ${kpi("3", "Overdue invoices", "Finance follow-up")}
      </div>
      <div class="report-grid">
        <section class="module">
          <h3>Spend by category</h3>
          <div class="bars">
            ${state.report.categories.map((item) => `
              <div class="bar-row">
                <strong>${escapeHtml(item.name)}</strong>
                <div class="bar-track"><div class="bar-fill" style="width:${Math.round(item.value / categoryMax * 100)}%"></div></div>
                <span>${money(item.value)}</span>
              </div>
            `).join("")}
          </div>
        </section>
        <section class="module">
          <h3>Top vendors by spend</h3>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Vendor</th><th>Spend</th><th>POs</th></tr></thead>
              <tbody>
                <tr><td>${escapeHtml(getVendor(quote.vendorId).name)}</td><td>${money(420000)}</td><td>6</td></tr>
                <tr><td>Infra Supplies</td><td>${money(310000)}</td><td>4</td></tr>
                <tr><td>FastLog</td><td>${money(190000)}</td><td>3</td></tr>
              </tbody>
            </table>
          </div>
          <h3 style="margin-top:18px">Monthly trend</h3>
          ${renderMiniChart(state.report.monthlySpend)}
        </section>
      </div>
    </section>
  `;
}

function setAuthMessage(message) {
  state.auth.message = message;
  render();
}

function handleClick(event) {
  const authMode = event.target.closest("[data-auth-mode]");
  if (authMode) {
    state.auth.mode = authMode.dataset.authMode;
    state.auth.message = "";
    render();
    return;
  }

  if (event.target.closest("[data-login]")) {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const role = document.getElementById("loginRole").value;
    if (!email.includes("@") || password.length < 6) {
      setAuthMessage("Enter a valid email and a password of at least 6 characters.");
      return;
    }
    state.auth = {
      signedIn: true,
      mode: "login",
      message: "",
      user: { name: role, email, role }
    };
    state.view = "dashboard";
    addLog("Activity", "Session started", `${role} signed in securely.`);
    render();
    return;
  }

  if (event.target.closest("[data-register]")) {
    const first = document.getElementById("regFirst").value.trim();
    const last = document.getElementById("regLast").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const role = document.getElementById("regRole").value;
    if (!first || !last || !email.includes("@")) {
      setAuthMessage("First name, last name, and a valid email are required.");
      return;
    }
    state.auth = {
      signedIn: true,
      mode: "register",
      message: "",
      user: { name: `${first} ${last}`, email, role }
    };
    addLog("Activity", "User registered", `${first} ${last} registered as ${role}.`);
    render();
    return;
  }

  if (event.target.closest("[data-forgot]")) {
    setAuthMessage("Password reset link prepared for the entered email.");
    return;
  }

  if (event.target.closest("[data-logout]")) {
    state.auth.signedIn = false;
    state.auth.message = "";
    render();
    return;
  }

  const navButton = event.target.closest("[data-view]");
  if (navButton) {
    state.view = navButton.dataset.view;
    if (state.view === "quotations") state.quoteTab = state.quoteTab || "submit";
    render();
    return;
  }

  const vendorFilter = event.target.closest("[data-vendor-filter]");
  if (vendorFilter) {
    state.vendorFilter = vendorFilter.dataset.vendorFilter;
    render();
    return;
  }

  if (event.target.closest("[data-toggle-vendor-form]")) {
    state.showVendorForm = !state.showVendorForm;
    render();
    return;
  }

  if (event.target.closest("[data-add-vendor]")) {
    addVendor();
    return;
  }

  if (event.target.closest("[data-add-rfq-line]")) {
    state.rfqDraft.lineItems.push({ item: "New item", qty: 1, unit: "NOS" });
    render();
    return;
  }

  const removeLine = event.target.closest("[data-remove-rfq-line]");
  if (removeLine) {
    const index = Number(removeLine.dataset.removeRfqLine);
    state.rfqDraft.lineItems.splice(index, 1);
    render();
    return;
  }

  const saveRfq = event.target.closest("[data-save-rfq]");
  if (saveRfq) {
    saveRfqDraft(saveRfq.dataset.saveRfq);
    return;
  }

  const quoteTab = event.target.closest("[data-quote-tab]");
  if (quoteTab) {
    state.quoteTab = quoteTab.dataset.quoteTab;
    render();
    return;
  }

  if (event.target.closest("[data-submit-quote]")) {
    submitQuote("Submitted");
    return;
  }

  if (event.target.closest("[data-save-quote-draft]")) {
    submitQuote("Draft");
    return;
  }

  const selectedQuote = event.target.closest("[data-select-quote]");
  if (selectedQuote) {
    state.approval.quoteId = selectedQuote.dataset.selectQuote;
    state.approval.rfqId = getQuote(state.approval.quoteId).rfqId;
    state.approval.status = "Awaiting L2 approval";
    state.approval.levels[2].status = "wait";
    state.approval.levels[3].status = "todo";
    addLog("Approvals", "Quotation selected", `${getVendor(getQuote(state.approval.quoteId).vendorId).name} selected for approval workflow.`);
    state.view = "approvals";
    render();
    return;
  }

  if (event.target.closest("[data-approve]")) {
    approveWorkflow();
    return;
  }

  if (event.target.closest("[data-reject]")) {
    rejectWorkflow();
    return;
  }

  if (event.target.closest("[data-download-invoice]")) {
    downloadInvoicePdf();
    return;
  }

  if (event.target.closest("[data-print]")) {
    window.print();
    return;
  }

  if (event.target.closest("[data-email-invoice]")) {
    emailInvoice();
    return;
  }

  if (event.target.closest("[data-mark-paid]")) {
    state.invoice.status = "Paid";
    state.purchaseOrder.status = "Paid";
    addLog("Invoices", "Invoice paid", `${state.invoice.number} marked as paid.`);
    render();
    return;
  }

  const logFilter = event.target.closest("[data-log-filter]");
  if (logFilter) {
    state.logFilter = logFilter.dataset.logFilter;
    render();
    return;
  }

  if (event.target.closest("[data-export-report]")) {
    exportReportCsv();
  }
}

function handleInput(event) {
  const target = event.target;
  if (target.matches("[data-vendor-search]")) {
    state.vendorSearch = target.value;
    render();
    const input = document.querySelector("[data-vendor-search]");
    if (input) {
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    }
    return;
  }

  if (target.matches("[data-rfq-prop]")) {
    state.rfqDraft[target.dataset.rfqProp] = target.value;
    return;
  }

  if (target.matches("[data-rfq-line-field]")) {
    const index = Number(target.dataset.rfqLineIndex);
    const field = target.dataset.rfqLineField;
    state.rfqDraft.lineItems[index][field] = field === "qty" ? Number(target.value) : target.value;
    return;
  }

  if (target.matches("[data-quote-prop]")) {
    updateQuoteDraftProp(target);
    return;
  }

  if (target.matches("[data-quote-row-field]")) {
    const index = Number(target.dataset.quoteRowIndex);
    const field = target.dataset.quoteRowField;
    state.quoteDraft.rows[index][field] = Number(target.value);
    return;
  }

  if (target.matches("[data-approval-remarks]")) {
    state.approval.remarks = target.value;
  }
}

function handleChange(event) {
  const target = event.target;
  if (target.matches("[data-role-select]")) {
    state.auth.user.role = target.value;
    state.auth.user.name = target.value;
    addLog("Activity", "Role switched", `Session role switched to ${target.value}.`);
    render();
    return;
  }

  if (target.matches("[data-quote-prop]")) {
    updateQuoteDraftProp(target);
    return;
  }

  if (target.matches("[data-rfq-vendor]")) {
    const vendorId = target.dataset.rfqVendor;
    const assigned = new Set(state.rfqDraft.vendorIds);
    if (target.checked) assigned.add(vendorId);
    else assigned.delete(vendorId);
    state.rfqDraft.vendorIds = [...assigned];
  }
}

function updateQuoteDraftProp(target) {
  const prop = target.dataset.quoteProp;
  state.quoteDraft[prop] = ["delivery", "gst"].includes(prop) ? Number(target.value) : target.value;
  if (prop === "rfqId") {
    state.quoteDraft.rows = null;
    ensureQuoteDraftRows();
    render();
  }
}

function addVendor() {
  const name = document.getElementById("vendorName").value.trim();
  const category = document.getElementById("vendorCategory").value.trim();
  const gst = document.getElementById("vendorGst").value.trim();
  const contact = document.getElementById("vendorContact").value.trim();
  const email = document.getElementById("vendorEmail").value.trim();
  const status = document.getElementById("vendorStatus").value;
  if (!name || !category || !gst || !contact || !email.includes("@")) {
    return;
  }
  state.vendors.unshift({
    id: id("vendor"),
    name,
    category,
    gst,
    contact,
    email,
    city: "Ahmedabad",
    rating: 4.1,
    status
  });
  state.showVendorForm = false;
  state.vendorFilter = "All";
  addLog("Vendors", "Vendor added", `${name} registered with ${status.toLowerCase()} status.`);
  render();
}

function saveRfqDraft(status) {
  const draft = state.rfqDraft;
  if (!draft.title.trim() || !draft.category.trim() || !draft.deadline || !draft.vendorIds.length) {
    return;
  }
  const newRfq = {
    id: id("rfq"),
    title: draft.title.trim(),
    category: draft.category.trim(),
    deadline: draft.deadline,
    description: draft.description.trim(),
    vendorIds: [...draft.vendorIds],
    status,
    createdAt: new Date().toISOString().slice(0, 10),
    lineItems: draft.lineItems.map((line) => ({
      item: line.item.trim(),
      qty: Number(line.qty || 1),
      unit: line.unit.trim() || "NOS"
    })),
    attachments: status === "Draft" ? [] : ["uploaded-specification.pdf"]
  };
  state.rfqs.unshift(newRfq);
  state.quoteDraft.rfqId = newRfq.id;
  state.quoteDraft.rows = null;
  addLog("RFQ", status === "Draft" ? "RFQ saved as draft" : "RFQ published", `${newRfq.title} ${status === "Draft" ? "saved internally" : `sent to ${newRfq.vendorIds.length} vendors`}.`);
  state.view = "dashboard";
  render();
}

function submitQuote(status) {
  ensureQuoteDraftRows();
  const draft = state.quoteDraft;
  const existingIndex = state.quotes.findIndex((quote) => quote.rfqId === draft.rfqId && quote.vendorId === draft.vendorId);
  const quote = {
    id: existingIndex >= 0 ? state.quotes[existingIndex].id : id("quote"),
    rfqId: draft.rfqId,
    vendorId: draft.vendorId,
    gst: Number(draft.gst || 0),
    delivery: Number(draft.delivery || 1),
    payment: draft.payment || "30 days",
    status,
    notes: draft.notes || "",
    rows: draft.rows.map((row) => ({
      item: row.item,
      qty: Number(row.qty || 1),
      unitPrice: Number(row.unitPrice || 0)
    }))
  };
  if (existingIndex >= 0) state.quotes.splice(existingIndex, 1, quote);
  else state.quotes.unshift(quote);
  addLog("RFQ", status === "Draft" ? "Quotation draft saved" : "Quotation submitted", `${getVendor(quote.vendorId).name} updated quotation for ${getRfq(quote.rfqId).title}.`);
  state.quoteTab = "compare";
  render();
}

function approveWorkflow() {
  state.approval.status = "Approved";
  state.approval.levels[2].status = "done";
  state.approval.levels[2].date = new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
  state.approval.levels[3].status = "done";
  state.purchaseOrder.status = "Approved";
  state.invoice.status = "Pending Payment";
  addLog("Approvals", "Approval completed", `${state.purchaseOrder.number} approved and invoice ${state.invoice.number} generated.`);
  state.view = "purchaseOrders";
  render();
}

function rejectWorkflow() {
  state.approval.status = "Rejected";
  state.approval.levels[2].status = "todo";
  addLog("Approvals", "Approval rejected", `${getVendor(getQuote(state.approval.quoteId).vendorId).name} quotation rejected. Remarks: ${state.approval.remarks || "No remarks"}.`);
  render();
}

function downloadInvoicePdf() {
  const quote = getQuote(state.approval.quoteId);
  const vendor = getVendor(quote.vendorId);
  const totals = quoteTotals(quote);
  const lines = [
    "VendorBridge Invoice",
    `Invoice: ${state.invoice.number}`,
    `PO: ${state.purchaseOrder.number}`,
    `Vendor: ${vendor.name}`,
    `Invoice Date: ${formatDate(state.invoice.date)}`,
    `Due Date: ${formatDate(state.invoice.dueDate)}`,
    "",
    ...quote.rows.map((row) => `${row.item} | Qty ${row.qty} | Unit ${money(row.unitPrice)} | Total ${money(Number(row.qty) * Number(row.unitPrice))}`),
    "",
    `Subtotal: ${money(totals.subtotal)}`,
    `GST: ${money(totals.gstAmount)}`,
    `Grand total: ${money(totals.total)}`,
    `Status: ${state.invoice.status}`
  ];
  const blob = new Blob([makePdf(lines)], { type: "application/pdf" });
  downloadBlob(blob, `${state.invoice.number}.pdf`);
  addLog("Invoices", "Invoice downloaded", `${state.invoice.number} exported as PDF.`);
  saveState();
}

function makePdf(lines) {
  const escapePdf = (text) => String(text).replace(/[\\()]/g, "\\$&");
  const content = [
    "BT",
    "/F1 12 Tf",
    "50 790 Td",
    ...lines.flatMap((line, index) => {
      const move = index === 0 ? [] : ["0 -18 Td"];
      return [...move, `(${escapePdf(line)}) Tj`];
    }),
    "ET"
  ].join("\n");
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return pdf;
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function emailInvoice() {
  const quote = getQuote(state.approval.quoteId);
  const vendor = getVendor(quote.vendorId);
  const totals = quoteTotals(quote);
  const subject = encodeURIComponent(`${state.invoice.number} from VendorBridge`);
  const body = encodeURIComponent(`Hello ${vendor.name},\n\nPlease find invoice ${state.invoice.number} for ${money(totals.total)}.\n\nRegards,\nVendorBridge`);
  window.location.href = `mailto:${vendor.email}?subject=${subject}&body=${body}`;
  addLog("Invoices", "Invoice email prepared", `${state.invoice.number} prepared for ${vendor.email}.`);
  saveState();
}

function exportReportCsv() {
  const rows = [
    ["Category", "Spend"],
    ...state.report.categories.map((item) => [item.name, item.value])
  ];
  const csv = rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
  downloadBlob(new Blob([csv], { type: "text/csv" }), "vendorbridge-report-may-2025.csv");
  addLog("Activity", "Report exported", "May 2025 procurement report exported.");
  saveState();
}

app.addEventListener("click", handleClick);
app.addEventListener("input", handleInput);
app.addEventListener("change", handleChange);

render();
