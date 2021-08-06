import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import {
  Project,
  Ticket,
  TicketPriority,
  TicketType,
  User,
} from "../../utils/types";

const slice = createSlice({
  name: "ticket",
  initialState: { loading: false, tickets: [] as Ticket[] },
  reducers: {
    ticketsLoading: (state, _action: PayloadAction) => {
      if (state.loading === false) {
        state.loading = true;
      }
    },
    ticketsReceived: (state, action: PayloadAction<Ticket[]>) => {
      if (state.loading === true) {
        state.loading = false;
        state.tickets = [...state.tickets, ...action.payload];
        state.tickets.sort((x, y) => {
          return x.completed === y.completed ? 0 : x.completed ? 1 : -1;
        });
      }
    },
    ticketCreating: (state, _action: PayloadAction) => {
      if (state.loading === false) {
        state.loading = true;
      }
    },
    ticketCreated: (state, action: PayloadAction<Ticket>) => {
      if (state.loading === true) {
        state.loading = false;
        state.tickets.push(action.payload);
        state.tickets.sort((x, y) => {
          return x.completed === y.completed ? 0 : x.completed ? 1 : -1;
        });
      }
    },
    ticketUpdated: (state, action: PayloadAction<Ticket>) => {
      if (state.loading) {
        state.loading = false;
        const updatedTicketIndex = state.tickets.findIndex(
          (ticket) => ticket._id === action.payload._id
        );
        state.tickets[updatedTicketIndex] = action.payload;
        state.tickets.sort((x, y) => {
          return x.completed === y.completed ? 0 : x.completed ? 1 : -1;
        });
      }
    },
    ticketDeleted: (state, action: PayloadAction<Ticket>) => {
      if (state.loading) {
        state.loading = false;
        state.tickets = state.tickets.filter(
          (ticket) => ticket._id !== action.payload._id
        );
      }
    },
  },
});

export default slice.reducer;

const fetchTickets = async (dispatch: Dispatch, token: string) => {
  dispatch(slice.actions.ticketsLoading());
  const response = await fetch("http://localhost:3001/tickets", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const parsedResponse = await response.json();
  dispatch(slice.actions.ticketsReceived(parsedResponse.tickets));
};

const createTicket = async (
  dispatch: Dispatch,
  token: string,
  data: {
    type: TicketType;
    priority: TicketPriority;
    project: Project;
    name: string;
    details: string;
    steps?: string;
    assigned: User[];
  }
) => {
  const assigned = data.assigned.map((member) => member.user_id);
  dispatch(slice.actions.ticketCreating());
  const response = await fetch("http://localhost:3001/tickets", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: data.type,
      priority: data.priority,
      project: data.project._id,
      name: data.name,
      details: data.details,
      steps: data.steps,
      assigned,
    }),
  });
  const parsedResponse = await response.json();
  dispatch(slice.actions.ticketCreated(parsedResponse.data));
};

const editTicket = async (
  dispatch: Dispatch,
  token: string,
  data: {
    type: TicketType;
    priority: TicketPriority;
    project: Project;
    name: string;
    details: string;
    steps?: string;
    assigned: User[];
    _id: string;
  }
) => {
  const assigned = data.assigned.map((member) => member.user_id);
  dispatch(slice.actions.ticketCreating());
  const response = await fetch("http://localhost:3001/tickets", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: data.type,
      priority: data.priority,
      project: data.project._id,
      name: data.name,
      details: data.details,
      steps: data.steps,
      assigned,
      _id: data._id,
    }),
  });
  const parsedResponse = await response.json();
  dispatch(slice.actions.ticketUpdated(parsedResponse.data));
};

const completeTicket = async (
  dispatch: Dispatch,
  token: string,
  data: { completed: boolean; _id: string }
) => {
  dispatch(slice.actions.ticketCreating());
  const response = await fetch("http://localhost:3001/tickets", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      completed: data.completed,
      _id: data._id,
    }),
  });
  const parsedResponse = await response.json();
  dispatch(slice.actions.ticketUpdated(parsedResponse.data));
};

const deleteTicket = async (
  dispatch: Dispatch,
  token: string,
  data: { _id: string }
) => {
  dispatch(slice.actions.ticketsLoading());
  const response = await fetch("http://localhost:3001/tickets", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: data._id,
    }),
  });
  const parsedResponse = await response.json();
  dispatch(slice.actions.ticketDeleted(parsedResponse.data));
};

export { fetchTickets, createTicket, editTicket, completeTicket, deleteTicket };
