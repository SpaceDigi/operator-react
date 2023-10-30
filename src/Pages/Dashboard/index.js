import React, { useEffect, useState } from 'react';

import API from '../../api/API';
import links from '../../api/links';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/authSlice';
import { routes } from '../../api/routes';
import { config } from '../../config';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import CallButton from './CallButton';
import StartButton from './StartButton';
import CreateButton from './CreateButton';
import EndButton from './EndButton';
import Details from './Details';
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
import { parseHoursAndMinutesToMs } from './helpers';
import TabsHead from './Tabs/TabsHead';
import TasksTab from './Tabs/RedirectToWorkplaceTab';
import RedirectTicketTab from './Tabs/RedirectToEmployeeTab';
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
  const [queueState, setQueueState] = useState(null);
  const [workplaceState, setWorkplaceState] = useState(0);
  const [loading, setLoading] = useState(true);
  const [ticketTime, setTicketTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [delayHours, setDelayHours] = useState(0);
  const [delayMinutes, setDelayMinutes] = useState(0);
  const [delayDropdownOpened, setDelayDropdownOpened] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [suspendedJobs, setSuspendedJobs] = useState([]);

  const dispatch = useDispatch();
  const serviceCenterId = useSelector((state) => state.serviceCenter.id);
  const workplaceId = useSelector((state) => state.workplace.id);

  const apiQueryParams = `organisationGuid=${config.ORG_GUID}&serviceCenterId=${serviceCenterId}&workplaceId=${workplaceId}`;

  const logoutUser = () => {
    API.post(links.logout, {
      organisationGuid: config.ORG_GUID,
      serviceCenterId: serviceCenterId,
      workplaceId: workplaceId,
    }).then((res) => {
      dispatch(logout());
      history.push(routes.login);
    });
  };

  // const getJobs = async () => {
  //   await API.get(`${links.getJobs}?${apiQueryParams}`).then((res) => {
  //     console.log('jobs', res.data);
  //     setJobs(res.data.data);
  //   });
  // };

  const toggleDelayDropdown = () => {
    setDelayDropdownOpened((prev) => !prev);
  };

  const getQueueState = async () => {
    await API.get(`${links.getQueueState}?${apiQueryParams}`).then((res) => {
      console.log('queue state', res.data);
      setQueueState(res.data.data);
    });
  };

  const callClient = async () => {
    await API.get(`${links.callCustomer}?${apiQueryParams}`).then((res) => {
      console.log('customer', res.data);
      if (res.data.data.receiptNumber) {
        setCustomer(res.data.data);
        getWorkplaceState();
      }
    });
  };

  const startJob = async () => {
    await API.post(links.startJob, {
      organisationGuid: config.ORG_GUID,
      serviceCenterId,
      workplaceId,
      jobGuid: customer.jobGuid,
    }).then((res) => {
      console.log('start job ==>', res.data);
      //temp solution
      setWorkplaceState(operatorStatuses.TICKET_IN_PROGRESS);
      history.push(routes.dashboard);
    });
  };

  const completeJob = async () => {
    await API.post(links.completeJob, {
      organisationGuid: config.ORG_GUID,
      serviceCenterId,
      workplaceId,
      jobGuid: customer.jobGuid,
    }).then((res) => {
      setCustomer(initialCustomerState);
      getWorkplaceState();
    });
  };

  const deleteCustomer = async () => {
    if (customer.receiptNumber) {
      await API.delete(links.deleteClient, {
        data: {
          organisationGuid: config.ORG_GUID,
          serviceCenterId,
          workplaceId,
          jobGuid: customer.jobGuid,
          comment: '123',
        },
      }).then(() => {
        getWorkplaceState();
        setCustomer(initialCustomerState);
      });
    }
  };

  const getWorkplaceState = async () => {
    setLoading(true);
    await API.get(`${links.getWorkplaceState}?${apiQueryParams}`).then((res) => {
      const state = res.data.data.workplaceState;
      console.log(state);
      setWorkplaceState(state);
    });
    setLoading(false);
  };

  const suspendJob = async () => {
    await API.post(links.suspendJob, {
      organisationGuid: config.ORG_GUID,
      serviceCenterId,
      workplaceId,
      jobGuid: customer.jobGuid,
      comment: '',
    }).then((res) => {
      getWorkplaceState();
      setCustomer(initialCustomerState);
    });
  };

  const suspendJobForTime = async () => {
    await API.post(links.suspendJobForTime, {
      organisationGuid: config.ORG_GUID,
      serviceCenterId,
      workplaceId,
      jobGuid: customer.jobGuid,
      comment: '',
      suspendTime: parseHoursAndMinutesToMs(delayHours, delayMinutes),
    }).then((res) => {
      getWorkplaceState();
      resetDelayValues();
      setCustomer(initialCustomerState);
    });
  };

  const getSuspendedJobs = async () => {
    await API.get(`${links.getSuspendedJobs}?${apiQueryParams}`).then((res) => {
      console.log('sus jobs ==>', res.data.data);
      setSuspendedJobs(res.data.data);
    });
  };

  const handleSuspendedJobClick = async (e) => {
    const jobGuid = e.currentTarget.dataset.id;
    if (jobGuid) {
      await API.post(links.resumeSuspendedJob, {
        jobGuid,
        organisationGuid: config.ORG_GUID,
        workplaceId,
        serviceCenterId,
      }).then(() => {
        callClient();
        setSuspendedJobs([]);
        setActiveTab(0);
      });
    }
  };

  const resetDelayValues = () => {
    setDelayHours(0);
    setDelayMinutes(0);
    setDelayDropdownOpened(false);
  };

  useEffect(() => {
    getWorkplaceState();
    const interval = setInterval(getQueueState, 1000 * 30);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (workplaceState === operatorStatuses.TICKET_IS_CALLED) {
      callClient();
    }

    if (workplaceState === operatorStatuses.TICKET_IN_PROGRESS) {
      startTimer();
    } else {
      stopTimer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workplaceState]);

  useEffect(() => {
    if (activeTab === tabsValues.POSTPONED) {
      getSuspendedJobs();
    }

    if (activeTab === tabsValues.REDIRECT_TO_EMPLOYEE) {
    }

    if (activeTab === tabsValues.REDIRECT_TO_WORKPLACE) {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  useEffect(() => {
    let interval;

    if (startTime) {
      interval = setInterval(() => {
        const now = moment();
        const elapsed = now.diff(startTime);
        setTicketTime(elapsed);
      }, 100);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [startTime]);

  const startTimer = () => {
    setStartTime(moment());
  };

  const stopTimer = () => {
    setStartTime(null);
    setTicketTime(0);
  };

  const callButtonDisabled =
    callButtonDisabledStatuses.includes(workplaceState) || loading;
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
            <div className="col-1-3">
              <div className="box">
                <TabsHead
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  workplaceState={workplaceState}
                />
                <PostponedJobsTab
                  active={activeTab === tabsValues.POSTPONED}
                  postponedTicketList={suspendedJobs}
                  handlePostponedTicketClick={handleSuspendedJobClick}
                />
                <RedirectToEmployeeTab
                  active={activeTab === tabsValues.REDIRECT_TO_EMPLOYEE}
                />
                <RedirectToWorkplaceTab
                  active={activeTab === tabsValues.REDIRECT_TO_WORKPLACE}
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
