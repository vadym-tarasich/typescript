import * as React from "react";

export const WrongItemPlaceholder: React.FC = () => (
  <div data-test="wrong-item" className="row listItem wrongItem">
    <div className="column">Wrong data!</div>
  </div>
);