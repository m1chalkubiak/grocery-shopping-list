import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { ifElse, propEq } from 'ramda';
import { List } from 'immutable';
import Typograpghy from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import ListContainer, { ListItem, ListItemSecondaryAction } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import Zoom from 'material-ui/transitions/Zoom';
import Collapse from 'material-ui/transitions/Collapse';
import { CircularProgress } from 'material-ui/Progress';
import HomeIcon from '@material-ui/icons/Home';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { ListsProgress } from '../../components/listProgress/listProgress.component';
import { Container, LoaderContainer, TitleContainer, ListItemText } from './singleList.styles';


export class SingleList extends PureComponent {
  static propTypes = {
    list: PropTypes.object,
    isLoadingList: PropTypes.bool,
    fetchList: PropTypes.func.isRequired,
    toggleItemActive: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

  state = {
    headerIn: false,
  };

  componentWillMount() {
    this.props.fetchList(parseInt(this.props.match.params.id, 10));
  }

  componentDidMount() {
    this._timeout = setTimeout(() => this.setState({ headerIn: true }));
  }

  componentWillUnmount() {
    clearTimeout(this._timeout);
  }

  handleBackClick = () => {
    this.props.history.push(`/${this.props.match.params.lang}`);
  };

  handleItemClick = (item) => {
    this.props.toggleItemActive(item.get('id'), !item.get('active'));
  };

  handleEditClick = () => {
    // TODO
  };

  handleDeleteClick = () => {
    // TODO
  };

  renderLoader = () => (
    <LoaderContainer>
      <CircularProgress size={50} color="secondary" />
    </LoaderContainer>
  );

  renderContent = () => {
    const { list, classes, theme: { transitions: { duration } } } = this.props;

    return (
      <Container>
        <Collapse in={this.state.headerIn}>
          <Typograpghy className={classes.header} variant="title" noWrap>
            <IconButton color="inherit" aria-label="Menu" onClick={this.handleBackClick}>
              <HomeIcon />
            </IconButton>

            <KeyboardArrowRightIcon />

            <TitleContainer>
              {list.get('name')}
            </TitleContainer>
          </Typograpghy>
          <ListsProgress list={list} />
        </Collapse>

        <ListContainer disablePadding >
          {list.get('items', List()).toArray().map((item) => (
            <Fragment key={item.get('id')}>
              <ListItem
                role={undefined}
                dense
                button
                onClick={() => this.handleItemClick(item)}
              >
                <Checkbox
                  checked={!item.get('active')}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText disabled={!item.get('active')}>
                  <Typograpghy variant="body1" color="inherit">
                    {item.get('name')}
                  </Typograpghy>
                </ListItemText>
                <ListItemSecondaryAction>
                  <IconButton className={classes.itemIconButton} onClick={this.handleEditClick}>
                    <EditIcon className={classes.itemIcon} />
                  </IconButton>
                  <IconButton className={classes.itemIconButton} onClick={this.handleDeleteClick}>
                    <DeleteIcon className={classes.itemIcon} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </Fragment>
          ))}
        </ListContainer>

        <Zoom in unmountOnExit timeout={{ enter: duration.enteringScreen, exit: duration.leavingScreen }}>
          <Button variant="fab" color="primary" aria-label="add" className={classes.fab}>
            <AddIcon />
          </Button>
        </Zoom>
      </Container>
    );
  };

  render = () => ifElse(
    propEq('isLoadingList', true),
    this.renderLoader,
    this.renderContent
  )(this.props);
}
