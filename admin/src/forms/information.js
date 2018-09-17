import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Tabs,
  Tab,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  CardActions,
  CardContent,
  Button,
  LinearProgress,
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { dateFormat, Translate } from '../helper';
import withRoot from '../withRoot';
import styles from '../styles';
import TabContainer from '../components/tab-container';
import Failed from '../components/failed';

const { translate, getLanguage } = new Translate();
const blankItem = {
  sl: {
    name: '',
    denomination: '',
    bible: {
      verse: '',
      from: '',
    },
  },
  en: {
    name: '',
    denomination: '',
    bible: {
      verse: '',
      from: '',
    },
  },
  phone: '',
  email: '',
  address: {
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  },
};

const blankState = {
  item: blankItem,
  add: true,
};

class InformationForm extends Component {
  static displayName = 'information-form';

  static defaultProps = {
    getFailed: false,
    deleteFailed: false,
    updateFailed: false,
    addFailed: false,
  };

  static propTypes = {
    getInformation: PropTypes.func.isRequired,
    deleteInformation: PropTypes.func.isRequired,
    updateInformation: PropTypes.func.isRequired,
    addInformation: PropTypes.func.isRequired,
    clearInfoForm: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    information: PropTypes.object.isRequired,
    getFailed: PropTypes.bool,
    deleteFailed: PropTypes.bool,
    updateFailed: PropTypes.bool,
    addFailed: PropTypes.bool,
  };

  state = {
    item: blankItem,
    add: true,
    value: 0,
  };

