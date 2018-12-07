const Issue = require('../../models/issue.model');

exports.delete_issue = async function (id) {
    try {
        let response = await Issue.findByIdAndDelete(id);
        if (response) {
            console.log(`Issue #${id} successfully deleted`);
            return({
                'string': `Issue #${id} successfully deleted.`,
                'result': 'Issue successfully deleted.'        
        });
        }
        return({
            'string': `Could not delete issue #${id}.`,
            'result': 'Could not delete issue'
        })
    } catch (e) {
        console.log("error while deleting issue");
    }  
}