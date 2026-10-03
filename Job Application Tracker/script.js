/**
 * CAREERTRACK — JOB APPLICATION TRACKER
 * Complete ES6+ Vanilla JavaScript Engine
 */

// Global Application State Singleton
const AppState = {
    applications: [],
    theme: 'light',
    viewMode: 'cards', // 'cards' | 'table'
    searchQuery: '',
    filters: {
        status: '',
        jobType: '',
        workMode: '',
        source: '',
        priorityOnly: false
    },
    sortOption: 'newest',
    selectedAppIds: [],
    lastDeletedApp: null,
    undoTimeoutId: null,
    charts: {}
};

// Realistic Demo Initial Data
const DEMO_APPLICATIONS = [
    {
        id: "demo-app-1",
        company: "Google",
        jobTitle: "Software Engineer",
        location: "Hyderabad, India",
        jobType: "Full Time",
        workMode: "Hybrid",
        status: "Interview",
        applicationDate: "2026-10-02",
        source: "LinkedIn",
        salaryMin: 1800000,
        salaryMax: 2400000,
        currency: "INR",
        jobUrl: "https://careers.google.com",
        recruiter: { name: "Sarah Jenkins", email: "sjenkins@google.com", phone: "+91 9876543210", linkedin: "" },
        interview: { scheduled: true, date: "2026-10-08", time: "10:30", type: "Technical", meetingLink: "https://meet.google.com/abc-defg-hij" },
        followUp: { date: "2026-10-09", reminder: true, notes: "Send thank you email post interview" },
        notes: "Focus on Data Structures, System Design, and Algorithms.",
        priority: true,
        timeline: [
            { date: "2026-10-02", title: "Application Submitted" },
            { date: "2026-10-04", title: "Recruiter Screen Call Completed" },
            { date: "2026-10-08", title: "Technical Round Scheduled" }
        ]
    },
    {
        id: "demo-app-2",
        company: "Microsoft",
        jobTitle: "Frontend Developer",
        location: "Bengaluru, India",
        jobType: "Full Time",
        workMode: "Remote",
        status: "Applied",
        applicationDate: "2026-09-28",
        source: "Company Website",
        salaryMin: 1600000,
        salaryMax: 2000000,
        currency: "INR",
        jobUrl: "https://careers.microsoft.com",
        recruiter: { name: "", email: "", phone: "", linkedin: "" },
        interview: { scheduled: false, date: "", time: "", type: "Technical", meetingLink: "" },
        followUp: { date: "2026-10-05", reminder: true, notes: "Check status on career portal" },
        notes: "Referred by CSE Alumni.",
        priority: false,
        timeline: [{ date: "2026-09-28", title: "Application Submitted" }]
    },
    {
        id: "demo-app-3",
        company: "TCS",
        jobTitle: "Systems Engineer",
        location: "Pune, India",
        jobType: "Full Time",
        workMode: "On-site",
        status: "Offer",
        applicationDate: "2026-09-10",
        source: "College/University",
        salaryMin: 700000,
        salaryMax: 900000,
        currency: "INR",
        jobUrl: "",
        recruiter: { name: "Rajesh Kumar", email: "rkumar@tcs.com", phone: "", linkedin: "" },
        interview: { scheduled: false, date: "", time: "", type: "HR", meetingLink: "" },
        followUp: { date: "", reminder: false, notes: "" },
        notes: "Offer letter received. Decision pending.",
        priority: true,
        timeline: [
            { date: "2026-09-10", title: "Campus Placement Applied" },
            { date: "2026-09-18", title: "Aptitude & Technical Test" },
            { date: "2026-09-25", title: "HR Interview Completed" },
            { date: "2026-10-01", title: "Official Offer Letter Received" }
        ]
    },
    {
        id: "demo-app-4",
        company: "Infosys",
        jobTitle: "Specialist Programmer",
        location: "Mysore, India",
        jobType: "Full Time",
        workMode: "Hybrid",
        status: "Rejected",
        applicationDate: "2026-08-15",
        source: "Indeed",
        salaryMin: 950000,
        salaryMax: 950000,
        currency: "INR",
        jobUrl: "",
        recruiter: { name: "", email: "", phone: "", linkedin: "" },
        interview: { scheduled: false, date: "", time: "", type: "Technical", meetingLink: "" },
        followUp: { date: "", reminder: false, notes: "" },
        notes: "Role filled internally.",
        priority: false,
        timeline: [
            { date: "2026-08-15", title: "Application Submitted" },
            { date: "2026-08-30", title: "Application Declined" }
        ]
    }
];

// Initialize Application Engine
document.addEventListener("DOMContentLoaded", () => {
    initializeApp();
});

function initializeApp() {
    loadData();
    setupEventListeners();
    applyTheme(AppState.theme);
    renderAllViews();
    checkNotifications();
}

// Data Persistence (LocalStorage Layer)
function loadData() {
    const storedApps = localStorage.getItem("careertrack_applications");
    const storedTheme = localStorage.getItem("careertrack_theme");
    const storedView = localStorage.getItem("careertrack_view");

    AppState.applications = storedApps ? JSON.parse(storedApps) : DEMO_APPLICATIONS;
    AppState.theme = storedTheme || "light";
    AppState.viewMode = storedView || "cards";
}

function saveData() {
    localStorage.setItem("careertrack_applications", JSON.stringify(AppState.applications));
    localStorage.setItem("careertrack_theme", AppState.theme);
    localStorage.setItem("careertrack_view", AppState.viewMode);
}

