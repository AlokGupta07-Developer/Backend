# 🚀 Day 10 – Backend Development Journey

## 📌 What I Learned Today

In **Day 10 of my Backend Development series**, I learned about **Password Hashing** and why we should never store user passwords as plain text in the database.

In my previous authentication setup, I was saving the user's password directly in MongoDB.

This can create a serious security problem if someone gets access to the database.

---

## ❌ The Problem with Plain-Text Passwords

If I save a password like this:

```text
mypassword123
