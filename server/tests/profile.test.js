import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { createTestUser, generateToken } from './factory/user-factory';

chai.use(chaiHttp);
const { expect } = chai;
let userToken, testUser;

describe('CRUD TESTS FOR PROFILE CONTROLLER', () => {
  before(async () => {
    testUser = await createTestUser({});
    userToken = await generateToken({ testUser });
  });
  it('should return success on GET a profile', (done) => {
    try {
      chai.request(app)
        .get(`/api/v1/profiles/${testUser.id}`)
        .set('Authorization', userToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.payload).to.be.an('object');
          expect(res.body.message).to.eql('Profile retrieved successfully');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should return USER NOT FOUND on GET a profile', (done) => {
    try {
      chai.request(app)
        .get(`/api/v1/profiles/${1000}`)
        .set('Authorization', userToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.errors).to.eql('User does not exist');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should return fail on GET a profile', (done) => {
    try {
      chai.request(app)
        .get(`/api/v1/profiles/${1000}`)
        .set('Authorization', userToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.errors).to.eql('User does not exist');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
});
