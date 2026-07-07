frontend/
│
├── app/
│   → Contains all pages/routes of the application.
│   → Each folder represents a URL.
│
├── components/
│   → Contains reusable UI components.
│   → Example: Navbar, Button, LoginForm, MovieCard.
│
├── services/
│   → Contains functions that communicate with the backend APIs.
│   → Example: login(), register(), getMovies(), createPost().
│
├── lib/
│   → Contains reusable helper functions and configurations.
│   → Example: Axios instance, token helpers, utility functions.
│
├── styles/
|   → Contains style.css files for all pages
│
├── public/
│   → Stores static files like images, icons, and fonts.
│
└── package.json
    → Contains project information and installed dependencies.



The important thing to understand is that Next.js doesn't prescribe a strict architecture the way backend frameworks often do. Many folders (hooks, context, types, styles, middleware, etc.) are optional and are added only when the project needs them.




## React Installation (basic)
- npm create vite@latest   ( @latest only if you want latest version)
- enter project name
- react
- javascript    (not (javascript + react compiler) it's advance)

- for starting frontend: npm run dev


## NextJS Installation (javascript)
- npx create-next-app@latest    ( @latest only if you want latest version)

- TypeScript? ... No
- Which linter would you like to use? » ESLint
- React Compiler? ... No
- Tailwind CSS? ... No 
- `src/` directory? ... No 
- App Router? (recommended) ... Yes
- import alias (`@/*` by default)? ... No
- AGENTS.md ? ... No

- for starting frontend: npm run dev


## Two types of Routing
- App Routing (New and demanding, here folder name used to navigate ,file name remains same page.js most of the cases , controled by layout.js )
- Page Routing (Old method ,all files are inside pages folder , navigation done by file name anput.js index.js etc)


## Rendring Types
# CSR (Client-Side Rendering) — Best For
User dashboard
Admin panel
Chat applications
Settings page
Email clients
Analytics dashboards
Real-time notifications
Interactive forms

Work Process: The server sends almost an empty HTML file + JavaScript. The browser runs JavaScript to build the page.
Reason: Heavy user interaction, SEO not important.


# SSR (Server-Side Rendering) — Best For
Blog pages
News articles
Product pages
Landing pages
Company websites
Documentation pages
Public profiles
Marketing pages

work process: The server fetches the required data, prepares the complete HTML page, and sends it to the browser. The page is rendered for every user request, ensuring the user always receives the latest data.
Reason: SEO matters, content should be visible immediately.


# SSG (Static Site Generation) — Best For
Documentation websites
Portfolio websites
Company websites
Landing pages
Terms & Privacy pages
About Us pages
Course pages (rarely changing)

work process: The page is generated once during build time, not on every request like SSR. The generated static HTML file is stored on the server (and often cached by a CDN) and served directly to users, making it very fast.
Reason: Content changes very rarely. Generate HTML once at build time for maximum speed.


# ISR (Incremental Static Regeneration) — Best For
Blogs
News websites
E-commerce product pages
Movie websites
Job boards
Recipe websites
Real estate listings

work process: ISR is an enhancement of SSG. The page is initially generated like SSG, but after a specified revalidation interval, Next.js regenerates the entire page in the background if new data is available. This avoids rebuilding the entire website while keeping the page up to date. 
Reason: Content changes occasionally. Get static-site speed while updating automatically after a set interval.




#### From your questions, you've correctly understood these key React concepts:

✅ After a refresh, all state (useState) resets to its initial values.
✅ React performs the first render.
✅ All useEffects run once after the first render because the component mounted, not because dependencies changed.
✅ Calling setLoading(false) and setAuthorized(true) updates the state.
✅ State updates trigger a new render.
✅ After the new render, React compares dependency arrays with their previous values.
✅ If a dependency changed (isLoading, isAuthirized), React runs the corresponding useEffect again.
✅ That's why your protected-route effect and fetch effect execute a second time with the updated authentication state.



### IMPORTANT
- Page component useState (games) → destroyed when you leave that page.
- AuthProvider state (user, loading) → survives page navigation and is destroyed only when the entire app reloads.