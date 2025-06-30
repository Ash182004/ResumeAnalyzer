

# 📄 Resume Analyzer

A full-stack web application that allows users to upload their resumes and get intelligent analysis based on extracted data like skills, experience, and education.

---

## 🚀 Live Demo

👉 [https://resumeanalyzer-r0o1.onrender.com](https://resumeanalyzer-r0o1.onrender.com)

---

## 📌 Features

✅ Resume upload and parsing
✅ Skill, education, and experience extraction
✅ User authentication (Register/Login)
✅ JWT-based authorization
✅ Responsive frontend (built with React.js)
✅ REST API backend (Node.js + Express.js)
✅ MongoDB Atlas for database
✅ Deployed on Render (Full-stack deployment)

---

## 🛠️ Tech Stack

| Frontend        | Backend              | Database      | Deployment |
| --------------- | -------------------- | ------------- | ---------- |
| React.js (Vite) | Node.js + Express.js | MongoDB Atlas | Render     |

---

## 📂 Project Structure

```
ResumeAnalyzer/
├── client/               # Frontend (React.js)
├── server/               # Backend (Express.js + MongoDB)
├── .env                  # Environment variables (Not in repo)
├── package.json          # Project metadata
└── README.md             # Project documentation
```

---

## ⚙️ How It Works

1. **User Registration & Login**
   Users can register and securely log in.

2. **Upload Resume**
   Users upload their resume in `.pdf` or `.docx` format.

3. **Resume Parsing & Analysis**
   Backend extracts key sections like skills, education, work experience using text parsing libraries and returns structured JSON data.

4. **View Results**
   Users get an interactive display of extracted data on the frontend.

---

## 🧑‍💻 Local Development Setup

### Prerequisites:

* Node.js
* MongoDB Atlas Account (or local MongoDB)
* Render (for deployment, optional)

---

### 📌 Steps:

1. **Clone the repo**

```bash
git clone https://github.com/Ash182004/ResumeAnalyzer.git
cd ResumeAnalyzer
```

2. **Setup Backend**

```bash
cd server
npm install
```

3. **Setup Frontend**

```bash
cd ../client
npm install
```

4. **Configure Environment Variables**

In `/server/.env`:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

5. **Run Backend**

```bash
cd ../server
npm run dev
```

6. **Run Frontend**

```bash
cd ../client
npm run dev
```

---

## 🌐 Deployment Info

* **Hosting**: Render (Full Stack Deployment)
* **Live Frontend & Backend on same domain**: ✅
  👉 [https://resumeanalyzer-r0o1.onrender.com](https://resumeanalyzer-r0o1.onrender.com)

---

## 📸 Screenshots (Optional - Add your own project screenshots here)

> *You can add screenshots showing Registration, Login, Upload, and Analysis Result Pages.*

---

## 🤝 Contribution

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## ⭐ Author

* **Ashmita Singh**
  [GitHub](https://github.com/Ash182004) | [LinkedIn](https://www.linkedin.com/in/ashmita-singh-a5514024a/)

---


