const Project = require('../../models/project.model');
const Issue = require('../../models/issue.model')

exports.create_project = async function (name) {
    try {
        let newProject = await new Promise((resolve, reject) => {
            Project.create({ name: name }, function handleCreate(err, res) {
                if (err) reject(err);
                console.log(`New project (${name}) created`);
                resolve(res);
            })
        });
        return newProject;
    } catch (e) {
        if (e) console.log("Error while creating new project");
    }
}

exports.create_issue = async function (projectId, params) {
    try {
        let newIssue = await new Promise((resolve, reject) => {          
            Issue.create({
                project: projectId,
                title: params.issue_title,
                text: params.issue_text,
                creator: params.created_by,
                assigned_to: params.assigned_to,
                status_text: params.status_text
            },function handleCreate(err, res) {
                if (err) reject(err);
                console.log(`New issue (${params.issue_title}) created`);
                resolve(res);
            })
        });
        return newIssue;
    } catch (e) {
        if (e) console.log("Error while creating new issue");
    }
}