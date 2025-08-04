const Opportunity = require('../models/opportunityModel');
const User = require('../models/userModel');

async function handleAddOpportunity(req, res) {
    try {
        const opportunity = new Opportunity(req.body);
        const saved = await opportunity.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add opportunity', details: error.message });
    }
}

async function handleGetAllOpportunities(req, res) {
    try {
        const opportunities = await Opportunity.find();
        res.status(200).json(opportunities);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch opportunities', details: error.message });
    }
}

async function handleGetOpportunity(req, res) {
    try {
        const opportunity = await Opportunity.findById(req.params.id);
        if (!opportunity) return res.status(404).json({ error: 'Opportunity not found' });
        res.status(200).json(opportunity);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch opportunity', details: error.message });
    }
}

async function handleUpdateOpportunity(req, res) {
    try {
        const updated = await Opportunity.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ error: 'Opportunity not found' });
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update opportunity', details: error.message });
    }
}

async function handleDeleteOpportunity(req, res) {
    try {
        const deleted = await Opportunity.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Opportunity not found' });
        res.status(200).json({ message: 'Opportunity deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete opportunity', details: error.message });
    }
}

async function getCustomizedOpportunities(req, res) {
  const userId = req.header('x-user-id');

  if (!userId) {
    return res.status(400).json({ message: 'User ID missing in headers' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const userInterests = Array.isArray(user.interests)
      ? user.interests.map(i => i.toLowerCase())
      : [];

    const allOpportunities = await Opportunity.find({});

    const customized = allOpportunities.map(opp => {
      const opportunitySkills = Array.isArray(opp.skills)
        ? opp.skills.map(skill => skill.toLowerCase())
        : [];

      const isPreferred = opportunitySkills.some(skill => userInterests.includes(skill));

      return {
        ...opp.toObject(),
        isPreferred
      };
    });

    customized.sort((a, b) => {
      return (b.isPreferred === true) - (a.isPreferred === true);
    });

    res.json(customized);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching opportunities' });
  }
}

module.exports = {
    handleAddOpportunity,
    handleUpdateOpportunity,
    handleDeleteOpportunity,
    handleGetOpportunity,
    handleGetAllOpportunities,
    getCustomizedOpportunities
};
