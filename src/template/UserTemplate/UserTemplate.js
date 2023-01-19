import { Route } from "react-router-dom";
import { Fragment, useEffect } from "react";

export const UserTemplate = (props) => {
  const { Component, ...restProps } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
  });
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
