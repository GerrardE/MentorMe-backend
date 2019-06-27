import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { createTestUser, generateToken } from './factory/user-factory';
import createTestQuestion from './factory/question-factory';

chai.use(chaiHttp);
const { expect } = chai;
let userToken, testUser, testQuestion;

describe('CRUD TESTS FOR QUESTION CONTROLLER', () => {
  before(async () => {
    testUser = await createTestUser({});
    userToken = await generateToken({ id: testUser.id });
  });
  before(async () => {
    testQuestion = await createTestQuestion({ userId: testUser.id });
  });
  it('should return success on CREATE question', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/questions')
        .set('Authorization', userToken)
        .send({
          userId: testUser.id,
          title: 'Second ever question',
          tag: 'Business',
          description: 'Qustion body'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.payload).to.be.an('object');
          expect(res.body.message).to.eql('Question posted successfully');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should return success on GET all questions', (done) => {
    try {
      chai.request(app)
        .get('/api/v1/questions')
        .set('Authorization', userToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.payload).to.be.an('object');
          expect(res.body.message).to.eql('Questions retrieved successfully');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should return success on GET questions by tag', (done) => {
    try {
      chai.request(app)
        .get('/api/v1/questions/Business')
        .set('Authorization', userToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.payload).to.be.an('object');
          expect(res.body.message).to.eql('Questions retrieved successfully');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should return success on UPDATE question', (done) => {
    try {
      chai.request(app)
        .put(`/api/v1/questions/${testQuestion.id}`)
        .set('Authorization', userToken)
        .send({
          title: 'Second ever question',
          tag: 'Business',
          description: 'Qustion body'
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.eql('Question updated successfully');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should return success on DELETE question', (done) => {
    try {
      chai.request(app)
        .delete(`/api/v1/questions/${testQuestion.id}`)
        .set('Authorization', userToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.eql('Question deleted successfully');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
});
