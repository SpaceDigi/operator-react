export const operatorStatuses = {
  TICKET_TO_CALL: 1,
  TICKET_IN_PROGRESS: 2,
  TICKET_IS_CALLED: 3,
  NO_TICKET_TO_CALL: 'NO_TICKET_TO_CALL',
  INTERNAL_TRANSACTION_STARTED: 'INTERNAL_TRANSACTION_STARTED',
};

const { TICKET_IN_PROGRESS, TICKET_IS_CALLED, TICKET_TO_CALL } = operatorStatuses;

export const callButtonDisabledStatuses = [TICKET_IN_PROGRESS, TICKET_IS_CALLED];
export const startButtonDisabledStatuses = [TICKET_TO_CALL, TICKET_IN_PROGRESS];
export const deleteButtonDisabledStatuses = [TICKET_TO_CALL];
export const endButtonDisabledStatuses = [TICKET_TO_CALL, TICKET_IS_CALLED];
export const createButtonDisabledStatuses = [TICKET_IN_PROGRESS, TICKET_IS_CALLED];
export const delayButtonDisabledStatuses = [TICKET_TO_CALL];
