import { Redirect, Route } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { ENV } from "../../util/settings/config";

const CheckOutTemplate = (props) => {
  const { Component, ...restProps } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  });

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
