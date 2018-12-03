const express = require('express');
const router = express.Router();
const new_issue = require('../controllers/submitIssue.controller');

router.post('/:project', new_issue.submit_issue)

module.exports = router;