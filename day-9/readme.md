# 🚀 Day 9 – Backend Development Journey

## 📌 What I Learned Today

In **Day 9 of my Backend Development series**, I started learning about **Authentication**.

Today, I created a separate `routes` folder to keep my authentication-related routes organized.

I implemented a **User Registration API** where a user can register using:

- Email
- Username
- Password

The user data is then saved in the **MongoDB database**.

---

## 🔐 Authentication

Authentication is the process of verifying **who the user is**.

Today I created a registration flow like this:

```text
User
 ↓
Register API
 ↓
Express Backend
 ↓
MongoDB
 ↓
User Saved Successfully
 ↓
JWT Token Created
 ↓
Token Stored in Cookie
