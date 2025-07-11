import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma.js'; // ✅ correct

const JWT_SECRET = process.env.JWT_SECRET || 'yoursecretkey'; 


export const register = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      password,
      role,
      nationalId,
      kebeleId,
      profilePhotoUrl,
    } = req.body;

    // Basic validation
    if (!fullName || !email || !password || !phone) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        phone,
        passwordHash,
        role,
        nationalId,
        kebeleId,
        profilePhotoUrl,
      },
    });
     
     console.log(newUser);
    
    res.status(201).json({
      message: 'User registered successfully',
      userId: newUser.id,
    });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};


//// login user

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }


    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: 'Invalid email' });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    } 

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1y' } // expires in 1 year
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        profilePhotoUrl: user.profilePhotoUrl,
      },
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};


////logout user

export const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.json({ message: 'Logout successful' });
};


//get user profile 
export const getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        fullName: true,
        email: true,
        profilePhotoUrl: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get user data' });
  }
};
