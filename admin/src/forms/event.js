import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import RichTextEditor, { createEmptyValue, createValueFromString } from 'react-rte';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Paper,
  Tabs,
  Tab,
  TextField,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Card,
  CardActions,
  CardContent,
  Button,
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { toolbarConfig, dateFormat, Translate } from '../helper';
import withRoot from '../withRoot';
import styles from '../styles';
import TabContainer from '../components/tab-container';

const { translate } = new Translate();

const start = moment()
  .add(7, 'days')
  .hours(9)
  .format(dateFormat);
const end = moment()
  .add(7, 'days')
  .hours(11)
  .format(dateFormat);
const blankItem = {
  am: {
    title: '',
    description: '',
  },
  en: {
    title: '',
    description: '',
  },
  address: {
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  },
  phone: '',
  email: '',
  dateStart: [],
  dateEnd: [],
};

const blankError = {
  message: '',
  name: '',
};

class EventForm extends Component {
  static displayName = 'event-form';

  static propTypes = {
    getEvent: PropTypes.func.isRequired,
    deleteEvent: PropTypes.func.isRequired,
    updateEvent: PropTypes.func.isRequired,
    addEvent: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  };

  state = {
    items: [],
    item: blankItem,
    add: true,
    error: blankError,
    amharic: createEmptyValue(),
    english: createEmptyValue(),
    value: 0,
  };

