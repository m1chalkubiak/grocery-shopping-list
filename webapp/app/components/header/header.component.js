import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import messages from './header.messages';

export class Header extends PureComponent {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
            <ShoppingCartIcon />
          </IconButton>
          <Typography variant="title" color="inherit">
            <FormattedMessage {...messages.title} />
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}