// Event Listeners Setup
function setupEventListeners() {
    // Navigation Tabs
    document.querySelectorAll(".nav-item").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const tabName = e.currentTarget.getAttribute("data-tab");
            switchTab(tabName);
        });
    });

    document.querySelectorAll(".nav-link-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const tabName = e.currentTarget.getAttribute("data-tab");
            switchTab(tabName);
        });
    });

    // Mobile Navigation Drawer Toggle
    document.getElementById("mobile-toggle-btn")?.addEventListener("click", () => {
        document.getElementById("sidebar").classList.add("open");
    });
    document.getElementById("mobile-close-btn")?.addEventListener("click", () => {
        document.getElementById("sidebar").classList.remove("open");
    });

    // Theme Toggle
    document.getElementById("theme-toggle-btn")?.addEventListener("click", toggleTheme);
    document.getElementById("set-theme-light")?.addEventListener("click", () => setTheme('light'));
    document.getElementById("set-theme-dark")?.addEventListener("click", () => setTheme('dark'));

    // Application View Controls
    document.getElementById("view-cards-btn")?.addEventListener("click", () => setViewMode('cards'));
    document.getElementById("view-table-btn")?.addEventListener("click", () => setViewMode('table'));
    document.getElementById("set-view-cards")?.addEventListener("click", () => setViewMode('cards'));
    document.getElementById("set-view-table")?.addEventListener("click", () => setViewMode('table'));

    // Expandable Filters
    document.getElementById("toggle-filters-btn")?.addEventListener("click", () => {
        document.getElementById("filter-panel").classList.toggle("hidden");
    });

    // Global & App Search
    document.getElementById("global-search-input")?.addEventListener("input", (e) => {
        AppState.searchQuery = e.target.value.toLowerCase();
        if (document.querySelector(".view-section.active").id !== "view-applications") {
            switchTab("applications");
        }
        renderApplicationsView();
    });

    document.getElementById("app-search-input")?.addEventListener("input", (e) => {
        AppState.searchQuery = e.target.value.toLowerCase();
        renderApplicationsView();
    });

    // Filtering & Sorting Controls
    document.getElementById("app-sort-select")?.addEventListener("change", (e) => {
        AppState.sortOption = e.target.value;
        renderApplicationsView();
    });

    document.getElementById("filter-status")?.addEventListener("change", handleFilterChange);
    document.getElementById("filter-jobtype")?.addEventListener("change", handleFilterChange);
    document.getElementById("filter-workmode")?.addEventListener("change", handleFilterChange);
    document.getElementById("filter-source")?.addEventListener("change", handleFilterChange);
    document.getElementById("filter-priority-only")?.addEventListener("change", handleFilterChange);
    document.getElementById("clear-filters-btn")?.addEventListener("click", clearFilters);

    // Add Application Modal Triggers
    document.querySelectorAll(".open-add-modal-btn").forEach(btn => {
        btn.addEventListener("click", () => openApplicationFormModal());
    });
    document.getElementById("close-app-modal")?.addEventListener("click", () => closeModal("app-modal"));
    document.getElementById("cancel-app-modal")?.addEventListener("click", () => closeModal("app-modal"));

    // Form Submission
    document.getElementById("app-form")?.addEventListener("submit", handleFormSubmit);

    // Application Details Modal Triggers
    document.getElementById("close-details-modal")?.addEventListener("click", () => closeModal("details-modal"));
    document.getElementById("close-confirm-modal")?.addEventListener("click", () => closeModal("confirm-modal"));
    document.getElementById("confirm-cancel-btn")?.addEventListener("click", () => closeModal("confirm-modal"));

    // Settings & Data Management
    document.getElementById("load-demo-btn")?.addEventListener("click", loadDemoData);
    document.getElementById("clear-data-btn")?.addEventListener("click", () => {
        openConfirmModal("Clear All Data?", "Are you sure you want to permanently erase all stored application records?", clearAllData);
    });

    document.getElementById("export-json-btn")?.addEventListener("click", exportJSON);
    document.getElementById("export-csv-btn")?.addEventListener("click", exportCSV);
    document.getElementById("trigger-import-btn")?.addEventListener("click", () => {
        document.getElementById("import-file-input").click();
    });
    document.getElementById("import-file-input")?.addEventListener("change", importJSON);

    // Notifications Dropdown Toggle
    document.getElementById("notification-btn")?.addEventListener("click", (e) => {
        e.stopPropagation();
        document.getElementById("notification-dropdown").classList.toggle("hidden");
    });
    document.addEventListener("click", () => {
        document.getElementById("notification-dropdown")?.classList.add("hidden");
    });
    document.getElementById("clear-notifs-btn")?.addEventListener("click", () => {
        document.getElementById("notification-list").innerHTML = '<div class="notification-item">No notifications</div>';
        document.getElementById("notification-badge").classList.add("hidden");
    });

    // Select All Checkbox for Bulk Actions
    document.getElementById("select-all-checkbox")?.addEventListener("change", (e) => {
        const checkboxes = document.querySelectorAll(".app-select-checkbox");
        checkboxes.forEach(cb => {
            cb.checked = e.target.checked;
            handleBulkSelect(cb.value, e.target.checked);
        });
    });

    document.getElementById("bulk-delete-btn")?.addEventListener("click", () => {
        openConfirmModal("Delete Selected?", `Are you sure you want to delete ${AppState.selectedAppIds.length} applications?`, bulkDelete);
    });
    document.getElementById("bulk-export-btn")?.addEventListener("click", bulkExportJSON);
}

// Tab View Switcher
function switchTab(tabName) {
    document.querySelectorAll(".nav-item").forEach(btn => {
        btn.classList.toggle("active", btn.getAttribute("data-tab") === tabName);
    });

    document.querySelectorAll(".view-section").forEach(sec => {
        sec.classList.remove("active");
    });

    const activeSection = document.getElementById(`view-${tabName}`);
    if (activeSection) {
        activeSection.classList.add("active");
    }

    // Dynamic Title Update
    const titles = {
        dashboard: ["Dashboard", "Organize your applications. Track your progress. Build your career."],
        applications: ["Applications", "Manage, search, and organize all submitted job applications."],
        interviews: ["Interviews", "Track upcoming technical and HR interview rounds."],
        companies: ["Companies", "Aggregated view of all target organization applications."],
        analytics: ["Analytics", "Comprehensive statistics and career performance insights."],
        settings: ["Settings", "Manage preferences, imports, exports, and workspace data."]
    };

    if (titles[tabName]) {
        document.getElementById("page-title").textContent = titles[tabName][0];
        document.getElementById("page-subtitle").textContent = titles[tabName][1];
    }

    document.getElementById("sidebar").classList.remove("open");
    renderAllViews();
}

