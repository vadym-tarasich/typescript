import * as React from "react";
import { ListFilters, ListRecord } from "../types";
import { ListItem } from "./ListItem";
import { ListHeader } from "./ListHeader";
import { ListItemErrorBoundary } from "./ListItemErrorBoundary";

interface ListProps {
  data: ListRecord[];
  filters: ListFilters;
}

export class List extends React.Component<ListProps> {
  public render() {
    return (
      <div data-test="notes-list">
        <ListHeader />
        {/* todo: display real data here */}
        {/* todo: use ListItemErrorBoundary to display WrongItemPlaceholder if error is thrown */}
        {this.props.data.map((data) => (
          <ListItemErrorBoundary key={data.id}>
            <ListItem {...data} />
          </ListItemErrorBoundary>
        ))}
      </div>
    );
  }
}
