const Project = require('../../models/project.model');
const Issue = require('../../models/issue.model');

exports.retrieve_project_by_name = async function (name) {
    try {
        let projectExists = await Project.findOne({ name: name }, function handleSearch(err) {
            if (err) return err;
        })
        return projectExists;
    } catch (e) {
        if (e) console.log("Error while searching project by name");
    }
}

exports.retrieve_issue_by_id = async function (id) {
    try {
        let issueExists = await Issue.findById(id, function handleSearch(err) {
            if (err) return err;
        })
        return issueExists;
    } catch (e) {
        if (e) console.log("Error while searching issue by id");
    }
}

exports.check_project_relation = async function (projectId, issueId) {
    let parentProject = await Project.find

}