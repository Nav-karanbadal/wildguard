# 🐾 WildGuard India

**Protect Wildlife. Preserve Our Future.**

WildGuard India is a full-stack wildlife conservation website built to make wildlife information, conservation programs, environmental initiatives, and ways to get involved easier to explore.

The project combines a responsive React frontend with a Node.js/Express backend and MongoDB Atlas database. Wildlife, program, and blog content is loaded from Google Apps Script web app endpoints. It also includes form validation, state management, charts, reusable components, routing, automated tests, and production deployment.

---

## 🌐 Live Links

- **Live Website:** https://wildguard-blond.vercel.app
- **GitHub Repository:** https://github.com/Nav-karanbadal/wildguard
- **Backend API:** https://wildguard-m4j5.onrender.com
- **GitHub Pages Backup:** https://nav-karanbadal.github.io/wildguard/

---

## 📖 About WildGuard India

WildGuard India is designed around one main idea: **make wildlife conservation information simple, organized, and accessible.**

Visitors can explore wildlife, learn about conservation programs, read articles, and find ways to become involved.

The website is structured as a complete web application with:

- React-based pages and reusable components
- Redux Toolkit for application state
- React Router for navigation
- Responsive Tailwind CSS styling
- Wildlife, program, and blog data services powered by Google Apps Script endpoints
- Data visualization with Recharts
- A Node.js/Express backend
- MongoDB Atlas database integration
- Join Team and Contact APIs
- Client-side form validation
- Automated component and page testing
- Production deployment

---

# ✨ Main Features

## 🏠 Home

The Home page introduces WildGuard India and gives visitors a quick overview of the platform.

It contains:

- Hero section
- Wildlife conservation message
- Mission section
- Impact information
- Featured wildlife
- Programs preview
- Blog preview
- Call-to-action section

## 🐅 Wildlife

The Wildlife section focuses on exploring wildlife species and their conservation status. Wildlife data is fetched through `wildlifeService.js` from a Google Apps Script web app.

Features include:

- Wildlife listing
- Search
- Category filtering
- Endangered classification
- Vulnerable classification
- Threatened classification
- Wildlife cards
- Individual wildlife detail pages
- Wildlife-related charts and data visualization

Routes:

```text
/wildlife
/wildlife/:id
```

## 🌱 Programs

The Programs section presents conservation programs in an organized format. Program data is fetched through `programService.js` from a Google Apps Script web app.

Users can:

- Browse programs
- View program cards
- Open individual program details
- Explore program information
- View program-related charts

Routes:

```text
/programs
/programs/:id
```

## 📰 Blog

The Blog section contains wildlife and conservation-related articles. Blog data is fetched through `blogService.js` from a Google Apps Script web app.

Features include:

- Blog listing
- Blog cards
- Individual blog pages
- Blog detail view
- Blog data/service integration

Routes:

```text
/blog
/blog/:id
```

## 🤝 Join Team

The Join Team page allows visitors to submit their details if they want to get involved.

The form includes:

- Name
- Email
- Phone
- Country
- State
- City
- Area of interest
- Message

The form is validated before the request is sent.

```text
React Form
    ↓
POST /api/join
    ↓
Express Backend
    ↓
MongoDB Atlas
```

Submitted information is stored in the `jointeams` collection.

## 📩 Contact

The Contact page includes:

- Contact information
- Contact form
- Form validation
- FAQ accordion
- Additional information
- Call-to-action section

The form collects:

- Name
- Email
- Subject
- Message

It is submitted through:

```text
POST /api/contact
```

and stored in MongoDB Atlas.

---

# 🧭 Application Routes

```text
/
├── /wildlife
├── /wildlife/:id
├── /programs
├── /programs/:id
├── /blog
├── /blog/:id
├── /join
└── /contact
```

---

# 🛠️ Technology Stack

### Frontend

- React
- Vite
- React Router
- Redux Toolkit
- React Redux
- Tailwind CSS
- React Icons
- Axios
- Recharts

### Backend

- Node.js
- Express.js
- Mongoose
- CORS
- dotenv

### Database

