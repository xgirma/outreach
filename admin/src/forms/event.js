/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import RichTextEditor, { createEmptyValue, createValueFromString } from 'react-rte';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  AppBar,
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
import { toolbarConfig } from '../helper';
import withRoot from '../withRoot';
import styles from '../styles';
import TabContainer from '../components/tab-container';

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
  dateStart: '',
  dateEnd: '',
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
    add: false,
    error: blankError,
    amharic: createEmptyValue(),
    english: createEmptyValue(),
    value: 0,
  };

  async componentDidMount() {
    const { getEvent } = this.props;
    const result = await getEvent();
    const { status, data } = result;
    if (status === 'success' && data.length > 0) {
      const amharicHtml = data[0].am.description;
      const englishHtml = data[0].en.description;
      this.setState({
        items: data,
        item: data[0],
        error: blankError,
        add: false,
        amharic: createValueFromString(amharicHtml, 'html'),
        english: createValueFromString(englishHtml, 'html'),
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
    this.setState(prevState => ({
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
    this.setState(prevState => ({
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
    this.setState(prevState => ({
      ...prevState,
      item: {
        ...prevState.item,
        am: { ...prevState.item.am, [name]: value },
      },
    }));
  };

  handleEnglishInput = (event) => {
    const { value, name } = event.target;
    this.setState(prevState => ({
      ...prevState,
      item: {
        ...prevState.item,
        en: { ...prevState.item.en, [name]: value },
      },
    }));
  };

  handleAddressInput = (event) => {
    const { value, name } = event.target;
    this.setState(prevState => ({
      ...prevState,
      item: {
        ...prevState.item,
        address: { ...prevState.item.address, [name]: value },
      },
    }));
  };

  handleItemInput = (event) => {
    const { value, name } = event.target;
    this.setState(prevState => ({
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
      if (newResult.status === 'success' && newResult.data.length > 0) {
        const amharicHtml = newResult.data[0].am.description;
        const englishHtml = newResult.data[0].en.description;
        this.setState({
          items: newResult.data,
          item: newResult.data[0],
          error: blankError,
          add: false,
          amharic: createValueFromString(amharicHtml, 'html'),
          english: createValueFromString(englishHtml, 'html'),
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
    this.setState({
      item,
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
      if (newResult.status === 'success' && newResult.data.length > 0) {
        const amharicHtml = newResult.data[0].am.description;
        const englishHtml = newResult.data[0].en.description;
        this.setState({
          items: newResult.data,
          item: newResult.data[0],
          error: blankError,
          amharic: createValueFromString(amharicHtml, 'html'),
          english: createValueFromString(englishHtml, 'html'),
        });
      }

      if (newResult.status === 'success' && newResult.data.length === 0) {
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
            <Typography className={classes.title} color="textSecondary">
              Active
            </Typography>
            <Typography variant="headline" component="h2">
              Event
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Add new or update existing
            </Typography>
          </CardContent>

          <CardContent>
            <form onSubmit={this.handleSubmit}>
              <AppBar position="static" color="default">
                <Tabs value={value} onChange={this.handleChange}>
                  <Tab label="Amharic" />
                  <Tab label="English" />
                </Tabs>
              </AppBar>
              {value === 0 && (
                <TabContainer>
                  <TextField
                    className={classes.formControl}
                    id="full-width"
                    label="Title"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    name="title"
                    value={this.state.item.am.title}
                    placeholder="Enter your service title"
                    onChange={this.handleAmharicInput}
                    helperText="ለምሳሌ - የስብከት አገልግሎት ዲያቆን ዳኒየል"
                  />
                  <RichTextEditor
                    value={this.state.amharic}
                    onChange={this.onAmEditorChange}
                    toolbarConfig={toolbarConfig}
                  />
                </TabContainer>
              )}
              {value === 1 && (
                <TabContainer>
                  <TextField
                    className={classes.formControl}
                    id="full-width"
                    label="Title"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    name="title"
                    value={this.state.item.en.title}
                    placeholder="Enter your service title"
                    onChange={this.handleEnglishInput}
                    helperText="e.g - Teaching by diakon daniel kibret"
                  />
                  <RichTextEditor
                    value={this.state.english}
                    onChange={this.onEnEditorChange}
                    toolbarConfig={toolbarConfig}
                  />
                </TabContainer>
              )}

              <TabContainer>
                <TextField
                  className={classes.formControl}
                  id="full-width"
                  label="Street"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  name="street"
                  value={this.state.item.address.street}
                  placeholder="Enter your event street"
                  onChange={this.handleAddressInput}
                  helperText="e.g. 123 Main Street"
                />

                <TextField
                  className={classes.formControl}
                  id="full-width"
                  label="City"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  name="city"
                  value={this.state.item.address.city}
                  placeholder="Enter your event city"
                  onChange={this.handleAddressInput}
                  helperText="e.g. Seattle"
                />

                <TextField
                  className={classes.formControl}
                  id="full-width"
                  label="State"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  name="state"
                  value={this.state.item.address.state}
                  placeholder="Enter your event state"
                  onChange={this.handleAddressInput}
                  helperText="e.g. WA"
                />

                <TextField
                  className={classes.formControl}
                  id="full-width"
                  label="Zip"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  name="zip"
                  value={this.state.item.address.zip}
                  placeholder="Enter your event zip"
                  onChange={this.handleAddressInput}
                  helperText="e.g. 90102"
                />

                <TextField
                  className={classes.formControl}
                  id="full-width"
                  label="Country"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  name="country"
                  value={this.state.item.address.country}
                  placeholder="Enter your event country"
                  onChange={this.handleAddressInput}
                  helperText="e.g. United State"
                />

                <TextField
                  className={classes.formControl}
                  id="full-width"
                  label="Email"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  name="email"
                  value={this.state.item.email}
                  placeholder="Enter your event contact email"
                  onChange={this.handleItemInput}
                  helperText="e.g. xyz@gmail.com"
                />

                <TextField
                  className={classes.formControl}
                  id="full-width"
                  label="Phone"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  name="phone"
                  value={this.state.item.phone}
                  placeholder="Enter your event contact phone"
                  onChange={this.handleItemInput}
                  helperText="e.g. (425) 000-1234"
                />

                <TextField
                  className={classes.formControl}
                  id="full-width"
                  label="Start date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  name="dateStart"
                  value={this.state.item.dateStart}
                  placeholder="Enter your event start date"
                  onChange={this.handleItemInput}
                  helperText="e.g. 2019-09-04T04:44:34.340Z"
                />

                <TextField
                  className={classes.formControl}
                  id="full-width"
                  label="End date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  name="dateEnd"
                  value={this.state.item.dateEnd}
                  placeholder="Enter your event end date"
                  onChange={this.handleItemInput}
                  helperText="e.g. 2019-10-04T04:44:34.340Z"
                />
              </TabContainer>

              <CardActions>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={this.handleFormClear}
                >
                  Add New
                </Button>

                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={this.handleFormUpdate}
                >
                  Submit
                </Button>
              </CardActions>
            </form>
          </CardContent>

          <CardContent>
            <CardContent>
              <Typography color="error">
                {this.state.error.name !== ''
                  && `Name: ${this.state.error.name} Message: ${this.state.error.message}`}
              </Typography>
            </CardContent>

            <CardContent>
              <Typography className={classes.title} color="textSecondary">
                Database
              </Typography>
              <Typography variant="headline" component="h2">
                Event
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                List of existing data
              </Typography>

              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Created on</TableCell>
                    <TableCell>By</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Update</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.items.map(item => (
                    <TableRow key={item._id}>
                      <TableCell component="th" scope="row">
                        {moment(item.date).format('L')}
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
                            onClick={() => this.handleEdit(item)}
                          >
                            Edit
                          </Button>
                        }
                      </TableCell>
                      <TableCell>
                        {
                          <Button
                            variant="contained"
                            className={classes.button}
                            onClick={() => this.handleDelete(item._id)}
                          >
                            Delete
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
