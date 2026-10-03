# Job Application Tracker

> **Organize your applications. Track your progress. Build your career.**

CareerTrack is a **professional web-based Job Application Tracker** designed to help students, freshers, and job seekers manage their job search from one organized dashboard.

Instead of keeping job details in different places such as notes, spreadsheets, emails, bookmarks, or memory, CareerTrack allows users to store and manage their applications, interview schedules, follow-ups, companies, and application progress in one place.

---

## 📌 What is CareerTrack?

**CareerTrack is a personal job-search management application.**

When a user applies for multiple jobs, it can become difficult to remember:

* Which companies they applied to
* Which position they applied for
* When they applied
* What the current application status is
* Which companies contacted them
* When their interviews are scheduled
* Which applications require follow-up
* Which applications resulted in offers or rejections

CareerTrack solves this problem by keeping all of this information organized in a single application.

### Simple Example

Suppose you apply for:

* Data Analyst at TCS
* Python Developer at Infosys
* AI/ML Intern at Accenture
* Software Engineer at another company

Instead of maintaining separate notes for every application, you can add all of them to CareerTrack and track their progress from one dashboard.

---

# 🎯 Why Use CareerTrack?

CareerTrack helps users maintain a structured job-search workflow.

Without a tracker:

```text
Job Websites
     ↓
Apply
     ↓
Email
     ↓
Notes
     ↓
Excel
     ↓
Try to remember interview dates
```

With CareerTrack:

```text
              CareerTrack
                   │
       ┌───────────┼───────────┐
       ↓           ↓           ↓
 Applications   Interviews   Follow-ups
       │           │           │
       └───────────┼───────────┘
                   ↓
               Dashboard
                   ↓
                Analytics
```

Everything related to the job search can be managed from one place.

---

# ✨ Key Features

## 📊 Dashboard

The Dashboard provides a quick overview of the user's job-search activity.

It displays:

* Total Applications
* Active Applications
* Interviews
* Offers
* Rejected Applications
* Application Funnel
* Application Status Distribution
* Monthly Application Activity
* Upcoming Interviews
* Follow-up Reminders

The dashboard statistics are generated from the application's stored data.

---

## 💼 Applications

The Applications section is the main workspace for managing job applications.

Users can:

* Add applications
* Edit applications
* Delete applications
* View application details
* Update application status
* Search applications
* Filter applications
* Sort applications
* Mark applications as priority
* Star important applications
* Add notes
* Store job links

---

## ➕ Add Application

Users can create a detailed application record.

Information can include:

* Job Title
* Company
* Location
* Job Type
* Work Mode
* Job URL
* Application Date
* Status
* Application Source
* Salary Range
* Recruiter Information
* Interview Details
* Follow-up Date
* Notes
* Priority

This allows each job opportunity to be tracked individually.

---

# 🔄 Application Status Tracking

CareerTrack provides different stages for tracking an application:

```text
Wishlist
    ↓
Applied
    ↓
Screening
    ↓
Interview
    ↓
Offer
    ↓
Accepted
```

Applications can also move to:

```text
Rejected
Withdrawn
```

### Example

If you initially save a job that you are interested in:

**Wishlist**

After submitting the application:

**Applied**

If the recruiter contacts you:

**Screening**

If you receive an interview invitation:

**Interview**

If you receive an offer:

**Offer**

This allows the user to understand the current stage of every application.

---

# 🎤 Interview Tracking

The Interviews section helps users manage interview-related information.

Users can track:

* Interview date
* Interview time
* Interview type
* Meeting link
* Interview notes
* Related company
* Related job position

Upcoming interviews can also appear on the Dashboard.

This helps users keep track of scheduled interviews without relying on separate notes or calendars.

---

# 🔔 Follow-Up Tracking

Users can add follow-up dates to applications.

For example:

> Applied to a company on October 1 and want to follow up after one week.

The user can add a follow-up date and CareerTrack can display it under follow-up reminders.

This helps users keep track of applications that need additional attention.

---

# 🏢 Companies

The Companies section organizes job applications based on companies.

Users can understand:

* Which companies they applied to
* Number of applications
* Application statuses
* Interviews
* Offers

This provides a company-level view of the job search.

---

# 📈 Analytics

The Analytics section provides a visual overview of job-search activity.

It can display information such as:

* Application status distribution
* Monthly application activity
* Applications by source
* Applications by work mode
* Applications by job type
* Response rate
* Interview rate
* Offer count

The analytics are generated from the actual application data stored in the application.

---

# 🔎 Search, Filter & Sort

CareerTrack provides tools to quickly find specific applications.

### Search

Applications can be searched using information such as:

* Company
* Job Title
* Location
* Recruiter
* Notes

