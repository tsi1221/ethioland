import prisma from '../prisma.js';

// Send a message
export const sendMessage = async (req, res) => {
  try {
    const { receiverId, content, postId } = req.body;
    const senderId = req.user.id;

    // Check if receiver exists
    const receiver = await prisma.user.findUnique({
      where: { id: receiverId }
    });

    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    // Create message
    const message = await prisma.message.create({
      data: {
        content,
        senderId,
        receiverId,
        postId
      },
      include: {
        sender: {
          select: {
            id: true,
            fullName: true,
            profilePhotoUrl: true
          }
        },
        receiver: {
          select: {
            id: true,
            fullName: true,
            profilePhotoUrl: true
          }
        }
      }
    });

    res.status(201).json(message);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get conversations for current user
export const getConversations = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get all unique conversations
    const conversations = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId }
        ]
      },
      include: {
        sender: {
          select: {
            id: true,
            fullName: true,
            profilePhotoUrl: true
          }
        },
        receiver: {
          select: {
            id: true,
            fullName: true,
            profilePhotoUrl: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Group by conversation partner
    const conversationMap = new Map();
    
    conversations.forEach(message => {
      const partnerId = message.senderId === userId ? message.receiverId : message.senderId;
      const partner = message.senderId === userId ? message.receiver : message.sender;
      
      if (!conversationMap.has(partnerId)) {
        conversationMap.set(partnerId, {
          partner,
          lastMessage: message,
          unreadCount: 0
        });
      } else {
        const existing = conversationMap.get(partnerId);
        if (message.createdAt > existing.lastMessage.createdAt) {
          existing.lastMessage = message;
        }
      }
      
      // Count unread messages
      if (message.receiverId === userId && !message.isRead) {
        conversationMap.get(partnerId).unreadCount++;
      }
    });

    const result = Array.from(conversationMap.values())
      .sort((a, b) => new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt));

    res.json(result);
  } catch (error) {
    console.error('Error getting conversations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get messages between two users
export const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user.id;

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            AND: [
              { senderId: currentUserId },
              { receiverId: userId }
            ]
          },
          {
            AND: [
              { senderId: userId },
              { receiverId: currentUserId }
            ]
          }
        ]
      },
      include: {
        sender: {
          select: {
            id: true,
            fullName: true,
            profilePhotoUrl: true
          }
        },
        receiver: {
          select: {
            id: true,
            fullName: true,
            profilePhotoUrl: true
          }
        }
      },
      orderBy: { createdAt: 'asc' }
    });

    // Mark messages as read
    await prisma.message.updateMany({
      where: {
        senderId: userId,
        receiverId: currentUserId,
        isRead: false
      },
      data: { isRead: true }
    });

    res.json(messages);
  } catch (error) {
    console.error('Error getting messages:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Mark message as read
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const message = await prisma.message.findUnique({
      where: { id }
    });

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    if (message.receiverId !== userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedMessage = await prisma.message.update({
      where: { id },
      data: { isRead: true }
    });

    res.json(updatedMessage);
  } catch (error) {
    console.error('Error marking message as read:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a message
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const message = await prisma.message.findUnique({
      where: { id }
    });

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    if (message.senderId !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this message' });
    }

    await prisma.message.delete({
      where: { id }
    });

    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};