import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { LinearProgress } from 'material-ui/Progress';


export class ListsProgress extends PureComponent {
  static propTypes = {
    list: PropTypes.object,
  };

  state = {
    value: 0,
  };

  componentDidMount() {
    this._timeout = setTimeout(() => this.setState({ value: this.progressValue }));
  }

  componentDidUpdate() {
    this.setState({ value: this.progressValue });
  }

  componentWillUnmount() {
    clearTimeout(this._timeout);
  }

  get leftItemsCount() {
    return this.props.list.get('items').filter((item) => item.get('active')).size;
  }

  get totalItemsCount() {
    return this.props.list.get('items').size;
  }

  get progressValue() {
    return ((this.totalItemsCount - this.leftItemsCount) / this.totalItemsCount) * 100;
  }

  render = () => (
    <LinearProgress color="secondary" variant="determinate" value={this.state.value} />
  );
}