- MongoDB Atlas (form submissions)

### Content Data Source

- Google Apps Script web apps (wildlife, programs, and blog data)

### Testing

- Vitest
- React Testing Library

### Deployment

- Vercel
- Render
- MongoDB Atlas
- GitHub
- GitHub Pages

---

# 🏗️ Project Architecture

The production application uses two data paths:

- **Content data** (wildlife, programs, blogs): the React frontend fetches it directly from Google Apps Script endpoints.
- **Form data** (Join Team, Contact): the React frontend sends it to the Express backend, which stores it in MongoDB Atlas.

```text
                         ┌───────────────────┐
                         │      GitHub       │
                         │   Source Code     │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │      Vercel       │
                         │ React + Vite      │
                         │    Frontend       │
                         └────┬─────────┬────┘
                              │         │
              GET (content)   │         │   POST (forms)
                              ▼         ▼
        ┌───────────────────────┐     ┌───────────────────┐
        │  Google Apps Script   │     │      Render       │
        │  Web App Endpoints    │     │ Node + Express    │
        │ Wildlife/Programs/Blog│     │     Backend       │
        └───────────────────────┘     └─────────┬─────────┘
                                                │
                                           Mongoose
                                                │
                                                ▼
                                      ┌───────────────────┐
                                      │  MongoDB Atlas    │
                                      │     Database      │
                                      └───────────────────┘
```

In simple terms:

**Content:** Google Apps Script → React frontend (Vercel)

**Forms:** GitHub → Vercel → Render → MongoDB Atlas

---

# 📂 Project Structure

```text
wildguard/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── src/
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── Hero/
│   │   ├── Mission/
│   │   ├── Impact/
│   │   ├── WildlifeCard/
│   │   ├── FeaturedWildlife/
│   │   ├── ProgramsPreview/
│   │   ├── BlogPreview/
│   │   ├── CallToAction/
│   │   ├── ProgramCard/
│   │   ├── ProgramCharts/
│   │   ├── BlogCard/
│   │   └── WildlifeCharts/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Wildlife.jsx
│   │   ├── WildlifeDetails.jsx
│   │   ├── Programs.jsx
│   │   ├── ProgramDetails.jsx
│   │   ├── Blog.jsx
│   │   ├── BlogDetails.jsx
│   │   ├── JoinTeam.jsx
│   │   └── Contact.jsx
│   ├── redux/
│   │   ├── store.js
│   │   ├── wildlifeSlice.js
│   │   ├── programSlice.js
│   │   └── blogSlice.js
│   ├── services/
│   │   ├── wildlifeService.js
│   │   ├── programService.js
│   │   └── blogService.js
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .github/
│   └── workflows/
│       └── deploy.yml
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

# 🔌 Data Services (Frontend)

Wildlife, program, and blog data is loaded by three small service files in `src/services/`. Each one uses Axios to send a `GET` request to a Google Apps Script web app URL and returns the response data to the Redux slices.

| Service file | Function | Data source | Used by |
| --- | --- | --- | --- |
| `wildlifeService.js` | `fetchWildlife()` | Wildlife Apps Script endpoint | `wildlifeSlice.js` |
| `programService.js` | `fetchPrograms()` | Programs Apps Script endpoint | `programSlice.js` |
| `blogService.js` | `fetchBlogs()` | Blog Apps Script endpoint | `blogSlice.js` |

Example (`wildlifeService.js`):

```javascript
import axios from "axios"

const WILDLIFE_API_URL = "<your Google Apps Script web app URL>"

export const fetchWildlife = async () => {
  const response = await axios.get(WILDLIFE_API_URL)

  return response.data
}
```

Data flow:

```text
Google Apps Script endpoint
          ↓
   Service file (Axios GET)
          ↓
 Redux Toolkit slice
          ↓
 Pages and components
