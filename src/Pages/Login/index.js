import React, { useState, useEffect } from "react";
import Keys from "../../Constants/helper";
import API from "../../api/API";
import logoBlack from "../../img/logo-black.svg";
import BackgroundPage from "../../Components/BackgroundPage";
import links from "../../api/links";
import { connect } from "react-redux";
import { authActions } from "../../redux/auth";

function Login(props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.body.className = "fix";
    if (localStorage.getItem(Keys.JWT_TOKEN)) {
      props.history.push("/choose-data");
    }
    return () => {
      document.body.className = document.body.className.replace("fix", "");
    };
  }, [props.history]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!login || !password) return;
    API.post(links.login, { login, password })
      .then((res) => {
        props.getToken(res.data.Authorization);
        localStorage.setItem(Keys.JWT_TOKEN, res.data.Authorization);
        localStorage.setItem(Keys.USER_ID, res.data.userId);
        if (localStorage.getItem(Keys.JWT_TOKEN)) {
          // window.location = "/choose-data";
          props.history.push({
            pathname: "/choose-data",
            state: { token: res.data.Authorization },
          });
        }
      })
      .catch((err) => {
        props.history.push({
          pathname: "/error",
          state: { error: err?.response?.data?.errorMsg },
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
              <form onSubmit={(event) => handleSubmit(event)} className="form">
                <p className="form-title">ВВЕДІТЬ ВАШІ ДАНІ</p>
                <div className="input-block">
                  <span className="input-name">Логін</span>
                  <input
                    autoComplete="on"
                    name="login"
                    className="input"
                    type="text"
                    placeholder="Логін"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    required
                  />
                </div>
                <div className="input-block">
                  <span className="input-name">Пароль</span>
                  <input
                    autoComplete="on"
                    name="password"
                    type="password"
                    className="input"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="input-block">
                  <button type="submit" className="button">
                    Підтвердити
                  </button>
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

const mapDispatchToProps = (dispatch) => {
  return {
    getToken: (token) => {
      dispatch(authActions.setToken(token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
