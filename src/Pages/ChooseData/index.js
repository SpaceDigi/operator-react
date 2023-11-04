import React, { useState, useEffect } from 'react';
import SelectDropdown from '../../Components/CustomComponents/SelectDropdown';
import API from '../../api/API';
import logo from '../../img/sinevo-logo.svg';
import BackgroundPage from '../../Components/BackgroundPage';
import links from '../../api/links';
import { useDispatch, useSelector } from 'react-redux';
import {
  setServiceCenter as setSelectedServiceCenter,
  setUserData,
  setUserId,
  setWorkplace as setSelectedWorkplace,
} from '../../redux/auth/authSlice';
import { config } from '../../config';
import { routes } from '../../api/routes';

const depTxt = 'Відділення';
const workTxt = 'Робоче місце';

export default function ChooseData(props) {
  const [department, setDepartment] = useState({ description: depTxt });
  const [departmentsList, setDepartmentsList] = useState([]);
  const [workplace, setWorkplace] = useState({ description: workTxt });
  const [workplaceList, setWorkplaceList] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const USER_ID = useSelector((state) => state.USER_ID);
  const serviceCenterId = useSelector((state) => state.serviceCenter.id);
  const workplaceId = useSelector((state) => state.workplace.id);
  const { userLogin, userPassword } = props.location.state;

  useEffect(() => {
    document.body.className = 'fix';
    if (!userLogin || !userPassword || !USER_ID) {
      props.history.push(routes.login);
    }

    if (serviceCenterId && workplaceId && USER_ID) {
      props.history.push(routes.dashboard);
    }

    loadBranchList();
    return () => {
      document.body.className = document.body.className.replace('fix', '');
    };
    // eslint-disable-next-line
  }, [userLogin, userPassword, USER_ID, serviceCenterId, workplaceId]);

  const loadBranchList = () => {
    API.get(
      `${links.branchList}?EmployeeId=${USER_ID}&OrganisationGuid=${config.ORG_GUID}`
    ).then((res) => {
      setDepartmentsList(res.data.data);
      console.log(res.data.data);

      if (department.length === 1) {
        const department = res.data.data[0];
        loadWorkplaceList(department[0].id);
        setDepartment(department[0]);
      }
    });
  };

  const loadWorkplaceList = (branchId) => {
    API.get(
      `${links.workplaceList}?OrganisationGuid=${config.ORG_GUID}&ServiceCenterId=${branchId}`
    ).then((res) => {
      console.log(res.data);
      setWorkplaceList(res.data.data);

      if (res.data.data.length === 1) {
        const firstWorkplace = res.data.data[0];
        setWorkplace(firstWorkplace);
      } else {
        setWorkplace({ description: 'Робоче місце' });
      }
    });
  };

  const setBranch = (e) => {
    console.log(e);
    setDepartment(e);
    loadWorkplaceList(e.serviceCenterId);
  };

  const { workPlaceId: selectedWorkplaceId } = workplace;
  const { serviceCenterId: selectedServiceCenterId } = department;
  console.log(department);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(workplace);
    setLoading(true);
    API.post(links.login, {
      organisationGuid: config.ORG_GUID,
      serviceCenterId: selectedServiceCenterId,
      workplaceId: selectedWorkplaceId,
      userLogin,
      userPassword,
    }).then((res) => {
      console.log(res.data);
      dispatch(setUserData(res.data.data));
      dispatch(
        setSelectedWorkplace({
          id: workplace.workPlaceId,
          title: workplace.description,
        })
      );
      dispatch(
        setSelectedServiceCenter({
          id: department.serviceCenterId,
          title: department.description,
        })
      );
    });
    setLoading(false);
  };

  const logout = () => {
    dispatch(setUserId(null));
  };

  const submitDisabled = !selectedWorkplaceId || !selectedServiceCenterId || loading;

  return (
    <React.Fragment>
      <BackgroundPage />
      <div className="pop-overlay">
        <div className="pop-table">
          <div className="pop-cell">
            <div className="pop-up" id="auth">
              <div className="pop-up-top">
                <strong>Вхід в систему</strong>
                <img src={logo} style={{ width: '75px' }} alt="logo" />
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
                    disabled={department.title === 'Відділення' ? true : false}
                    value={workplace}
                    setVal={setWorkplace}
                    dataList={workplaceList}
                  />
                </div>
                <div className="input-block">
                  <button disabled={submitDisabled} type="submit" className="button">
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
