import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import ProfileController from '../../../controllers/profiles';

chai.use(chaiHttp);

describe('PROFILE CONTROLLER', () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it('should handle error on GET profile', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        send: mock
      })
    };

    await ProfileController.getProfile({}, res);
    sinon.assert.calledOnce(mock);
  });

  it('should handle error on UPDATE profile', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        send: mock
      })
    };

    await ProfileController.updateProfile({}, res);
    sinon.assert.calledOnce(mock);
  });
});
