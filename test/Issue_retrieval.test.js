var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = chai.assert;

chai.use(chaiHttp);

suite('Issue retrieval on "Apitest" project', function () {
    before(function () {
        //creates a new valid issue
        chai.request('http://localhost:3000')
            .post('/api/issues/Apitest')
            .type('form')
            .send({
                issue_title: 'Fetch id',
                issue_text: 'Test text',
                created_by: 'C-Hg',
            })
    })
    suite('Retrieve issues correctly', function () {
        test('project with several issues', function (done) {
            chai.request('http://localhost:3000')
                .get('/api/issues/Apitest')
                .end(function (err, res) {
                    let response = JSON.parse(res.text);
                    assert.include(response.string, 'There is currently ');
                    assert.isArray(response.issues);
                    assert.property(response.issues[0], "title");
                    assert.property(response.issues[0], "text");
                    assert.property(response.issues[0], "creator");
                    assert.property(response.issues[0], "assigned_to");
                    assert.property(response.issues[0], "status_text");
                    assert.property(response.issues[0], "created_on");
                    assert.property(response.issues[0], "updated_on");
                    assert.property(response.issues[0], "open");
                    assert.notProperty(response, 'project', "should not mention the project id");
                    assert.notProperty(response, '__v', "should not mention the __v");
                    done();
                })
        })
        let oneIssueId = "";
        before(function () {
            //creates a project with one issue
            chai.request('http://localhost:3000')
                .post('/api/issues/OnlyOneIssueProject')
                .type('form')
                .send({
                    issue_title: 'Only',
                    issue_text: 'One',
                    created_by: 'Issue',
                })
                .end(function (err, res) {
                    let response = JSON.parse(res.text);
                    oneIssueId = response._id;
                })
        })
        test('project with one issue', function (done) {
            chai.request('http://localhost:3000')
                .get('/api/issues/OnlyOneIssueProject')
                .end(function (err, res) {
                    let response = JSON.parse(res.text);
                    assert.isString(res.text, "the response should be a string");
                    assert.include(response.string, "There is currently 1 issues for this project");
                    assert.isArray(response.issues);
                    assert.property(response.issues[0], "title");
                    assert.property(response.issues[0], "text");
                    assert.property(response.issues[0], "creator");
                    assert.property(response.issues[0], "assigned_to");
                    assert.property(response.issues[0], "status_text");
                    assert.property(response.issues[0], "created_on");
                    assert.property(response.issues[0], "updated_on");
                    assert.property(response.issues[0], "open");
                    assert.notProperty(response, 'project', "should not mention the project id");
                    assert.notProperty(response, '__v', "should not mention the __v");                   
                    done();
                })
        })
        //deletes the issue for the next test!
        after('issue created successfully deleted secondarily', function (done) {
            chai.request('http://localhost:3000')
                .delete('/api/issues/OnlyOneIssueProject')
                .type('form')
                .send({
                    id: oneIssueId
                })
                .end(function (err, res) {
                    done();
                })
        })

        //creates a project and deletes its only issue
        before(function () {            
            chai.request('http://localhost:3000')
                .post('/api/issues/NewEmptyProject')
                .type('form')
                .send({
                    issue_title: 'Soon',
                    issue_text: 'To be',
                    created_by: 'Deleted',
                })
                .end(function (err, res) {
                    let response = JSON.parse(res.text);
                    let id = response._id;
                    chai.request('http://localhost:3000')
                        .delete('/api/issues/NewEmptyProject')
                        .type('form')
                        .send({
                            id: id
                        })
                        .end(function (err, res){
                        })
                })
        })
        test('project without issues', function (done) {
            chai.request('http://localhost:3000')
                .get('/api/issues/NewEmptyProject')
                .end(function (err, res) {
                    let response = JSON.parse(res.text);
                    assert.propertyVal(response, 'string', 'This project has no issues registered.', "should respond that the project has no issue");
                    done();
                })

        })
    })

    suite('Rejection when wrong or no data is provided', function () {
        test('the project does not exist', function (done) {
            chai.request('http://localhost:3000')
                .get('/api/issues/ThisProjectStillDoesNotExist')
                .end(function (err, res) {
                    let response = JSON.parse(res.text);
                    assert.propertyVal(response, 'string', 'This project does not exist.', "should respond that the project does not exist");
                    done();
                })
        })
        test('missing project name returns error 404', function (done) {
            chai.request('http://localhost:3000')
                .get('/api/issues/')
                .end(function (err, res) {
                    if (err) throw err;
                    assert.equal(res.status, 404, "should return an error message")
                    done();
                })
        })

    })

})