// Theme Handlers
function toggleTheme() {
    AppState.theme = AppState.theme === "light" ? "dark" : "light";
    applyTheme(AppState.theme);
    saveData();
}

function setTheme(theme) {
    AppState.theme = theme;
    applyTheme(theme);
    saveData();
}

function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const themeIcon = document.getElementById("theme-icon");
    if (themeIcon) {
        themeIcon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
    }
    
    document.getElementById("set-theme-light")?.classList.toggle("active", theme === "light");
    document.getElementById("set-theme-dark")?.classList.toggle("active", theme === "dark");

    // Re-render charts for dark mode text compatibility
    renderCharts();
}

function setViewMode(mode) {
    AppState.viewMode = mode;
    saveData();
    renderApplicationsView();
}

// Filtering Logic
function handleFilterChange() {
    AppState.filters.status = document.getElementById("filter-status").value;
    AppState.filters.jobType = document.getElementById("filter-jobtype").value;
    AppState.filters.workMode = document.getElementById("filter-workmode").value;
    AppState.filters.source = document.getElementById("filter-source").value;
    AppState.filters.priorityOnly = document.getElementById("filter-priority-only").checked;
    renderApplicationsView();
}

function clearFilters() {
    document.getElementById("filter-status").value = "";
    document.getElementById("filter-jobtype").value = "";
    document.getElementById("filter-workmode").value = "";
    document.getElementById("filter-source").value = "";
    document.getElementById("filter-priority-only").checked = false;
    AppState.filters = { status: "", jobType: "", workMode: "", source: "", priorityOnly: false };
    renderApplicationsView();
}

// Application Filtering & Sorting Processing Pipeline
function getFilteredApplications() {
    return AppState.applications.filter(app => {
        // Search Query
        if (AppState.searchQuery) {
            const q = AppState.searchQuery;
            const matchCompany = app.company.toLowerCase().includes(q);
            const matchRole = app.jobTitle.toLowerCase().includes(q);
            const matchNotes = (app.notes || "").toLowerCase().includes(q);
            const matchLoc = (app.location || "").toLowerCase().includes(q);
            if (!matchCompany && !matchRole && !matchNotes && !matchLoc) return false;
        }

        // Filters
        if (AppState.filters.status && app.status !== AppState.filters.status) return false;
        if (AppState.filters.jobType && app.jobType !== AppState.filters.jobType) return false;
        if (AppState.filters.workMode && app.workMode !== AppState.filters.workMode) return false;
        if (AppState.filters.source && app.source !== AppState.filters.source) return false;
        if (AppState.filters.priorityOnly && !app.priority) return false;

        return true;
    }).sort((a, b) => {
        switch (AppState.sortOption) {
            case "oldest":
                return new Date(a.applicationDate) - new Date(b.applicationDate);
            case "company-asc":
                return a.company.localeCompare(b.company);
            case "company-desc":
                return b.company.localeCompare(a.company);
            case "salary-high":
                return (b.salaryMax || 0) - (a.salaryMax || 0);
            case "salary-low":
                return (a.salaryMin || 0) - (b.salaryMin || 0);
            case "interview-near":
                if (!a.interview?.date) return 1;
                if (!b.interview?.date) return -1;
                return new Date(a.interview.date) - new Date(b.interview.date);
            case "newest":
            default:
                return new Date(b.applicationDate) - new Date(a.applicationDate);
        }
    });
}

// Master Render Method
function renderAllViews() {
    renderDashboardView();
    renderApplicationsView();
    renderInterviewsView();
    renderCompaniesView();
    renderAnalyticsView();
}

/* ==========================================
   VIEW 1: DASHBOARD RENDERER
   ========================================== */
function renderDashboardView() {
    const apps = AppState.applications;

    // Statistics Calculation
    const total = apps.length;
    const active = apps.filter(a => ["Applied", "Screening", "Interview"].includes(a.status)).length;
    const interviews = apps.filter(a => a.status === "Interview" || a.interview?.scheduled).length;
    const offers = apps.filter(a => ["Offer", "Accepted"].includes(a.status)).length;
    const rejected = apps.filter(a => a.status === "Rejected").length;

    // Current Month Count
    const currentMonthStr = new Date().toISOString().slice(0, 7);
    const addedThisMonth = apps.filter(a => (a.applicationDate || "").startsWith(currentMonthStr)).length;

    document.getElementById("stat-total").textContent = total;
    document.getElementById("stat-total-sub").textContent = `${addedThisMonth} added this month`;
    
    document.getElementById("stat-active").textContent = active;
    document.getElementById("stat-interviews").textContent = interviews;
    document.getElementById("stat-offers").textContent = offers;
    document.getElementById("stat-rejected").textContent = rejected;

    // Funnel Rendering
    const funnelStages = [
        { label: "Applied", count: apps.filter(a => a.status === "Applied").length },
        { label: "Screening", count: apps.filter(a => a.status === "Screening").length },
        { label: "Interview", count: apps.filter(a => a.status === "Interview").length },
        { label: "Offer", count: apps.filter(a => a.status === "Offer").length },
        { label: "Accepted", count: apps.filter(a => a.status === "Accepted").length }
    ];

    const maxCount = Math.max(...funnelStages.map(s => s.count), 1);
    const funnelContainer = document.getElementById("funnel-container");
    if (funnelContainer) {
        funnelContainer.innerHTML = funnelStages.map(stage => {
            const pct = Math.round((stage.count / maxCount) * 100);
            return `
                <div class="funnel-stage">
                    <span class="funnel-label">${stage.label}</span>
                    <div class="funnel-bar-wrapper">
                        <div class="funnel-bar-fill" style="width: ${pct}%"></div>
                    </div>
                    <span class="funnel-count">${stage.count}</span>
                </div>
            `;
        }).join("");
    }

    // Dynamic Follow-Up Reminders Section
    const remindersContainer = document.getElementById("dashboard-reminders-list");
    const appsWithReminders = apps.filter(a => a.followUp && a.followUp.date);
    
    if (remindersContainer) {
        if (appsWithReminders.length === 0) {
            remindersContainer.innerHTML = `<div class="empty-state"><p>No upcoming follow-up reminders.</p></div>`;
        } else {
            remindersContainer.innerHTML = appsWithReminders.map(app => `
                <div class="insight-item">
                    <i class="fa-solid fa-bell text-amber"></i>
                    <div>
                        <strong>${escapeHTML(app.company)}</strong> - ${escapeHTML(app.followUp.notes || "Follow up pending")}
                        <br><small class="text-muted">Due Date: ${app.followUp.date}</small>
                    </div>
                </div>
            `).join("");
        }
    }

    // Recent Applications Table (Latest 5)
    const recentTbody = document.getElementById("recent-apps-tbody");
    if (recentTbody) {
        const recentApps = [...apps].sort((a, b) => new Date(b.applicationDate) - new Date(a.applicationDate)).slice(0, 5);
        if (recentApps.length === 0) {
            recentTbody.innerHTML = `<tr><td colspan="6" class="empty-state">No recent applications found.</td></tr>`;
        } else {
            recentTbody.innerHTML = recentApps.map(app => `
                <tr>
                    <td data-label="Company"><strong>${escapeHTML(app.company)}</strong></td>
                    <td data-label="Position">${escapeHTML(app.jobTitle)}</td>
                    <td data-label="Applied Date">${app.applicationDate || "N/A"}</td>
                    <td data-label="Status"><span class="badge badge-${app.status.toLowerCase()}">${app.status}</span></td>
                    <td data-label="Next Action">${app.interview?.scheduled ? `Interview ${app.interview.date}` : "Awaiting response"}</td>
                    <td data-label="Actions">
                        <button class="btn btn-secondary btn-sm" onclick="openApplicationDetailsModal('${app.id}')">View</button>
                    </td>
                </tr>
            `).join("");
        }
    }

    renderCharts();
}

