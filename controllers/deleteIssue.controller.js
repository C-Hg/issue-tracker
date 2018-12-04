const common = require('./common/issue.common');

exports.delete_issue = async function(req, res) {
    //verify that id was transmitted, error 404 if trying to post with no project specified
    let areRequiredParamsPresent = checkParams(req.body);
    if (!areRequiredParamsPresent){
        res.json({'string': 'Please provide an Id.'});
        return;
    }

    //check that the project and the id exists
    let issue = await common.checkProjectAndIssue(req.params.project, req.body.id)
    if(issue.string) {
        res.json(issue);
        return;
    }

    //deletes the issue
}

function checkParams (params) {
    if ( !params.id ) {
        return false;
    }
    return true;
}