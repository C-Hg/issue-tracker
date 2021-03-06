const express = require('express');
const router = express.Router();
const new_issue = require('../controllers/submitIssue.controller');
const update_issue = require('../controllers/updateIssue.controller');
const delete_issue = require('../controllers/deleteIssue.controller');
const retrieve_issues = require('../controllers/retrieveIssues.controller');

router.post('/:project', new_issue.submit_issue);
router.put('/:project', update_issue.update_issue);
router.delete('/:project', delete_issue.delete_issue);
router.get('/:project', retrieve_issues.retrieve_issues);

module.exports = router;