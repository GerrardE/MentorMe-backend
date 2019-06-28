import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import UserController from '../../../controllers/users';

chai.use(chaiHttp);

describe('USER CONTROLLER', () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it('should handle error on REGISTER USER', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await UserController.register({}, res);
    sinon.assert.calledOnce(mock);
  });

  it('should handle error on LOGIN USER', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await UserController.login({}, res);
    sinon.assert.calledOnce(mock);
  });

  it('should handle error on LIST USERS', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await UserController.getUsers({}, res);
    sinon.assert.calledOnce(mock);
  });
});
