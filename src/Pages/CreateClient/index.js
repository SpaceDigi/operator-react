import React, { useState, useEffect } from "react";
import BackgroundPage from "../../Components/BackgroundPage";
import Keys from "../../Constants/helper";
import API from "../../api/API";
import logoBlack from "../../img/logo-black.svg";
import SelectDropdown from "../../Components/CustomComponents/SelectDropdown";
import links from "../../api/links";
import { connect } from "react-redux";

const servTxt = "Оберіть послугу";

function CreateClient(props) {
  const [serviceList, setServiceList] = useState([]);
  const [service, setServiceData] = useState({ title: servTxt });
  const [serviceFieldList, setServiceFieldList] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem(Keys.USER_ID);

  useEffect(() => {
    document.body.className = "fix";
    loadServiceList();
    return () => {
      document.body.className = document.body.className.replace("fix", "");
    };
    // eslint-disable-next-line
  }, []);

  const loadServiceList = () => {
    setLoading(true);
    API.post(
      links.listTicket,
      { userId: userId },
      {
        headers: {
          Authorization: props.token
            ? props.token
            : localStorage.getItem(Keys.JWT_TOKEN),
        },
      }
    )
      .then((res) => {
        setLoading(false);
        setServiceList(res.data.serviceList);
      })
      .catch((err) => {
        props.history.push({
          pathname: "/error",
          state: { error: err?.response?.data?.errorMsg },
        });
      });
  };

  const getServices = (e) => {
    setLoading(true);
    API.post(
      links.serviceGet,
      { serviceId: e },
      {
        headers: {
          Authorization: props.token
            ? props.token
            : localStorage.getItem(Keys.JWT_TOKEN),
        },
      }
    )
      .then((res) => {
        setLoading(false);
        setServiceFieldList(res.data.serviceFieldList);
      })
      .catch((err) => {
        props.history.push({
          pathname: "/error",
          state: { error: err?.response?.data?.errorMsg },
        });
      });
  };

  const setService = (e) => {
    setServiceData(e);
    getServices(e.id);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    let data = [];
    const formData = event.target.elements;
    for (let i = 1; i < formData.length - 1; i++) {
      data.push({ name: formData[i].name, value: formData[i].value });
    }

    API.post(
      links.ticketRegister,
      {
        serviceId: service.id,
        ticketFieldList: data,
        userId: Number(userId),
      },
      {
        headers: {
          Authorization: props.token
            ? props.token
            : localStorage.getItem(Keys.JWT_TOKEN),
        },
      }
    )
      .then((res) => {
        setLoading(false);
        props.history.push("/dashboard");
      })
      .catch((err) => {
        props.history.push({
          pathname: "/error",
          state: { error: err.response.data.errorMsg },
        });
      });
  };

  return (
    <React.Fragment>
      <BackgroundPage />
      <div className="pop-overlay">
        <div className="pop-table">
          <div className="pop-cell">
            <div className="pop-up" id="add">
              <div className="pop-up-top">
                <strong>Створити</strong>
                {loading && <div className="loader-black">Loading...</div>}
                <img src={logoBlack} alt="logo" />
              </div>
              <form onSubmit={(event) => handleSubmit(event)} className="form">
                <p className="form-title">НОВИЙ КЛІЄНТ</p>
                <div className="input-block">
                  <SelectDropdown
                    value={service}
                    setVal={(e) => setService(e)}
                    dataList={serviceList}
                  />
                </div>
                {serviceFieldList.map((field, index) => {
                  return (
                    <div className="input-block" key={index}>
                      <span className="input-name">{field.name}</span>
                      <input
                        autoComplete="off"
                        name={field.name}
                        type="text"
                        className="input"
                        placeholder={field.name}
                      />
                    </div>
                  );
                })}
                <div className="input-block">
                  <button
                    type="submit"
                    disabled={service.title !== servTxt ? false : true}
                    className="button"
                  >
                    Підтвердити
                  </button>
                  <span
                    onClick={() => props.history.push("/dashboard")}
                    className="button__logout "
                  >
                    Відмінити
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(CreateClient);