```

To point the site at a different data source, update the URL constant in the matching service file.

---

# 🔌 Backend API

Production base URL:

```text
https://wildguard-m4j5.onrender.com
```

The Express backend handles form submissions only. Wildlife, program, and blog content does not go through this backend.

### Join Team

```http
POST /api/join
```

Used to submit Join Team form information and save it to MongoDB Atlas.

### Contact

```http
POST /api/contact
```

Used to submit Contact form information and save it to MongoDB Atlas.

### Health Check

```http
GET /
```

Returns a simple response confirming that the WildGuard backend is running.

---

# 🗄️ Database

WildGuard uses **MongoDB Atlas** with Mongoose to store form submissions.

Current application collections include:

```text
wildguard
│
├── jointeams
└── contacts
```

### Join Team collection

Stores submitted information such as:

- Name
- Email
- Phone
- Country
- State
- City
- Interest
- Message
- Created/updated timestamps

### Contacts collection

Stores:

- Name
- Email
- Subject
- Message
- Created/updated timestamps

> Wildlife, program, and blog content is **not** stored in MongoDB. It is served by the Google Apps Script endpoints described above.

---

# 🔐 Environment Variables

Create:

```text
backend/.env
```

Example:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

The actual database credentials should never be committed to GitHub.

The project ignores environment files such as:

```text
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

---

# 🚀 Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/Nav-karanbadal/wildguard.git
cd wildguard
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Set up the backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

### 4. Start the backend

```bash
npm start
```

The local backend runs on:

```text
http://localhost:5000
```

### 5. Start the frontend

Open another terminal:

```bash
cd ..
npm run dev
```

Vite will display the local frontend URL.

The wildlife, program, and blog pages load their data from the Google Apps Script endpoints configured in `src/services/`, so an internet connection is required even when running locally.

---

# 🏭 Production Build

Create an optimized production build with:

```bash
npm run build
```

The output is generated in:

```text
dist/
```

---

# 🧪 Testing

The project uses **Vitest** and **React Testing Library**.

Current final test result:

```text
12 test files passed
51 tests passed
```

Tests cover:

- Navbar
- Home
- Wildlife
- Wildlife Details
- Programs
- Program Details
- Blog
- Blog Details
- Join Team
- Contact
- Footer
- Application routing

Run tests with:

```bash
npm test
```

---

# 📱 Responsive Design

The website was tested across:

- Mobile
- Tablet
- Laptop
- Desktop

Navigation behavior changes according to screen size.

On mobile, a hamburger menu is used. On tablet and desktop, the full navigation is displayed with spacing adjusted to fit the screen.

Forms, cards, sections, navigation, and main pages were checked during the final responsive QA.

---

# 🎨 UI and UX

The interface follows a wildlife and conservation theme while keeping navigation simple.

The project includes:

- Reusable components
- Responsive navigation
- Card hover interactions
- FAQ accordion
- Call-to-action sections
- Wildlife cards
- Program cards
- Blog cards
- Charts
- Responsive forms
- Validation messages
- Success/error feedback

---

# 🛡️ Validation and Error Handling

The application validates user input before sending form requests.

### Join Team

Validation covers required information including:

- Name
- Email
- Phone
- Country
- State
- City
- Interest
- Message

### Contact

Validation covers:

- Name
- Email
- Subject
- Message
- Message length

The forms also show submitting, success, and backend error states.

---

# 🔒 Security Practices

Basic security practices used include:

- Database credentials stored in environment variables
- `.env` excluded from Git
- Database credentials not placed in frontend code
- Backend API separated from the frontend
- CORS configured on Express
- User input validated before submission
- Content endpoints are read-only `GET` requests

Notes on the Google Apps Script endpoints:

- The web app URLs are called from the browser, so they are visible in the deployed frontend code. They should only expose data that is meant to be public.
- Write access to the underlying data should stay restricted to the project owner.

Production credentials should always remain private.

---

# 🌍 Deployment

The final production setup is:

```text
Frontend  → Vercel
Backend   → Render
Database  → MongoDB Atlas
Content   → Google Apps Script web apps
Code      → GitHub
```

### Vercel

Frontend:

https://wildguard-blond.vercel.app

### Render

Backend:

https://wildguard-m4j5.onrender.com

### MongoDB Atlas

Production database used by the backend for form submissions.

### Google Apps Script

