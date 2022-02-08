import * as React from "react";
import { ListRecord } from "../types";

type ListItemProps = Omit<ListRecord, "id">;

export class ListItem extends React.Component<ListItemProps> {
  public render() {
    const avg = 
      this.props.grades.reduce((acc, e) => (acc += e), 0) /
      this.props.grades.length;
    return (
      <div data-test="list-item" className="row listItem">
        <div className="column column-25">{this.props.name}</div>
        <div className="column column-25">{this.props.date}</div>
        <div className="column column-35">{this.props.favouriteDish.name}</div>
        <div className="column column-15">{avg.toFixed(2)}</div>
      </div>
    );
  }
}
