const express = require('express');
const { submitLead, getLeads } = require('../controllers/leadsController');

const router = express.Router();

router.post('/submit', submitLead);
router.get('/', getLeads);

module.exports = router;
