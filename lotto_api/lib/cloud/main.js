/* eslint-disable no-undef */
const TicketController = require('../ticket/ticket.controller');
const DrawController = require('../draw/draw.controller');

Parse.Cloud.beforeSave('Ticket', TicketController.beforeSave(Parse));
Parse.Cloud.beforeSave('Draw', DrawController.beforeSave(Parse));
Parse.Cloud.job('incrementTicketDrawCount', TicketController.incrementDrawCount(Parse));