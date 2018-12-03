const Project = require('../../models/project.model');

exports.search_project_by_name = async function (name) {
    try {
        let newProject = await new Promise((resolve, reject) => {
            Project.create({ name: name }, function handleSearch(err, res) {
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