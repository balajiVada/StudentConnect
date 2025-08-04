const express = require('express');
const { handleAddResource, handleGetResource, handleDeleteResource, handleUpdateResource, handleGetAllResources, handleGetCustomizedResources, getCustomizedResources} = require('../controllers/resourceController');
const extractUser = require('../middlewares/resourceMiddleware');

const router = express.Router();

router.get('/resource/customized', extractUser, getCustomizedResources);
router.post('/resource', handleAddResource);
router.get('/resource/:id', handleGetResource);
router.delete('/resource/:id', handleDeleteResource);
router.put('/resource/:id', handleUpdateResource);
router.get('/resource', handleGetAllResources);


module.exports = router;