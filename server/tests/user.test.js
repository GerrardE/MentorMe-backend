import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { expect } = chai;
let userToken;

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
          userToken = res.body.user.token;
          expect(res.body).to.have.property('user');
          expect(res.body.message).to.eql('Registration successful');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return success on UPDATE profile', (done) => {
    try {
      chai.request(app)
        .put('/api/v1/profiles/update')
        .set('Authorization', userToken)
        .send({
          phone: '08137519688'
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.payload).to.be.an('object');
          expect(res.body.message).to.eql('Profile updated successfully');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return USER NOT FOUND on UPDATE a profile', (done) => {
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
          expect(res.body).to.have.property('user');
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
          expect(res.body.errors).to.eql('Invalid email or password');
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
          expect(res.body.errors).to.eql('Invalid email or password');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
});
