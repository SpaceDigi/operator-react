import React, { useEffect, useState } from 'react';

import API from '../../api/API';
import links from '../../api/links';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setTicketTime } from '../../redux/auth/authSlice';
import { routes } from '../../api/routes';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import CallButton from './CallButton';
import StartButton from './StartButton';
import CreateButton from './CreateButton';
import EndButton from './EndButton';
// import Details from './Details';
import DeleteClientButton from './DeleteClientButton';
import DelayButton from './DelayButton';
import DelayBlock from './DelayBlock';
import {
  callButtonDisabledStatuses,
  createButtonDisabledStatuses,
  delayButtonDisabledStatuses,
  deleteButtonDisabledStatuses,
  endButtonDisabledStatuses,
  logoutButtonDisabledStatuses,
  operatorStatuses,
  startButtonDisabledStatuses,
  tabsValues,
} from './constants';
import moment from 'moment';
import { parseHoursAndMinutesToSeconds } from './helpers';
import TabsHead from './Tabs/TabsHead';
import PostponedJobsTab from './Tabs/PostponedJobsTab';
import RedirectToEmployeeTab from './Tabs/RedirectToEmployeeTab';
import RedirectToWorkplaceTab from './Tabs/RedirectToWorkplaceTab';

const initialCustomerState = {
  serviceName: '-',
  receiptNumber: '-',
  jobGuid: null,
};

