const { PrismaClient } = require('@prisma/client');
const { validationResult } = require('express-validator');
const prisma = new PrismaClient();

// Create new property listing
const createProperty = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const {
      title,
      description,
      type,
      price,
      negotiable,
      size,
      bedrooms,
      bathrooms,
      floors,
      yearBuilt,
      address,
      city,
      region,
      latitude,
      longitude,
      features,
      amenities,
      images,
      videos,
      virtualTourUrl,
    } = req.body;

    // Create property
    const property = await prisma.property.create({
      data: {
        title,
        description,
        type,
        price: parseFloat(price),
        negotiable: negotiable || false,
        size: size ? parseFloat(size) : null,
        bedrooms: bedrooms ? parseInt(bedrooms) : null,
        bathrooms: bathrooms ? parseInt(bathrooms) : null,
        floors: floors ? parseInt(floors) : null,
        yearBuilt: yearBuilt ? parseInt(yearBuilt) : null,
        address,
        city,
        region,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        features: features || [],
        amenities: amenities || [],
        images: images || [],
        videos: videos || [],
        virtualTourUrl,
        ownerId: req.user.id,
        status: req.user.role === 'ADMIN' ? 'APPROVED' : 'PENDING',
      },
      include: {
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            avatar: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: 'Property listed successfully',
      data: property,
    });
  } catch (error) {
    console.error('Create property error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating property listing',
    });
  }
};

// Get all properties with filters
const getProperties = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      type,
      minPrice,
      maxPrice,
      city,
      region,
      bedrooms,
      bathrooms,
      minSize,
      maxSize,
      features,
      sortBy = 'createdAt',
      order = 'desc',
      status = 'APPROVED',
      search,
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build filter conditions
    const where = {
      status: req.user?.role === 'ADMIN' ? undefined : status,
      ...(type && { type }),
      ...(city && { city: { contains: city, mode: 'insensitive' } }),
      ...(region && { region: { contains: region, mode: 'insensitive' } }),
      ...(bedrooms && { bedrooms: parseInt(bedrooms) }),
      ...(bathrooms && { bathrooms: parseInt(bathrooms) }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { address: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    // Price range filter
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    // Size range filter
    if (minSize || maxSize) {
      where.size = {};
      if (minSize) where.size.gte = parseFloat(minSize);
      if (maxSize) where.size.lte = parseFloat(maxSize);
    }

    // Features filter
    if (features) {
      const featuresArray = Array.isArray(features) ? features : features.split(',');
      where.features = { hasEvery: featuresArray };
    }

    // Get total count
    const total = await prisma.property.count({ where });

    // Get properties
    const properties = await prisma.property.findMany({
      where,
      skip,
      take: parseInt(limit),
      orderBy: { [sortBy]: order },
      include: {
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            favorites: true,
            views: true,
            comments: true,
          },
        },
      },
    });

    // Add favorite status if user is logged in
    if (req.user) {
      const favoriteIds = await prisma.favorite.findMany({
        where: {
          userId: req.user.id,
          propertyId: { in: properties.map(p => p.id) },
        },
        select: { propertyId: true },
      });

      const favoriteSet = new Set(favoriteIds.map(f => f.propertyId));
      properties.forEach(property => {
        property.isFavorited = favoriteSet.has(property.id);
      });
    }

    res.json({
      success: true,
      data: {
        properties,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit)),
        },
      },
    });
  } catch (error) {
    console.error('Get properties error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching properties',
    });
  }
};

// Get single property by ID
const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            avatar: true,
            bio: true,
            createdAt: true,
            _count: {
              select: { properties: true },
            },
          },
        },
        agent: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            avatar: true,
          },
        },
        documents: {
          where: { isVerified: true },
          select: {
            id: true,
            type: true,
            title: true,
            isVerified: true,
          },
        },
        comments: {
          orderBy: { createdAt: 'desc' },
          take: 10,
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
        },
        _count: {
          select: {
            favorites: true,
            views: true,
            comments: true,
            applications: true,
          },
        },
      },
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    // Check if property is approved or user is owner/admin
    if (
      property.status !== 'APPROVED' &&
      property.ownerId !== req.user?.id &&
      req.user?.role !== 'ADMIN'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Property not available',
      });
    }

    // Track view
    if (req.ip || req.user) {
      await prisma.propertyView.create({
        data: {
          propertyId: id,
          viewerIp: req.ip,
          viewerId: req.user?.id,
        },
      });
    }

    // Check if favorited by current user
    if (req.user) {
      const favorite = await prisma.favorite.findUnique({
        where: {
          userId_propertyId: {
            userId: req.user.id,
            propertyId: id,
          },
        },
      });
      property.isFavorited = !!favorite;
    }

    res.json({
      success: true,
      data: property,
    });
  } catch (error) {
    console.error('Get property by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching property',
    });
  }
};

