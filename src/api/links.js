const links = {
  login: `/v1/workplace/login`,
  branchList: `/v1/auxiliary/getServiceCenters`,
  workplaceList: `/v1/auxiliary/getAvailableWorkplaces`,
  getWorkplaceState: '/v1/Auxiliary/GetWorkplaceState',
  getEmployeeInfo: '/v1/workplace/getEmployeeInfo',
  logout: `/v1/workplace/logoff`,

  getJobs: '/v1/auxiliary/getJobs',

  getQueueState: '/v1/Auxiliary/GetQueueState',

  callCustomer: '/v1/customers/getCustomer',

  getCustomerTypes: '/v1/Auxiliary/GetCustomerTypes',
  getLanguages: '/v1/Auxiliary/GetLanguages',

  createClient: '/v1/Customers/AddCustomer',
  deleteClient: '/v1/Customers/DropCustomer',

  suspendJob: '/v1/Jobs/SuspendJob',
  suspendJobForTime: '/v1/Jobs/SuspendJobForTime',
  startJob: '/v1/Jobs/StartJob',
  completeJob: '/v1/Jobs/CompleteJob',

  getSuspendedJobs: '/v1/Auxiliary/GetSuspendedJobs',
  resumeSuspendedJob: '/v1/Jobs/ResumeSuspendedJob',

  getWorkplaces: '/v1/auxiliary/getWorkPlaces',
  redirectToWorkplace: '/v1/jobs/redirectToWorkplace',

  getEmployees: '/v1/auxiliary/getEmployees',
  redirectToEmlployee: '/v1/Jobs/RedirectToEmployee',

  dataPull: `/api/operator/data/pull`,
  listTicket: `/api/operator/service/list/ticket`,
  workplaceActive: `/api/operator/workplace/activate`,
  ticketRegister: `/api/operator/ticket/register`,
  serviceGet: `/api/operator/service/get`,
  ticketStart: `/api/operator/ticket/start`,
  ticketFinish: `/api/operator/ticket/finish`,
  ticketDelete: `/api/operator/ticket/delete`,
  postponedList: `/api/operator/ticket/list/postponed`,
  activeList: `/api/operator/workplace/list/active`,
  ticketRedirect: `/api/operator/ticket/redirect`,
  internalOperationStart: `/api/operator/internal-operation/start`,
  internalOperationFinish: `/api/operator/internal-operation/finish`,
  postponForWhile: `/api/operator/ticket/postpone-for-while`,
  ticketPostpone: `/api/operator/ticket/postpone`,
  callPostponed: `/api/operator/ticket/call/postponed`,
};

export default links;
