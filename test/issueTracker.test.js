const chai = require('chai');
const assert = chai.assert();
const expect = chai.expect();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Issue-tracker api', function () {
    suite('Issue creation on "test" project', function () {
        suite('Every fields filled in', function () {
            chai.request('http://localhost:3000')
                .post('/api/issues/Apitest')
                .send({
                    issue_title: 'Test-issue',
                    issue_text: 'Test text',
                    created_by: 'C-Hg',
                    assigned_to: 'nobody',
                    status_text: 'In QA'
                })
                .end(function (err, res){
                    test('status response 200', function(){
                        assert.equal(res.status, 200);
                    })
                    test('response includes project_name', function(){
                        assert.include(res.text, '"project_name":"Apitest"');
                    })
                    test('response includes issue_title', function(){
                        assert.include(res.text, '"issue_title":"Test-issue"');
                    })
                    test('response includes issue_text', function(){
                        assert.include(res.text, '"issue_title":"Test text"');
                    })
                    test('response includes created_by', function(){
                        assert.include(res.text, '"created_by":"C-Hg"');
                    })
                    test('response includes assigned_to', function(){
                        assert.include(res.text, '"assigned_to":"nobody"');
                    })
                    test('response includes assigned_to', function(){
                        assert.include(res.text, '"status_text":"In QA"');
                    })

                })
        })

    })
})