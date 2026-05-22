# 🎓 StudentConnect

**StudentConnect** is a full-stack web application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It aims to provide a centralized platform for students to access a variety of academic and career-related resources.


## 🚀 Features

- 📚 Access curated educational **resources**
- 💼 Explore **internships** and **job** opportunities
- 🗓️ Browse and register for **events** and **competitions**
- 🧠 Receive **personalized content** based on selected interests
- 🛡️ Secure user authentication using **JWT**
- 📬 Email notifications for sign-up and activity
- 🗨️ Discussion forums (optional module)


## 🛠️ Tech Stack

| Frontend        | Backend              | Database       | Others                     |
|-----------------|----------------------|----------------|----------------------------|
| React.js        | Node.js + Express.js | MongoDB        | JWT, Nodemailer, Mongoose  |


## 📁 Folder Structure (simplified)


StudentConnect/
├── client/              # React frontend (if included)
├── server/              # Node.js backend
│   ├── controllers/     # Business logic
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API route definitions
│   ├── utils/           # Helper functions
│   ├── middlewares/     # Auth and other middleware
│   └── .env             # Environment variables (excluded)
├── README.md            # This file
└── .gitignore


---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/StudentConnect.git
cd StudentConnect
````

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file inside `/server`:

```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

Start the server:

```bash
npm start
```

### 3. Setup the Frontend (if present)

```bash
cd ../client
npm install
npm start
```


## 🔐 Environment Variables (`/server/.env`)

Make sure to set the following values:

* `MONGO_URI` – MongoDB connection string
* `JWT_SECRET` – secret for token signing
* `EMAIL_USER` / `EMAIL_PASS` – for sending notifications


## 📦 Dependencies (Backend)

```bash
express
mongoose
jsonwebtoken
bcryptjs
nodemailer
dotenv
```


