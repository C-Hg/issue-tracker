const read_functions = require('../database_functions/read.functions');

exports.checkProjectAndIssue = async function (projectName, issueId) {
    let project = "";
    let issue = "";

    try {
        project = await read_functions.retrieve_project_by_name(projectName);
        if (!project) {
            return ({ 'string': 'This project does not exist.' })
        }
    } catch (e) {
        console.log("error while retrieving project");
    }

    try {
        issue = await read_functions.retrieve_issue_by_id(issueId);
        if (!issue) {
            return ({ 'string': 'This issue does not exist.' });
        }
    } catch (e) {
        console.log("error while retrieving issue");
    }

    if (project._id.toString() != issue.project.toString()) {
        return ({ 'string': 'This issue is not related to the project mentioned' });
    }
    return issue;
}
