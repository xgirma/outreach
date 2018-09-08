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
} from '@material-ui/core';
import ButtonTwo from '@material-ui/core/Button';
import { toolbarConfig } from '../helper';
import withRoot from '../withRoot';
import styles from '../styles';
import TabContainer from '../components/tab-container';

const blankItem = {
  am: {
    title: '',
    author: '',
    intro: '',
  },
  en: {
    title: '',
    author: '',
    intro: '',
  },
};

const blankError = {
  message: '',
  name: '',
};

class IntroductionForm extends Component {
  static displayName = 'introduction-form';

  static propTypes = {
    getIntroduction: PropTypes.func.isRequired,
    deleteIntroduction: PropTypes.func.isRequired,
    updateIntroduction: PropTypes.func.isRequired,
    addIntroduction: PropTypes.func.isRequired,
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
    const { getIntroduction } = this.props;
    const result = await getIntroduction();
    const { status, data } = result;
    if (status === 'success' && data.length > 0) {
      const amharicHtml = data[0].am.intro;
      const englishHtml = data[0].en.intro;
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

  handleChange = (event, value) => {
    this.setState({ value });
  };

  onAmEditorChange = (amharic) => {
    const introduction = amharic.toString('html');
    this.setState((prevState) => ({
      ...prevState,
      amharic,
      item: {
        ...prevState.item,
        am: {
          ...prevState.item.am,
          intro: introduction,
        },
      },
    }));
  };

  onEnEditorChange = (english) => {
    const introduction = english.toString('html');
    this.setState((prevState) => ({
      ...prevState,
      english,
      item: {
        ...prevState.item,
        en: {
          ...prevState.item.en,
          intro: introduction,
        },
      },
    }));
  };

  handleEdit = (item) => {
    const amharicHtml = item.am.intro;
    const englishHtml = item.en.intro;
    this.setState({
      item,
      add: false,
      amharic: createValueFromString(amharicHtml, 'html'),
      english: createValueFromString(englishHtml, 'html'),
    });
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

  handleSubmit = (event) => {
    event.preventDefault();
  };

  handleDelete = async (id) => {
    const { deleteIntroduction, getIntroduction } = this.props;
    const result = await deleteIntroduction(id);
    const { status, data } = result;
    if (status === 'success') {
      const newResult = await getIntroduction();
      if (newResult.status === 'success' && newResult.data.length > 0) {
        const amharicHtml = newResult.data[0].am.intro;
        const englishHtml = newResult.data[0].en.intro;
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

  handleFormUpdate = async (event) => {
    event.preventDefault();
    const { updateIntroduction, getIntroduction, addIntroduction } = this.props;

    const result = this.state.add
      ? await addIntroduction(this.state.item)
      : await updateIntroduction(this.state.item);

    const { status, data } = result;
    if (status === 'success') {
      const newResult = await getIntroduction();
      if (newResult.status === 'success' && newResult.data.length > 0) {
        const amharicHtml = newResult.data[0].am.intro;
        const englishHtml = newResult.data[0].en.intro;
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
                    placeholder="Enter your introduction title"
                    onChange={this.handleAmharicInput}
                    helperText="ለምሳሌ - ቤተ ክርስቲያናችን"
                  />
                  <RichTextEditor
                    value={this.state.amharic}
                    onChange={this.onAmEditorChange}
                    toolbarConfig={toolbarConfig}
                  />
                  <TextField
                    className={classes.formControl}
                    id="full-width"
                    label="Author"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    name="author"
                    value={this.state.item.am.author}
                    placeholder="Enter your introduction author"
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
                    placeholder="Enter your introduction title"
                    onChange={this.handleEnglishInput}
                    helperText="e.g - About our church"
                  />
                  <RichTextEditor
                    value={this.state.english}
                    onChange={this.onEnEditorChange}
                    toolbarConfig={toolbarConfig}
                  />
                  <TextField
                    className={classes.formControl}
                    id="full-width"
                    label="Author"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    name="author"
                    value={this.state.item.en.author}
                    placeholder="Enter your introduction author"
                    onChange={this.handleEnglishInput}
                    helperText="e.g. - Deacon Daniel"
                  />
                </TabContainer>
              )}
              <CardActions>
                <ButtonTwo
                  variant="contained"
                  className={classes.button}
                  onClick={this.handleFormClear}
                >
                  Add New
                </ButtonTwo>

                <ButtonTwo
                  variant="contained"
                  className={classes.button}
                  onClick={this.handleFormUpdate}
                >
                  Submit
                </ButtonTwo>
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
                        <ButtonTwo
                          variant="contained"
                          className={classes.button}
                          onClick={() => this.handleEdit(item)}
                        >
                          Edit
                        </ButtonTwo>
                      }
                    </TableCell>
                    <TableCell>
                      {
                        <ButtonTwo
                          variant="contained"
                          className={classes.button}
                          onClick={() => this.handleDelete(item._id)}
                        >
                          Delete
                        </ButtonTwo>
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

export default withRoot(withStyles(styles, { withTheme: true })(IntroductionForm));
