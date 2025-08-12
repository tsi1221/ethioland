# EthioLand Real Estate Platform

A comprehensive real estate buying and selling platform designed specifically for Ethiopia, addressing local market challenges with modern technology solutions.

## 🏠 Project Overview

EthioLand is a web-based real estate management system that provides:
- **Secure Property Listings** with document verification
- **Role-based Access Control** for buyers, sellers, agents, and admins
- **Map-based Property Visualization** using GPS coordinates
- **Local Payment Integration** (Chapa, Telebirr)
- **Document Verification System** for ownership authentication
- **Multi-language Support** (English, Amharic, Afan Oromo, Tigrigna)

## 🚀 Features

### For Buyers
- ⭐ Search and filter verified properties
- ⭐ View detailed property information with images
- ⭐ Interactive map-based property browsing
- ⭐ Direct communication with sellers/agents
- ⭐ Secure payment processing
- ⭐ Personal dashboard for tracking interests

### For Sellers
- ⭐ List properties with comprehensive details
- ⭐ Upload ownership and tax documents
- ⭐ Track listing status and applications
- ⭐ Receive notifications for buyer interest
- ⭐ Secure payment receipt

### For Agents
- ⭐ Manage multiple client listings
- ⭐ Professional agent profiles
- ⭐ Commission tracking tools
- ⭐ Client relationship management

### For Admins
- ⭐ Document verification dashboard
- ⭐ Listing approval/rejection system
- ⭐ User management and role assignment
- ⭐ Platform analytics and monitoring

## 🛠️ Technology Stack

### Backend
- **Node.js** with Express.js framework
- **Prisma** ORM with MongoDB database
- **JWT** authentication with role-based access
- **Multer** for file upload handling
- **Bcrypt** for password encryption

### Frontend
- **React.js** with modern hooks and components
- **React Router** for navigation
- **Axios** for API communication
- **Leaflet/Google Maps** for map integration
- **Tailwind CSS** for styling

### Infrastructure
- **Docker** for containerization
- **MongoDB Atlas** for cloud database
- **Cloudinary** for image storage
- **Vercel/Netlify** for frontend deployment
- **Railway/Render** for backend deployment

## 📁 Project Structure

```
ethioland/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── utils/
│   ├── uploads/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── utils/
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd ethioland
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database URL and JWT secret
npx prisma db push
npm run dev
```

3. **Setup Frontend**
```bash
cd ../frontend
npm install
npm start
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🔐 Environment Variables

### Backend (.env)
```
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/ethioland"
JWT_SECRET="your-super-secret-jwt-key"
CLOUDINARY_CLOUD_NAME="your-cloudinary-name"
CLOUDINARY_API_KEY="your-cloudinary-key"
CLOUDINARY_API_SECRET="your-cloudinary-secret"
CHAPA_SECRET_KEY="your-chapa-secret"
TELEBIRR_API_KEY="your-telebirr-key"
```

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🚀 Deployment

### Backend Deployment (Railway)
1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on push to main branch

### Frontend Deployment (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set environment variables for API endpoints

## 📱 Mobile Responsiveness

The platform is designed with mobile-first approach, ensuring optimal performance on:
- 📱 Mobile devices (iOS/Android)
- 📟 Tablets
- 💻 Desktop computers
- 🌐 Low-bandwidth connections

## 🌍 Localization

Supported languages:
- 🇺🇸 English
- 🇪🇹 Amharic (አማርኛ)
- 🇪🇹 Afan Oromo
- 🇪🇹 Tigrigna (ትግርኛ)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- 📧 Email: support@ethioland.com
- 📞 Phone: +251-xxx-xxx-xxx
- 💬 Telegram: @ethioland_support

## 🗺️ Roadmap

- ✅ Core platform development
- 🔄 Payment gateway integration
- 🔄 Mobile app development
- 📅 Blockchain integration for ownership tracking
- 📅 AI-powered property recommendations
- 📅 Virtual property tours
- 📅 Legal document automation

---

**Built with ❤️ for the Ethiopian real estate market**