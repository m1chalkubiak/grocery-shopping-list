import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import Dialog, {
  DialogActions,
  DialogContent,
} from 'material-ui/Dialog';

export class NameModal extends PureComponent {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    initialValue: PropTypes.string,
    edit: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    isVisible: false,
    label: '',
    edit: false,
  };

  state = {
    value: '',
  };

  componentWillUpdate(nextProps) {
    if (!this.props.initialValue && this.props.edit) {
      this.setState({ value: nextProps.initialValue });
    }
  }

  handleSave = () => {
    this.props.onSave(this.state.value);
    this.setState({ value: '' });
  };

  handleValueChange = ({ target: { value } }) => this.setState({ value });

  render() {
    return (
      <Dialog
        open={this.props.isVisible}
        onClose={this.onClose}
      >
        <DialogContent>
          <TextField
            label={this.props.label}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Name"
            fullWidth
            margin="normal"
            onChange={this.handleValueChange}
            value={this.state.value}
          />
        </DialogContent>
        <DialogActions>
          <IconButton onClick={this.props.onClose}>
            <CancelIcon />
          </IconButton>
          <IconButton onClick={this.handleSave} color="primary" disabled={!this.state.value || this.state.value === ''}>
            <SaveIcon />
          </IconButton>]
        </DialogActions>
      </Dialog>
    );
  }
}
