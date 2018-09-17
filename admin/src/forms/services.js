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
  LinearProgress,
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { toolbarConfig, dateFormat, Translate } from '../helper';
import withRoot from '../withRoot';
import styles from '../styles';
import TabContainer from '../components/tab-container';
import Failed from '../components/failed';

const { translate, getLanguage } = new Translate();
const blankItem = {
  sl: {
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

const defaultState = {
  item: blankItem,
  add: true,
  amharic: createValueFromString('', 'html'),
  english: createValueFromString('', 'html'),
};

class ServicesForm extends Component {
  displayName = 'services-form';

  static defaultProps = {
    getFailed: false,
    deleteFailed: false,
    updateFailed: false,
    addFailed: false,
  };

  static propTypes = {
    getServices: PropTypes.func.isRequired,
    deleteServices: PropTypes.func.isRequired,
    updateServices: PropTypes.func.isRequired,
    addServices: PropTypes.func.isRequired,
    clearServiceForm: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    services: PropTypes.object.isRequired,
    getFailed: PropTypes.bool,
    deleteFailed: PropTypes.bool,
    updateFailed: PropTypes.bool,
    addFailed: PropTypes.bool,
  };

  state = {
    item: blankItem,
    add: true,
    amharic: createEmptyValue(),
    english: createEmptyValue(),
    value: 0,
  };

  async componentDidMount() {
    await this.props.getServices();
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
        sl: {
          ...prevState.item.sl,
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
        sl: { ...prevState.item.sl, [name]: value },
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
    this.props.clearServiceForm();
    this.setState({ ...defaultState });
  };

  handleEdit = (item) => {
    this.props.clearServiceForm();
    const amharicHtml = item.sl.description;
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

    const result = this.state.add
      ? await this.props.addServices(this.state.item)
      : await this.props.updateServices(this.state.item);

    if (
      result &&
      typeof result !== 'undefined' &&
      Object.keys(result).length !== 0 &&
      result.status === 'success'
    ) {
      this.setState({ ...defaultState });
      await this.props.getServices();
    }
  };

  handleDelete = async (id) => {
    await this.props.deleteServices(id);
    this.setState({ ...defaultState });
    await this.props.getServices();
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    if (this.props.services.getFailed) {
      return <Failed name="service" />;
    }

    if (this.props.services.isLoading) {
      return <LinearProgress />;
    }

    if (this.props.services.items) {
      return (
        <div className={classes.root}>
          <Card className={classes.card}>
            <CardContent>
              <form onSubmit={this.handleSubmit}>
                <Tabs value={value} onChange={this.handleChange}>
                  <Tab label={getLanguage()} id="ser-01" />
                  <Tab label="English" id="ser-02" />
                </Tabs>
                {value === 0 && (
                  <TabContainer>
                    <TextField
                      className={classes.formControl}
                      id="ser-03"
                      label="Title"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      margin="normal"
                      name="title"
                      required
                      value={this.state.item.sl.title}
                      placeholder={translate('SERVICES_TITLE_PH')}
                      onChange={this.handleAmharicInput}
                      helperText={translate('SERVICES_TITLE_HT')}
                    />
                    <Paper className={classes.paper} elevation={0}>
                      <Typography variant="caption">Description</Typography>
                      <RichTextEditor
                        value={this.state.amharic}
                        onChange={this.onAmEditorChange}
                        toolbarConfig={toolbarConfig}
                        id="ser-04"
                      />
                    </Paper>
                    <TextField
                      className={classes.formControl}
                      id="ser-05"
                      label="Service contact"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      margin="normal"
                      name="contact"
                      value={this.state.item.sl.contact}
                      placeholder={translate('SERVICES_CONTACT_PH')}
                      onChange={this.handleAmharicInput}
                      helperText={translate('SERVICES_CONTACT_HT')}
                    />
                  </TabContainer>
                )}
                {value === 1 && (
                  <TabContainer>
                    <TextField
                      className={classes.formControl}
                      id="ser-06"
                      label="Title"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      margin="normal"
                      name="title"
                      required
                      value={this.state.item.en.title}
                      placeholder="Enter service title"
                      onChange={this.handleEnglishInput}
                      helperText="e.g - Christening service"
                    />
                    <Paper className={classes.paper} elevation={0}>
                      <Typography variant="caption">Description</Typography>
                      <RichTextEditor
                        value={this.state.english}
                        onChange={this.onEnEditorChange}
                        toolbarConfig={toolbarConfig}
                        id="ser-07"
                      />
                    </Paper>
                    <TextField
                      className={classes.formControl}
                      id="ser-08"
                      label="Service contact"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      margin="normal"
                      name="contact"
                      value={this.state.item.en.contact}
                      placeholder="Enter service contact person name"
                      onChange={this.handleEnglishInput}
                      helperText="e.g. - Deacon Daniel"
                    />
                  </TabContainer>
                )}

                <CardContent>
                  <TextField
                    className={classes.formControl}
                    id="ser-09"
                    label="Phone"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    name="phone"
                    required
                    value={this.state.item.phone}
                    placeholder="Enter service contact phone"
                    onChange={this.handleItemInput}
                    helperText="e.g. (425) 000-1234"
                  />

                  <TextField
                    className={classes.formControl}
                    id="ser-10"
                    label="Email"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    name="email"
                    required
                    value={this.state.item.email}
                    placeholder="Enter service contact email"
                    onChange={this.handleItemInput}
                    helperText="e.g. xyz@gmail.com"
                  />
                </CardContent>

                <CardActions>
                  <Button
                    variant="contained"
                    className={classes.button}
                    onClick={this.handleFormClear}
                    id="ser-11"
                  >
                    Clear
                  </Button>

                  <Button
                    variant="contained"
                    className={classes.button}
                    color={this.state.add ? 'primary' : 'secondary'}
                    onClick={this.handleFormUpdate}
                    id="ser-12"
                  >
                    {this.state.add ? 'Submit New' : 'Submit Update'}
                  </Button>
                </CardActions>
              </form>
              <CardContent>
                <Typography color="error" id="ser-13">
                  {Object.keys(this.props.services.error).length !== 0 &&
                    `Name: ${this.props.services.error.name} Message: ${
                      this.props.services.error.message
                    }`}
                </Typography>
                <Typography color="error" id="ser-14">
                  {this.props.getFailed === true && 'Error: failed to fetch data'}
                </Typography>
                <Typography color="error" id="ser-15">
                  {this.props.deleteFailed === true && 'Error: failed to submit delete'}
                </Typography>
                <Typography color="error" id="ser-16">
                  {this.props.updateFailed === true && 'Error: failed to submit update'}
                </Typography>
                <Typography color="error" id="ser-17">
                  {this.props.addFailed === true && 'Error: failed to submit new entry'}
                </Typography>
              </CardContent>

              <CardContent>
                <Typography variant="headline" component="h2">
                  Services
                </Typography>
                <Typography paragraph>
                  Enter one record per each service. All services will be displayed. To edit exiting
                  record click the Edit button.
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
                    {this.props.services.items.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell component="th" scope="row">
                          {moment(item.date).format(dateFormat)}
                        </TableCell>
                        <TableCell>{item.adminname}</TableCell>
                        <TableCell>
                          <div onClick={() => this.handleEdit(item)}>{item.sl.title}</div>
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

    return null;
  }
}

export default withRoot(withStyles(styles, { withTheme: true })(ServicesForm));