Provides the wildlife, program, and blog data consumed by the frontend. If the content endpoints are redeployed and their URLs change, update the URL constants in `src/services/` and redeploy the frontend.

### GitHub

Source code:

https://github.com/Nav-karanbadal/wildguard

### GitHub Pages

Backup deployment:

https://nav-karanbadal.github.io/wildguard/

---

# 🧠 What I Learned

Building WildGuard involved working through the complete development process.

Some of the main things I practiced were:

- Building reusable React components
- Organizing a React application
- Managing state with Redux Toolkit
- Creating routes with React Router
- Building responsive layouts with Tailwind CSS
- Handling forms and validation
- Making API requests with Axios
- Consuming Google Apps Script web apps as a data source
- Building an Express backend
- Creating API routes
- Connecting Express with MongoDB
- Using Mongoose
- Managing environment variables
- Testing React components
- Debugging frontend and backend issues
- Working with Git and GitHub
- Deploying a frontend with Vercel
- Deploying a backend with Render
- Connecting a production frontend, backend, and database

One of the most useful parts was getting the complete flow working:

```text
Frontend
   ↓
API Request
   ↓
Express Backend
   ↓
MongoDB Atlas
```

and then verifying the same flow after deployment.

---

# 🔧 Challenges Solved

### Frontend and backend communication

The forms were first tested with the local backend and later connected to the deployed Render API so the live Vercel application could submit data successfully.

### Content data source

Wildlife, program, and blog content is served through Google Apps Script web apps and loaded by dedicated service files. Each data source is isolated in its own service, so an endpoint URL can be changed without touching pages or components.

### MongoDB connection

MongoDB Atlas was configured as the production database, with the connection string kept in an environment variable.

### Deployment

The frontend and backend were deployed separately:

```text
Vercel → React frontend
Render → Express backend
```

The frontend was then configured to communicate with the production backend and the content endpoints.

### GitHub Pages

A GitHub Pages deployment workflow was also configured as a backup deployment.

### Testing

The application was tested after implementing the major pages and features.

Final result:

```text
51 / 51 tests passing
```

---

# 📈 Future Improvements

Possible future additions include:

- User authentication
- User profiles
- Admin dashboard
- Wildlife management
- Program management
- Blog management
- Moving wildlife, program, and blog content from Google Apps Script to the Express/MongoDB backend
- Storing endpoint URLs in Vite environment variables (for example `VITE_WILDLIFE_API_URL`)
- Caching content responses to reduce load time
- Interactive wildlife maps
- More advanced wildlife filtering
- Habitat information
- Email notifications
- Newsletter functionality
- More automated tests
- Accessibility improvements
- Code splitting and bundle optimization
- Additional performance optimization

---

# 📌 Project Highlights

```text
✓ React + Vite frontend
✓ Responsive design
✓ Redux Toolkit state management
✓ React Router navigation
✓ Tailwind CSS
✓ Google Apps Script content endpoints
✓ Wildlife search and filtering
✓ Wildlife detail pages
✓ Charts and data visualization
✓ Programs section
✓ Program detail pages
✓ Blog section
✓ Blog detail pages
✓ Join Team form
✓ Contact form
✓ FAQ accordion
✓ Express REST API
✓ MongoDB Atlas database
✓ Form validation
✓ Vitest + React Testing Library
✓ 51 passing tests
✓ Vercel deployment
✓ Render deployment
✓ GitHub repository
✓ GitHub Pages backup
```

---

# 👨‍💻 Author

## Nav Karan Badal

**B.Tech Computer Science & Engineering**

GitHub:

https://github.com/Nav-karanbadal

---

# 📄 License

This project is intended for learning, development, and portfolio purposes.

---

# 🐾 Final Note

WildGuard India was built to combine a meaningful wildlife conservation theme with practical full-stack web development.

The project covers the complete journey:

```text
Plan
  ↓
Design
  ↓
Develop
  ↓
Connect API
  ↓
Connect Database
  ↓
Test
  ↓
Deploy
  ↓
Final QA
```

**Protect Wildlife. Preserve Our Future. 🐾**