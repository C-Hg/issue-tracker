const read_functions = require('./database_functions/read.functions');
const Issue = require('../models/issue.model');

exports.retrieve_issues = async function (req, res) {
    //check that project exists
    let project = "";
    try {
        project = await read_functions.retrieve_project_by_name(req.params.project);
    } catch (e) {
        console.log("error while retrieving project from controller retrieve_issues");
    }
    if (!project) {
        res.json({ 'string': 'This project does not exist.' });
        return;
    }

    //get all issues
    try {
        let issues = await Issue.find({ project: project._id });
        if (issues.length == 0){
            res.json({
                string: "This project has no issues registered."
            })
            return;
        }
        
        //the conversion to proper objects and not mongodb documents allows testing
        let arrayOfIssues = convertIssues(issues);
        res.json({
            string: `There are currently ${issues.length} issues for this project, see below for details.`,
            issues: arrayOfIssues
        });
        return;
    } catch (e) {
        console.log("error while retrieving issues from controller retrieve_issues");
    }
}

function convertIssues(issues) {
    let newArr = [];
    let counter = 0;
    while (counter < issues.length){
        let issue = issues[counter];
        issue = issue.toObject();
        delete issue.__v;
        delete issue.project;
        newArr.push(issue);
        counter++
    }
    return newArr;
}