  async componentDidMount() {
    const { getEvent } = this.props;
    const result = await getEvent();
    const { status, data } = result;
    if (status === 'success') {
      this.setState({
        items: data,
      });
    }

    if (this.state.items.length === 0) {
      this.setState({ add: true });
    }

    if (status === 'fail' || status === 'error') {
      this.setState({
        error: { ...data },
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  onAmEditorChange = (amharic) => {
    const description = amharic.toString('html');
    this.setState((prevState) => ({
      ...prevState,
      amharic,
      item: {
        ...prevState.item,
        am: {
          ...prevState.item.am,
          description,
        },
      },
    }));
  };

  onEnEditorChange = (english) => {
    const description = english.toString('html');
    this.setState((prevState) => ({
      ...prevState,
      english,
      item: {
        ...prevState.item,
        en: {
          ...prevState.item.en,
          description,
        },
      },
    }));
  };

  handleAmharicInput = (event) => {
    const { value, name } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      item: {
        ...prevState.item,
        am: { ...prevState.item.am, [name]: value },
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

  handleFormClear = (event) => {
    event.preventDefault();
    this.setState({
      item: blankItem,
      add: true,
      amharic: createValueFromString('', 'html'),
      english: createValueFromString('', 'html'),
    });
  };

  handleFormUpdate = async (event) => {
    event.preventDefault();
    const { updateEvent, getEvent, addEvent } = this.props;

    const result = this.state.add
      ? await addEvent(this.state.item)
      : await updateEvent(this.state.item);

    const { status, data } = result;
    if (status === 'success') {
      const newResult = await getEvent();
      if (newResult.status === 'success') {
        this.setState({
          items: newResult.data,
          item: blankItem,
          error: blankError,
          add: true,
          amharic: createValueFromString('', 'html'),
          english: createValueFromString('', 'html'),
        });
      }

      if (newResult.status === 'fail' || status === 'error') {
        this.setState({
          error: { ...data },
        });
      }
    }

    if (status === 'fail' || status === 'error') {
      this.setState({
        error: { ...data },
      });
    }
  };

  handleEdit = (item) => {
    const amharicHtml = item.am.description;
    const englishHtml = item.en.description;
    const formattedItem = {
      ...item,
      dateStart: moment(item.dateStart).format(dateFormat),
      dateEnd: moment(item.dateEnd).format(dateFormat),
    };

    this.setState({
      item: formattedItem,
      add: false,
      amharic: createValueFromString(amharicHtml, 'html'),
      english: createValueFromString(englishHtml, 'html'),
    });
  };

  handleDelete = async (id) => {
    const { deleteEvent, getEvent } = this.props;
    const result = await deleteEvent(id);
    const { status, data } = result;
    if (status === 'success') {
      const newResult = await getEvent();
      if (newResult.status === 'success') {
        this.setState({
          items: newResult.data,
          item: blankItem,
          error: blankError,
          add: true,
          amharic: createValueFromString('', 'html'),
          english: createValueFromString('', 'html'),
        });
      }

      if (newResult.status === 'fail' || status === 'error') {
        this.setState({
          error: { ...data },
        });
      }
    }

    if (status === 'fail' || status === 'error') {
      this.setState({
        error: { ...data },
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <form onSubmit={this.handleSubmit}>
              <Tabs value={value} onChange={this.handleChange}>
                <Tab label="Amharic" id="eve-01" />
                <Tab label="English" id="eve-02" />
              </Tabs>
              {value === 0 && (
                <TabContainer>
                  <TextField
                    className={classes.formControl}
                    id="eve-03"
                    label="Title"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    name="title"
                    value={this.state.item.am.title}
                    placeholder={translate('EVENT_TITLE_PH')}
                    onChange={this.handleAmharicInput}
                    helperText={translate('EVENT_TITLE_HT')}
                  />
                  <Paper className={classes.paper} elevation={0}>
                    <Typography variant="caption">Event description</Typography>
                    <RichTextEditor
                      value={this.state.amharic}
                      onChange={this.onAmEditorChange}
                      toolbarConfig={toolbarConfig}
                      id="eve-04"
                    />
                  </Paper>
                </TabContainer>
              )}
              {value === 1 && (
                <TabContainer>
                  <TextField
                    className={classes.formControl}
                    id="eve-05"
                    label="Title"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    name="title"
                    value={this.state.item.en.title}
                    placeholder="Enter your event title"
                    onChange={this.handleEnglishInput}
                    helperText="e.g - Teaching by diakon daniel kibret"
                  />
                  <Paper className={classes.paper} elevation={0}>
                    <Typography variant="caption">Event description</Typography>
                    <RichTextEditor
                      value={this.state.english}
                      onChange={this.onEnEditorChange}
                      toolbarConfig={toolbarConfig}
                      id="eve-06"
                    />
                  </Paper>
                </TabContainer>
              )}

              <TabContainer>
                <TextField
                  className={classes.formControl}
                  id="eve-07"
                  label="Street"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  name="street"
                  value={this.state.item.address.street}
                  placeholder="Enter event street"
                  onChange={this.handleAddressInput}
                  helperText="e.g. 123 Main Street"
                />

                <TextField
                  className={classes.formControl}
                  id="eve-08"
                  label="City"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  name="city"
                  value={this.state.item.address.city}
                  placeholder="Enter event city"
                  onChange={this.handleAddressInput}
                  helperText="e.g. Seattle"
                />

                <TextField
                  className={classes.formControl}
                  id="eve-09"
                  label="State"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  name="state"
                  value={this.state.item.address.state}
                  placeholder="Enter event state"
                  onChange={this.handleAddressInput}
                  helperText="e.g. WA"
                />

                <TextField
                  className={classes.formControl}
                  id="eve-10"
                  label="Zip"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  name="zip"
                  value={this.state.item.address.zip}
                  placeholder="Enter event zip"
                  onChange={this.handleAddressInput}
                  helperText="e.g. 90102"
                />

                <TextField
                  className={classes.formControl}
                  id="eve-11"
                  label="Country"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  name="country"
                  value={this.state.item.address.country}
                  placeholder="Enter event country"
                  onChange={this.handleAddressInput}
                  helperText="e.g. United State"
                />

                <TextField
                  className={classes.formControl}
                  id="eve-12"
                  label="Email"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  name="email"
                  value={this.state.item.email}
                  placeholder="Enter event contact email"
                  onChange={this.handleItemInput}
                  helperText="e.g. xyz@gmail.com"
                />

                <TextField
                  className={classes.formControl}
                  id="eve-13"
                  label="Phone"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  name="phone"
                  value={this.state.item.phone}
                  placeholder="Enter event contact phone"
                  onChange={this.handleItemInput}
                  helperText="e.g. (425) 000-1234"
                />

                <TextField
                  className={classes.formControl}
                  id="eve-14"
                  label="Start date and time (yyyy-mm-dd h:mm am)"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  name="dateStart"
                  value={this.state.item.dateStart}
                  placeholder="Enter event start date and time"
                  onChange={this.handleItemInput}
                  helperText={`e.g. ${start}`}
                />

                <TextField
                  className={classes.formControl}
                  id="eve-15"
                  label="End date and time (yyyy-mm-dd h:mm am)"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  name="dateEnd"
                  value={this.state.item.dateEnd}
                  placeholder="Enter event end date and time"
                  onChange={this.handleItemInput}
                  helperText={`e.g. ${end}`}
                />
              </TabContainer>

              <CardActions>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={this.handleFormClear}
                  id="eve-16"
                >
                  Clear
                </Button>

                <Button
                  variant="contained"
                  className={classes.button}
                  color="primary"
                  onClick={this.handleFormUpdate}
                  id="eve-16"
                >
                  Submit
                </Button>
              </CardActions>
            </form>
          </CardContent>

          <CardContent>
            <Typography color="error" id="eve-17">
              {this.state.error.name !== '' &&
                `Name: ${this.state.error.name} Message: ${this.state.error.message}`}
            </Typography>
          </CardContent>

          <CardContent>
            <CardContent>
              <Typography variant="headline" component="h2">
                Services
              </Typography>
              <Typography paragraph>
                Enter event record. Only current and future events will be displayed. To edit
                exiting record click the Edit button.
              </Typography>

              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Created on</TableCell>
                    <TableCell>By</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell />
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.items.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell component="th" scope="row">
                        {moment(item.date).format(dateFormat)}
                      </TableCell>
                      <TableCell>{item.adminname}</TableCell>
                      <TableCell>
                        <div onClick={() => this.handleEdit(item)}>{item.am.title}</div>
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
                            className={classes.button}
                            aria-label="Delete"
                            color="secondary"
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
}

export default withRoot(withStyles(styles, { withTheme: true })(EventForm));
