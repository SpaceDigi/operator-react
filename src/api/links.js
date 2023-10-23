const links = {
  login: `/v1/workplace/login`,
  branchList: `/v1/auxiliary/getServiceCenters`,
  workplaceList: `/v1/auxiliary/getAvailableWorkplaces`,
  getEmployeeInfo: '/v1/workplace/getEmployeeInfo',
  logout: `/v1/workplace/logoff`,

  dataPull: `/api/operator/data/pull`,
  listTicket: `/api/operator/service/list/ticket`,
  workplaceActive: `/api/operator/workplace/activate`,
  ticketRegister: `/api/operator/ticket/register`,
  serviceGet: `/api/operator/service/get`,
  ticketCall: `/api/operator/ticket/call`,
  ticketStart: `/api/operator/ticket/start`,
  ticketFinish: `/api/operator/ticket/finish`,
  ticketDelete: `/api/operator/ticket/delete`,
  postponedList: `/api/operator/ticket/list/postponed`,
  activeList: `/api/operator/workplace/list/active`,
  serviceList: `/api/operator/service/list/internal`,
  ticketRedirect: `/api/operator/ticket/redirect`,
  internalOperationStart: `/api/operator/internal-operation/start`,
  internalOperationFinish: `/api/operator/internal-operation/finish`,
  postponForWhile: `/api/operator/ticket/postpone-for-while`,
  ticketPostpone: `/api/operator/ticket/postpone`,
  callPostponed: `/api/operator/ticket/call/postponed`,
};

export default links;
