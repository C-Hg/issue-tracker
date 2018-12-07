var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = chai.assert;

chai.use(chaiHttp);

suite('Issue update on "Apitest" project', function () {
    let validId = "";
    let updateDate = "";
    before(function () {
        //fetches a new valid issue id
        chai.request('http://localhost:3000')
            .post('/api/issues/Apitest')
            .type('form')
            .send({
                issue_title: 'Fetch id',
                issue_text: 'Test text',
                created_by: 'C-Hg',
            })
            .end(function (err, res) {
                let response = JSON.parse(res.text);
                validId = response._id;
                updateDate = response.updated_on;
            });

    })
    suite('Successfully updates when data is provided', function () {
        test('update all fields', function (done) {
            chai.request('http://localhost:3000')
                .put('/api/issues/Apitest')
                .type('form')
                .send({
                    id: validId,
                    issue_title: "Updated title",
                    issue_text: 'Replaced Test text',
                    created_by: 'C-Hg 2',
                    assigned_to: 'hard worker',
                    status_text: 'In QA',
                    close_issue: true
                })
                .end(function (err, res) {
                    if (err) throw err;
                    let response = JSON.parse(res.text);
                    assert.propertyVal(response, 'title', 'Updated title', "should have updated title")
                    assert.propertyVal(response, 'text', 'Replaced Test text', "should have updated text");
                    assert.propertyVal(response, 'creator', 'C-Hg 2', "should have updated creator");
                    assert.propertyVal(response, 'assigned_to', 'hard worker', "should have updated assignee");
                    assert.propertyVal(response, 'status_text', 'In QA', "should have updated status text");
                    assert.notPropertyVal(response, 'updated_on', updateDate, "should have updated updated_on");
                    assert.propertyVal(response, 'open', false, "should have updated open status");
                    assert.propertyVal(response, 'string', 'Successfully updated!', "should responds successfully");
                    done();
                })
        })
        test('update only one field', function (done) {
            chai.request('http://localhost:3000')
                .put('/api/issues/Apitest')
                .type('form')
                .send({
                    id: validId,
                    issue_title: "Updated again title"
                })
                .end(function (err, res) {
                    if (err) throw err;
                    let response = JSON.parse(res.text);
                    assert.propertyVal(response, 'title', 'Updated again title', "should have updated title")
                    assert.propertyVal(response, 'text', 'Replaced Test text', "should not have updated text");
                    assert.propertyVal(response, 'creator', 'C-Hg 2', "should not have updated creator");
                    assert.propertyVal(response, 'assigned_to', 'hard worker', "should not have updated assignee");
                    assert.propertyVal(response, 'status_text', 'In QA', "should not have updated status text");
                    assert.notPropertyVal(response, 'updated_on', updateDate, "should have updated updated_on");
                    assert.propertyVal(response, 'open', false, "should not have updated open status");
                    assert.propertyVal(response, 'string', 'Successfully updated!', "should responds successfully");
                    done();
                })
        })
    })
    suite('Rejection when wrong or no data is provided', function () {
        test('the project does not exist', function (done) {
            chai.request('http://localhost:3000')
                .put('/api/issues/FarTooLongAndMeaninglessName')
                .type('form')
                .send({
                    _id: validId,
                    issue_title: "Nevermind me"
                })
                .end(function (err, res) {
                    if (err) throw err;
                    let response = JSON.parse(res.text);
                    assert.propertyVal(response, 'string', 'This project does not exist.', "should respond that the project does not exist");
                    done();
                })
        })
        test('the id does not exist', function (done) {
            chai.request('http://localhost:3000')
                .put('/api/issues/Apitest')
                .type('form')
                .send({
                    _id: "thisiddoesnotexist666",
                    issue_title: "Nevermind me"
                })
                .end(function (err, res) {
                    if (err) throw err;
                    let response = JSON.parse(res.text);
                    assert.propertyVal(response, 'string', 'This issue does not exist.', "should respond that the project does not exist");
                    done();
                })
        })

        test('no data to update given', function (done) {
            chai.request('http://localhost:3000')
                .put('/api/issues/Apitest')
                .type('form')
                .send({
                    _id: validId
                })
                .end(function (err, res) {
                    if (err) throw err;
                    let response = JSON.parse(res.text);
                    assert.propertyVal(response, 'string', 'No updated parameters were transmitted, please check your input.', "should responds that no updates were sent");
                    done();
                })
        })
        test('Missing project name returns error 404', function (done) {
            chai.request('http://localhost:3000')
                .put('/api/issues/')
                .type('form')
                .send({
                    _id: validId,
                    issue_title: "Updated again title"
                })
                .end(function (err, res) {
                    if (err) throw err;
                    assert.equal(res.status, 404, "should return an error message")
                    done();
                })
        })
    })
});