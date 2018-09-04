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
    contact: '',
  },
  en: {
    title: '',
    description: '',
    contact: '',
  },
  phone: '',
  email: '',
};

const blankError = {
  message: '',
  name: '',
};

class ServicesForm extends Component {
  displayName = 'services-form';

  static propTypes = {
    getServices: PropTypes.func.isRequired,
    deleteServices: PropTypes.func.isRequired,
    updateServices: PropTypes.func.isRequired,
    addServices: PropTypes.func.isRequired,
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
    const { getServices } = this.props;
    const result = await getServices();
    const { status, data } = result;
    if (status === 'success' && data.length > 0) {
      const amharicHtml = data[0].am.description;
      const englishHtml = data[0].en.description;
      this.setState({
        items: data,
        item: data[0],
        error: blankError,
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

  handleFormUpdate = async (event) => {
    event.preventDefault();
    const { updateServices, getServices, addServices } = this.props;

    const result = this.state.add
      ? await addServices(this.state.item)
      : await updateServices(this.state.item);

    const { status, data } = result;
    if (status === 'success') {
      const newResult = await getServices();
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

  handleDelete = async (id) => {
    const { deleteServices, getServices } = this.props;
    const result = await deleteServices(id);
    const { status, data } = result;
    if (status === 'success') {
      const newResult = await getServices();
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
              Introduction
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
                    helperText="ለምሳሌ - የክርስትና አገልግሎት"
                  />
                  <RichTextEditor
                    value={this.state.amharic}
                    onChange={this.onAmEditorChange}
                    toolbarConfig={toolbarConfig}
                  />
                  <TextField
                    className={classes.formControl}
                    id="full-width"
                    label="Service contact"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    name="contact"
                    value={this.state.item.am.contact}
                    placeholder="Enter your service contact person name"
                    onChange={this.handleAmharicInput}
                    helperText="ለምሳሌ - ዲያቆን ዳኒየል"
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
                    helperText="e.g - Christening service"
                  />
                  <RichTextEditor
                    value={this.state.english}
                    onChange={this.onEnEditorChange}
                    toolbarConfig={toolbarConfig}
                  />
                  <TextField
                    className={classes.formControl}
                    id="full-width"
                    label="Service contact"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    name="contact"
                    value={this.state.item.en.contact}
                    placeholder="Enter your service contact name"
                    onChange={this.handleEnglishInput}
                    helperText="e.g. - Deacon Daniel"
                  />
                </TabContainer>
              )}

              <CardContent>
                <TextField
                  className={classes.formControl}
                  id="full-width"
                  label="Phone"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  name="phone"
                  value={this.state.item.phone}
                  placeholder="Enter your service contact phone"
                  onChange={this.handleItemInput}
                  helperText="e.g. (425) 000-1234"
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
                  placeholder="Enter your service contact email"
                  onChange={this.handleItemInput}
                  helperText="e.g. xyz@gmail.com"
                />
              </CardContent>

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
            <Typography color="error">
              {this.state.error.name !== '' &&
                `Name: ${this.state.error.name} Message: ${this.state.error.message}`}
            </Typography>
          </CardContent>

          <CardContent>
            <Typography className={classes.title} color="textSecondary">
              Database
            </Typography>
            <Typography variant="headline" component="h2">
              Introduction
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
                {this.state.items.map((item) => (
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
        </Card>
      </div>
    );
  }
}

export default withRoot(withStyles(styles, { withTheme: true })(ServicesForm));
