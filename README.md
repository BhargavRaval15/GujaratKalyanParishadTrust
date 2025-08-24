 Gujarat Kalyan Parishad Trust - MERN Stack Web Application

A modern, responsive web application built for Gujarat Kalyan Parishad Trust to manage and display events and news content. This full-stack application features an admin dashboard for content management and a public interface for viewing events and news.

## 🚀 Live Demo

- **Frontend (Client):** [Deployed on Netlify](https://gkptrust.netlify.app/)
- **Backend (Server):** [Deployed on Render](https://gkptrust.onrender.com)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Contributing](#contributing)

## ✨ Features

### Public Features
- **Responsive Design:** Mobile-first design that works seamlessly across all devices
- **Events Gallery:** Browse and view events with image galleries
- **News Reader:** Read newspaper articles with high-quality image viewing
- **Interactive Lightbox:** Zoom, pan, and navigate through images
- **Modern UI:** Clean, intuitive interface with smooth animations

### Admin Features
- **Secure Authentication:** JWT-based admin login system
- **Content Management:** Add, edit, and delete events and news
- **File Upload:** Multi-image upload with preview functionality
- **Responsive Dashboard:** Mobile-friendly admin interface
- **Real-time Updates:** Instant content updates across the platform

## 🛠 Tech Stack

### Frontend
- **React.js** - User interface library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Axios** - HTTP client for API calls
- **React Router** - Client-side routing

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Multer** - File upload middleware
- **bcryptjs** - Password hashing

### Deployment
- **Netlify** - Frontend hosting
- **Render** - Backend hosting
- **MongoDB Atlas** - Cloud database

## 📁 Project Structure

```
GujaratKalyanParishadTrust/
├── client/                 # React frontend
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js    # API configuration
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Events.jsx
│   │   │   ├── EventDetail.jsx
│   │   │   ├── News.jsx
│   │   │   ├── NewsDetail.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── App.jsx
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
├── server/                 # Node.js backend
│   ├── models/
│   │   ├── Event.js
│   │   ├── News.js
│   │   └── User.js
│   ├── routes/
│   │   ├── events.js
│   │   ├── news.js
│   │   └── auth.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── uploads/            # Uploaded images
│   ├── index.js
│   └── package.json
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/GujaratKalyanParishadTrust.git
cd GujaratKalyanParishadTrust
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/database
PORT=5000
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:3000
```

Start the backend server:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

Create a `.env` file in the client directory:
```env
REACT_APP_API_BASE_URL=http://localhost:5000
```

Start the frontend development server:
```bash
npm start
```

### 4. Access the Application
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **Admin Login:** http://localhost:3000/admin/login

## 🔐 Environment Variables

### Server (.env)
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:3000
```

### Client (.env)
```env
REACT_APP_API_BASE_URL=http://localhost:5000
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Admin registration (protected)

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create new event (admin only)
- `PUT /api/events/:id` - Update event (admin only)
- `DELETE /api/events/:id` - Delete event (admin only)

### News
- `GET /api/news` - Get all news
- `GET /api/news/:id` - Get single news
- `POST /api/news` - Create new news (admin only)
- `PUT /api/news/:id` - Update news (admin only)
- `DELETE /api/news/:id` - Delete news (admin only)

### File Upload
- `POST /api/upload` - Upload images (admin only)

## 🌐 Deployment

### Deploy Backend to Render
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set root directory to `server`
4. Configure environment variables
5. Deploy

### Deploy Frontend to Netlify
1. Create a new site on Netlify
2. Connect your GitHub repository
3. Set base directory to `client`
4. Set build command: `npm run build`
5. Set publish directory: `build`
6. Configure environment variables
7. Deploy

## 🔧 Key Features Explained

### Responsive Design
The application uses a mobile-first approach with Tailwind CSS:
- Flexible grid layouts that adapt to screen size
- Touch-friendly navigation for mobile devices
- Optimized images and loading states

### Image Management
- Multi-file upload with preview
- Lightbox modal with zoom and pan functionality
- Responsive image galleries
- Optimized file serving

### Admin Authentication
- JWT-based secure authentication
- Protected routes and middleware
- Session management with token storage

### Performance Optimizations
- Efficient API calls and state management
- Image optimization and lazy loading
- Smooth animations and transitions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Bhargav Raval**
- GitHub: [@BhargavRaval15](https://github.com/BhargavRaval15)
- LinkedIn: [Bhargav Raval](www.linkedin.com/in/22it131-bhargav)
- Email: bhargavraval27473@gmail.com

## 🙏 Acknowledgments

- Gujarat Kalyan Parishad Trust for the opportunity
- MERN stack community for excellent documentation
- Tailwind CSS for the utility-first CSS framework
- All open-source contributors who made this project possible
