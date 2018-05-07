import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import randomColor from 'randomcolor';
import { FormattedMessage } from 'react-intl';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from 'material-ui/IconButton';
import ButtonBase from 'material-ui/ButtonBase';

import { ListsProgress } from '../listProgress/listProgress.component';
import styles, { Container, CardContainer, ListItems, ListItem, ProgressContainer } from './lists.styles';
import messages from './lists.messages';

export class ListsComponent extends PureComponent {
  static propTypes = {
    data: PropTypes.object,
    onListClick: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  };

  getLeftItemsCount = (listItem) => listItem.get('items').filter((item) => item.get('active')).size;

  getTotalItemsCount = (listItem) => listItem.get('items').size;

  getAvatarColor = (seed) => randomColor({ luminosity: 'dark', seed });

  handleEditClick = () => {
    // TODO
  };

  handleDeleteClick = () => {
    // TODO
  };

  renderAvatar = (listItem) => (
    <Avatar aria-label="Recipe" style={{ backgroundColor: this.getAvatarColor(listItem.get('id')) }}>
      {listItem.get('name').charAt(0).toUpperCase()}
    </Avatar>
  );

  renderListItems = (listItem) => (
    <ListItems>
      {listItem.get('items').toArray().map((item, index) => (
        <Fragment key={item.get('id')}>
          <ListItem disabled={!item.get('active')}>{item.get('name')}</ListItem>
          {index < listItem.get('items').size - 1 ? ', ' : null }
        </Fragment>
      ))}
    </ListItems>
  );

  renderCardActions = () => (
    <CardActions className={this.props.classes.cardActions}>
      <IconButton className={this.props.classes.cardIconButton} onClick={this.handleEditClick}>
        <EditIcon className={this.props.classes.cardIcon} />
      </IconButton>
      <IconButton className={this.props.classes.cardIconButton} onClick={this.handleDeleteClick}>
        <DeleteIcon className={this.props.classes.cardIcon} />
      </IconButton>
    </CardActions>
  );

  renderCard = (listItem) => {
    const { classes, onListClick } = this.props;

    return (
      <CardContainer key={listItem.get('id')}>
        <ButtonBase onClick={() => onListClick(listItem)} className={classes.button}>
          <Card className={classes.card}>
            <CardHeader
              avatar={this.renderAvatar(listItem)}
              title={listItem.get('name')}
              subheader={<FormattedMessage {...messages.cardSubheader} values={{
                leftCount: this.getLeftItemsCount(listItem),
                totalCount: this.getTotalItemsCount(listItem),
              }}
              />}
            />
            <CardContent className={classes.cardContent}>
              {this.renderListItems(listItem)}
              <ProgressContainer>
                <ListsProgress list={listItem} />
              </ProgressContainer>
            </CardContent>
          </Card>
        </ButtonBase>
        {this.renderCardActions(listItem)}
      </CardContainer>
    );
  };

  render() {
    return (
      <Container>
        {this.props.data.toArray().map(this.renderCard)}
      </Container>
    );
  }
}

export const Lists = withStyles(styles, { withTheme: true })(ListsComponent);
