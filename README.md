
# 🔌 Real-time Chat App with Socket.io, React & JWT Authentication

This project demonstrates a real-time chat application built with **React** on the frontend and **Express.js** with **Socket.io** on the backend. It also includes **JWT authentication** and **cookie-based token verification** using `socket.io` middleware.

---

## 🚀 Features

- Real-time messaging using **Socket.io**
- Room-based chat functionality
- Secure connection with **JWT token authentication**
- Responsive UI built with **Material-UI (MUI)**

---

## 🧑‍💻 Tech Stack

### Frontend
- React
- Socket.io-client
- Material-UI

### Backend
- Node.js
- Express.js
- Socket.io
- JSON Web Tokens (JWT)
- Cookie-parser
- CORS

---

## 📁 Project Structure

```
/client       --> React Frontend  
/server       --> Express Backend with Socket.io
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/mohd-ajlal/Socket.IO.git
cd Socket.IO
```

---

### 2. Backend Setup (Server)

```bash
cd server
npm install
npm run dev
```

- Server will run at `http://localhost:3000`
- JWT login route available at `http://localhost:3000/login`

---

### 3. Frontend Setup (Client)

```bash
cd client
npm install
npm run dev
```

- React app runs at `http://localhost:5173` (Vite default)

---

## 🔐 JWT Authentication Flow

1. User accesses the `/login` route on the backend to get a JWT token.
2. The server sends the token as an HTTP-only cookie.
3. Socket.io uses middleware to verify the JWT on each socket connection.

---

## 💬 Socket.io Events

| Event            | Triggered By         | Description                          |
|------------------|----------------------|--------------------------------------|
| `connect`        | Client auto-connect  | Establishes socket connection        |
| `join-room`      | User joins a room    | Adds user to a specified room        |
| `message`        | User sends a message | Sends message to a room              |
| `recieve-message`| Server               | Broadcasts received messages         |
| `disconnect`     | User leaves          | Logs disconnection                   |

---

## 🧪 Sample API

### Login (Sets JWT Cookie)

```http
GET http://localhost:3000/login
```

---

## 📸 UI Preview

- Room Joining  
- Message Sending  
- Room-specific Chat Display

---

## 🛡️ Security Notes

- JWT tokens are stored in **HttpOnly** cookies to prevent XSS.
- Socket middleware authenticates users before establishing a connection.

---

## 🙌 Acknowledgements

- [Socket.io Docs](https://socket.io/docs/)
- [Material UI](https://mui.com/)
- [JWT Documentation](https://jwt.io/)

---

## 📃 License

This project is licensed under the MIT License.
