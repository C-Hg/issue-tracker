const Issue = require('../../models/issue.model');

exports.delete_issue = async function (id) {
    try {
        let response = await Issue.findByIdAndDelete(id);
        if (response) {
            console.log('Issue successfully deleted');
            return({'string': "Issue successfully deleted."});
        }
        return({'string': "Error while deleting issue."})
    } catch (e) {
        console.log("error while deleting issue");
    }  
}