# 🌍 EthioLand - Real Estate Platform

A comprehensive real estate buying and selling platform designed specifically for Ethiopia, built with modern web technologies to provide transparency, security, and efficiency in property transactions.

## 🚀 Features

### 👥 Multi-Role System
- **Buyers**: Search, filter, and apply for properties
- **Sellers**: List properties with document verification
- **Agents**: Manage multiple listings and client relationships
- **Admins**: Verify users, approve listings, and manage platform

### 🏠 Property Management
- Advanced search and filtering by location, price, type
- Interactive map integration with Leaflet.js
- Document upload and verification system
- Property status tracking (Pending, Approved, Sold, Rented)
- Image gallery and detailed property information

### 💬 Communication System
- Real-time messaging between buyers and sellers
- In-app notifications
- Comment system on property listings
- Direct communication without intermediaries

### 🛡️ Security & Verification
- User verification system with document upload
- Admin approval for property listings
- Secure authentication with JWT
- Role-based access control

### 📱 Modern UI/UX
- Responsive design for all devices
- Modern, intuitive interface
- Interactive maps and property visualization
- Real-time updates and notifications

## 🛠️ Technology Stack

### Backend
- **Node.js** with Express.js framework
- **Prisma ORM** for database management
- **MongoDB** for data storage
- **JWT** for authentication
- **bcryptjs** for password hashing

### Frontend
- **React.js** with modern hooks
- **React Router** for navigation
- **Leaflet.js** for map integration
- **Axios** for API communication
- **React Icons** for UI icons
- **SASS** for styling

### Database Schema
- User management with role-based access
- Property listings with detailed information
- Document verification system
- Messaging and communication
- Application and transaction tracking

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** database (local or cloud)
- **Git**

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ethioland
```

### 2. Install Dependencies

#### Backend Setup
```bash
# Install backend dependencies
npm install

# Set up environment variables
cp .env.example .env
```

#### Frontend Setup
```bash
# Navigate to client directory
cd client

# Install frontend dependencies
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/ethioland"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key"

# Server Port
PORT=5000

# Client URL (for CORS)
CLIENT_URL="http://localhost:3000"
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Seed database with sample data
npx prisma db seed
```

### 5. Run the Application

#### Development Mode

**Terminal 1 - Backend:**
```bash
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Project Structure

```
ethioland/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── routes/         # Page components
│   │   ├── context/        # React context
│   │   └── styles/         # CSS/SCSS files
│   └── public/             # Static assets
├── controllers/            # API controllers
├── middlewares/            # Express middlewares
├── routes/                 # API routes
├── prisma/                 # Database schema
├── index.js               # Server entry point
└── package.json           # Backend dependencies
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Properties
- `GET /api/posts` - Get all properties
- `GET /api/posts/:id` - Get property by ID
- `POST /api/posts` - Create new property
- `PUT /api/posts/:id` - Update property
- `DELETE /api/posts/:id` - Delete property

### Admin
- `GET /api/admin/dashboard` - Admin dashboard stats
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/verify` - Verify user
- `GET /api/admin/posts` - Get all posts for admin
- `PUT /api/admin/posts/:id/approve` - Approve post
- `PUT /api/admin/posts/:id/reject` - Reject post

### Messaging
- `POST /api/messages` - Send message
- `GET /api/messages/conversations` - Get conversations
- `GET /api/messages/:userId` - Get messages with user

### Applications
- `POST /api/applications` - Create application
- `GET /api/applications/my` - Get my applications
- `GET /api/applications/post/:postId` - Get applications for post

## 👤 User Roles & Permissions

### Buyer
- Search and filter properties
- View property details and maps
- Apply for properties
- Message sellers
- Save favorite properties
- Track application status

### Seller
- List properties for sale/rent
- Upload ownership documents
- Manage property listings
- Respond to buyer inquiries
- Track listing status

### Agent
- Manage multiple client listings
- Promote properties
- Schedule property visits
- Track client relationships
- Access analytics

### Admin
- Verify user accounts
- Approve/reject property listings
- Verify uploaded documents
- Monitor platform activity
- Manage user roles
- View platform statistics

## 🗺️ Key Features Implementation

### Document Verification System
- Secure file upload for ownership documents
- Admin review and verification process
- Status tracking for verification requests
- Support for multiple document types

### Map Integration
- Interactive property location display
- Geospatial search capabilities
- Property clustering for better UX
- Mobile-responsive map interface

### Payment Integration (Future)
- Integration with local payment systems (Telebirr, Chapa)
- Secure transaction processing
- Payment status tracking
- Receipt generation

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Input validation and sanitization
- CORS configuration
- Secure file upload handling

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones
- Low-bandwidth connections

## 🚀 Deployment

### Backend Deployment
```bash
# Build for production
npm run build

# Start production server
npm start
```

### Frontend Deployment
```bash
cd client
npm run build
```

Deploy the `build` folder to your hosting service (Vercel, Netlify, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**TSEHAYNESH BIRUH**
- Software Developer
- Email: [your-email@example.com]
- LinkedIn: [your-linkedin]

## 🙏 Acknowledgments

- Ethiopian real estate market research
- Local payment system providers
- OpenStreetMap for mapping services
- React and Node.js communities

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact: [your-email@example.com]
- Documentation: [link-to-docs]

---

**EthioLand** - Building the future of real estate in Ethiopia, one property at a time! 🏠✨
