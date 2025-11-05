# Event Swap Management System Backend

This is the **backend API** for the **Event Swap Management System**, built using **Node.js**, **Express**, **MongoDB**, and **JWT authentication**.

---

##  Features

### **User Authentication**

* Register / Login using JWT
* Token-based authentication middleware
* Role-based access (if extended in the future)

### **Event Management**

* Create, update, list, and delete personal events
* Mark events as `BUSY` or `SWAPPABLE`
* Automatically tie events to the authenticated user
* Fetch user-specific and global event data

### **Swap Management**

* Fetch all available swappable events
* Send swap requests to other users
* View incoming and outgoing swap requests
* Accept or reject swaps
* Automatically swap event ownership upon acceptance
* Real-time updates for event status

### **Middleware**

* JWT authentication
* Error handling
* Access protection for secured routes

---

## Folder Structure

```
backend/
│── controllers/      # Core API business logic
│── middleware/       # Authentication and authorization middlewares
│── models/           # MongoDB models (User, Event, Swap)
│── routes/           # Express route definitions
│── config/           # Database and environment configuration
│── server.js         # Server entry point
│── .env              # Environment variables
```

---

##  Tech Stack

* **Node.js + Express** – Backend framework
* **MongoDB (Mongoose)** – Database
* **JWT** – Authentication
* **bcryptjs** – Password hashing
* **dotenv** – Environment management
* **CORS** – Cross-Origin Resource Sharing

---

##  Environment Configuration (.env)

```
MONGO_URI=********
JWT_SECRET=*****
PORT=5000
```

---

## API Endpoints

### **Auth Routes**

| Method | Endpoint             | Description             |
| ------ | -------------------- | ----------------------- |
| POST   | `/api/auth/register` | Register new user       |
| POST   | `/api/auth/login`    | Login and get JWT token |
| GET    | `/api/auth/profile`  | Get logged-in user info |

---

###  **Event Routes**

| Method | Endpoint          | Description          |
| ------ | ----------------- | -------------------- |
| POST   | `/api/events`     | Create a new event   |
| GET    | `/api/events`     | Fetch user’s events  |
| PUT    | `/api/events/:id` | Update event details |
| DELETE | `/api/events/:id` | Delete an event      |

---

###  **Swap Routes**

| Method | Endpoint                     | Description                   |
| ------ | ---------------------------- | ----------------------------- |
| GET    | `/api/swaps/swappable-slots` | Get available swappable slots |
| POST   | `/api/swaps`                 | Create a swap request         |
| GET    | `/api/swaps/incoming`        | Get incoming swap requests    |
| GET    | `/api/swaps/outgoing`        | Get outgoing swap requests    |
| PUT    | `/api/swaps/:id/accept`      | Accept swap request           |
| PUT    | `/api/swaps/:id/reject`      | Reject swap request           |

---

##  Live Backend 

*Example:*
[Event Swap API on Render](https://slotswapbackend.onrender.com/)

---

##  Test Accounts

| Email                                         | Password |
| --------------------------------------------- | -------- |
| [chandu@gmail.com](mailto:chandu@gmail.com)   | 123456   |
| [honey@gmail.com](mailto:honey@gmail.com)     | 123456   |

```
Postman  testing
```
1️⃣ Register User

POST /auth/register
<img width="1366" height="768" alt="Screenshot (1506)" src="https://github.com/user-attachments/assets/f36a5a95-11ed-461a-bf28-5c948ad61830" />


2️⃣ Login User

POST /auth/login
<img width="1366" height="768" alt="Screenshot (1507)" src="https://github.com/user-attachments/assets/cbf10a2c-c2cf-48f9-915a-dd55960b1871" />


3️⃣ Get Logged-in User Profile
<img width="1366" height="768" alt="Screenshot (1508)" src="https://github.com/user-attachments/assets/c9cc79e5-f8f2-49f1-b318-096a4d31667e" />


**Events**
1️⃣ Create Event

POST /events
<img width="1366" height="768" alt="Screenshot (1509)" src="https://github.com/user-attachments/assets/52298675-37d5-4399-9343-f1e186237190" />


2️⃣ Get My Events

GET /events/my
<img width="1366" height="768" alt="Screenshot (1511)" src="https://github.com/user-attachments/assets/a9a569a2-42e8-444b-9209-5f90763db5d0" />


3️⃣ Update Event

PUT /events/:id
<img width="1366" height="768" alt="Screenshot (1512)" src="https://github.com/user-attachments/assets/4f11260b-a5f6-4d90-b548-3e67808d428c" />

4️⃣ Delete Event

DELETE /events/:id
<img width="1366" height="768" alt="Screenshot (1513)" src="https://github.com/user-attachments/assets/3a32c682-1477-4ebe-8f05-ab5ae23a79a1" />

**Swap**

1️⃣Get Swappable Slots

GET /swaps/swappable-slots

<img width="1366" height="768" alt="Screenshot (1517)" src="https://github.com/user-attachments/assets/0f4a14b8-1db6-4e4c-b392-c6b97eeff417" />

2️⃣Create Swap Request

POST /swaps
<img width="1366" height="768" alt="Screenshot (1515)" src="https://github.com/user-attachments/assets/e48efac6-47cc-47d3-ab91-6328e6c56ed1" />



3️⃣Get Incoming Swaps

GET /swaps/incoming
<img width="1366" height="768" alt="Screenshot (1518)" src="https://github.com/user-attachments/assets/ab74f456-f1d3-47e5-b3e6-6b6ef8303921" />


4️⃣Accept Swap

PUT /swaps/:id/accept
<img width="1366" height="768" alt="Screenshot (1519)" src="https://github.com/user-attachments/assets/0b243827-cc04-4567-a79e-6a3c6ac595e5" />

```
---

##  Run Locally

```bash
git clone https://github.com/Chandu5342/SlotSwapBackend.git
cd backend
npm install
npm run dev
```

The server will run on:
👉 `http://localhost:5000`

---




