import * as Parse from 'parse';
import * as moment from 'moment';

export interface Ticket {
  objectId: string;
  numbers: string;
  drawCount: number;
  picked: boolean;
  createdAt: Date;
  authorization_url?: string;
};

export interface TicketsPaged {
  tickets: Ticket[];
  total: number;
};

const initTicketPage: TicketsPaged = {
  tickets: [],
  total:0
};

export const initTicket: Ticket = {
  objectId: "wus23qw3Ty",
  numbers: "23456",
  drawCount: 0,
  picked: false,
  createdAt: null,
  authorization_url: ''
};

export const ParseTicket: Parse.Object = Parse.Object.extend('Ticket');

function generateRandomTicket(): Ticket {
  const days = Math.floor(Math.random() * 14);
  const date = moment().subtract(days, 'd').startOf('d').toDate();
  return {
    objectId: "wus23qw3Ty",
    numbers: "23456",
    drawCount: Math.floor(Math.random() * 10),
    picked: Math.random() >= 0.5,
    createdAt: date,
    authorization_url: ''
  }
}

export function generateDummyTickets(count: Number): Ticket[] {
  const tickets = [];
  for (let i = 0; i < count; i++) {
    tickets.push(generateRandomTicket());
  }
  return tickets;
}

export function hasExpired(ticket: Ticket): boolean {
  const tda = moment().subtract(3, 'd').startOf('d');
  return ticket.drawCount > 8 || moment(ticket.createdAt).isBefore(tda);
}


export class TicketMapper {
  map(input: Parse.Object): Ticket {
    return {
      objectId: input.id,
      numbers: input.has("number") ? input.get("number") : "",
      drawCount: input.has("drawCount") ? input.get("drawCount") : 0,
      picked: input.has("picked") ? input.get("picked") : false,
      createdAt: input.has("createdAt") ? input.get("createdAt") : Date(),
      authorization_url: input.get('authorization_url')
    }
  }
}

export const ticketMapper: TicketMapper = new TicketMapper();

export interface TicketResponse {
  tickets: Ticket[];
  isLoading: boolean;
  error?: Error;
}

export const initTicketResponse: TicketResponse = {
  tickets: [],
  isLoading: true
}

export interface Draw {
  ticket: Ticket;
  createdAt?: Date;
}

export const initDraw: Draw = {
  ticket: initTicket
}
