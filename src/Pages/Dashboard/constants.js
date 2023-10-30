export const operatorStatuses = {
  CLOSED: 0,
  TICKET_TO_CALL: 1,
  BREAK: 2,
  TICKET_IS_CALLED: 3,
  TICKET_IN_PROGRESS: 4,
};

const { TICKET_IN_PROGRESS, TICKET_IS_CALLED, TICKET_TO_CALL, CLOSED } =
  operatorStatuses;

export const callButtonDisabledStatuses = [
  TICKET_IN_PROGRESS,
  TICKET_IS_CALLED,
  CLOSED,
];
export const startButtonDisabledStatuses = [
  TICKET_TO_CALL,
  TICKET_IN_PROGRESS,
  CLOSED,
];
export const deleteButtonDisabledStatuses = [TICKET_TO_CALL, CLOSED];
export const endButtonDisabledStatuses = [TICKET_TO_CALL, TICKET_IS_CALLED, CLOSED];
export const createButtonDisabledStatuses = [
  TICKET_IN_PROGRESS,
  TICKET_IS_CALLED,
  CLOSED,
];
export const delayButtonDisabledStatuses = [TICKET_TO_CALL, CLOSED];
export const logoutButtonDisabledStatuses = [TICKET_IS_CALLED, TICKET_IN_PROGRESS];

export const postponedTabDisabledStatuses = [TICKET_IS_CALLED, TICKET_IN_PROGRESS];

export const tabsValues = {
  REDIRECT_TO_EMPLOYEE: 1,
  REDIRECT_TO_WORKPLACE: 2,
  POSTPONED: 3,
};
