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
  operatorStatuses,
  startButtonDisabledStatuses,
} from './constants';

const initialCustomerState = {
  serviceName: '-',
  receiptNumber: '-',
  jobGuid: null,
};

export default function Dashboard({ history }) {
  const [jobs, setJobs] = useState([]);
  const [customer, setCustomer] = useState(initialCustomerState);
  const [queueState, setQueueState] = useState(null);
  const [workplaceState, setWorkplaceState] = useState(0);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    getWorkplaceState();
    const interval = setInterval(getQueueState(), 60 * 1000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (workplaceState === operatorStatuses.TICKET_IS_CALLED) {
      callClient();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workplaceState]);

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
  return (
    <>
      <Header
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
                  {/* <DelayBlock /> */}
                </div>
              </div>
            </div>
            <div className="col-1-3">
              {/* <div className="box">
                <ul className={`${this.state.tab !== 0 ? 'tabs' : 'tabs-none'}`}>
                  <button
                    className={`${this.state.tab === 1 ? 'active' : ''}`}
                    onClick={() => {
                      this.getServiceList();
                      this.setState({ tab: 1 });
                    }}
                    disabled={
                      this.state.operatorStatus === 'NO_TICKET_TO_CALL' ||
                      this.state.operatorStatus === 'TICKET_TO_CALL'
                        ? false
                        : true
                    }
                  >
                    Задачі
                  </button>
                  <button
                    className={`${this.state.tab === 2 ? 'active' : ''}`}
                    onClick={() => {
                      this.getActiveList();
                      this.setState({ tab: 2 });
                    }}
                    disabled={
                      this.state.operatorStatus === 'TICKET_IN_PROGRESS'
                        ? false
                        : true
                    }
                  >
                    Направити
                  </button>
                  <button
                    className={`${this.state.tab === 3 ? 'active' : ''}`}
                    onClick={() => {
                      this.getPostponedList();
                      this.setState({ tab: 3 });
                    }}
                    disabled={
                      this.state.operatorStatus === 'NO_TICKET_TO_CALL' ||
                      this.state.operatorStatus === 'TICKET_TO_CALL'
                        ? false
                        : true
                    }
                  >
                    Відкладені
                  </button>
                </ul>

                <div
                  className={`tab-content  ${this.state.tab === 1 ? 'active' : ''}`}
                >
                  <ul className="tab-list">
                    {!this.state.serviceList.length ? (
                      <p>Список порожній</p>
                    ) : (
                      this.state.serviceList.map((service, index) => {
                        return (
                          <li key={index} className="task-orange">
                            <p>
                              {service.title}
                              <span>{service.lengthInMinutes} хвилин</span>
                            </p>
                            <button
                              onClick={() => {
                                localStorage.setItem(Keys.SERVICE_ID, service.id);
                                this.internalOperationStart(service.id);
                              }}
                              className="arr arr-right"
                            ></button>
                          </li>
                        );
                      })
                    )}
                  </ul>
                </div>
                <div
                  className={`tab-content  ${this.state.tab === 2 ? 'active' : ''}`}
                >
                  <ul className="tab-list">
                    {!this.state.workplaceActiveList.length ? (
                      <p>Список порожній</p>
                    ) : (
                      this.state.workplaceActiveList.map((workplace, index) => {
                        return (
                          <li key={index}>
                            <p>
                              {workplace.title}
                              <span> </span>
                            </p>
                            <button
                              onClick={() =>
                                this.setState({
                                  fieldStatus: 5,
                                  workplaceId: workplace.workplaceId,
                                })
                              }
                              form="detailsForm"
                              // onClick={() =>
                              //   this.ticketRedirect(workplace.workplaceId)
                              // }
                              className="arr arr-right"
                            ></button>
                          </li>
                        );
                      })
                    )}
                  </ul>
                </div>
                <div
                  className={`tab-content  ${this.state.tab === 3 ? 'active' : ''}`}
                >
                  <ul className="tab-list">
                    {!this.state.ticketList.length ? (
                      <p>Список порожній</p>
                    ) : (
                      this.state.ticketList.map((ticket, index) => {
                        return (
                          <li key={index}>
                            <p style={{ paddingTop: 8 }}>
                              <span>{ticket.key} квиток</span>
                            </p>
                            <button
                              onClick={() => this.callPostponed(ticket.id)}
                              className="arr arr-right"
                            ></button>
                          </li>
                        );
                      })
                    )}
                  </ul>
                </div>
                <div className="tab-content">#Відкладені</div>
              </div> */}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