/* ==========================================
   VIEW 2: APPLICATIONS RENDERER
   ========================================== */
function renderApplicationsView() {
    const filteredApps = getFilteredApplications();
    const isCardView = AppState.viewMode === "cards";

    document.getElementById("view-cards-btn")?.classList.toggle("active", isCardView);
    document.getElementById("view-table-btn")?.classList.toggle("active", !isCardView);
    document.getElementById("set-view-cards")?.classList.toggle("active", isCardView);
    document.getElementById("set-view-table")?.classList.toggle("active", !isCardView);

    const cardsContainer = document.getElementById("applications-container-cards");
    const tableContainer = document.getElementById("applications-container-table");
    const appsTotalBadge = document.getElementById("apps-total-badge");

    if (appsTotalBadge) appsTotalBadge.textContent = `${filteredApps.length} total`;

    if (isCardView) {
        cardsContainer.classList.remove("hidden");
        tableContainer.classList.add("hidden");
        renderCardsView(filteredApps, cardsContainer);
    } else {
        cardsContainer.classList.add("hidden");
        tableContainer.classList.remove("hidden");
        renderTableView(filteredApps);
    }
}

function renderCardsView(apps, container) {
    if (apps.length === 0) {
        container.innerHTML = `
            <div class="empty-state span-col-2">
                <i class="fa-solid fa-folder-open"></i>
                <h4>No matching applications found</h4>
                <p>Try adjusting your search filters or add a new job application.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = apps.map(app => `
        <div class="app-card">
            <div class="app-card-header">
                <div class="company-title">
                    <i class="fa-solid fa-building"></i>
                    ${escapeHTML(app.company)}
                </div>
                <i class="fa-star priority-star ${app.priority ? "fa-solid active" : "fa-regular"}" onclick="togglePriority('${app.id}')"></i>
            </div>
            
            <div class="app-card-body">
                <div class="job-role">${escapeHTML(app.jobTitle)}</div>
                <div class="job-meta">${escapeHTML(app.location || "Remote")} · ${app.jobType}</div>
                <div style="margin-top: 8px;">
                    <span class="badge badge-${app.status.toLowerCase()}">${app.status}</span>
                </div>
            </div>

            <div class="next-action-box">
                <strong>Next Action / Status</strong>
                ${app.interview?.scheduled ? `Technical Interview — ${app.interview.date}` : `Applied on ${app.applicationDate}`}
            </div>

            <div class="app-card-footer">
                <span class="text-muted" style="font-size: 0.75rem;">Source: ${app.source}</span>
                <div class="btn-group">
                    <button class="btn btn-secondary btn-sm" onclick="openApplicationDetailsModal('${app.id}')">View</button>
                    <button class="btn btn-outline btn-sm" onclick="openApplicationFormModal('${app.id}')"><i class="fa-solid fa-pen"></i></button>
                </div>
            </div>
        </div>
    `).join("");
}

function renderTableView(apps) {
    const tbody = document.getElementById("apps-table-tbody");
    if (!tbody) return;

    if (apps.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" class="empty-state">No applications match the criteria.</td></tr>`;
        return;
    }

    tbody.innerHTML = apps.map(app => `
        <tr>
            <td>
                <input type="checkbox" class="app-select-checkbox" value="${app.id}" onchange="handleBulkSelect('${app.id}', this.checked)">
            </td>
            <td data-label="Company">
                <strong>${escapeHTML(app.company)}</strong>
                ${app.priority ? '<span class="text-amber"> ★</span>' : ''}
            </td>
            <td data-label="Position">${escapeHTML(app.jobTitle)}</td>
            <td data-label="Location">${escapeHTML(app.location || "N/A")}</td>
            <td data-label="Applied Date">${app.applicationDate}</td>
            <td data-label="Status"><span class="badge badge-${app.status.toLowerCase()}">${app.status}</span></td>
            <td data-label="Next Action">${app.interview?.scheduled ? `Interview ${app.interview.date}` : "Pending"}</td>
            <td data-label="Actions">
                <div class="btn-group">
                    <button class="btn btn-secondary btn-sm" onclick="openApplicationDetailsModal('${app.id}')">Details</button>
                    <button class="btn btn-outline btn-sm" onclick="openApplicationFormModal('${app.id}')"><i class="fa-solid fa-pen"></i></button>
                </div>
            </td>
        </tr>
    `).join("");
}