  async componentDidMount() {
    await this.props.getInformation();
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  handleDelete = async (id) => {
    await this.props.deleteInformation(id);
    this.setState({ ...blankState });
    await this.props.getInformation();
  };

  handleFormUpdate = async (event) => {
    event.preventDefault();

    const result = this.state.add
      ? await this.props.addInformation(this.state.item)
      : await this.props.updateInformation(this.state.item);

    if (result && Object.keys(result).length !== 0 && result.status === 'success') {
      this.setState({ ...blankState });
      await this.props.getInformation();
    }
  };

  handleEdit = (item) => {
    this.props.clearInfoForm();
    this.setState({ item, add: false });
  };

  handleFormClear = (event) => {
    event.preventDefault();
    this.props.clearInfoForm();
    this.setState({ ...blankState });
  };

  handleAmharicInput = (event) => {
    const { value, name } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      item: {
        ...prevState.item,
        sl: { ...prevState.item.sl, [name]: value },
      },
    }));
  };

  handleAmharicBibleInput = (event) => {
    const { value, name } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      item: {
        ...prevState.item,
        sl: { ...prevState.item.sl, bible: { ...prevState.item.sl.bible, [name]: value } },
      },
    }));
  };

  handleEnglishInput = (event) => {
    const { value, name } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      item: {
        ...prevState.item,
        en: { ...prevState.item.en, [name]: value },
      },
    }));
  };

  handleEnglishBibleInput = (event) => {
    const { value, name } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      item: {
        ...prevState.item,
        en: { ...prevState.item.en, bible: { ...prevState.item.en.bible, [name]: value } },
      },
    }));
  };

  handleItemInput = (event) => {
    const { value, name } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      item: {
        ...prevState.item,
        [name]: value,
      },
    }));
  };

  handleAddressInput = (event) => {
    const { value, name } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      item: {
        ...prevState.item,
        address: { ...prevState.item.address, [name]: value },
      },
    }));
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    if (this.props.information.getFailed) {
      return <Failed name="information" />;
    }

    if (this.props.information.isLoading) {
      return <LinearProgress />;
    }

    if (this.props.information.items) {
      return (
        <div className={classes.root}>
          <Card className={classes.card}>
            <CardContent>
              <form onSubmit={this.handleSubmit}>
                <Tabs value={value} onChange={this.handleChange}>
                  <Tab label={getLanguage()} id="inf-01" />
                  <Tab label="English" id="inf-02" />
                </Tabs>
                {value === 0 && (
                  <TabContainer>
                    <TextField
                      className={classes.formControl}
                      id="inf-03"
                      label="Name"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      margin="normal"
                      name="name"
                      required
                      value={this.state.item.sl.name}
                      placeholder={translate('INFO_NAME_PH')}
                      onChange={this.handleAmharicInput}
                      helperText={translate('INFO_NAME_HT')}
                    />
                    <TextField
                      className={classes.formControl}
                      id="inf-04"
                      label="Denomination"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      margin="normal"
                      name="denomination"
                      required
                      value={this.state.item.sl.denomination}
                      placeholder={translate('INFO_DENOMINATION_PH')}
                      onChange={this.handleAmharicInput}
                      helperText={translate('INFO_DENOMINATION_HT')}
                    />
                    <TextField
                      className={classes.formControl}
                      id="inf-05"
                      label="Bible verse"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      margin="normal"
                      name="verse"
                      required
                      value={this.state.item.sl.bible.verse}
                      placeholder={translate('INFO_VERSE_PH')}
                      onChange={this.handleAmharicBibleInput}
                      helperText={translate('INFO_VERSE_HT')}
                    />
                    <TextField
                      className={classes.formControl}
                      id="inf-06"
                      label="Source"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      margin="normal"
                      name="from"
                      required
                      value={this.state.item.sl.bible.from}
                      placeholder={translate('INFO_FROM_PH')}
                      onChange={this.handleAmharicBibleInput}
                      helperText={translate('INFO_FROM_HT')}
                    />
                  </TabContainer>
                )}
                {value === 1 && (
                  <TabContainer>
                    <TextField
                      className={classes.formControl}
                      id="inf-07"
                      label="Name"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      margin="normal"
                      name="name"
                      required
                      value={this.state.item.en.name}
                      placeholder="Enter church name"
                      onChange={this.handleEnglishInput}
                      helperText="e.g. Seattle Debre Mihret St.Michael Ethiopian Orthodox Tewahedo Church"
                    />
                    <TextField
                      className={classes.formControl}
                      id="inf-08"
                      label="Denomination"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      margin="normal"
                      name="denomination"
                      required
                      value={this.state.item.en.denomination}
                      placeholder="Enter your church denomination name"
                      onChange={this.handleEnglishInput}
                      helperText="e.g. Ethiopian Orthodox Tewahedo Church"
                    />
                    <TextField
                      className={classes.formControl}
                      id="inf-09"
                      label="Bible verse"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      margin="normal"
                      name="verse"
                      required
                      value={this.state.item.en.bible.verse}
                      placeholder="Enter your church verse"
                      onChange={this.handleEnglishBibleInput}
                      helperText="e.g. For where two or three are gathered together in my name, there am I in the midst of them."
                    />
                    <TextField
                      className={classes.formControl}
                      id="inf-10"
                      label="Source"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      margin="normal"
                      name="from"
                      required
                      value={this.state.item.en.bible.from}
                      placeholder="Enter your church verse from"
                      onChange={this.handleEnglishBibleInput}
                      helperText="e.g. Matthew 18:20"
                    />
                  </TabContainer>
                )}

                <CardContent>
                  <TextField
                    className={classes.formControl}
                    id="inf-11"
                    label="Phone"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    name="phone"
                    required
                    value={this.state.item.phone}
                    placeholder="Enter phone"
                    onChange={this.handleItemInput}
                  />

                  <TextField
                    className={classes.formControl}
                    id="inf-12"
                    label="Email"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    name="email"
                    required
                    value={this.state.item.email}
                    placeholder="Enter email"
                    onChange={this.handleItemInput}
                  />

                  <TextField
                    className={classes.formControl}
                    id="inf-13"
                    label="Street"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    name="street"
                    required
                    value={this.state.item.address.street}
                    placeholder="Enter street"
                    onChange={this.handleAddressInput}
                  />

                  <TextField
                    className={classes.formControl}
                    id="inf-14"
                    label="City"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    name="city"
                    required
                    value={this.state.item.address.city}
                    placeholder="Enter city"
                    onChange={this.handleAddressInput}
                  />

                  <TextField
                    className={classes.formControl}
                    id="inf-15"
                    label="State"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    name="state"
                    value={this.state.item.address.state}
                    placeholder="Enter state"
                    onChange={this.handleAddressInput}
                  />

                  <TextField
                    className={classes.formControl}
                    id="inf-16"
                    label="Zip"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    name="zip"
                    value={this.state.item.address.zip}
                    placeholder="Enter zip"
                    onChange={this.handleAddressInput}
                  />

                  <TextField
                    className={classes.formControl}
                    id="inf-17"
                    label="Country"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    name="country"
                    required
                    value={this.state.item.address.country}
                    placeholder="Enter country"
                    onChange={this.handleAddressInput}
                  />
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    className={classes.button}
                    onClick={this.handleFormClear}
                    id="inf-18"
                  >
                    Clear
                  </Button>

                  <Button
                    variant="contained"
                    color={this.state.add ? 'primary' : 'secondary'}
                    className={classes.button}
                    onClick={this.handleFormUpdate}
                    id="inf-18"
                  >
                    {this.state.add ? 'Submit New' : 'Submit Update'}
                  </Button>
                </CardActions>
                <CardContent>
                  <Typography color="error" id="int-09">
                    {Object.keys(this.props.information.error).length !== 0 &&
                      `Name: ${this.props.information.error.name} Message: ${
                        this.props.information.error.message
                      }`}
                  </Typography>
                  <Typography color="error" id="int-092">
                    {this.props.getFailed === true && 'Error: failed to fetch data'}
                  </Typography>
                  <Typography color="error" id="int-093">
                    {this.props.deleteFailed === true && 'Error: failed to submit delete'}
                  </Typography>
                  <Typography color="error" id="int-094">
                    {this.props.updateFailed === true && 'Error: failed to submit update'}
                  </Typography>
                  <Typography color="error" id="int-095">
                    {this.props.addFailed === true && 'Error: failed to submit new entry'}
                  </Typography>
                </CardContent>
              </form>

              <CardContent>
                <Typography variant="headline" component="h2">
                  Information
                </Typography>
                <Typography paragraph>
                  Only the first record will be shown in the website. Other records can be added. To
                  edit exiting record click the Edit button.
                </Typography>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Created on</TableCell>
                      <TableCell>By</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell />
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.props.information.items.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell component="th" scope="row">
                          {moment(item.date).format(dateFormat)}
                        </TableCell>
                        <TableCell>{item.adminname}</TableCell>
                        <TableCell>
                          <div onClick={() => this.handleEdit(item)}>{item.sl.name}</div>
                        </TableCell>
                        <TableCell>
                          {
                            <Button
                              variant="contained"
                              className={classes.button}
                              aria-label="Edit"
                              onClick={() => this.handleEdit(item)}
                            >
                              <Edit />
                            </Button>
                          }
                        </TableCell>
                        <TableCell>
                          {
                            <Button
                              variant="contained"
                              color="secondary"
                              className={classes.button}
                              aria-label="Delete"
                              onClick={() => this.handleDelete(item._id)}
                            >
                              <Delete />
                            </Button>
                          }
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </CardContent>
          </Card>
        </div>
      );
    }

    return null;
  }
}

export default withRoot(withStyles(styles, { withTheme: true })(InformationForm));
