import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import QuestionController from '../../../controllers/questions';

chai.use(chaiHttp);

describe('QUESTION CONTROLLER', () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it('should handle error on CREATE question', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await QuestionController.create({}, res);
    sinon.assert.calledOnce(mock);
  });

  it('should handle error on GET a question by TAG', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await QuestionController.get({}, res);
    sinon.assert.calledOnce(mock);
  });

  it('should handle error on GET a question by ID', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await QuestionController.getOne({}, res);
    sinon.assert.calledOnce(mock);
  });

  it('should handle error on GET ALL questions', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await QuestionController.getAll({}, res);
    sinon.assert.calledOnce(mock);
  });

  it('should handle error on UPDATE question', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await QuestionController.update({}, res);
    sinon.assert.calledOnce(mock);
  });

  it('should handle error on DELETE question', async () => {
    const mock = sinon.spy();
    const res = {
      status: () => ({
        json: mock
      })
    };

    await QuestionController.delete({}, res);
    sinon.assert.calledOnce(mock);
  });
});
