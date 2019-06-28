import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import ReplyController from '../../../controllers/reply';
import validReply from '../../../validations/reply';

chai.use(chaiHttp);

describe('REPLY CONTROLLER', () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });
  afterEach(() => {
    sandbox.restore();
  });

  // it.only('should handle VALIDATION error on CREATE REPLY', async () => {
  //   const stubFunc = {
  //     validReply: {
  //     }
  //   };
  //   const req = sinon.spy();

  //   const mock = sinon.spy();
  //   const res = {
  //     status: () => ({
  //       json: mock
  //     })
  //   };
  //   sandbox.stub(stubFunc, 'validReply').rejects('Reject');

  //   await ReplyController.create({}, res);
  //   sinon.assert.calledOnce(mock);
  // });

  it('should handle error on CREATE REPLY', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await ReplyController.create({}, res);
    sinon.assert.calledOnce(mock);
  });

  it('should handle error on GET ALL REPLIES', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await ReplyController.get({}, res);
    sinon.assert.calledOnce(mock);
  });
});