/* ==========================================
   VIEW 3: INTERVIEWS RENDERER
   ========================================== */
function renderInterviewsView() {
    const scheduledApps = AppState.applications.filter(a => a.interview?.scheduled || a.status === "Interview");

    const scheduleList = document.getElementById("interviews-schedule-list");
    const fullList = document.getElementById("interviews-full-list");

    if (scheduleList) {
        if (scheduledApps.length === 0) {
            scheduleList.innerHTML = `<div class="empty-state"><p>No upcoming interviews scheduled.</p></div>`;
        } else {
            // Group by interview date
            const grouped = {};
            scheduledApps.forEach(a => {
                const dateKey = a.interview?.date || "TBD Date";
                if (!grouped[dateKey]) grouped[dateKey] = [];
                grouped[dateKey].push(a);
            });

            scheduleList.innerHTML = Object.keys(grouped).sort().map(dateStr => `
                <div style="margin-bottom: 16px;">
                    <h4 style="font-size: 0.9rem; border-bottom: 1px solid var(--border-color); padding-bottom: 4px; margin-bottom: 8px; color: var(--primary);">${dateStr}</h4>
                    ${grouped[dateStr].map(app => `
                        <div class="insight-item" style="margin-bottom: 6px;">
                            <i class="fa-solid fa-video text-primary"></i>
                            <div style="flex: 1;">
                                <strong>${escapeHTML(app.company)}</strong> - ${escapeHTML(app.jobTitle)}
                                <br><small class="text-muted">${app.interview?.type || "Technical"} Round at ${app.interview?.time || "TBD"}</small>
                            </div>
                            ${app.interview?.meetingLink ? `<a href="${app.interview.meetingLink}" target="_blank" class="btn btn-primary btn-sm">Join</a>` : ''}
                        </div>
                    `).join("")}
                </div>
            `).join("");
        }
    }

    if (fullList) {
        if (scheduledApps.length === 0) {
            fullList.innerHTML = `<div class="empty-state"><p>No interview records found.</p></div>`;
        } else {
            fullList.innerHTML = scheduledApps.map(app => `
                <div class="card" style="margin-bottom: 12px; padding: 16px;">
                    <div class="flex-between">
                        <div>
                            <h4>${escapeHTML(app.company)} — ${escapeHTML(app.jobTitle)}</h4>
                            <p class="text-muted" style="font-size: 0.8rem;">Round: ${app.interview?.type || "General"} | Date: ${app.interview?.date || "N/A"}</p>
                        </div>
                        <button class="btn btn-outline btn-sm" onclick="openApplicationFormModal('${app.id}')">Edit Schedule</button>
                    </div>
                </div>
            `).join("");
        }
    }
}

/* ==========================================
   VIEW 4: COMPANIES RENDERER
   ========================================== */
function renderCompaniesView() {
    const grid = document.getElementById("companies-grid");
    if (!grid) return;

    const companiesMap = {};

    AppState.applications.forEach(app => {
        if (!companiesMap[app.company]) {
            companiesMap[app.company] = {
                name: app.company,
                total: 0,
                interviews: 0,
                offers: 0,
                apps: []
            };
        }
        companiesMap[app.company].total++;
        if (app.status === "Interview" || app.interview?.scheduled) companiesMap[app.company].interviews++;
        if (["Offer", "Accepted"].includes(app.status)) companiesMap[app.company].offers++;
        companiesMap[app.company].apps.push(app);
    });

    const companyNames = Object.keys(companiesMap);

    if (companyNames.length === 0) {
        grid.innerHTML = `<div class="empty-state span-col-2"><p>No companies found in database.</p></div>`;
        return;
    }

    grid.innerHTML = companyNames.map(name => {
        const c = companiesMap[name];
        return `
            <div class="company-card">
                <div class="company-card-header">
                    <div class="company-avatar">${c.name.substring(0, 2).toUpperCase()}</div>
                    <div>
                        <h3 style="font-size: 1.1rem;">${escapeHTML(c.name)}</h3>
                        <span class="text-muted" style="font-size: 0.8rem;">${c.total} Applications</span>
                    </div>
                </div>
                <div style="font-size: 0.85rem; color: var(--text-muted); display: flex; gap: 16px; margin-top: 12px;">
                    <span>Interviews: <strong>${c.interviews}</strong></span>
                    <span>Offers: <strong>${c.offers}</strong></span>
                </div>
            </div>
        `;
    }).join("");
}

/* ==========================================
   VIEW 5: ANALYTICS & INSIGHTS RENDERER
   ========================================== */
