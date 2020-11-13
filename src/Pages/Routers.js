import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";


class Routers extends React.Component {
  render() {
    return (
      <Router>
        <div className={"wrapper_main_content"}>
            <Route
              {...this.props}
            />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Routers);
