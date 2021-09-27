import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
        state.tickets = [...action.payload];
      }
    },
    ticketCreated: (state, action: PayloadAction<Ticket>) => {
      if (state.loading === true) {
        state.loading = false;
        state.tickets.unshift(action.payload);
        if (state.tickets.length > 3) {
          state.tickets.pop();
        }
      }
    },
    ticketUpdated: (state, action: PayloadAction<Ticket>) => {
      state.loading = false;
      const updatedTicketIndex = state.tickets.findIndex(
        (ticket) => ticket._id === action.payload._id
      );
      if (updatedTicketIndex > -1) {
        state.tickets[updatedTicketIndex] = action.payload;
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
export const {
  ticketsLoading,
  ticketUpdated,
  ticketDeleted,
  ticketsReceived,
  ticketCreated,
} = slice.actions;

// const fetchTickets = async (
//   token: string,
//   projectId: string = ""
// ): Promise<Ticket[]> => {
//   const response = await fetch(
//     `http://localhost:3001/tickets/${projectId ? `project/${projectId}` : ""}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   const parsedResponse = await response.json();
//   return parsedResponse.data;
// };

const fetchTickets = async (projectId: string = ""): Promise<Ticket[]> => {
  const response = await fetch(
    `/api/tickets/${projectId ? `project/${projectId}` : ""}`
  );
  const parsedResponse = await response.json();
  return parsedResponse.data;
};

const createTicket = async (data: {
  type: TicketType;
  priority: TicketPriority;
  project: Project;
  name: string;
  details: string;
  steps?: string;
  assigned: User[];
}): Promise<[boolean, Ticket]> => {
  const assigned = data.assigned.map((member) => member.user_id);
  const body: { [k: string]: any } = {
    type: data.type,
    priority: data.priority,
    project: data.project._id,
    name: data.name,
    details: data.details,
    assigned,
  };
  if (data.type === TicketType.bug) {
    body.steps = data.steps;
  }
  const response = await fetch("/api/tickets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    const parsedResponse = await response.json();
    return [false, parsedResponse.data];
  } else {
    return [true, null as unknown as Ticket];
  }
};

const editTicket = async (data: {
  type: TicketType;
  priority: TicketPriority;
  project: Project;
  name: string;
  details: string;
  steps?: string;
  assigned: User[];
  _id: string;
}): Promise<[boolean, Ticket]> => {
  const assigned = data.assigned.map((member) => member.user_id);
  const response = await fetch("/api/tickets", {
    method: "PUT",
    headers: {
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
  if (response.ok) {
    const parsedResponse = await response.json();
    return [false, parsedResponse.data];
  } else {
    return [true, null as unknown as Ticket];
  }
};

const completeTicket = async (data: {
  completed: boolean;
  _id: string;
}): Promise<[boolean, Ticket]> => {
  const response = await fetch("/api/tickets", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      completed: data.completed,
      _id: data._id,
    }),
  });
  if (response.ok) {
    const parsedResponse = await response.json();
    return [false, parsedResponse.data];
  } else {
    return [true, null as unknown as Ticket];
  }
};

const deleteTicket = async (data: {
  _id: string;
}): Promise<[boolean, Ticket]> => {
  const response = await fetch("/api/tickets", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: data._id,
    }),
  });
  if (response.ok) {
    const parsedResponse = await response.json();
    return [false, parsedResponse.data];
  } else {
    return [true, null as unknown as Ticket];
  }
};

export { fetchTickets, createTicket, editTicket, completeTicket, deleteTicket };