### Filters

Users can filter applications by:

* Status
* Job Type
* Work Mode
* Location
* Source
* Date Range
* Salary Range

### Sorting

Applications can be sorted by:

* Newest
* Oldest
* Company Name
* Upcoming Interview
* Salary

---

# ⭐ Priority Applications

Users can mark important applications as **Priority** or **Starred**.

For example, if a particular company or role is especially important, it can be marked for easier access and follow-up.

---

# 🌙 Dark Mode

CareerTrack includes a Light/Dark theme.

The selected theme preference is stored locally so that the user's preferred appearance can remain after refreshing the page.

---

# 💾 Data Storage

CareerTrack uses **Browser LocalStorage** to store application data.

This means users can:

* Add applications
* Refresh the page without losing data
* Edit applications
* Delete applications
* Continue using saved data between browser sessions

### Important

The current version uses browser-based storage.

Therefore:

* Data is stored locally in the browser
* Data is not automatically synchronized between devices
* Data is not connected to a cloud database
* Clearing browser storage can remove saved application data

The project also includes import/export functionality for data backup.

---

# 📤 Import & Export

Users can export their application data for backup purposes.

Supported formats include:

* JSON
* CSV

Previously exported data can be imported again when supported by the application.

This makes it easier to maintain a backup of job-search information.

---

# 📱 Responsive Design

CareerTrack is designed to work across different screen sizes.

Supported layouts include:

* Desktop
* Laptop
* Tablet
* Mobile

The interface adjusts to different screen sizes while maintaining usability.

---

# ♿ Accessibility

The project follows basic frontend accessibility practices, including:

* Semantic HTML
* Proper form labels
* Keyboard-friendly interactions
* Focus states
* Readable text
* Accessible buttons
* Appropriate ARIA attributes where required

---

# 🛠️ Technologies Used

### Frontend

* **HTML5** — Structure and semantic page elements
* **CSS3** — Styling, layout, responsiveness, and themes
* **JavaScript ES6+** — Application logic and dynamic interactions

### Data & Visualization

* **LocalStorage** — Client-side data persistence
* **Chart.js** — Application analytics and data visualization

### Development Tools

* Visual Studio Code
* Git
* GitHub
* Chrome DevTools

---

# 📂 Project Structure

```text
careertrack-job-application-tracker/
│
├── index.html
├── style.css
├── script.js
├── README.md
├── .gitignore
│
└── screenshots/
    ├── applications.png
    ├── dashboard.png
    ├── add-application.png
    ├── interviews.png
    ├── companies.png
    ├── analytics.png
    └── dark-mode.png
```

### Main Files

| File           | Purpose                                           |
| -------------- | ------------------------------------------------- |
| `index.html`   | Main structure and UI of the application          |
| `style.css`    | Styling, responsive layout and theme design       |
| `script.js`    | Application logic, data handling and interactions |
| `README.md`    | Project documentation                             |
| `.gitignore`   | Files excluded from Git                           |
| `screenshots/` | Project screenshots for documentation             |

---

# 🚀 How to Run

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/careertrack-job-application-tracker.git
```

## 2. Open the Project

```bash
cd careertrack-job-application-tracker
```

## 3. Run the Application

Open the project in **Visual Studio Code**.

You can run the project using the **Live Server** extension.

### Using Live Server

1. Open `index.html`
2. Right-click the file
3. Select **Open with Live Server**
4. The application will open in your browser

---

# 🧭 How to Use CareerTrack

## Step 1 — Open the Dashboard

When CareerTrack starts, the Dashboard provides an overview of your current job search.

You can see:

* Total applications
* Active applications
* Interviews
* Offers
* Rejections
* Application progress
* Upcoming interviews
* Follow-up reminders

---

## Step 2 — Add a Job Application

Go to **Applications** and select **Add Application**.

Enter information such as:

```text
Job Title      → Data Analyst
Company        → TCS
Location       → Hyderabad
Job Type       → Full-Time
Work Mode      → Hybrid
Status         → Applied
Source         → LinkedIn
Application Date → October 1, 2026
```

Then save the application.

---

## Step 3 — Update the Application

When the company responds, open the application and update its status.

For example:

```text
Applied
   ↓
Screening
   ↓
Interview
```

The Dashboard and Analytics sections will update based on the stored data.

---

## Step 4 — Add Interview Details

If the company schedules an interview, update the application with:

* Interview date
* Interview time
* Interview type
* Meeting link
* Interview notes

The interview can then be tracked from the **Interviews** section.

---

## Step 5 — Add Follow-Up

If you need to contact the recruiter later, add a follow-up date.

CareerTrack can display the follow-up under reminders so that you can keep track of pending actions.

---

## Step 6 — Track the Final Result

The application can eventually reach:

```text
Offer
   ↓
