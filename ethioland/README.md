# 🏡 EthioLand Real Estate Platform

A modern, secure, and user-friendly real estate marketplace for Ethiopia, built with cutting-edge web technologies.

![EthioLand](https://img.shields.io/badge/EthioLand-Real%20Estate-blue)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-22.16.0-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?logo=mongodb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-06B6D4?logo=tailwindcss)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

EthioLand is a comprehensive real estate platform designed to address the challenges in Ethiopia's property market. It provides a secure, transparent, and efficient marketplace for property buyers, sellers, and agents.

### 🎯 Mission

To revolutionize Ethiopia's real estate market by providing a trusted digital platform that ensures:
- ✅ Property authenticity through document verification
- ✅ Direct communication between stakeholders
- ✅ Transparent pricing and negotiations
- ✅ Secure payment processing
- ✅ Legal compliance and fraud prevention

## ✨ Features

### For Buyers
- 🔍 **Advanced Search**: Filter properties by location, type, price, size, and amenities
- 🗺️ **Map Integration**: View properties on interactive maps
- ❤️ **Favorites**: Save and track favorite properties
- 💬 **Direct Messaging**: Communicate directly with sellers/agents
- 📊 **Property Analytics**: View property statistics and market trends
- 🔔 **Notifications**: Get alerts for new listings matching your criteria

### For Sellers & Agents
- 📝 **Easy Listing**: Simple property listing process with guided forms
- 📄 **Document Upload**: Secure upload of ownership and tax documents
- 📈 **Dashboard**: Track listing views, inquiries, and applications
- 💰 **Payment Integration**: Receive payments through Chapa/Telebirr
- 👥 **Lead Management**: Manage buyer inquiries and applications
- ⭐ **Reviews & Ratings**: Build trust through customer reviews

### For Administrators
- ✔️ **Document Verification**: Review and verify property documents
- 👮 **User Management**: Manage user accounts and permissions
- 📊 **Analytics Dashboard**: Monitor platform activity and metrics
- 🚫 **Fraud Detection**: Identify and prevent fraudulent listings
- 💬 **Dispute Resolution**: Handle user complaints and disputes
- 📈 **Reporting**: Generate comprehensive reports

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js v22.16.0
- **Framework**: Express.js
- **Database**: MongoDB with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt, express-rate-limit
- **File Upload**: Multer, Cloudinary
- **Validation**: express-validator

### Frontend
- **Framework**: React 19.1.1 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query (@tanstack/react-query)
- **Routing**: React Router v6
- **Forms**: React Hook Form
- **Maps**: Leaflet with React Leaflet
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Toastify

### Infrastructure
- **Version Control**: Git
- **Package Manager**: npm
- **API Testing**: Postman/Thunder Client
- **Deployment**: Docker-ready

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (React)                     │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │   Pages     │  │  Components  │  │    Services      │  │
│  │             │  │              │  │                  │  │
│  │ - Home      │  │ - Navbar     │  │ - Auth Service   │  │
│  │ - Properties│  │ - Footer     │  │ - Property API   │  │
│  │ - Dashboard │  │ - Cards      │  │ - Payment API    │  │
│  └─────────────┘  └──────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/REST
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Backend (Node.js)                       │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │   Routes    │  │ Controllers  │  │   Middleware     │  │
│  │             │  │              │  │                  │  │
│  │ - Auth      │  │ - Auth       │  │ - Authentication │  │
│  │ - Properties│  │ - Properties │  │ - Rate Limiting  │  │
│  │ - Admin     │  │ - Admin      │  │ - Error Handler  │  │
│  └─────────────┘  └──────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Prisma ORM
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Database (MongoDB)                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Collections:                                        │   │
│  │  - Users      - Properties   - Documents            │   │
│  │  - Messages   - Transactions - Notifications        │   │
│  │  - Reviews    - Applications - Favorites            │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Getting Started

### Prerequisites

- Node.js v22.16.0 or higher
- MongoDB (local or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ethioland.git
cd ethioland
```

2. **Setup Backend**
```bash
cd backend
npm install

# Create .env file and configure
cp .env.example .env
# Edit .env with your MongoDB connection string and other configs

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Start backend server
npm run dev
```

3. **Setup Frontend**
```bash
cd ../frontend
npm install

# Start frontend development server
npm start
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health Check: http://localhost:5000/health

### Environment Variables

#### Backend (.env)
```env
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/ethioland"

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Payment Integration
CHAPA_SECRET_KEY=your_chapa_secret_key
CHAPA_PUBLIC_KEY=your_chapa_public_key

# Frontend URL
CLIENT_URL=http://localhost:3000
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/me` | Get current user |
| PUT | `/api/auth/update-password` | Update password |
| POST | `/api/auth/forgot-password` | Request password reset |
| POST | `/api/auth/reset-password` | Reset password |
| GET | `/api/auth/verify-email/:token` | Verify email |

### Property Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/properties` | Get all properties (with filters) |
| GET | `/api/properties/:id` | Get property by ID |
| POST | `/api/properties` | Create new property |
| PUT | `/api/properties/:id` | Update property |
| DELETE | `/api/properties/:id` | Delete property |
| GET | `/api/properties/featured` | Get featured properties |
| POST | `/api/properties/:id/favorite` | Toggle favorite |
| GET | `/api/properties/user/favorites` | Get user favorites |

### Request/Response Examples

#### Register User
```json
POST /api/auth/register
{
  "email": "user@example.com",
  "phone": "+251911234567",
  "password": "SecurePass123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "BUYER"
}
```

#### Create Property
```json
POST /api/properties
{
  "title": "Modern 3 Bedroom House",
  "description": "Beautiful house in Bole",
  "type": "HOUSE",
  "price": 5000000,
  "bedrooms": 3,
  "bathrooms": 2,
  "size": 200,
  "address": "Bole Road",
  "city": "Addis Ababa",
  "region": "Addis Ababa",
  "features": ["Parking", "Garden", "Security"],
  "images": ["url1", "url2"]
}
```

## 📁 Project Structure

```
ethioland/
├── backend/
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utility functions
│   │   └── validators/     # Input validators
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   ├── uploads/            # File uploads
│   ├── .env                # Environment variables
│   ├── server.js           # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── hooks/          # Custom hooks
│   │   ├── utils/          # Utility functions
│   │   ├── types/          # TypeScript types
│   │   ├── contexts/       # React contexts
│   │   ├── assets/         # Static assets
│   │   ├── App.tsx         # Main app component
│   │   └── index.tsx       # Entry point
│   ├── public/
│   ├── .env                # Environment variables
│   └── package.json
│
└── README.md
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Tsehaynesh Biruh** - Software Developer & Project Lead

## 📞 Contact

For questions or support, please contact:
- Email: info@ethioland.com
- Phone: +251 911 123 456
- Website: [www.ethioland.com](https://www.ethioland.com)

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape EthioLand
- Special thanks to the Ethiopian tech community for their support
- Built with love for Ethiopia's real estate market

---

**EthioLand** - *Your trusted partner in Ethiopian real estate*

🏡 Find your dream property with confidence!