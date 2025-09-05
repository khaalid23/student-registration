# student-registration
Student Registration (React, Tailwind, TypeScript, Node.js, MySQL).

# 🎓 Student Registration System

[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)
[![Frontend](https://img.shields.io/badge/Frontend-React-blue?logo=react)](https://reactjs.org/)
[![Backend](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)](https://nodejs.org/)
[![Database](https://img.shields.io/badge/Database-MySQL-blue?logo=mysql)](https://www.mysql.com/)

A **full-stack student registration system** built with React, Tailwind CSS, TypeScript, Node.js, Express, and MySQL.  
This project allows students to register, view, and manage their profiles via a clean, responsive interface.

---

## 🚀 Features
- Register new students
- View a list of registered students
- Edit & delete student data
- Form validation using **Zod**
- REST API built with **Express + TypeScript**
- Styled with **Tailwind CSS**
- Responsive & modern UI

---

## 📁 Project Structure

### Frontend (`client`)
```bash
/src
  /components      → Reusable UI elements (Buttons, Forms, Navbar)
  /pages           → Core pages (Login, Register, Dashboard)
  /context         → App-wide state (AuthContext, ThemeContext)
  /services        → API calls & auth handlers
  App.tsx
  main.tsx         → Entry point
  index.css        → Tailwind + global styles
```

### Backend (`server`)
```bash
/src
  /controllers     → API logic for routes
  /routes          → Express routes
  /models          → Database models (Prisma/MySQL)
  /middlewares     → Auth & error handling
  /utils           → Helper functions
  index.ts         → Server entry point
.env               → Environment variables
```
