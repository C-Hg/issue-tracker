User stories
===

* [x] Prevent cross site scripting(XSS attack).
* [x] I can POST /api/issues/{projectname} with form data containing required issue_title, issue_text, created_by, and optional assigned_to and status_text.
* [x] The object saved (and returned) will include all of those fields (blank for optional no input) and also include created_on(date/time), updated_on(date/time), open(boolean, true for open, false for closed), and _id.
* [x] I can PUT /api/issues/{projectname} with a _id and any fields in the object with a value to update said object. Returned will be 'successfully updated' or 'could not update '+_id. This should always update updated_on. If no fields are sent return 'no updated field sent'.
* [x] I can DELETE /api/issues/{projectname} with a _id to completely delete an issue. If no _id is sent return '_id error', success: 'deleted '+_id, failed: 'could not delete '+_id.
* [x] I can GET /api/issues/{projectname} for an array of all issues on that specific project with all the information for each issue as was returned when posted.
* I can filter my get request by also passing along any field and value in the query(ie. /api/issues/{project}?open=false). I can pass along as many fields/values as I want.
* All tests are complete and passing.

## To launch the app locally
* Clone the repository 
* Install mongodb and start it (<code>sudo service mongod start</code>).
* From the project repository, run <code>npm start</code> and go to http://localhost:3000.
* Run tests with <code>npm test</code> (mocha must be installed globally).