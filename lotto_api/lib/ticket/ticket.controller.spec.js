/* eslint-disable no-undef */
const sinon = require('sinon');
const test = require('sinon-test')(sinon);
const Controller = require('./ticket.controller');
const Ticket = require('./ticket.model');
const {
	startParseServer,
	stopParseServer,
	dropDB
} = require('parse-server-test-runner');

describe('TicketController', function () {
	let req = {
			body: {
				id: 'abcd',
				drawCount: 0
			},
			params: {
				id: 'abcd'
			}
		},
		error = new Error({
			error: 'blah blah'
		}),
		res = {},
		expectedResult,
		expectedError;

	describe('create', function () {
		beforeEach(function () {
			res = {
				json: sinon.spy(),
				status: sinon.stub().returns({
					end: sinon.spy()
				}) // to spy res.status(500).end()
			};
		});

		it('should create ticket obj', test(async function () {
			expectedResult = req.body;
			this.stub(Ticket, 'create').returns(expectedResult);
			await Controller.create(req, res);
			sinon.assert.calledWith(Ticket.create, req.body);
			sinon.assert.calledWith(res.json, sinon.match({
				name: req.body.name
			}));
			sinon.assert.calledWith(res.json, sinon.match({
				drawCount: req.body.drawCount
			}));
		}));

		it('should return status 500 on server error', test(function () {
			this.stub(Ticket, 'create').yields(error);
			Controller.create(req, res);
			sinon.assert.calledWith(Ticket.create, req.body);
			sinon.assert.calledWith(res.status, 500);
			sinon.assert.calledOnce(res.status(500).end);
		}));
	});

	describe('index (get all)', function () {
		beforeEach(function () {
			res = {
				json: sinon.spy(),
				status: sinon.stub().returns({
					end: sinon.spy()
				})
			};
			expectedResult = [{}, {}, {}];
		});

		it('should return an array of tickets or an empty array', test(async function () {
			this.stub(Ticket, 'find').returns(expectedResult);
			await Controller.index(req, res);
			sinon.assert.calledWith(Ticket.find, {});
			sinon.assert.calledWith(res.json, sinon.match.array);
		}));

		it('should return status 500 on server error', test(function () {
			this.stub(Ticket, 'find').yields(error);
			Controller.index(req, res);
			sinon.assert.calledWith(Ticket.find, {});
			sinon.assert.calledWith(res.status, 500);
			sinon.assert.calledOnce(res.status(500).end);
		}));
	});

	describe('get', function () {
		beforeEach(function () {
			res = {
				json: sinon.spy(),
				status: sinon.stub().returns({
					end: sinon.spy()
				})
			};
			expectedResult = req.body;
		});

		it('should return ticket obj', test(async function () {
			this.stub(Ticket, 'findById').returns(expectedResult);
			await Controller.get(req, res);
			sinon.assert.calledWith(Ticket.findById, req.params.id);
			sinon.assert.calledWith(res.json, sinon.match({
				name: req.body.name
			}));
			sinon.assert.calledWith(res.json, sinon.match({
				drawCount: req.body.drawCount
			}));
		}));
		it('should return 404 for non-existing ticket id', test(async function () {
			this.stub(Ticket, 'findById').returns(null);
			await Controller.get(req, res);
			sinon.assert.calledWith(Ticket.findById, req.params.id);
			sinon.assert.calledWith(res.status, 404);
			sinon.assert.calledOnce(res.status(404).end);
		}));
		it('should return status 500 on server error', test(async function () {
			this.stub(Ticket, 'findById').yields(error);
			await Controller.get(req, res);
			sinon.assert.calledWith(Ticket.findById, req.params.id);
			sinon.assert.calledWith(res.status, 500);
			sinon.assert.calledOnce(res.status(500).end);
		}));
	});

	describe('destroy', function () {
		beforeEach(function () {
			res = {
				json: sinon.spy(),
				status: sinon.stub().returns({
					end: sinon.spy()
				})
			};
		});

		it('should return successful deletion message', test(async function () {
			this.stub(Ticket, 'findByIdAndRemove').returns({});
			await Controller.destroy(req, res);
			sinon.assert.calledWith(Ticket.findByIdAndRemove, req.params.id);
			sinon.assert.calledWith(res.json, sinon.match({
				'message': 'Ticket deleted successfully!'
			}));
		}));

		it('should return 404 for non-existing ticket id', test(async function () {
			this.stub(Ticket, 'findByIdAndRemove').returns(null);
			await Controller.destroy(req, res);
			sinon.assert.calledWith(Ticket.findByIdAndRemove, req.params.id);
			sinon.assert.calledWith(res.status, 404);
			sinon.assert.calledOnce(res.status(404).end);
		}));
		it('should return status 500 on server error', test(async function () {
			this.stub(Ticket, 'findByIdAndRemove').yields(expectedError);
			await Controller.destroy(req, res);
			sinon.assert.calledWith(Ticket.findByIdAndRemove, req.params.id);
			sinon.assert.calledWith(res.status, 500);
			sinon.assert.calledOnce(res.status(500).end);
		}));
	});

	describe('update', function () {
		beforeEach(function () {
			res = {
				json: sinon.spy(),
				status: sinon.stub().returns({
					end: sinon.spy()
				})
			};
			expectedResult = req.body;
		});
		it('should return updated ticket obj', test(async function () {
			this.stub(Ticket, 'findByIdAndUpdate').returns(expectedResult);
			await Controller.update(req, res);
			sinon.assert.calledWith(Ticket.findByIdAndUpdate, req.params.id, req.body);
			sinon.assert.calledWith(res.json, sinon.match({
				name: req.body.name
			}));
			sinon.assert.calledWith(res.json, sinon.match({
				drawCount: req.body.drawCount
			}));
		}));
		it('should return 404 for non-existing ticket id', test(async function () {
			this.stub(Ticket, 'findByIdAndUpdate').returns(null);
			await Controller.update(req, res);
			sinon.assert.calledWith(Ticket.findByIdAndUpdate, req.params.id, req.body);
			sinon.assert.calledWith(res.status, 404);
			sinon.assert.calledOnce(res.status(404).end);
		}));
		it('should return status 500 on server error', test(async function () {
			this.stub(Ticket, 'findByIdAndUpdate').yields(error);
			await Controller.update(req, res);
			sinon.assert.calledWith(Ticket.findByIdAndUpdate, req.params.id, req.body);
			sinon.assert.calledWith(res.status, 500);
			sinon.assert.calledOnce(res.status(500).end);
		}));
	});
});