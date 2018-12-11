/* eslint-disable no-undef */
const TicketController = require('../ticket/ticket.controller');
const DrawController = require('../draw/draw.controller');
const PaymentController = require('../payment/payment.controller');

Parse.Cloud.beforeSave('Ticket', TicketController.beforeSave(Parse));
Parse.Cloud.afterSave('Ticket', TicketController.afterSave(Parse));
Parse.Cloud.beforeSave('Draw', DrawController.beforeSave(Parse));
Parse.Cloud.beforeSave('Payment', PaymentController.beforeSave(Parse));
Parse.Cloud.job('incrementTicketDrawCount', TicketController.incrementDrawCount(Parse));