// Update property
const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if property exists and user is owner or admin
    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    if (property.ownerId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this property',
      });
    }

    // Update property
    const updatedProperty = await prisma.property.update({
      where: { id },
      data: {
        ...req.body,
        // Reset to pending if not admin and significant changes made
        status: req.user.role === 'ADMIN' ? req.body.status : 'PENDING',
      },
      include: {
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    res.json({
      success: true,
      message: 'Property updated successfully',
      data: updatedProperty,
    });
  } catch (error) {
    console.error('Update property error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating property',
    });
  }
};

// Delete property
const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if property exists and user is owner or admin
    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    if (property.ownerId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this property',
      });
    }

    // Delete property (cascades to related records)
    await prisma.property.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Property deleted successfully',
    });
  } catch (error) {
    console.error('Delete property error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting property',
    });
  }
};

// Get user's properties
const getMyProperties = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {
      ownerId: req.user.id,
      ...(status && { status }),
    };

    const total = await prisma.property.count({ where });

    const properties = await prisma.property.findMany({
      where,
      skip,
      take: parseInt(limit),
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: {
            favorites: true,
            views: true,
            comments: true,
            applications: true,
          },
        },
      },
    });

    res.json({
      success: true,
      data: {
        properties,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit)),
        },
      },
    });
  } catch (error) {
    console.error('Get my properties error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching your properties',
    });
  }
};

// Toggle favorite
const toggleFavorite = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if property exists
    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    // Check if already favorited
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_propertyId: {
          userId: req.user.id,
          propertyId: id,
        },
      },
    });

    if (existingFavorite) {
      // Remove favorite
      await prisma.favorite.delete({
        where: { id: existingFavorite.id },
      });

      res.json({
        success: true,
        message: 'Property removed from favorites',
        data: { isFavorited: false },
      });
    } else {
      // Add favorite
      await prisma.favorite.create({
        data: {
          userId: req.user.id,
          propertyId: id,
        },
      });

      res.json({
        success: true,
        message: 'Property added to favorites',
        data: { isFavorited: true },
      });
    }
  } catch (error) {
    console.error('Toggle favorite error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating favorites',
    });
  }
};

// Get user's favorite properties
const getFavorites = async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const total = await prisma.favorite.count({
      where: { userId: req.user.id },
    });

    const favorites = await prisma.favorite.findMany({
      where: { userId: req.user.id },
      skip,
      take: parseInt(limit),
      orderBy: { createdAt: 'desc' },
      include: {
        property: {
          include: {
            owner: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
            _count: {
              select: {
                favorites: true,
                views: true,
              },
            },
          },
        },
      },
    });

    const properties = favorites.map(f => ({
      ...f.property,
      isFavorited: true,
      favoritedAt: f.createdAt,
    }));

    res.json({
      success: true,
      data: {
        properties,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit)),
        },
      },
    });
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching favorite properties',
    });
  }
};

// Get featured properties
const getFeaturedProperties = async (req, res) => {
  try {
    const properties = await prisma.property.findMany({
      where: {
        featured: true,
        status: 'APPROVED',
      },
      take: 6,
      orderBy: { createdAt: 'desc' },
      include: {
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            favorites: true,
            views: true,
          },
        },
      },
    });

    res.json({
      success: true,
      data: properties,
    });
  } catch (error) {
    console.error('Get featured properties error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching featured properties',
    });
  }
};

module.exports = {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getMyProperties,
  toggleFavorite,
  getFavorites,
  getFeaturedProperties,
};