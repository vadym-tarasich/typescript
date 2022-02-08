import * as React from "react";

export const ListHeader: React.FC = () => (
  <div className="row listHeader">
    <div className="column column-25">City Name</div>
    <div className="column column-25">Date</div>
    <div className="column column-35">Favourite dish</div>
    <div className="column column-15">AVG grade</div>
  </div>
);