function renderAnalyticsView() {
    const apps = AppState.applications;
    const total = apps.length;

    // Response Rate Calculation
    // Response defined as any status beyond 'Applied' or 'Wishlist'
    const respondedApps = apps.filter(a => !["Applied", "Wishlist"].includes(a.status));
    const responseRate = total > 0 ? Math.round((respondedApps.length / total) * 100) : 0;

    const interviewApps = apps.filter(a => ["Interview", "Offer", "Accepted"].includes(a.status));
    const interviewRate = total > 0 ? Math.round((interviewApps.length / total) * 100) : 0;

    const offerApps = apps.filter(a => ["Offer", "Accepted"].includes(a.status));
    const offerRate = total > 0 ? Math.round((offerApps.length / total) * 100) : 0;

    document.getElementById("analytics-response-rate-badge").textContent = `${responseRate}%`;
    document.getElementById("analytics-total-apps").textContent = total;
    document.getElementById("analytics-total-responses").textContent = respondedApps.length;
    document.getElementById("analytics-interview-rate").textContent = `${interviewRate}%`;
    document.getElementById("analytics-offer-rate").textContent = `${offerRate}%`;

    // Data Driven Dynamic Insights Generation
    const insightsList = document.getElementById("insights-list");
    if (insightsList) {
        const insights = [];

        if (total > 0) {
            insights.push(`You have logged a total of <strong>${total}</strong> job applications in your pipeline.`);
            
            // Most Common Source
            const sourceCounts = {};
            apps.forEach(a => sourceCounts[a.source] = (sourceCounts[a.source] || 0) + 1);
            const topSource = Object.keys(sourceCounts).reduce((a, b) => sourceCounts[a] > sourceCounts[b] ? a : b, "LinkedIn");
            insights.push(`Your primary job application channel is <strong>${topSource}</strong>.`);

            // Upcoming interviews count
            const upcomingInts = apps.filter(a => a.interview?.scheduled).length;
            if (upcomingInts > 0) {
                insights.push(`You have <strong>${upcomingInts}</strong> upcoming interviews scheduled.`);
            } else {
                insights.push(`No upcoming interviews scheduled currently. Keep submitting targeted applications.`);
            }
        } else {
            insights.push(`Add job applications to start generating automated portfolio analytics.`);
        }

        insightsList.innerHTML = insights.map(text => `
            <div class="insight-item">
                <i class="fa-solid fa-lightbulb text-amber"></i>
                <div>${text}</div>
            </div>
        `).join("");
    }
}

/* ==========================================
   CHART.JS DATA VISUALIZATION ENGINE
   ========================================== */
function renderCharts() {
    const isDark = AppState.theme === "dark";
    const textColor = isDark ? "#f8fafc" : "#0f172a";
    const gridColor = isDark ? "#334155" : "#e2e8f0";

    const apps = AppState.applications;

    // Status Chart
    const statusCounts = { Applied: 0, Screening: 0, Interview: 0, Offer: 0, Accepted: 0, Rejected: 0 };
    apps.forEach(a => { if (statusCounts[a.status] !== undefined) statusCounts[a.status]++; });

    createOrUpdateChart("dashboardStatusChart", "doughnut", {
        labels: Object.keys(statusCounts),
        datasets: [{
            data: Object.values(statusCounts),
            backgroundColor: ["#2563eb", "#0284c7", "#d97706", "#059669", "#16a34a", "#e11d48"]
        }]
    }, { textColor });

    // Activity Over Time (By Month)
    const monthCounts = {};
    apps.forEach(a => {
        const month = (a.applicationDate || "2026-10").slice(0, 7);
        monthCounts[month] = (monthCounts[month] || 0) + 1;
    });

    const sortedMonths = Object.keys(monthCounts).sort();

    createOrUpdateChart("dashboardActivityChart", "bar", {
        labels: sortedMonths.length > 0 ? sortedMonths : ["Oct 2026"],
        datasets: [{
            label: "Applications",
            data: sortedMonths.length > 0 ? sortedMonths.map(m => monthCounts[m]) : [0],
            backgroundColor: "#2563eb"
        }]
    }, { textColor, gridColor });

    // Analytics Page Charts
    if (document.getElementById("chartSources")) {
        const sourceCounts = {};
        apps.forEach(a => sourceCounts[a.source || "Other"] = (sourceCounts[a.source || "Other"] || 0) + 1);
        
        createOrUpdateChart("chartSources", "pie", {
            labels: Object.keys(sourceCounts),
            datasets: [{ data: Object.values(sourceCounts), backgroundColor: ["#2563eb", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"] }]
        }, { textColor });
    }

    if (document.getElementById("chartWorkMode")) {
        const modeCounts = { Hybrid: 0, Remote: 0, "On-site": 0 };
        apps.forEach(a => { if (modeCounts[a.workMode] !== undefined) modeCounts[a.workMode]++; });

        createOrUpdateChart("chartWorkMode", "doughnut", {
            labels: Object.keys(modeCounts),
            datasets: [{ data: Object.values(modeCounts), backgroundColor: ["#3b82f6", "#10b981", "#f97316"] }]
        }, { textColor });
    }

    if (document.getElementById("chartJobType")) {
        const typeCounts = { "Full Time": 0, Internship: 0, Contract: 0, "Part Time": 0 };
        apps.forEach(a => { if (typeCounts[a.jobType] !== undefined) typeCounts[a.jobType]++; });

        createOrUpdateChart("chartJobType", "bar", {
            labels: Object.keys(typeCounts),
            datasets: [{ label: "Count", data: Object.values(typeCounts), backgroundColor: "#8b5cf6" }]
        }, { textColor, gridColor });
    }

    if (document.getElementById("chartStatusDist")) {
        createOrUpdateChart("chartStatusDist", "doughnut", {
            labels: Object.keys(statusCounts),
            datasets: [{
                data: Object.values(statusCounts),
                backgroundColor: ["#2563eb", "#0284c7", "#d97706", "#059669", "#16a34a", "#e11d48"]
            }]
        }, { textColor });
    }
}

function createOrUpdateChart(canvasId, type, data, options) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    if (AppState.charts[canvasId]) {
        AppState.charts[canvasId].destroy();
    }

    const ctx = canvas.getContext("2d");
    AppState.charts[canvasId] = new Chart(ctx, {
        type: type,
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: options.textColor } }
            },
            scales: (type === "bar" || type === "line") ? {
                x: { ticks: { color: options.textColor }, grid: { color: options.gridColor } },
                y: { ticks: { color: options.textColor }, grid: { color: options.gridColor }, beginAtZero: true }
            } : {}
        }
    });
}

/* ==========================================
   CRUD OPERATIONS & MODAL MANAGEMENT
   ========================================== */
