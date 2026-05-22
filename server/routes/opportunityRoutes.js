const express = require('express');
const router = express.Router(); 
const {
    handleAddOpportunity,
    handleGetOpportunity,
    handleDeleteOpportunity,
    handleUpdateOpportunity,
    handleGetAllOpportunities,
    getCustomizedOpportunities
} = require('../controllers/opportunityController');

router.post('/opportunity', handleAddOpportunity);
router.get('/opportunity/:id', handleGetOpportunity);
router.delete('/opportunity/:id', handleDeleteOpportunity);
router.put('/opportunity/:id', handleUpdateOpportunity);
router.get('/opportunity', handleGetAllOpportunities);

router.get('/customized', getCustomizedOpportunities);

module.exports = router;
