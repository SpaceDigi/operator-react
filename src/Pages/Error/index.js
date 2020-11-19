import React, { useEffect } from "react";
import BackgroundPage from "../../Components/BackgroundPage";
import logoBlack from "../../img/logo-black.svg";

function Error(props) {
  useEffect(() => {
    document.body.className = "fix";
    return () => (document.body.className = "");
  }, []);

  return (
    <React.Fragment>
      <BackgroundPage />
      <div className="pop-overlay">
        <div className="pop-table">
          <div className="pop-cell">
            <div className="pop-up" id="add">
              <div className="pop-up-top">
                <strong>Помилка {props?.location?.state?.requestId} !</strong>
                <img src={logoBlack} alt="logo" />
              </div>
              <div className="form">
                <p style={{ marginBottom: 20 }}>
                  {props?.location?.state?.error
                    ? props.location.state.error
                    : props?.location?.state?.status === 500 ||
                      props?.location?.state?.status === 502
                    ? "Проблеми з  сервером!"
                    : "Проблеми з зв'язком!"}
                </p>
                <button
                  className="button"
                  onClick={() => {
                    props?.location?.state?.back
                      ? props.history.goBack()
                      : props.history.push("/dashboard");
                  }}
                >
                  ОК
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Error;
