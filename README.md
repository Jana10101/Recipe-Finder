# Recipe Finder App 🍽️

A simple and responsive **Recipe Finder Web App** built with **React** and **Tailwind CSS**.  
Search for recipes by dish name and view details like ingredients, instructions, and YouTube videos.  
Data is fetched from **[TheMealDB API](https://www.themealdb.com/)**.

---

## Features

- Search recipes by dish name
- Display recipe cards with image, category, and cuisine
- View full recipe details:
  - Ingredients
  - Instructions
  - YouTube video (if available)
  - Source link
- Responsive design for desktop, tablet, and mobile
- Friendly error messages for no results or API issues
- Optional: Favorites list, recipe categories, dark mode

---

## Technologies

- React
- Tailwind CSS
- TheMealDB API
- Vite
- Fetch / Axios

---

## Getting Started

1. **Clone the repo**
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
````

2. **Install dependencies**

```bash
npm install
```

3. **Start the app**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/            # Pages like Home
├── App.jsx           # Main app
└── index.css         # Tailwind styles
```

---

## API Example

Search recipe by name:

```
https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
```

---

## 🚀 Deployment

The application is deployed on **Vercel**.  
You can access the live website using the link below:
```  
https://recipefinder-two-weld.vercel.app
```
---