export default function Dashboard({ history }) {
  const [customer, setCustomer] = useState(initialCustomerState);
  const [queueState, setQueueState] = useState({
    totalCustomers: 0,
    personalJobs: 0,
    totalJobs: 0,
    uncompleteCount: 0,
  });
  const [workplaceState, setWorkplaceState] = useState(0);
  const [loading, setLoading] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const [delayHours, setDelayHours] = useState(0);
  const [delayMinutes, setDelayMinutes] = useState(0);
  const [delayDropdownOpened, setDelayDropdownOpened] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [suspendedJobs, setSuspendedJobs] = useState([]);
  const [employeesToRedirect, setEmployeesToRedirect] = useState([]);
  const [workplacesToRedirect, setWorplacesToRedirect] = useState([]);
  const [tabLoading, setTabLoading] = useState(false);

  const dispatch = useDispatch();
  const serviceCenterId = useSelector((state) => state.serviceCenter.id);
  const workplaceId = useSelector((state) => state.workplace.id);
  const organisationGuid = useSelector((state) => state.orgGuid);
  const ticketTime = useSelector((state) => state.ticketTime);

  const apiQueryParams = `organisationGuid=${organisationGuid}&serviceCenterId=${serviceCenterId}&workplaceId=${workplaceId}`;

  const logoutUser = () => {
    API.post(links.logout, {
      organisationGuid,
      serviceCenterId: serviceCenterId,
      workplaceId: workplaceId,
    }).then((res) => {
      dispatch(logout());
      history.push(routes.login);
    });
  };

  const toggleDelayDropdown = () => {
    setDelayDropdownOpened((prev) => !prev);
  };

  const getQueueState = async () => {
    await API.get(`${links.getQueueState}?${apiQueryParams}`).then((res) => {
      setQueueState(res.data.data);
    });
  };

  const callClient = async () => {
    setLoading(true);
    await API.get(`${links.callCustomer}?${apiQueryParams}`).then((res) => {
      if (res.data.data.receiptNumber) {
        setCustomer(res.data.data);
      } else {
        setCustomer(initialCustomerState);
        setTicketTime(0);
      }
      if (ticketTime) {
        setWorkplaceState(operatorStatuses.TICKET_IN_PROGRESS);
      }

      if (!ticketTime && workplaceState !== operatorStatuses.TICKET_IS_CALLED) {
        setWorkplaceState(operatorStatuses.TICKET_IS_CALLED);
      }
    });
    setLoading(false);
  };

  const startJob = async ({ jobGuid }) => {
    setLoading(true);
    await API.post(links.startJob, {
      organisationGuid,
      serviceCenterId,
      workplaceId,
      jobGuid: customer.jobGuid || jobGuid,
    }).then((res) => {
      setWorkplaceState(operatorStatuses.TICKET_IN_PROGRESS);
    });
    setLoading(false);
  };

  const completeJob = async () => {
    await API.post(links.completeJob, {
      organisationGuid,
      serviceCenterId,
      workplaceId,
      jobGuid: customer.jobGuid,
    }).then((res) => {
      resetWorkplace();
    });
  };

  const deleteCustomer = async () => {
    if (customer.receiptNumber) {
      await API.delete(links.deleteClient, {
        data: {
          organisationGuid,
          serviceCenterId,
          workplaceId,
          jobGuid: customer.jobGuid,
          comment: '123',
        },
      }).then(() => {
        resetWorkplace();
      });
    }
  };

  const getWorkplaceState = async () => {
    setLoading(true);
    await API.get(`${links.getWorkplaceState}?${apiQueryParams}`).then((res) => {
      const state = res.data.data.workplaceState;
      setWorkplaceState(state);
    });
    setLoading(false);
  };

  const suspendJob = async () => {
    await API.post(links.suspendJob, {
      organisationGuid,
      serviceCenterId,
      workplaceId,
      jobGuid: customer.jobGuid,
      comment: '',
    }).then((res) => {
      resetWorkplace();
    });
  };

  const suspendJobForTime = async () => {
    await API.post(links.suspendJobForTime, {
      organisationGuid,
      serviceCenterId,
      workplaceId,
      jobGuid: customer.jobGuid,
      comment: '',
      suspendTime: parseHoursAndMinutesToSeconds(delayHours, delayMinutes),
    }).then((res) => {
      resetWorkplace();
      resetDelayValues();
    });
  };

  const getSuspendedJobs = async () => {
    setTabLoading(true);
    await API.get(`${links.getSuspendedJobs}?${apiQueryParams}`).then((res) => {
      setSuspendedJobs(res.data.data);
    });
    setTabLoading(false);
  };

  const handleSuspendedJobClick = async (e) => {
    setLoading(true);
    const jobGuid = e.currentTarget.dataset.id;
    if (jobGuid) {
      await API.post(links.resumeSuspendedJob, {
        jobGuid,
        organisationGuid,
        workplaceId,
        serviceCenterId,
      }).then(() => {
        getWorkplaceState();
        setActiveTab(0);
      });
    }
  };

  const resetWorkplace = () => {
    setCustomer(initialCustomerState);
    getWorkplaceState();
    stopTimer();
    setActiveTab(0);
  };

  const resetDelayValues = () => {
    setDelayHours(0);
    setDelayMinutes(0);
    setDelayDropdownOpened(false);
  };

  const getEmployeesToRedirect = async () => {
    setTabLoading(true);
    await API.get(`${links.getEmployees}?${apiQueryParams}`).then((res) => {
      setEmployeesToRedirect(res.data.data);
    });
    setTabLoading(false);
  };

  const handleRedirectToEmployee = async (e) => {
    const employeeId = e.target.dataset.id;
    await API.post(links.redirectToEmlployee, {
      organisationGuid,
      serviceCenterId,
      workplaceId,
      jobGuid: customer.jobGuid,
      comment: '',
      needComeBack: true,
      employeeId,
    }).then((res) => {
      resetWorkplace();
    });
  };

  const getWorkplacesToRedirect = async () => {
    setTabLoading(true);
    await API.get(`${links.getWorkplaces}?${apiQueryParams}`).then((res) => {
      setWorplacesToRedirect(res.data.data);
    });
    setTabLoading(false);
  };

  const handleRedirectToWorkplace = async (e) => {
    const newWorkplaceId = e.target.dataset.id;

    await API.post(links.redirectToWorkplace, {
      organisationGuid,
      serviceCenterId,
      workplaceId,
      jobGuid: customer.jobGuid,
      comment: '',
      needComeBack: true,
      newWorkplaceId: parseInt(newWorkplaceId),
    }).then((res) => {
      resetWorkplace();
    });
  };

  useEffect(() => {
    getWorkplaceState();
    getQueueState();

    const interval = setInterval(getQueueState, 1000 * 10);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (workplaceState === operatorStatuses.TICKET_IS_CALLED && !customer.jobGuid) {
      callClient();
    }
    if (workplaceState === operatorStatuses.TICKET_IN_PROGRESS) {
      startTimer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workplaceState]);

  useEffect(() => {
    if (activeTab === tabsValues.POSTPONED) {
      getSuspendedJobs();
    }

    if (activeTab === tabsValues.REDIRECT_TO_EMPLOYEE) {
      getEmployeesToRedirect();
    }

    if (activeTab === tabsValues.REDIRECT_TO_WORKPLACE) {
      getWorkplacesToRedirect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  useEffect(() => {
    let interval;

    if (startTime) {
      interval = setInterval(() => {
        const now = moment();
        const elapsed = now.diff(startTime);
        dispatch(setTicketTime(elapsed));
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTime]);

  const startTimer = () => {
    const startTime = ticketTime
      ? moment().add(-ticketTime, 'milliseconds')
      : moment();
    setStartTime(startTime);
  };

  const stopTimer = () => {
    setStartTime(null);
    dispatch(setTicketTime(0));
  };

  const callButtonDisabled =
    callButtonDisabledStatuses.includes(workplaceState) ||
    loading ||
    !queueState.totalCustomers;
  const startButtonDisabled =
    startButtonDisabledStatuses.includes(workplaceState) || loading;
  const deleteButtonDisabled =
    deleteButtonDisabledStatuses.includes(workplaceState) || loading;
  const endButtonDisabled =
    endButtonDisabledStatuses.includes(workplaceState) || loading;
  const createButtonDisabled =
    createButtonDisabledStatuses.includes(workplaceState) || loading;
  const delayButtonDisabled =
    delayButtonDisabledStatuses.includes(workplaceState) || loading;
  const logoutIsDisabled =
    logoutButtonDisabledStatuses.includes(workplaceState) || loading;

  return (
    <>
      <Header
        time={ticketTime}
        logoutIsDisabled={logoutIsDisabled}
        logout={logoutUser}
        serviceTitle={customer.serviceName}
        numTicket={customer.receiptNumber}
        commonTicketListSize={queueState.totalCustomers}
        postponedTicketListSize={queueState.uncompleteCount}
        directTicketListSize={queueState.personalJobs}
      />
      <main>
        <div className="container">
          <div className="main-row">
            <div className="col-2-3">
              <div className="row-buttons">
                <div className="col-1-2">
                  <CallButton
                    callTicket={callClient}
                    disabled={callButtonDisabled}
                  />
                  <StartButton
                    ticketStart={startJob}
                    disabled={startButtonDisabled}
                  />
                </div>
                <div className="col-1-2">
                  <CreateButton disabled={createButtonDisabled} />

                  <EndButton
                    disabled={endButtonDisabled}
                    completeJob={completeJob}
                  />
                </div>
              </div>

              <div className="row-order">
                <div className="col-1-2">{/* <Details /> */}</div>
                <div className="col-1-2 inverse">
                  <div className="row-buttons">
                    <div className="col-1-2">
                      <DeleteClientButton
                        disabled={deleteButtonDisabled}
                        deleteCustomer={deleteCustomer}
                      />
                    </div>
                    <div className="col-1-2">
                      <DelayButton
                        disabled={delayButtonDisabled}
                        suspendJob={suspendJob}
                      />
                    </div>
                  </div>
                  <DelayBlock
                    delayDisabled={delayButtonDisabled}
                    delayHours={delayHours}
                    delayMinutes={delayMinutes}
                    delayDropdownOpened={delayDropdownOpened}
                    toggleDelayDropdown={toggleDelayDropdown}
                    setHours={setDelayHours}
                    setMinutes={setDelayMinutes}
                    suspendJobForTime={suspendJobForTime}
                  />
                </div>
              </div>
            </div>
            <div className="col-1-3 ">
              <div className="box">
                <TabsHead
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  workplaceState={workplaceState}
                />
                <PostponedJobsTab
                  loading={tabLoading}
                  active={activeTab === tabsValues.POSTPONED}
                  postponedTicketList={suspendedJobs}
                  handlePostponedTicketClick={handleSuspendedJobClick}
                />
                <RedirectToEmployeeTab
                  loading={tabLoading}
                  active={activeTab === tabsValues.REDIRECT_TO_EMPLOYEE}
                  employeeList={employeesToRedirect}
                  handleRedirectToEmployeeClick={handleRedirectToEmployee}
                />
                <RedirectToWorkplaceTab
                  loading={tabLoading}
                  workplaceList={workplacesToRedirect}
                  active={activeTab === tabsValues.REDIRECT_TO_WORKPLACE}
                  handleRedirectToWorkplaceClick={handleRedirectToWorkplace}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
