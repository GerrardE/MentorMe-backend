import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('TESTS TO SIGNUP ', () => {
  it('should return success on sign up', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          fullName: 'Test Name',
          type: 'Volunteer',
          email: 'test@gmail.com',
          country: 'Ukraine',
          password: 'testpass',
          password2: 'testpass'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.user).to.be.an('object');
          expect(res.body.user.token).to.be.a('string');
          expect(res.body).to.have.property('status');
          expect(res.body.message).to.eql('Registration successful');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
});

describe('TESTS TO LOGIN ', () => {
  it('should return success on LOGIN', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'test@gmail.com',
          password: 'testpass'
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.user).to.be.an('object');
          expect(res.body.user.token).to.be.a('string');
          expect(res.body).to.have.property('status');
          expect(res.body.message).to.eql('Login successful');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should return invalid LOGIN', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'test@gmail.com',
          password: 'testpas'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body.message).to.eql('Invalid email or password');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should return invalid LOGIN', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'tests@gmail.com',
          password: 'testpass'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body.message).to.eql('Invalid email or password');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
});