function openApplicationFormModal(appId = null) {
    const form = document.getElementById("app-form");
    if (!form) return;

    form.reset();
    document.getElementById("form-app-id").value = "";

    if (appId) {
        const app = AppState.applications.find(a => a.id === appId);
        if (app) {
            document.getElementById("modal-form-title").textContent = "Edit Application";
            document.getElementById("form-app-id").value = app.id;
            document.getElementById("form-job-title").value = app.jobTitle;
            document.getElementById("form-company").value = app.company;
            document.getElementById("form-location").value = app.location || "";
            document.getElementById("form-job-type").value = app.jobType || "Full Time";
            document.getElementById("form-work-mode").value = app.workMode || "Hybrid";
            document.getElementById("form-job-url").value = app.jobUrl || "";
            document.getElementById("form-app-date").value = app.applicationDate || "";
            document.getElementById("form-status").value = app.status || "Applied";
            document.getElementById("form-source").value = app.source || "LinkedIn";

            document.getElementById("form-salary-min").value = app.salaryMin || "";
            document.getElementById("form-salary-max").value = app.salaryMax || "";
            document.getElementById("form-currency").value = app.currency || "INR";

            document.getElementById("form-recruiter-name").value = app.recruiter?.name || "";
            document.getElementById("form-recruiter-email").value = app.recruiter?.email || "";
            document.getElementById("form-recruiter-phone").value = app.recruiter?.phone || "";
            document.getElementById("form-recruiter-linkedin").value = app.recruiter?.linkedin || "";

            document.getElementById("form-interview-date").value = app.interview?.date || "";
            document.getElementById("form-interview-time").value = app.interview?.time || "";
            document.getElementById("form-interview-type").value = app.interview?.type || "Technical";
            document.getElementById("form-meeting-link").value = app.interview?.meetingLink || "";

            document.getElementById("form-followup-date").value = app.followUp?.date || "";
            document.getElementById("form-followup-notes").value = app.followUp?.notes || "";
            document.getElementById("form-notes").value = app.notes || "";
        }
    } else {
        document.getElementById("modal-form-title").textContent = "Add New Application";
        document.getElementById("form-app-date").value = new Date().toISOString().split("T")[0];
    }

    openModal("app-modal");
}

function handleFormSubmit(e) {
    e.preventDefault();

    const id = document.getElementById("form-app-id").value || `app-${Date.now()}`;
    const isEdit = AppState.applications.some(a => a.id === id);

    const interviewDate = document.getElementById("form-interview-date").value;
    const isInterviewScheduled = Boolean(interviewDate);

    const newApp = {
        id,
        jobTitle: document.getElementById("form-job-title").value,
        company: document.getElementById("form-company").value,
        location: document.getElementById("form-location").value,
        jobType: document.getElementById("form-job-type").value,
        workMode: document.getElementById("form-work-mode").value,
        jobUrl: document.getElementById("form-job-url").value,
        applicationDate: document.getElementById("form-app-date").value,
        status: document.getElementById("form-status").value,
        source: document.getElementById("form-source").value,

        salaryMin: Number(document.getElementById("form-salary-min").value) || null,
        salaryMax: Number(document.getElementById("form-salary-max").value) || null,
        currency: document.getElementById("form-currency").value,

        recruiter: {
            name: document.getElementById("form-recruiter-name").value,
            email: document.getElementById("form-recruiter-email").value,
            phone: document.getElementById("form-recruiter-phone").value,
            linkedin: document.getElementById("form-recruiter-linkedin").value
        },

        interview: {
            scheduled: isInterviewScheduled,
            date: interviewDate,
            time: document.getElementById("form-interview-time").value,
            type: document.getElementById("form-interview-type").value,
            meetingLink: document.getElementById("form-meeting-link").value
        },

        followUp: {
            date: document.getElementById("form-followup-date").value,
            reminder: Boolean(document.getElementById("form-followup-date").value),
            notes: document.getElementById("form-followup-notes").value
        },

        notes: document.getElementById("form-notes").value,
        priority: false,
        timeline: isEdit ? (AppState.applications.find(a => a.id === id)?.timeline || []) : [{ date: document.getElementById("form-app-date").value, title: "Application Submitted" }]
    };

    if (isEdit) {
        AppState.applications = AppState.applications.map(a => a.id === id ? newApp : a);
        showToast("Application updated successfully");
    } else {
        AppState.applications.unshift(newApp);
        showToast("New application added successfully");
    }

    saveData();
    closeModal("app-modal");
    renderAllViews();
}

function openApplicationDetailsModal(appId) {
    const app = AppState.applications.find(a => a.id === appId);
    if (!app) return;

    document.getElementById("details-job-title").textContent = app.jobTitle;
    document.getElementById("details-company-sub").textContent = `${app.company} · ${app.location || "Remote"}`;

    const badge = document.getElementById("details-status-badge");
    badge.className = `badge badge-${app.status.toLowerCase()}`;
    badge.textContent = app.status;

    const body = document.getElementById("details-modal-body");
    body.innerHTML = `
        <div class="form-grid">
            <div><strong>Work Mode:</strong> ${app.workMode}</div>
            <div><strong>Job Type:</strong> ${app.jobType}</div>
            <div><strong>Application Source:</strong> ${app.source}</div>
            <div><strong>Salary Range:</strong> ${app.salaryMin ? `${app.currency} ${app.salaryMin} -${app.salaryMax}` : "Not Specified"}</div>
        </div>
        <hr class="divider">
        <h4>Recruiter Details</h4>
        <p>${app.recruiter?.name ? `${app.recruiter.name} (${app.recruiter.email || 'No email'})` : "No recruiter info provided."}</p>
        <hr class="divider">
        <h4>Notes</h4>
        <p>${escapeHTML(app.notes || "No notes added.")}</p>
        <hr class="divider">
        <h4>Application Timeline</h4>
        <div class="timeline">
            ${(app.timeline || []).map(t => `
                <div class="timeline-item">
                    <div class="timeline-date">${t.date}</div>
                    <div class="timeline-content">${escapeHTML(t.title)}</div>
                </div>
            `).join("")}
        </div>
    `;

    document.getElementById("details-edit-btn").onclick = () => {
        closeModal("details-modal");
        openApplicationFormModal(app.id);
    };

    document.getElementById("details-delete-btn").onclick = () => {
        closeModal("details-modal");
        openConfirmModal("Delete Application?", `Are you sure you want to delete application for ${app.company}?`, () => deleteApplication(app.id));
    };

    const urlBtn = document.getElementById("details-job-url-btn");
    if (app.jobUrl) {
        urlBtn.href = app.jobUrl;
        urlBtn.classList.remove("hidden");
    } else {
        urlBtn.classList.add("hidden");
    }

    openModal("details-modal");
}

