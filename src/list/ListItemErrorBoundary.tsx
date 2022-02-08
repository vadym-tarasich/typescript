import * as React from "react";
import { WrongItemPlaceholder } from "./WrongItemPlaceholder";

export class ListItemErrorBoundary extends React.PureComponent {
  // todo: render WrongItemPlaceholder if error caught
  state = {
    hasError: false,
  }
  static getDerivedStateFromError() {
    return {
      hasError: true,
    }
  }

  public render() {
    return this.state.hasError ? <WrongItemPlaceholder /> : this.props.children;
  }
}
