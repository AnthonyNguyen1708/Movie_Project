import { Redirect, Route } from "react-router-dom";
import { Fragment } from "react";
import { ENV } from "../../util/settings/config";

const CheckOutTemplate = (props) => {
  const { Component, ...restProps } = props;

  if (!localStorage.getItem(ENV.USER_PROFILE)) {
    return <Redirect to="/login" />;
  }

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <Fragment>
            <Component {...propsRoute} />
          </Fragment>
        );
      }}
    />
  );
};

export default CheckOutTemplate;
