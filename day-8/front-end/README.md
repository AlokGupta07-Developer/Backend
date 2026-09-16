# 🚀 Day 8 – Frontend Development Journey

## 📌 What I Learned Today

In **Day 8 of my Frontend Development series**, I worked on a **React Notes App** and connected it with my backend API.

I created the frontend functionality to **Create, Read, Update and Delete (CRUD)** notes using React and Axios.

---

## ⚛️ React Hooks

### `useState`

I used `useState` to manage notes and update-form state.

```js
const [notes, setNotes] = useState([]);
const [showUpdateForm, setShowUpdateForm] = useState(false);
const [updateNoteId, setUpdateNoteId] = useState(null);
