const expect = require('expect');
const request = require('supertest');

const {app} = require('./../app');
var mongojs = require('mongojs');
mongojs.Promise = global.Promise;
var db = mongojs('mongodb://localhost:27017/meantodo', ['todos']);

beforeEach((done)=>{
    db.todos.remove({}).then(()=>done());
});

describe('POST /todos',()=>{
  it('should create a new todo',(done)=>{
    var text = 'Test todo text';

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res)=>{
      expect(res.body.text).toBe(text);
    })
    .end((err,res)=>{
      if(err){
        return done(err);
      }


    router.find().then((todos)=>{
      console.log(todos.length);
      expect(todos.length).toBe(1);
      expect(todos[0].text).toBe(text);
      done();
    }).catch((e) => done(e));

    });
  });


  it('should not create todo with invalid data',(done)=>{

    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err,res)=>{
      if(err){
        done(err);
      }


    router.find().then((res)=>{
      expect(res.length).toBe(0);
      done();
    }).catch((err)=>{
      done(err);
    });
    });
  });

  });
