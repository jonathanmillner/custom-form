# 🧩 Custom Form / Frontend

This is the **frontend** of the Custom Form App — a single-page React application that allows users to build and submit customizable forms. It works together with a Node.js backend.

---

## 🛠 Tech Stack

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Bootstrap 5](https://getbootstrap.com/)

---

## Setup

### 📥 Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/custom-form.git
cd custom-form
npm install
```

### ⚙️ Set the API base URL
Open `src/api/config.ts` and ensure the backend API URL matches your local or deployed server.

For example:
```
export const API_BASE_URL = "http://localhost:8080";
```

### ⚙️ Run the app in development
```
npm run dev
```
Then visit http://localhost:5173 in your browser.