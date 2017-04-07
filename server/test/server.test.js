const expect = require('expect');
const request = require('supertest');

const {app} = require('./../app');
const {Todo} = require('./../models/todo');
const todos =[{
  todo:"First test"
},{
  todo:"Second test"
}]
beforeEach((done)=>{
    Todo.remove({}).then(()=>{
        return Todo.insertMany(todos);
    }).then(()=>done());
});

describe('POST /todos',()=>{
  it('should create a new todo',(done)=>{
    var todo = 'Test todo text';

    request(app)
    .post('/api/todos')
    .send({todo})
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo).toBe(todo);
    })
    .end((err,res)=>{
      if(err){
        return done(err);
      }


    Todo.find({todo}).then((todos)=>{
      console.log(todos.length);
      expect(todos.length).toBe(1);
      expect(todos[0].todo).toBe(todo);
      done();
    }).catch((e) => done(e));

    });
  });


  it('should not create todo with invalid data',(done)=>{

    request(app)
    .post('/api/todos')
    .send({})
    .expect(400)
    .end((err,res)=>{
      if(err){
        done(err);
      }


    Todo.find().then((res)=>{
      expect(res.length).toBe(2);
      done();
    }).catch((err)=>{
      done(err);
    });
    });
  });



  });
  describe('GET /api/todos',()=>{
    it('should should get all todos',(done)=>{

      request(app)
      .get('/api/todos')
      .expect(200)
      .expect((res)=>{
        console.log(res.body);
        expect(res.body.length).toBe(2);
      }).end(done)
    });
  });
