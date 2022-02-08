import * as React from "react";
import { ListFilters } from "../types";

interface FiltersProps {
  onChange: (filters: ListFilters) => void;
}

export class Filters extends React.Component<FiltersProps> {
  // todo: implement filters onChange callback
  // FiltersProps.onChange has to be fired on keyword or order change
  state: ListFilters = {
    order: "asc",
    keyword: ""
  };

  onKeywordChange = (keyword: string) => {
    this.setState(
      {
        keyword
      },
      () => {
        this.props.onChange(this.state);
      }
    );
  };

  onOrderChange = (order: ListFilters["order"]) => {
    console.log("change", order);
    this.setState(
      {
        order
      },
      () => {
        this.props.onChange(this.state);
      }
    );
  };

  public render() {
    return (
      <div className="row">
        <div className="column column-50">
          <label>Keyword</label>
          <input
            value={this.state.keyword}
            type="text"
            onChange={(e) => this.onKeywordChange(e.target.value)}
            data-test="keyword-input"
          />
        </div>
        <div className="column column-50">
          <label>Grades Order</label>
          <select
            onChange={(e) =>
              this.onOrderChange(e.target.value as "asc" | "desc")
            }
            data-test="order-selector"
          >
            <option selected={this.state.order === "asc"} value="asc">
              asc ↑
            </option>
            <option selected={this.state.order === "desc"} value="desc">
              desc ↓
            </option>
          </select>
        </div>
      </div>
    );
  }
}
