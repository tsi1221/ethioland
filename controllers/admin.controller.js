import prisma from '../prisma.js';

// Get all users with pagination
export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, role, verified } = req.query;
    const skip = (page - 1) * limit;

    const where = {};
    if (role) where.role = role;
    if (verified !== undefined) where.isVerified = verified === 'true';

    const users = await prisma.user.findMany({
      where,
      skip: parseInt(skip),
      take: parseInt(limit),
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        role: true,
        isVerified: true,
        verificationStatus: true,
        createdAt: true,
        _count: {
          select: {
            posts: true,
            documents: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const total = await prisma.user.count({ where });

    res.json({
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Verify a user
export const verifyUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const user = await prisma.user.update({
      where: { id },
      data: {
        isVerified: status === 'VERIFIED',
        verificationStatus: status
      }
    });

    res.json({ message: 'User verification status updated', user });
  } catch (error) {
    console.error('Error verifying user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all posts with filters
export const getAllPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, city, type } = req.query;
    const skip = (page - 1) * limit;

    const where = {};
    if (status) where.status = status;
    if (city) where.city = city;
    if (type) where.type = type;

    const posts = await prisma.post.findMany({
      where,
      skip: parseInt(skip),
      take: parseInt(limit),
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            isVerified: true
          }
        },
        _count: {
          select: {
            comments: true,
            applications: true,
            favorites: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const total = await prisma.post.count({ where });

    res.json({
      posts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error getting posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Approve a post
export const approvePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;

    const post = await prisma.post.update({
      where: { id },
      data: {
        status: 'APPROVED',
        isVerified: true
      },
      include: {
        user: {
          select: {
            email: true,
            fullName: true
          }
        }
      }
    });

    // TODO: Send notification to user about approval

    res.json({ message: 'Post approved successfully', post });
  } catch (error) {
    console.error('Error approving post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Reject a post
export const rejectPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const post = await prisma.post.update({
      where: { id },
      data: {
        status: 'REJECTED',
        isVerified: false
      },
      include: {
        user: {
          select: {
            email: true,
            fullName: true
          }
        }
      }
    });

    // TODO: Send notification to user about rejection with reason

    res.json({ message: 'Post rejected', post });
  } catch (error) {
    console.error('Error rejecting post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get pending document verifications
export const getPendingVerifications = async (req, res) => {
  try {
    const documents = await prisma.document.findMany({
      where: {
        isVerified: false
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true
          }
        },
        post: {
          select: {
            id: true,
            title: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(documents);
  } catch (error) {
    console.error('Error getting pending verifications:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Verify a document
export const verifyDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { isVerified, notes } = req.body;

    const document = await prisma.document.update({
      where: { id },
      data: {
        isVerified,
        verifiedBy: req.user.id,
        verifiedAt: new Date()
      },
      include: {
        user: {
          select: {
            email: true,
            fullName: true
          }
        }
      }
    });

    // TODO: Send notification to user about document verification

    res.json({ message: 'Document verification updated', document });
  } catch (error) {
    console.error('Error verifying document:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalPosts,
      pendingPosts,
      pendingVerifications,
      recentUsers,
      recentPosts
    ] = await Promise.all([
      prisma.user.count(),
      prisma.post.count(),
      prisma.post.count({ where: { status: 'PENDING' } }),
      prisma.document.count({ where: { isVerified: false } }),
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          fullName: true,
          email: true,
          role: true,
          createdAt: true
        }
      }),
      prisma.post.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          status: true,
          createdAt: true,
          user: {
            select: {
              fullName: true
            }
          }
        }
      })
    ]);

    res.json({
      stats: {
        totalUsers,
        totalPosts,
        pendingPosts,
        pendingVerifications
      },
      recentUsers,
      recentPosts
    });
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};