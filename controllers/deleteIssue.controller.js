const common = require('./common/issue.common');
const delete_function = require('./database_functions/delete.functions');

exports.delete_issue = async function (req, res) {
    //verify that id was transmitted, error 404 if trying to post with no project specified
    let areRequiredParamsPresent = checkParams(req.body);
    if (!areRequiredParamsPresent) {
        res.json({ 'string': 'Please provide an Id.' });
        return;
    }

    //check that the project and the id exists
    let issue = ""
    try {
        issue = await common.checkProjectAndIssue(req.params.project, req.body.id)
        if (issue.string) {
            res.json(issue);
            return;
        }
    } catch (e) {
        console.log("error while checking project and issue relation from function delete_issue");
    }

    //deletes the issue
    try {
        let response = await delete_function.delete_issue(req.body.id);
        res.json(response);
        return;
    } catch (e) {
        console.log("error while deleting the issue from delete_issue controller");
    }   
}

function checkParams(params) {
    if (!params.id) {
        return false;
    }
    return true;
}