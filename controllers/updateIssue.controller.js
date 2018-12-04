const read_functions = require('./database_functions/read.functions');
const update_functions = require('./database_functions/update.functions');

exports.update_issue = async function (req, res) {
    //verify that required parameters were transmitted, error 404 if trying to post with no project specified
    let areRequiredParamsPresent = checkParams(req.body);
    if (!areRequiredParamsPresent){
        res.json({'string': 'No updated parameters were transmitted, please check your input.'});
        return;
    }

    //verify that project and issue exist
    //updates the issue if an issue_id matching the project is found
    let project = await read_functions.retrieve_project_by_name(req.params.project);
    if(!project){
        res.json({'string': 'This project does not exist.'})
        return;
     }
    
    let issue = await read_functions.retrieve_issue_by_id(req.body.id);
     if(!issue){
        res.json({'string': 'This issue does not exist.'});
        return;
    }

    let issueAndProjectAreRelated = checkProjectRelation(project._id, issue.project);
    if(!issueAndProjectAreRelated) {
        res.json({'string': 'This issue is not related to the project mentioned'});
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

function checkProjectRelation (projectId, IdOfparentProject) {
    if (projectId.toString() === IdOfparentProject.toString()) {
        return true;
    }
    return false;
}