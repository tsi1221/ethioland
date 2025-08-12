import prisma from '../prisma.js';

// Create a new application
export const createApplication = async (req, res) => {
  try {
    const { postId, message, offerPrice } = req.body;
    const userId = req.user.id;

    // Check if post exists and is approved
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true
          }
        }
      }
    });

    if (!post) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (post.status !== 'APPROVED') {
      return res.status(400).json({ message: 'Property is not available for applications' });
    }

    if (post.userId === userId) {
      return res.status(400).json({ message: 'You cannot apply to your own property' });
    }

    // Check if user already applied
    const existingApplication = await prisma.application.findFirst({
      where: {
        userId,
        postId
      }
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied to this property' });
    }

    // Create application
    const application = await prisma.application.create({
      data: {
        userId,
        postId,
        message,
        offerPrice: offerPrice ? parseInt(offerPrice) : null
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true
          }
        },
        post: {
          select: {
            id: true,
            title: true,
            price: true,
            user: {
              select: {
                id: true,
                fullName: true,
                email: true
              }
            }
          }
        }
      }
    });

    // TODO: Send notification to property owner

    res.status(201).json(application);
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get applications for a specific post (for property owner)
export const getApplications = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    // Check if user owns the post
    const post = await prisma.post.findUnique({
      where: { id: postId }
    });

    if (!post) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (post.userId !== userId) {
      return res.status(403).json({ message: 'Not authorized to view applications for this property' });
    }

    const applications = await prisma.application.findMany({
      where: { postId },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
            isVerified: true,
            verificationStatus: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(applications);
  } catch (error) {
    console.error('Error getting applications:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get my applications (for buyers)
export const getMyApplications = async (req, res) => {
  try {
    const userId = req.user.id;

    const applications = await prisma.application.findMany({
      where: { userId },
      include: {
        post: {
          select: {
            id: true,
            title: true,
            price: true,
            img: true,
            adress: true,
            city: true,
            status: true,
            user: {
              select: {
                id: true,
                fullName: true,
                email: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(applications);
  } catch (error) {
    console.error('Error getting my applications:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update application status (for property owner)
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        post: {
          select: {
            id: true,
            title: true,
            userId: true
          }
        },
        user: {
          select: {
            id: true,
            fullName: true,
            email: true
          }
        }
      }
    });

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (application.post.userId !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this application' });
    }

    const updatedApplication = await prisma.application.update({
      where: { id },
      data: { status },
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
      }
    });

    // If application is accepted, update post status to sold/rented
    if (status === 'ACCEPTED') {
      await prisma.post.update({
        where: { id: application.postId },
        data: { 
          status: application.post.type === 'BUYER' ? 'SOLD' : 'RENTED'
        }
      });
    }

    // TODO: Send notification to applicant about status change

    res.json(updatedApplication);
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Withdraw application (for buyer)
export const withdrawApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const application = await prisma.application.findUnique({
      where: { id }
    });

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (application.userId !== userId) {
      return res.status(403).json({ message: 'Not authorized to withdraw this application' });
    }

    if (application.status !== 'PENDING') {
      return res.status(400).json({ message: 'Cannot withdraw application that is not pending' });
    }

    await prisma.application.update({
      where: { id },
      data: { status: 'WITHDRAWN' }
    });

    res.json({ message: 'Application withdrawn successfully' });
  } catch (error) {
    console.error('Error withdrawing application:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};