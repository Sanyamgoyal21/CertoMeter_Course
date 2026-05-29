const express = require('express');
const { trackVisitor, getStats } = require('../controllers/analyticsController');

const router = express.Router();

router.post('/track', trackVisitor);
router.get('/stats', getStats);

module.exports = router;
