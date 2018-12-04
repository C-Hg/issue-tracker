const read_functions = require('./database_functions/read.functions');
const create_functions = require('./database_functions/create.functions');

exports.submit_issue = async function(req, res) {
    //verify that required parameters were transmitted, error 404 if trying to post with no project specified
    let areRequiredParamsPresent = checkParams(req.body);
    if (!areRequiredParamsPresent){
        res.json({'string': 'One or several required parameters were not transmitted, please use the form.'});
        return;
    }

    //verify that project exists, else creates it
    let project = await read_functions.retrieve_project_by_name(req.params.project);
    
    //mongoose Model.find returns an array of objects, void if no match, whereas Model.create returns an object
    //luckily Model.findOne return undefined if no match!
    if(!project){
       project = await create_functions.create_project(req.params.project);
    }

    //creates the new issue, associated to the project with id of the project 
    // without verifying if name already exists
    let issue = await create_functions.create_issue(project._id, req.body);

    //return the issue informations after cleaning;
    let response = issue.toObject();
    delete response.project;
    delete response.__v;
    response.string = `New issue "${response.title}" for project "${req.params.project}" successfully created.`;
    res.json(response);
    return;
}

function checkParams (params) {
    if (!params.issue_title || !params.issue_text || !params.created_by) {
        return false;
    }
    return true;
}