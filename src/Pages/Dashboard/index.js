import React from "react";
import Keys from "../../Constants/helper";
import moment from "moment";
import logo from "../../img/logo.svg";
import API from "../../api/API";
import links from "../../api/links";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      loading: false,
      isOn: false,
      start: 0,
      ticketId: 0,
      fieldList: [],
      workplaceActiveList: [],
      serviceList: [],
      ticketList: [],
      currentServerTime: 0,
      hours: 0,
      calledTime: null,
      minutes: 0,
      numTicket: localStorage.getItem(Keys.NUMBER_TICKET)
        ? localStorage.getItem(Keys.NUMBER_TICKET)
        : "Не обрано",
      workplace: Keys.WORKPLACE,
      department: Keys.DEPARTMENT,
      userId: Number(localStorage.getItem(Keys.USER_ID)),
      commonTicketListSize: 0,
      directTicketListSize: 0,
      postponedTicketListSize: 0,
      operatorStatus: null,
      dropDownBlock: false,
      serviceTitle: "Не обрано",
      tab: 0,
      //bed connection
      callTicket: false,
      ticketStart: false,
      ticketFinish: false,
      ticketDelete: false,
      ticketRedirect: false,
      internalOperationStart: false,
      internalOperationFinish: false,
      callPostponed: false,
      ticketPostpone: false,
      checkPull: true,
      fieldStatus: null,
      workplaceId: null,
    };

    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  pullData() {
    if (this.state.checkPull) {
      this.setState({ checkPull: false });
      API.post(links.dataPull, { userId: this.state.userId }, {})
        .then((res) => {
          // console.log(res.data);
          this.setState({
            commonTicketListSize: res.data.commonTicketListSize,
            directTicketListSize: res.data.directTicketListSize,
            postponedTicketListSize: res.data.postponedTicketListSize,
            operatorStatus: res.data.operatorStatus,
            department: res.data.branchTitle,
            workplace: res.data.workplaceTitle,
            checkPull: true,
          });

          // this.renderTabs(res.data.operatorStatus);
        })
        .catch((error) => {
          this.setState({ checkPull: true });
          this.props.history.push({
            pathname: "/error",
            state: {
              error: error?.response?.data?.errorMsg,
              status: error?.response?.data?.code,
            },
          });
        });
    }
  }

  checkTimeServer(time) {
    let serverTime = Date.now() - moment(time).valueOf();
    let timeDifference = moment.utc(serverTime).format("H");
    if (timeDifference > 0) {
      this.setState({ currentServerTime: serverTime });
    }
  }

  getPostponedList() {
    this.setState({ loading: true });
    API.post(links.postponedList, { userId: this.state.userId }, {})
      .then((res) => {
        this.setState({ ticketList: res.data.ticketList, loading: false });
      })
      .catch((error) => {
        console.log(error.response)
        this.props.history.push({
          pathname: "/error",
          state: {
            error: error?.response?.data?.errorMsg,
            status: error?.response?.data?.code,
          },
        });
      });
  }

  getActiveList() {
    this.setState({ loading: true });
    API.post(links.activeList, { userId: this.state.userId }, {})
      .then((res) => {
        this.setState({
          workplaceActiveList: res.data.workplaceActiveList,
          loading: false,
        });
      })
      .catch((error) => {
        this.props.history.push({
          pathname: "/error",
          state: {
            error: error?.response?.data?.errorMsg,
            status: error?.response?.data?.code,
          },
        });
      });
  }

  getServiceList() {
    this.setState({ loading: true });
    API.post(links.serviceList, { userId: this.state.userId }, {})
      .then((res) => {
        this.setState({ serviceList: res.data.serviceList, loading: false });
      })
      .catch((error) => {
        this.props.history.push({
          pathname: "/error",
          state: {
            error: error?.response?.data?.errorMsg,
            status: error?.response?.data?.code,
            loading: false,
          },
        });
      });
  }

  renderReconect() {
    this.setState({ loading: true });
    API.post(links.dataPull, { userId: this.state.userId }, {})
      .then((res) => {
        // console.log(res.data);
        this.setState({
          operatorStatus: res.data.operatorStatus,
          loading: false,
        });
        this.checkTimeServer(res.data.currentServerTime);

        if (
          res.data.operatorStatus === "TICKET_IS_CALLED" &&
          !this.state.fieldList.length
        ) {
          this.callTicket();
        }
        if (
          !this.state.fieldList.length &&
          res.data.operatorStatus === "TICKET_IN_PROGRESS"
        ) {
          this.ticketStart();
        }
      })
      .catch((error) => {
        this.props.history.push({
          pathname: "/error",
          state: {
            error: error?.response?.data?.errorMsg,
            status: error?.response?.data?.code,
          },
        });
      });
  }

  componentDidMount() {
    this.renderReconect();
    this.setState({
      workplace: localStorage.getItem(Keys.WORKPLACE),
      department: localStorage.getItem(Keys.DEPARTMENT),
    });
    // this.getPostponedList();
    // this.getActiveList();
    // this.getServiceList();
    this.interval = setInterval(() => {
      this.pullData();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  startTimer = async () => {
    this.setState({
      isOn: true,
      time: this.state.time,
      start: this.state.calledTime
        ? this.state.calledTime + this.state.currentServerTime
        : Date.now() - this.state.time,
    });
    this.timer = setInterval(
      () =>
        this.setState({
          time: Date.now() - this.state.start,
        }),
      1
    );
  };

  logout() {
    API.post(links.logout, { userId: this.state.userId }, {})
      .then((res) => {
        localStorage.clear();
        this.props.history.push("/");
      })
      .catch((error) => {
        this.props.history.push({
          pathname: "/error",
          state: {
            error: error?.response?.data?.errorMsg,
            status: error?.response?.data?.code,
          },
        });
        if (error.response.data.code !== 400) {
          localStorage.clear();
          this.props.history.push("/");
        }
      });
  }

  stopTimer() {
    this.setState({
      time: 0,
      isOn: false,
      hours: 0,
      minutes: 0,
      calledTime: null,
    });
    clearInterval(this.timer);
  }

  callTicket() {
    if (!this.state.callTicket) {
      this.setState({ loading: true, callTicket: true });
      API.post(links.ticketCall, { userId: this.state.userId }, {})
        .then((res) => {
          localStorage.setItem(Keys.NUMBER_TICKET, res.data.key);
          this.setState({
            ticketId: res.data.id,
            serviceTitle: res.data.serviceTitle,
            fieldList: res.data.fieldList,
            numTicket: res.data.key,
            tab: 0,
            serviceList: [],
            calledTime: moment(res.data.calledFirstTime).valueOf(),
            loading: false,
            // callTicket: false,
          });
          this.startTimer();
        })
        .catch((error) => {
          this.props.history.push({
            pathname: "/error",
            state: {
              error: error?.response?.data?.errorMsg,
              status: error?.response?.data?.code,
            },
          });
        });
    }
  }

  soundRecord(url, headers, body) {
    API.post(
      url,
      body,
      headers
    )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        this.props.history.push({
          pathname: "/error",
          state: {
            error: error?.response?.data?.errorMsg,
            status: error?.response?.data?.code,
          },
        });
      });
  }

  ticketStart() {
    if (!this.state.ticketStart) {
      this.setState({ loading: true, ticketStart: true });
      this.stopTimer();
      API.post(
        links.ticketStart,
        { userId: this.state.userId, ticketId: this.state.ticketId },
        {}
      )
        .then((res) => {
          console.log(res.data);
          const soundRecord = res?.data?.soundRecord;

          if(soundRecord) {
            this.soundRecord(soundRecord.url, soundRecord.jsonBody, soundRecord.headerList)
          }

          this.setState({
            fieldList: res.data.fieldList,
            serviceTitle: res.data.serviceTitle,
            calledTime: moment(res.data.startTransactionTime).valueOf(),
            loading: false,
            callTicket: false,
            ticketDelete: false,
            ticketPostpone: false,
          });
          this.startTimer();
        })
        .catch((error) => {
          this.props.history.push({
            pathname: "/error",
            state: {
              error: error?.response?.data?.errorMsg,
              status: error?.response?.data?.code,
            },
          });
        });
    }
  }

  renderForms(event) {
    let data = [];
    const formData = event.target.elements;
    for (let i = 1; i < formData.length-2; i++) {
      data.push({ name: formData[i].name, value: formData[i].value });
    }

    return data;
  }

  ticketFinish(event) {
    event.preventDefault();
    if (!this.state.ticketFinish) {
      this.setState({ loading: true, ticketFinish: true });

      API.post(
        links.ticketFinish,
        {
          transactionFiledList: this.renderForms(event),
          userId: this.state.userId,
        },
        {}
      )
        .then((res) => {
          
          this.stopTimer();
          localStorage.removeItem(Keys.NUMBER_TICKET);
          const soundRecord = res?.data?.soundRecord;

          if(soundRecord) {
            this.soundRecord(soundRecord.url, soundRecord.jsonBody, soundRecord.headerList)
          }

          this.setState({
            fieldList: [],
            dropDownBlock: false,
            serviceTitle: "Не обрано",
            numTicket: "Не обрано",
            loading: false,
            ticketStart: false,
          });
        })
        .catch((error) => {
          this.props.history.push({
            pathname: "/error",
            state: {
              error: error?.response?.data?.errorMsg,
              status: error?.response?.data?.code,
            },
          });
        });
    }
  }

  ticketDelete(event) {
    event.preventDefault();

    if (!this.state.ticketDelete) {
      this.setState({ loading: true, ticketDelete: true });
      API.post(links.ticketDelete, { userId: this.state.userId, transactionFiledList: this.renderForms(event)}, {})
        .then((res) => {
          this.stopTimer();
          localStorage.removeItem(Keys.NUMBER_TICKET);
          const soundRecord = res?.data?.soundRecord;

          if(soundRecord) {
            this.soundRecord(soundRecord.url, soundRecord.jsonBody, soundRecord.headerList)
          }

          this.setState({
            fieldList: [],
            serviceTitle: "Не обрано",
            numTicket: "Не обрано",
            loading: false,
            ticketStart: false,
          });
        })
        .catch((error) => {
          this.props.history.push({
            pathname: "/error",
            state: {
              error: error?.response?.data?.errorMsg,
              status: error?.response?.data?.code,
            },
          });
        });
    }
  }

  ticketRedirect(workplaceId, event) {
    event.preventDefault();

    if (!this.state.ticketRedirect) {
      this.setState({ loading: true, ticketRedirect: true });
      API.post(
        links.ticketRedirect,
        {
          userId: this.state.userId,
          toWorkplaceId: workplaceId,
          transactionFiledList: this.renderForms(event)
        },
        {}
      )
        .then((res) => {
          this.stopTimer();
          const soundRecord = res?.data?.soundRecord;

          if(soundRecord) {
            this.soundRecord(soundRecord.url, soundRecord.jsonBody, soundRecord.headerList)
          }
          this.setState({
            workplaceActiveList: [],
            fieldList: [],
            serviceTitle: "Не обрано",
            numTicket: "Не обрано",
            tab: 0,
            loading: false,
            ticketRedirect: false,
            ticketStart: false,
          });
          localStorage.removeItem(Keys.NUMBER_TICKET);
        })
        .catch((error) => {
          this.props.history.push({
            pathname: "/error",
            state: {
              error: error?.response?.data?.errorMsg,
              status: error?.response?.data?.code,
            },
          });
        });
    }
  }

  internalOperationStart(serviceId) {
    if (!this.state.internalOperationStart) {
      this.setState({ loading: true, internalOperationStart: true });
      API.post(
        links.internalOperationStart,
        { userId: this.state.userId, serviceId: serviceId },
        {}
      )
        .then((res) => {
          this.setState({
            serviceList: [],
            tab: 0,
            fieldList: res.data.transactionFiledList,
            serviceTitle: res.data.serviceTitle,
            loading: false,
            internalOperationStart: false,
          });
          this.startTimer();
        })
        .catch((error) => {
          this.props.history.push({
            pathname: "/error",
            state: {
              error: error?.response?.data?.errorMsg,
              status: error?.response?.data?.code,
            },
          });
        });
    }
  }

  internalOperationFinish(event) {
    event.preventDefault();
    if (!this.state.internalOperationFinish) {
      this.setState({ loading: true, internalOperationFinish: false });
      API.post(
        links.internalOperationFinish,
        { userId: this.state.userId, transactionFiledList: [] },
        {}
      )
        .then((res) => {
          localStorage.removeItem(Keys.NUMBER_TICKET);
          this.setState({
            fieldList: [],
            serviceTitle: "Не обрано",
            numTicket: "Не обрано",
            loading: false,
            internalOperationFinish: false,
          });
          this.stopTimer();
        })
        .catch((error) => {
          this.props.history.push({
            pathname: "/error",
            state: {
              error: error?.response?.data?.errorMsg,
              status: error?.response?.data?.code,
            },
          });
        });
    }
  }

  renderHours(operation) {
    if (operation === "increase") {
      if (this.state.hours !== 23) {
        this.setState({ hours: this.state.hours + 1 });
      } else {
        this.setState({ hours: 0 });
      }
    } else {
      if (this.state.hours !== 0) {
        this.setState({ hours: this.state.hours - 1 });
      } else {
        this.setState({ hours: 23 });
      }
    }
  }

  renderMinutes(operation) {
    if (operation === "increase") {
      if (this.state.minutes !== 59) {
        this.setState({ minutes: this.state.minutes + 1 });
      } else {
        if (this.state.hours !== 23) {
          this.setState({ hours: this.state.hours + 1, minutes: 0 });
        } else {
          this.setState({ hours: 0, minutes: 0 });
        }
      }
    } else {
      this.setState({
        minutes: this.state.minutes === 0 ? 59 : this.state.minutes - 1,
      });
    }
  }

  postponForWhile(hours, minutes, event) {
    event.preventDefault();

    if (!this.state.internalOperationFinish) {
      this.setState({ loading: true, internalOperationFinish: false });
      API.post(
        links.postponForWhile,
        {
          userId: this.state.userId,
          hours: hours,
          minutes: minutes,
          transactionFiledList: this.renderForms(event)
        },
        {}
      )
        .then((res) => {
          this.stopTimer();
          localStorage.removeItem(Keys.NUMBER_TICKET);
          const soundRecord = res?.data?.soundRecord;

          if(soundRecord) {
            this.soundRecord(soundRecord.url, soundRecord.jsonBody, soundRecord.headerList)
          }
          this.setState({
            dropDownBlock: false,
            fieldList: [],
            serviceTitle: "Не обрано",
            numTicket: "Не обрано",
            ticketStart: false,
            loading: false,
            internalOperationFinish: false,
          });
        })
        .catch((error) => {
          this.props.history.push({
            pathname: "/error",
            state: {
              error: error?.response?.data?.errorMsg,
              status: error?.response?.data?.code,
            },
          });
        });
    }
  }

  ticketPostpone(event) {
    event.preventDefault();

    if (!this.state.ticketPostpone) {
      this.setState({ loading: true, ticketPostpone: true });
      API.post(links.ticketPostpone, { userId: this.state.userId, transactionFiledList: this.renderForms(event) }, {})
        .then((res) => {
          localStorage.removeItem(Keys.NUMBER_TICKET);
          this.setState({
            dropDownBlock: false,
            fieldList: [],
            serviceTitle: "Не обрано",
            numTicket: "Не обрано",
            loading: false,
            ticketStart: false,
          });
          this.stopTimer();
        })
        .catch((error) => {
          this.props.history.push({
            pathname: "/error",
            state: {
              error: error?.response?.data?.errorMsg,
              status: error?.response?.data?.code,
            },
          });
        });
    }
  }

  callPostponed(ticketId) {
    if (!this.state.callPostponed) {
      this.setState({ loading: true, callPostponed: true });
      API.post(
        links.callPostponed,
        { userId: this.state.userId, ticketId: ticketId },
        {}
      )
        .then((res) => {
          this.startTimer();
          this.setState({
            ticketList: [],
            ticketId: res.data.id,
            serviceTitle: res.data.serviceTitle,
            fieldList: res.data.fieldList,
            tab: 0,
            numTicket: res.data.key,
            calledTime: moment(res.data.calledFirstTime).valueOf(),
            loading: false,
            ticketStart: false,
            callPostponed: false,
          });
        })
        .catch((error) => {
          this.props.history.push({
            pathname: "/error",
            state: {
              error: error?.response?.data?.errorMsg,
              status: error?.response?.data?.code,
            },
          });
        });
    }
  }

  onChangeField(text, index) {
    let previousFiedls = this.state.fieldList;
    previousFiedls[index].value = text.target.value;

    this.setState({
      fieldList: previousFiedls,
    });
  }

  render() {
    return (
      <React.Fragment>
        <header>
          <div className="header-top">
            <div className="container">
              <a href="/" className="logo">
                <img src={logo} alt="loho" />
              </a>

              <div className="header-top__right">
                {this.state.loading && <div className="loader">Loading...</div>}
                <div className="header-top__stat">
                  <span className="ico ico-users">
                    {this.state.commonTicketListSize}
                  </span>
                  <span className="ico ico-pause">
                    {this.state.postponedTicketListSize}
                  </span>
                  <span className="ico ico-fire">
                    {this.state.directTicketListSize}
                  </span>
                </div>
                <div className="header-top__work">
                  {this.state.department} /{" "}
                  <strong>{this.state.workplace}</strong>
                </div>
                <div className="header-top__logout">
                  <button
                    onClick={() => this.logout()}
                    className="header-logout"
                  >
                    Вийти
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="header-bottom">
            <div className="container">
              <p className="client-info">
                <span>Назва послуги</span>
                <strong>{this.state.serviceTitle}</strong>
              </p>

              <div className="header-bottom__twice">
                <p className="client-info">
                  <span>Номер квитка</span>
                  <strong className="ico ico-ticket">
                    {this.state.numTicket}
                  </strong>
                </p>
                <p className="client-info">
                  <span>Час</span>
                  <strong className="ico ico-clock">
                    {moment.utc(this.state.time).format("HH:mm:ss")}
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </header>
        <main>
          <div className="container">
            <div className="main-row">
              <div className="col-2-3">
                <div className="row-buttons">
                  <div className="col-1-2">
                    <button
                      disabled={
                        (this.state.commonTicketListSize < 1 &&
                          this.state.directTicketListSize < 1) ||
                        this.state.operatorStatus === "TICKET_IS_CALLED" ||
                        this.state.operatorStatus === "TICKET_IN_PROGRESS" ||
                        this.state.operatorStatus ===
                          "INTERNAL_TRANSACTION_STARTED"
                          ? true
                          : false
                      }
                      onClick={() => this.callTicket()}
                      className="btn-dashboard btn btn-call"
                    >
                      <strong>Викликати</strong>
                      НАТИСНІТЬ ЩОБ ПОЧАТИ
                    </button>
                    <button
                      disabled={
                        this.state.operatorStatus === "TICKET_IS_CALLED"
                          ? false
                          : true
                      }
                      onClick={() => this.ticketStart()}
                      className="btn-dashboard btn btn-play"
                    >
                      <strong>Почати</strong>
                      ПОЧАТИ ЗАПИС
                    </button>
                  </div>
                  <div className="col-1-2">
                    <button
                      disabled={
                        (this.state.operatorStatus === "TICKET_IN_PROGRESS" &&
                          this.state.operatorStatus === "TICKET_IS_CALLED") ||
                        this.state.operatorStatus === "NO_TICKET_TO_CALL" ||
                        this.state.operatorStatus === "TICKET_TO_CALL"
                          ? false
                          : true
                      }
                      onClick={() => this.props.history.push("/create-client")}
                      className="btn-dashboard btn btn-add"
                    >
                      <strong>Створити</strong>
                      НОВИЙ КЛІЄНТ
                    </button>

                    <button
                      disabled={
                        this.state.operatorStatus === "TICKET_IN_PROGRESS" ||
                        this.state.operatorStatus ===
                          "INTERNAL_TRANSACTION_STARTED"
                          ? false
                          : true
                      }
                      type="submit"
                      onClick={() => this.setState({ fieldStatus: 1 })}
                      form="detailsForm"
                      className="btn-dashboard btn btn-stop"
                    >
                      <strong>Завершити</strong>
                      ЗАВЕРШИТИ ЗАПИС
                    </button>
                  </div>
                </div>

                <div className="row-order">
                  <div className="col-1-2">
                    <div className="box">
                      <div className="box-title">
                        <strong>Деталі</strong>
                      </div>
                      <div className="box-content">
                        {this.state.fieldList
                          .filter((field) => field.entityType === "TICKET")
                          .map((field, index) => {
                            return (
                              <div key={index} className="input-block">
                                <span className="input-name">{field.name}</span>
                                <input
                                  type="text"
                                  disabled
                                  value={field.value}
                                  name={field.name}
                                  className="input"
                                  placeholder={field.name}
                                />
                              </div>
                            );
                          })}

                        <form
                          onSubmit={(event) => {
                            this.state.operatorStatus ===
                            "INTERNAL_TRANSACTION_STARTED"
                              ? this.internalOperationFinish(event)
                              : this.state.fieldStatus === 1
                              ? this.ticketFinish(event)
                              : this.state.fieldStatus === 2
                              ? this.ticketPostpone(event)
                              : this.state.fieldStatus === 3
                              ? this.ticketDelete(event)
                              : this.state.fieldStatus === 4
                              ? this.postponForWhile(
                                  this.state.hours,
                                  this.state.minutes,
                                  event
                                )
                              : this.state.fieldStatus === 5 &&
                                this.ticketRedirect(
                                  this.state.workplaceId,
                                  event
                                );
                          }}
                          id="detailsForm"
                          className="form"
                        >
                          {this.state.fieldList
                            .filter(
                              (field) => field.entityType === "TRANSACTION"
                            )
                            .map((field, index) => {
                              return (
                                <div key={index} className="input-block">
                                  <span className="input-name">
                                    {field.name}
                                  </span>
                                  <input
                                    type="text"
                                    value={field.value ? field.value : ""}
                                    onChange={(text) => this.onChangeField(text, index)}
                                    name={field.name}
                                    className="input"
                                    placeholder={field.name}
                                  />
                                </div>
                              );
                            })}
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="col-1-2 inverse">
                    <div className="row-buttons">
                      <div className="col-1-2">
                        <button
                          disabled={
                            this.state.operatorStatus ===
                              "TICKET_IN_PROGRESS" ||
                            this.state.operatorStatus === "TICKET_IS_CALLED"
                              ? false
                              : true
                          }
                          form="detailsForm"
                          onClick={() => this.setState({ fieldStatus: 3 })}
                          // onClick={() => this.ticketDelete()}
                          className="btn btn-del btn-dashboard"
                        >
                          <strong>Видалити</strong>
                          НЕМАЄ КЛІЄНТА
                        </button>
                      </div>
                      <div className="col-1-2">
                        <button
                          disabled={
                            this.state.operatorStatus === "TICKET_IN_PROGRESS"
                              ? false
                              : true
                          }
                          form="detailsForm"
                          // onClick={() => this.ticketPostpone()}
                          onClick={() => this.setState({ fieldStatus: 2 })}
                          className="btn btn-off btn-dashboard"
                        >
                          <strong>Відкласти</strong>
                          ВІДКЛАСТИ ТАЛОНЧИК
                        </button>
                      </div>
                    </div>
                    <div className="box">
                      <div className="box-title">
                        <strong>Відкласти</strong>
                      </div>

                      <div className="box-content">
                        <div className="input-block">
                          <button
                            disabled={
                              this.state.operatorStatus === "TICKET_IN_PROGRESS"
                                ? false
                                : true
                            }
                            onClick={() =>
                              this.setState({
                                dropDownBlock: !this.state.dropDownBlock,
                              })
                            }
                            className="arr arr-down"
                          ></button>
                          <input
                            type="text"
                            className="input input-time"
                            placeholder="Час"
                            disabled
                            value={`${
                              this.state.hours < 10
                                ? "0" + this.state.hours
                                : this.state.hours
                            } : ${
                              this.state.minutes < 10
                                ? "0" + this.state.minutes
                                : this.state.minutes
                            }`}
                          />
                          {this.state.dropDownBlock && (
                            <div className="timer-box">
                              <div className="timer-inputs">
                                <div className="timer-input">
                                  <button
                                    onClick={() => this.renderHours("increase")}
                                    className="increase"
                                  ></button>
                                  <input
                                    type="number"
                                    className="nums"
                                    disabled
                                    value={
                                      this.state.hours < 10
                                        ? "0" + this.state.hours
                                        : this.state.hours
                                    }
                                  />
                                  <button
                                    onClick={() => this.renderHours("decrease")}
                                    className="decrease"
                                  ></button>
                                </div>
                                <span>:</span>
                                <div className="timer-input">
                                  <button
                                    onClick={() =>
                                      this.renderMinutes("increase")
                                    }
                                    className="increase"
                                  ></button>
                                  <input
                                    type="number"
                                    className="nums"
                                    disabled
                                    value={
                                      this.state.minutes < 10
                                        ? "0" + this.state.minutes
                                        : this.state.minutes
                                    }
                                  />
                                  <button
                                    onClick={() =>
                                      this.renderMinutes("decrease")
                                    }
                                    className="decrease"
                                  ></button>
                                </div>
                              </div>

                              <div className="timer-buttons">
                                <button
                                  // onClick={() =>
                                  //   this.postponForWhile(
                                  //     this.state.hours,
                                  //     this.state.minutes
                                  //   )
                                  // }
                                  onClick={() =>
                                    this.setState({ fieldStatus: 4 })
                                  }
                                  form="detailsForm"
                                  type="submit"
                                  className="button"
                                >
                                  Підтвердити
                                </button>
                                <button
                                  onClick={() =>
                                    this.setState({ hours: 0, minutes: 0 })
                                  }
                                  type="submit"
                                  className="button reset"
                                >
                                  Очистити
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-1-3">
                <div className="box">
                  <ul
                    className={`${this.state.tab !== 0 ? "tabs" : "tabs-none"}`}
                  >
                    <button
                      className={`${this.state.tab === 1 ? "active" : ""}`}
                      onClick={() => {
                        this.getServiceList();
                        this.setState({ tab: 1 });
                      }}
                      disabled={
                        this.state.operatorStatus === "NO_TICKET_TO_CALL" ||
                        this.state.operatorStatus === "TICKET_TO_CALL"
                          ? false
                          : true
                      }
                    >
                      Задачі
                    </button>
                    <button
                      className={`${this.state.tab === 2 ? "active" : ""}`}
                      onClick={() => {
                        this.getActiveList();
                        this.setState({ tab: 2 });
                      }}
                      disabled={
                        this.state.operatorStatus === "TICKET_IN_PROGRESS"
                          ? false
                          : true
                      }
                    >
                      Направити
                    </button>
                    <button
                      className={`${this.state.tab === 3 ? "active" : ""}`}
                      onClick={() => {
                        this.getPostponedList();
                        this.setState({ tab: 3 });
                      }}
                      disabled={
                        this.state.operatorStatus === "NO_TICKET_TO_CALL" ||
                        this.state.operatorStatus === "TICKET_TO_CALL"
                          ? false
                          : true
                      }
                    >
                      Відкладені
                    </button>
                  </ul>

                  <div
                    className={`tab-content  ${
                      this.state.tab === 1 ? "active" : ""
                    }`}
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
                                onClick={() =>
                                  this.internalOperationStart(service.id)
                                }
                                className="arr arr-right"
                              ></button>
                            </li>
                          );
                        })
                      )}
                    </ul>
                  </div>
                  <div
                    className={`tab-content  ${
                      this.state.tab === 2 ? "active" : ""
                    }`}
                  >
                    <ul className="tab-list">
                      {!this.state.workplaceActiveList.length ? (
                        <p>Список порожній</p>
                      ) : (
                        this.state.workplaceActiveList.map(
                          (workplace, index) => {
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
                          }
                        )
                      )}
                    </ul>
                  </div>
                  <div
                    className={`tab-content  ${
                      this.state.tab === 3 ? "active" : ""
                    }`}
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
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer>
          <div className="container">
            <p>
              © 2020 QMate Dashboard by Servus Systems Integration. All rights
              reserved
            </p>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default Dashboard;
