import * as Parse from 'parse';

export interface Ticket {
  objectId: string;
  numbers: string;
  drawCount: number;
  picked: boolean;
  createdAt: Date;
};

export const initTicket: Ticket = {
  objectId: null,
  numbers: "23456",
  drawCount: 0,
  picked: false,
  createdAt: null
};

export const ParseTicket: Parse.Object = Parse.Object.extend('Ticket')


export class TicketMapper {
  map(input: Parse.Object): Ticket {
    return {
      objectId: input.id,
      numbers: input.has("number") ? input.get("number") : "",
      drawCount: input.has("drawCount") ? input.get("drawCount") : 0,
      picked: input.has("picked") ? input.get("picked") : false,
      createdAt: input.has("createdAt") ? input.get("createdAt") : Date()
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
