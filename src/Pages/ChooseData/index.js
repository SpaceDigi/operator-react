import React, { useState, useEffect } from "react";
import Keys from "../../Constants/helper";
import SelectDropdown from "../../Components/CustomComponents/SelectDropdown";
import API from "../../api/API";
import logoBlack from "../../img/logo-black.svg";
import BackgroundPage from "../../Components/BackgroundPage";
import links from "../../api/links";

const depTxt = "Відділення";
const workTxt = "Робоче місце";

function ChooseData(props) {
  const [department, setDepartment] = useState({ title: depTxt });
  const [departmentsList, setDepartmentsList] = useState([]);
  const [workplace, setWorkplace] = useState({ title: workTxt });
  const [workplaceList, setWorkplaceList] = useState([]);
  const userId = Number(localStorage.getItem(Keys.USER_ID));

  useEffect(() => {
    document.body.className = "fix";
    loadBranchList();
    return () => {
      document.body.className = document.body.className.replace("fix", "");
    };
    // eslint-disable-next-line
  }, []);

  const loadBranchList = () => {
    API.post(links.branchList, { userId: userId }, {})
      .then((res) => {
        setDepartmentsList(res.data.branchList);
        const department = res.data.branchList;

        if (department.length === 1) {
          loadWorkplaceList(department[0].id);
          setDepartment(department[0]);
        }
      })
      .catch((error) => {
        props.history.push({
          pathname: "/error",
          state: { error: error?.response?.data?.errorMsg, status: error?.response?.data?.code  },
        });
      });
  };

  const loadWorkplaceList = (branchId) => {
    API.post(links.workplaceList, { userId: userId, branchId: branchId }, {})
      .then((res) => {
        setWorkplaceList(res.data.workplaceList);
        const workPlaces = res.data.workplaceList;

        if (workPlaces.length === 1) {
          setWorkplace(workPlaces[0]);
        } else {
          setWorkplace({ title: "Робоче місце" });
        }
      })
      .catch((error) => {
        props.history.push({
          pathname: "/error",
          state: { error: error?.response?.data?.errorMsg, status: error?.response?.data?.code  },
        });
      });
  };

  const setBranch = (e) => {
    setDepartment(e);
    loadWorkplaceList(e.id);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    API.post(
      links.workplaceActive,
      { userId: userId, workplaceId: workplace.id },
      {}
    )
      .then((res) => {
        props.history.push("/dashboard");
        localStorage.setItem(Keys.DEPARTMENT, department.title);
        localStorage.setItem(Keys.WORKPLACE, workplace.title);
      })
      .catch((error) => {
        props.history.push({
          pathname: "/error",
          state: { error: error?.response?.data?.errorMsg, status: error?.response?.data?.code  },
        });
      });
    // props.history.push("/dashboard");
  };

  const logout = () => {
    API.post(links.logout, { userId: userId }, {})
      .then((res) => {
        localStorage.clear();
        props.history.push("/");
      })
      .catch((error) => {
        if (error.response.data.status !== 400) {
          localStorage.clear();
          props.history.push("/");
        }
        props.history.push({
          pathname: "/error",
          state: {
            error: error?.response?.data?.errorMsg,
            status: error?.response?.data?.code,
            requestId: error?.response?.headers['request-id'],
          },
        });
      });
  };

  return (
    <React.Fragment>
      <BackgroundPage />
      <div className="pop-overlay">
        <div className="pop-table">
          <div className="pop-cell">
            <div className="pop-up" id="auth">
              <div className="pop-up-top">
                <strong>Вхід в систему</strong>
                <img src={logoBlack} alt="logo" />
              </div>
              <form onSubmit={handleSubmit} className="form">
                <p className="form-title">Оберіть дані</p>
                <div className="input-block">
                  <span className="input-name">Відділення</span>
                  <SelectDropdown
                    value={department}
                    setVal={setBranch}
                    dataList={departmentsList}
                  />
                </div>
                <div className="input-block">
                  <span className="input-name">Робоче місце</span>
                  <SelectDropdown
                    disabled={department.title === "Відділення" ? true : false}
                    value={workplace}
                    setVal={setWorkplace}
                    dataList={workplaceList}
                  />
                </div>
                <div className="input-block">
                  <button
                    disabled={
                      workplace.title === workTxt || department.title === depTxt
                        ? true
                        : false
                    }
                    type="submit"
                    className="button"
                  >
                    Підтвердити
                  </button>
                  <span onClick={() => logout()} className="button__logout ">
                    Вийти
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

export default ChooseData;
