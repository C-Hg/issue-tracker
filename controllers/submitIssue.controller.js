const read_functions = require('./database_queries/read.functions');

exports.submit_issue = function(req, res) {
    //verify that project exists, else creates it
    let projectExists = await read_functions.search_project_by_name(req.params.project);
    if(!projectExists){
       projectExist = await create_functions.create_project(req.params.project);
    }

    //save the issue with new id, associated to the project with id of the project 
    // without verifying if name already exists

    //return the issue
    console.log(req.params);
    console.log(req.body);
    console.log(req.body.issue_title);
    return;
}