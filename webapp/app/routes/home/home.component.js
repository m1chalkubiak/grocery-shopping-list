import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import Zoom from 'material-ui/transitions/Zoom';
import { CircularProgress } from 'material-ui/Progress';
import { ifElse, always } from 'ramda';


import { Container, LoaderContainer } from './home.styles';
import { Lists } from '../../components/lists/lists.component';

export class Home extends PureComponent {
  static propTypes = {
    lists: PropTypes.object,
    isLoadingLists: PropTypes.bool,
    fetchLists: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.fetchLists();
  }

  handleListClick = (list) => {
    this.props.history.push(`/${this.props.match.params.lang}/${list.get('id')}`);
  };

  renderLoader = () => (
    <LoaderContainer>
      <CircularProgress size={50} color="secondary" />
    </LoaderContainer>
  );

  renderContent = () => {
    const { classes, theme: { transitions: { duration } }, lists } = this.props;

    return (
      <Container>
        <Lists data={lists} onListClick={this.handleListClick} />

        <Zoom in unmountOnExit timeout={{ enter: duration.enteringScreen, exit: duration.leavingScreen }}>
          <Button variant="fab" color="primary" aria-label="add" className={classes.fab}>
            <AddIcon />
          </Button>
        </Zoom>
      </Container>
    );
  };

  render = () => ifElse(
    always(this.props.isLoadingLists),
    this.renderLoader,
    this.renderContent
  )();
}
