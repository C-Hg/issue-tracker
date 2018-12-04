const read_functions = require('./database_functions/read.functions');
const create_functions = require('./database_functions/create.functions');

exports.submit_issue = async function(req, res) {
    //verify that project name and required parameters were transmitted
    let isProjectNamePresent = checkProjectName(req.params.project);
    let areRequiredParamsPresent = checkParams(req.body);

    if (!areRequiredParamsPresent || !isProjectNamePresent){
        res.json({'error': 'One or several required parameters were not transmitted, please use the form'});
        return;
    }

    //verify that project exists, else creates it
    let projectExists = await read_functions.search_project_by_name(req.params.project);
    let projectId = "";
    
    //mongoose Model.find returns an array of objects, void if no match, whereas Model.create returns an object
    if(Object.keys(projectExists).length === 0){
       let newProject = await create_functions.create_project(req.params.project);
       projectId = newProject._id;
    }
    else {
        projectId = projectExists[0]._id; 
    }

    //creates the new issue, associated to the project with id of the project 
    // without verifying if name already exists
    let issue = await create_functions.create_issue(projectId, req.body);
    
    //return the issue informations after cleaning;
    let response = issue.toObject();
    delete response.project;
    delete response.__v;
    res.json(response);
    return;
}

checkProjectName = function (project) {
    if (project){
        return true;
    }
    return false;
}

checkParams = function (params) {
    if (!params.issue_title || !params.issue_text || !params.created_by) {
        return false;
    }
    return true;
}