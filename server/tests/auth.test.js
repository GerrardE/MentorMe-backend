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
          firstName: 'Tes',
          lastName: 'Test',
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
