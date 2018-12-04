var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = chai.assert;

chai.use(chaiHttp);

suite('Homepage', function () {
    test('Homepage responds', function (done) {
        chai.request('http://localhost:3000')
            .get('/')
            .end(function (err, res) {
                if (err) throw err;
                assert.equal(res.status, 200);
                done();
            })
    })
})

suite('Issue creation on "Apitest" project', function () {
    suite('Every fields filled in', function () {
        test('response includes issue id, title, text, creator, assignee, status_text, creation Date, updated Date and open status; excludes __v and project_id', function (done) {
            chai.request('http://localhost:3000')
                .post('/api/issues/Apitest')
                .type('form')
                .send({
                    issue_title: 'Test issue',
                    issue_text: 'Test text',
                    created_by: 'C-Hg',
                    assigned_to: 'nobody',
                    status_text: 'In QA'
                })
                .end(function (err, res) {
                    if (err) throw err;
                    let response = JSON.parse(res.text);
                    assert.notProperty(response, 'project', "should not mention the project id");
                    assert.notProperty(response, '__v', "should not mention the __v");
                    assert.property(response, '_id', "should mention the issue id");
                    assert.propertyVal(response, 'title', 'Test issue', "should mention the issue title")
                    assert.propertyVal(response, 'text', 'Test text', "should mention the issue text");
                    assert.propertyVal(response, 'creator', 'C-Hg', "should mention the issue creator");
                    assert.propertyVal(response, 'assigned_to', 'nobody', "should mention the assignee");
                    assert.propertyVal(response, 'status_text', 'In QA', "should mention the status text");
                    assert.property(response, 'created_on', "should mention the creation date");
                    assert.property(response, 'updated_on', "should mention the updating date");
                    assert.propertyVal(response, 'open', true, "should mention the open status");
                    assert.propertyVal(response, 'string', "New issue \"Test issue\" for project \"Apitest\" successfully created.", "should send the successful string response");
                    done();
                })
        })
    })
    suite('Only required fields filled in', function () {
        test('response includes issue id, title, text, creator, assignee, status_text, creation Date, updated Date and open status; excludes __v and project_id', function (done) {
            chai.request('http://localhost:3000')
                .post('/api/issues/Apitest')
                .type('form')
                .send({
                    issue_title: 'Test issue',
                    issue_text: 'Test text',
                    created_by: 'C-Hg'
                })
                .end(function (err, res) {
                    if (err) throw err;
                    let response = JSON.parse(res.text);
                    assert.notProperty(response, 'project', "should not mention the project id");
                    assert.notProperty(response, '__v', "should not mention the __v");
                    assert.property(response, '_id', "should mention the issue id");
                    assert.propertyVal(response, 'title', 'Test issue', "should mention the issue title")
                    assert.propertyVal(response, 'text', 'Test text', "should mention the issue text");
                    assert.propertyVal(response, 'creator', 'C-Hg', "should mention the issue creator");
                    assert.propertyVal(response, 'assigned_to', '', "should mention the assignee");
                    assert.propertyVal(response, 'status_text', '', "should mention the status text");
                    assert.property(response, 'created_on', "should mention the creation date");
                    assert.property(response, 'updated_on', "should mention the updating date");
                    assert.propertyVal(response, 'open', true, "should mention the open status");
                    assert.propertyVal(response, 'string', "New issue \"Test issue\" for project \"Apitest\" successfully created.", "should send the successful string response");
                    done();
                })
        })
    })
    suite('Missing required field', function () {
        test('Missing issue title returns error message', function (done) {
            chai.request('http://localhost:3000')
                .post('/api/issues/Apitest')
                .type('form')
                .send({
                    issue_text: 'Test text',
                    created_by: 'C-Hg'
                })
                .end(function (err, res) {
                    if (err) throw err;
                    let response = JSON.parse(res.text);
                    assert.propertyVal(response, 'string', 'One or several required parameters were not transmitted, please use the form.', "should return an error message")
                    done();
                })
        })

        test('Missing issue text returns error message', function (done) {
            chai.request('http://localhost:3000')
                .post('/api/issues/Apitest')
                .type('form')
                .send({
                    issue_title: 'Test issue',
                    created_by: 'C-Hg'
                })
                .end(function (err, res) {
                    if (err) throw err;
                    let response = JSON.parse(res.text);
                    assert.propertyVal(response, 'string', 'One or several required parameters were not transmitted, please use the form.', "should return an error message")
                    done();
                })
        })

        test('Missing creator returns error message', function (done) {
            chai.request('http://localhost:3000')
                .post('/api/issues/Apitest')
                .type('form')
                .send({
                    issue_title: 'Test issue',
                    issue_text: 'Test text',
                })
                .end(function (err, res) {
                    if (err) throw err;
                    let response = JSON.parse(res.text);
                    assert.propertyVal(response, 'string', 'One or several required parameters were not transmitted, please use the form.', "should return an error message")
                    done();
                })
        })
        test('Missing project name returns error 404', function (done) {
            chai.request('http://localhost:3000')
                .post('/api/issues/')
                .type('form')
                .send({
                    issue_title: 'Test issue',
                    issue_text: 'Test text',
                    created_by: 'C-Hg'
                })
                .end(function (err, res) {
                    if (err) throw err;
                    assert.equal(res.status, 404, "should return an error message")
                    done();
                })
        })
    })
})

