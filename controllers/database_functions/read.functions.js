const Project = require('../../models/project.model');

exports.search_project_by_name = async function (name) {
    try {
        let projectExists = await Project.find({ name: name }, function handleSearch(err) {
            if (err) return err;
        })
        return projectExists;
    } catch (e) {
        if (e) console.log("Error while searching project by name");
    }
}