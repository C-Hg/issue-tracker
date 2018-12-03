var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = chai.assert;

chai.use(chaiHttp);

suite('Issue-tracker api', function () {
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

suite('Issue creation on "test" project', function () {
    suite('Every fields filled in', function () {
        test('response includes project_id, issue title, text, creator, assignee, status_text, creation Date, updated Date and status', function (done) {
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
                    assert.property(response, 'project', "should mention the project id");
                    assert.propertyVal(response, 'title', 'Test issue', "should mention the issue title")
                    assert.propertyVal(response, 'text', 'Test text', "should mention the issue text");
                    assert.propertyVal(response, 'creator', 'C-Hg', "should mention the issue creator");
                    assert.propertyVal(response, 'assigned_to', 'nobody', "should mention the assignee");
                    assert.propertyVal(response, 'status_text', 'In QA', "should mention the status text");
                    assert.property(response, 'created_on', "should mention the creation date");
                    assert.property(response, 'updated_on', "should mention the updating date");
                    assert.propertyVal(response, 'open', true, "should mention the open status");

                    done();
                })
        })
    })
})