Accepted
```

or:

```text
Rejected
```

or:

```text
Withdrawn
```

This creates a complete record of the application journey.

---

# 💡 Real-World Example

Imagine you apply for a **Python Developer** position.

You create an application:

```text
Company        : Infosys
Position       : Python Developer
Location       : Hyderabad
Job Type       : Full-Time
Work Mode      : Hybrid
Source         : LinkedIn
Status         : Applied
```

Later, the recruiter contacts you.

You update:

```text
Status         : Screening
```

Then you receive an interview invitation.

You add:

```text
Status         : Interview
Interview Date : October 10
Interview Type : Online
Meeting Link   : Added
```

After the interview, you can add notes and a follow-up date.

If you receive an offer:

```text
Status         : Offer
```

If you accept it:

```text
Status         : Accepted
```

This entire process can be tracked inside CareerTrack.

---

# 🧠 What This Project Demonstrates

CareerTrack demonstrates practical frontend development concepts such as:

* HTML5
* CSS3
* JavaScript ES6+
* DOM Manipulation
* Event Handling
* Form Validation
* CRUD Operations
* LocalStorage
* Search
* Filtering
* Sorting
* Dynamic UI Rendering
* Data Visualization
* Chart Integration
* Modal Components
* Toast Notifications
* Theme Management
* Import/Export
* Responsive Design
* Accessibility
* Client-side State Management

---

# 🏗️ Application Architecture

The application follows a frontend-focused architecture:

```text
User
 │
 ▼
CareerTrack UI
 │
 ├── Dashboard
 ├── Applications
 ├── Interviews
 ├── Companies
 ├── Analytics
 └── Settings
 │
 ▼
JavaScript Application Logic
 │
 ├── CRUD Operations
 ├── Search & Filtering
 ├── Sorting
 ├── Statistics
 ├── Validation
 ├── Notifications
 └── Theme Management
 │
 ▼
Browser LocalStorage
 │
 ▼
Saved Application Data
```

This structure keeps the project organized while demonstrating how a real frontend application can manage data and user interactions.

---

# 📸 Screenshots

## 💼 Applications

The Applications page provides a centralized workspace for viewing and managing job applications.

![CareerTrack Applications](screenshots/applications.png)

---

## 📊 Dashboard

The Dashboard provides an overview of application progress, interviews, offers, rejections, and follow-up activity.

![CareerTrack Dashboard](screenshots/dashboard.png)

---

## ➕ Add Application

The Add Application page allows users to enter detailed information about a job opportunity.

![CareerTrack Add Application](screenshots/add-application.png)

---

## 🎤 Interviews

The Interviews page helps users track scheduled and completed interviews.

![CareerTrack Interviews](screenshots/interviews.png)

---

## 🏢 Companies

The Companies page provides an organized view of companies associated with job applications.

![CareerTrack Companies](screenshots/companies.png)

---

## 📈 Analytics

The Analytics page provides visual insights into job-search activity.

![CareerTrack Analytics](screenshots/analytics.png)

---

## 🌙 Dark Mode

CareerTrack supports a dark theme for a comfortable viewing experience.

![CareerTrack Dark Mode](screenshots/dark-mode.png)

---

# 🔮 Future Improvements

Future versions of CareerTrack could include:

* React.js frontend
* Node.js and Express backend
* MongoDB database
* User authentication
* Cloud data synchronization
* Multi-device access
* Email reminders
* Calendar integration
* Resume management
* Resume-to-job matching
* Recruiter management
* Advanced analytics
* Job board API integration
* AI-assisted job-search insights
* Cloud deployment

---

# 🎯 Project Goals

The main goals of CareerTrack are to:

* Organize job applications in one place
* Make job-search progress easier to track
* Reduce missed follow-ups
* Manage interview schedules
* Visualize job-search activity
* Practice real-world frontend development
* Build a professional portfolio project
* Demonstrate practical JavaScript skills
* Create a project that can be extended into a full-stack application

---

# 📌 Project Information

**Project Name:** CareerTrack — Job Application Tracker

**Repository Name:** `careertrack-job-application-tracker`

**Project Type:** Frontend Web Application

**Category:** Career Management / Productivity

**Development Approach:** Client-Side Web Application

---

### Areas of Interest

* Artificial Intelligence & Machine Learning
* Data Science
* Frontend Development
* Generative AI
* Software Development

---

# ⭐ Acknowledgement

CareerTrack was developed as a portfolio project to demonstrate practical frontend development, JavaScript programming, UI/UX design, client-side data management, and data visualization.

---

## 📄 License

This project is created for **educational, learning, and portfolio purposes**.
