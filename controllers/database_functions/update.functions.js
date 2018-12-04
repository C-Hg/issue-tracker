const Issue = require('../../models/issue.model');

exports.update_issue = async function (issue, params) {
    if(params.issue_title){
        issue.title = params.issue_title;
    }
    if(params.issue_text){
        issue.text = params.issue_text;
    }
    if(params.created_by){
        issue.creator = params.created_by;
    }
    if(params.assigned_to){
        issue.assigned_to = params.assigned_to;
    }
    if(params.status_text){
        issue.status_text = params.status_text;
    }
    if(params.close_issue){
        issue.open = false;
    }
    issue.updated_on = Date.now();

    try {
        let updatedIssue = await issue.save();
        return updatedIssue;        
    } catch (e) {
        console.log("error while updating issue");
    }
}