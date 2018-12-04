const update_functions = require('./database_functions/update.functions');
const common = require('./common/issue.common');

exports.update_issue = async function (req, res) {
    //verify that required parameters were transmitted, error 404 if trying to post with no project specified
    let areRequiredParamsPresent = checkParams(req.body);
    if (!areRequiredParamsPresent){
        res.json({'string': 'No updated parameters were transmitted, please check your input.'});
        return;
    }

    //verify that project and issue exist
    //updates the issue if an issue_id matching the project is found
    //returns an object(true object with string response if error, or mongodb object without string if successful)
    let issue = await common.checkProjectAndIssue(req.params.project, req.body.id)
    if(issue.string) {
        res.json(issue);
        return;
    }

    //update and responds
    let updatedIssue = await update_functions.update_issue(issue, req.body);
    let response = updatedIssue.toObject();
    response.string = 'Successfully updated!';
    delete response.project;
    delete response.__v;
    res.json(response);
    return;
}

function checkParams (params) {
    if (
        !params.id && 
        !params.issue_title &&
        !params.issue_text && 
        !params.created_by &&
        !params.assigned_to && 
        !params.status_text &&
        !params.close_issue
    ) {
        return false;
    }
    return true;
}

