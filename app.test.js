const request = require('supertest');
const app = require('./app');

describe('GET /mean', function(){
    it('should return the mean of numbers', function(){
        request(app)
            .get('/mean?nums=1,2,3,4')
            .expect(200)
            .expect(function(res){
                expect(res.body).toEqual({operation: "mean", value: 2.5});
            });
    });
});

describe('GET /median', function(){
    it('should return the median of numbers', function(){
        request(app)
            .get('/median?nums=1,2,3,4')
            .expect(200)
            .expect(function(res){
                expect(res.body).toEqual({operation: "median", value: 2.5});
            });
    });
});

describe('GET /mode', function(){
    it('should return the mode of numbers', function(){
        request(app)
            .get('/mode?nums=1,2,3,4,4')
            .expect(200)
            .expect(function(res){
                expect(res.body).toEqual({operation: "mode", value: [4]});
            });
    });
    it('should return 400 for invalid numbers', function(){
        request(app)
            .get('/mode?nums=1,2,3,4,4,hello')
            .expect(400)
            .expect(function(res){
                expect(res.body).toEqual({error: "numbers must be a list of numbers"});
            });
    });
    it('should return 400 for missing numbers', function(){
        request(app)
            .get('/mode')
            .expect(400)
            .expect(function(res){
                expect(res.body).toEqual({error: "numbers are required"});
            });
    });
});

