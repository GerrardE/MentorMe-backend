import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { createTestUser, generateToken } from './factory/user-factory';
import createTestQuestion from './factory/question-factory';

chai.use(chaiHttp);
const { expect } = chai;
let userToken, testUser, testQuestion;

describe('CRUD TESTS FOR REPLY CONTROLLER', () => {
  before(async () => {
    testUser = await createTestUser({});
    userToken = await generateToken({ id: testUser.id });
  });
  before(async () => {
    testQuestion = await createTestQuestion({ userId: testUser.id });
  });
  it('should return success on CREATE reply', (done) => {
    try {
      chai.request(app)
        .post(`/api/v1/questions/${testQuestion.id}/replies`)
        .set('Authorization', userToken)
        .send({
          body: 'valid reply'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.payload).to.be.an('array');
          expect(res.body.message).to.eql('Reply posted successfully');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should return success on GET all replies', (done) => {
    try {
      chai.request(app)
        .get(`/api/v1/questions/${testQuestion.id}/replies`)
        .set('Authorization', userToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.payload).to.be.an('object');
          expect(res.body.message).to.eql('Replies retrieved successfully');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
});
