# 📦 Inventory Management System

A backend-focused Inventory Management System built using Node.js, Express, and MongoDB with EJS templating for a simple frontend interface.

This application allows users to manage inventory items by creating, updating, deleting, and viewing products through a web interface.

---

## 🚀 Tech Stack

- Backend: Node.js
- Framework: Express.js
- Database: MongoDB
- Templating Engine: EJS
- Package Manager: npm

---

## 📁 Project Structure

```
Inventory-Management/
│
├── config/         # Database configuration
├── controllers/    # Business logic for inventory
├── middleware/     # Custom middleware (auth, validation, etc.)
├── models/         # MongoDB schemas
├── routes/         # Express route definitions
├── views/          # EJS templates (frontend UI)
├── app.js          # Main application entry point
├── package.json    # Dependencies and scripts
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Shwet594/Inventory-Management.git
cd Inventory-Management
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory (if required):

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

---

## ▶️ Run the Application

```bash
npm start
```

Server will start on:

```
http://localhost:3000
```

---

## 📦 Features

- Add new inventory items
- Update existing items
- Delete items
- View all inventory records
- MVC architecture structure
- Simple and clean UI using EJS

---

## 🧠 Architecture Overview

This project follows the **MVC (Model-View-Controller)** pattern.

### 🔹 Models
Define MongoDB schemas and structure of inventory data.

### 🔹 Controllers
Handle application logic:
- Create inventory items
- Retrieve items
- Update items
- Delete items

### 🔹 Routes
Map URLs to controller functions.

### 🔹 Views
Render dynamic pages using EJS templates.

---

## 📡 Example Routes

| Method | Route | Description |
|--------|--------|------------|
| GET    | /              | View all inventory items |
| GET    | /add           | Add item form |
| POST   | /add           | Create new item |
| GET    | /edit/:id      | Edit item form |
| POST   | /edit/:id      | Update item |
| POST   | /delete/:id    | Delete item |

---

## 🔐 Middleware

Custom middleware may include:
- Authentication
- Validation
- Error handling

---

## 🛠 Future Improvements

- Add authentication & role-based access
- Implement REST API versioning
- Add pagination for large inventories
- Add search & filtering
- Add Swagger/OpenAPI documentation
- Improve frontend styling (Bootstrap/Tailwind)
- Add unit testing

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📜 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

Shweta  
GitHub: https://github.com/Shwet594

---

## ⭐ Support

If you found this project helpful, please consider giving it a star on GitHub!