function deleteApplication(appId) {
    const index = AppState.applications.findIndex(a => a.id === appId);
    if (index !== -1) {
        AppState.lastDeletedApp = { app: AppState.applications[index], index };
        AppState.applications.splice(index, 1);
        saveData();
        renderAllViews();
        showToast("Application deleted", true);
    }
}

function undoDelete() {
    if (AppState.lastDeletedApp) {
        AppState.applications.splice(AppState.lastDeletedApp.index, 0, AppState.lastDeletedApp.app);
        AppState.lastDeletedApp = null;
        saveData();
        renderAllViews();
        showToast("Application restored");
    }
}

function togglePriority(appId) {
    const app = AppState.applications.find(a => a.id === appId);
    if (app) {
        app.priority = !app.priority;
        saveData();
        renderApplicationsView();
    }
}

function handleBulkSelect(appId, isChecked) {
    if (isChecked) {
        if (!AppState.selectedAppIds.includes(appId)) AppState.selectedAppIds.push(appId);
    } else {
        AppState.selectedAppIds = AppState.selectedAppIds.filter(id => id !== appId);
    }

    const bulkBar = document.getElementById("bulk-bar");
    const countSpan = document.getElementById("bulk-selected-count");

    if (AppState.selectedAppIds.length > 0) {
        bulkBar.classList.remove("hidden");
        countSpan.textContent = `${AppState.selectedAppIds.length} selected`;
    } else {
        bulkBar.classList.add("hidden");
    }
}

function bulkDelete() {
    AppState.applications = AppState.applications.filter(a => !AppState.selectedAppIds.includes(a.id));
    AppState.selectedAppIds = [];
    document.getElementById("bulk-bar").classList.add("hidden");
    saveData();
    renderAllViews();
    showToast("Selected applications deleted");
}

/* ==========================================
   IMPORT & EXPORT LOGIC
   ========================================== */
function exportJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(AppState.applications, null, 2));
    downloadFile(dataStr, "careertrack_applications.json");
    showToast("Data exported as JSON");
}

function bulkExportJSON() {
    const selectedApps = AppState.applications.filter(a => AppState.selectedAppIds.includes(a.id));
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(selectedApps, null, 2));
    downloadFile(dataStr, "careertrack_selected_applications.json");
    showToast("Selected applications exported");
}

function exportCSV() {
    if (AppState.applications.length === 0) {
        showToast("No data to export");
        return;
    }

    const headers = ["ID", "Company", "Job Title", "Status", "Application Date", "Location", "Job Type", "Work Mode", "Source"];
    const rows = AppState.applications.map(a => [
        a.id, `"${a.company}"`, `"${a.jobTitle}"`, a.status, a.applicationDate, `"${a.location || ''}"`, a.jobType, a.workMode, a.source
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    downloadFile(csvContent, "careertrack_applications.csv");
    showToast("Data exported as CSV");
}

function importJSON(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const imported = JSON.parse(event.target.result);
            if (Array.isArray(imported)) {
                AppState.applications = imported;
                saveData();
                renderAllViews();
                showToast("Applications imported successfully");
            } else {
                showToast("Invalid file format");
            }
        } catch (err) {
            showToast("Failed to parse JSON file");
        }
    };
    reader.readAsText(file);
}

function downloadFile(uri, filename) {
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", uri);
    downloadAnchor.setAttribute("download", filename);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}

function loadDemoData() {
    AppState.applications = [...DEMO_APPLICATIONS];
    saveData();
    renderAllViews();
    showToast("Demo data loaded");
}

function clearAllData() {
    AppState.applications = [];
    saveData();
    renderAllViews();
    showToast("All data cleared");
}

/* ==========================================
   UTILITY & NOTIFICATION FUNCTIONS
   ========================================== */
function checkNotifications() {
    const notifList = document.getElementById("notification-list");
    const badge = document.getElementById("notification-badge");
    if (!notifList) return;

    const notifications = [];
    const todayStr = new Date().toISOString().split("T")[0];

    AppState.applications.forEach(a => {
        if (a.interview?.scheduled && a.interview.date === todayStr) {
            notifications.push(`Interview today with <strong>${escapeHTML(a.company)}</strong> at ${a.interview.time || "TBD"}`);
        }
        if (a.followUp?.date === todayStr) {
            notifications.push(`Follow-up due today for <strong>${escapeHTML(a.company)}</strong>`);
        }
    });

    if (notifications.length > 0) {
        badge.textContent = notifications.length;
        badge.classList.remove("hidden");
        notifList.innerHTML = notifications.map(n => `<div class="notification-item">${n}</div>`).join("");
    } else {
        badge.classList.add("hidden");
        notifList.innerHTML = `<div class="notification-item" style="color: var(--text-muted);">No urgent notifications</div>`;
    }
}

function openModal(modalId) {
    document.getElementById(modalId)?.classList.remove("hidden");
}

function closeModal(modalId) {
    document.getElementById(modalId)?.classList.add("hidden");
}

function openConfirmModal(title, message, onConfirm) {
    document.getElementById("confirm-modal-title").textContent = title;
    document.getElementById("confirm-modal-message").textContent = message;

    const proceedBtn = document.getElementById("confirm-proceed-btn");
    proceedBtn.onclick = () => {
        onConfirm();
        closeModal("confirm-modal");
    };

    openModal("confirm-modal");
}

function showToast(message, allowUndo = false) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
        <i class="fa-solid fa-circle-check text-primary"></i>
        <span>${escapeHTML(message)}</span>
        ${allowUndo ? `<button class="toast-undo-btn" onclick="undoDelete()">Undo</button>` : ""}
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 4000);
}

function escapeHTML(str) {
    if (!str) return "";
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}