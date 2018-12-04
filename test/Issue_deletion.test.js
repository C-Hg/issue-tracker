var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = chai.assert;

chai.use(chaiHttp);

suite('Issue deletion on "Apitest" project', function(){
    let validId = "";
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
            });
    })

    suite('Deletes successfully with a valid id', function(){
        test('deletion of the issue', function(done){
            chai.request('http://localhost:3000')
            .delete('/api/issues/Apitest')
            .type('form')
            .send({
                id: validId
            })
            .end(function (err, res) {
                let response = JSON.parse(res.text);
                assert.propertyVal(response, 'string', 'Issue successfully deleted.', "should respond that the issue has been deleted");
                done();
            });
        })
    })
    suite('Rejection when wrong or no data is provided.', function () {
        test('the project does not exist', function(done){
            chai.request('http://localhost:3000')
            .delete('/api/issues/FarTooLongAndMeaninglessName')
            .type('form')
            .send({
                id: validId,
            })
            .end(function (err, res) {
                let response = JSON.parse(res.text);
                assert.propertyVal(response, 'string', 'This project does not exist.', "should respond that the project does not exist");
                done();
            })
        })
        test('the id does not exist', function (done) {
            chai.request('http://localhost:3000')
                .delete('/api/issues/Apitest')
                .type('form')
                .send({
                    id: "thisiddoesnotexist666",
                })
                .end(function (err, res) {
                    if (err) throw err;
                    let response = JSON.parse(res.text);
                    assert.propertyVal(response, 'string', 'This issue does not exist.', "should respond that the project does not exist");
                    done();
                })
        })
        test('no id provided', function (done) {
            chai.request('http://localhost:3000')
                .delete('/api/issues/Apitest')
                .type('form')
                .send({
                })
                .end(function (err, res) {
                    if (err) throw err;
                    let response = JSON.parse(res.text);
                    assert.propertyVal(response, 'string', 'Please provide an Id.', "should respond that no Id was provided");
                    done();
                })
        })

        test('missing project name returns error 404', function (done) {
            chai.request('http://localhost:3000')
                .delet('/api/issues/')
                .type('form')
                .send({
                    _id: validId
                })
                .end(function (err, res) {
                    if (err) throw err;
                    assert.equal(res.status, 404, "should return an error message")
                    done();
                })
        })
    })
})