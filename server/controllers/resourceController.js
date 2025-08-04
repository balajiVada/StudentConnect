const Resource = require('../models/resourceModel');
const User = require('../models/userModel');

async function handleAddResource(req, res) {
    try {
        const { title, description, type, link, tags } = req.body;

        if (!title || !link || !tags || !Array.isArray(tags)) {
            return res.status(400).json({ error: 'Title, link, and tags (as an array) are required.' });
        }

        const newResource = new Resource({ title, description, type, link, tags });
        const savedResource = await newResource.save();
        res.status(201).json(savedResource);
    } catch (error) {
        res.status(500).json({ error: 'Error adding resource', details: error.message });
    }
}

async function handleDeleteResource(req, res) {
    try {
        const { id } = req.params;
        const deletedResource = await Resource.findByIdAndDelete(id);

        if (!deletedResource) {
            return res.status(404).json({ error: 'Resource not found' });
        }

        res.status(200).json({ message: 'Resource deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting resource', details: error.message });
    }
}

async function handleUpdateResource(req, res) {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedResource = await Resource.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });

        if (!updatedResource) {
            return res.status(404).json({ error: 'Resource not found' });
        }

        res.status(200).json(updatedResource);
    } catch (error) {
        res.status(500).json({ error: 'Error updating resource', details: error.message });
    }
}

async function handleGetResource(req, res) {
    try {
        const { id } = req.params;
        const resource = await Resource.findById(id);

        if (!resource) {
            return res.status(404).json({ error: 'Resource not found' });
        }

        res.status(200).json(resource);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching resource', details: error.message });
    }
}

async function handleGetAllResources(req, res) {
    try {
        const resources = await Resource.find();
        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching resources', details: error.message });
    }
}


async function handleGetCustomizedResources(req, res) {
    try {
        if (!req.user || !req.user.interests) {
            return res.status(400).json({ message: 'User interests not found' });
        }

        const userInterests = req.user.interests;
        const allResources = await Resource.find();

        const labeledResources = allResources.map(resource => {
            const isPreferred = resource.tags.some(tag => userInterests.includes(tag));
            return {
                ...resource.toObject(),
                isPreferred,
            };
        });

        labeledResources.sort((a, b) => {
            return (a.isPreferred === b.isPreferred) ? 0 : a.isPreferred ? -1 : 1;
        });

        res.status(200).json(labeledResources);
    } catch (error) {
        console.error('Error fetching customized resources:', error);
        res.status(500).json({ message: 'Server error' });
    }
}



async function getCustomizedResources(req, res) {
  try {
    const userId = req.headers['x-user-id'];
    if (!userId) return res.status(400).json({ error: 'User ID is required' });

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const interests = user.interests.map(tag => tag.toLowerCase());
    const allResources = await Resource.find();

    const prioritized = [];
    const rest = [];

    allResources.forEach(resource => {
      const resourceTags = resource.tags.map(tag => tag.toLowerCase());
      const match = resourceTags.some(tag => interests.includes(tag));
      const resourceObj = { ...resource._doc, isPreferred: match };
      if (match) prioritized.push(resourceObj);
      else rest.push(resourceObj);
    });

    const sortedResources = [...prioritized, ...rest];
    const total = sortedResources.length;
    const paginated = sortedResources.slice(skip, skip + limit);

    res.status(200).json({
      resources: paginated,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}




module.exports = {
    handleAddResource,
    handleDeleteResource,
    handleUpdateResource,
    handleGetResource,
    handleGetAllResources,
    handleGetCustomizedResources,
    getCustomizedResources,
};
