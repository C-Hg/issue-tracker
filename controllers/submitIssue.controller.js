const read_functions = require('./database_functions/read.functions');
const create_functions = require('./database_functions/create.functions');

exports.submit_issue = async function(req, res) {
    //verify that project exists, else creates it
    let projectExists = await read_functions.search_project_by_name(req.params.project);  
    
    //mongoose Model.find returns an object, void if no match
    if(Object.keys(projectExists).length === 0){
       projectExists = await create_functions.create_project(req.params.project);
    }

    //creates the new issue, associated to the project with id of the project 
    // without verifying if name already exists
    let issue = await create_functions.create_issue(projectExists[0]._id, req.body)

    //return the issue
    res.json(issue);
    return;
}