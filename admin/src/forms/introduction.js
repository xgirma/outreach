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

const { translate, getLanguage } = new Translate();
const blankItem = {
  sl: {
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
    add: true,
    error: blankError,
    amharic: createEmptyValue(),
    english: createEmptyValue(),
    value: 0,
  };

  async componentDidMount() {
    const { getIntroduction } = this.props;
    const result = await getIntroduction();
    const { status, data } = result;
    if (status === 'success') {
      this.setState({
        items: data,
      });
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
        sl: {
          ...prevState.item.sl,
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
    const amharicHtml = item.sl.intro;
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
      if (newResult.status === 'success') {
        this.setState({
          items: newResult.data,
          error: blankError,
          item: blankItem,
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
      if (newResult.status === 'success') {
        this.setState({
          items: newResult.data,
          error: blankError,
          item: blankItem,
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

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <form onSubmit={this.handleSubmit}>
              <Tabs value={value} onChange={this.handleChange}>
                <Tab label={getLanguage()} id="int-001" />
                <Tab label="English" id="int-002" />
              </Tabs>
              {value === 0 && (
                <TabContainer>
                  <TextField
                    className={classes.formControl}
                    id="int-01"
                    label="Title"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    name="title"
                    margin="normal"
                    value={this.state.item.sl.title}
                    placeholder={translate('INTRO_TITLE_PH')}
                    onChange={this.handleAmharicInput}
                    helperText={translate('INTRO_TITLE_HT')}
                  />
                  <Paper className={classes.paper} elevation={0}>
                    <Typography variant="caption">Introduction*</Typography>
                    <RichTextEditor
                      value={this.state.amharic}
                      onChange={this.onAmEditorChange}
                      toolbarConfig={toolbarConfig}
                      id="int-02"
                    />
                  </Paper>
                  <TextField
                    className={classes.formControl}
                    id="int-03"
                    label="Author"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    name="author"
                    margin="normal"
                    value={this.state.item.sl.author}
                    placeholder={translate('INTRO_AUTHOR_PH')}
                    onChange={this.handleAmharicInput}
                    helperText={translate('INTRO_AUTHOR_HT')}
                  />
                </TabContainer>
              )}
              {value === 1 && (
                <TabContainer>
                  <TextField
                    className={classes.formControl}
                    id="int-04"
                    label="Title"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    name="title"
                    margin="normal"
                    value={this.state.item.en.title}
                    placeholder="Enter introduction title"
                    onChange={this.handleEnglishInput}
                    helperText="e.g - About our church"
                  />
                  <Paper className={classes.paper} elevation={0}>
                    <Typography variant="caption">Introduction*</Typography>
                    <RichTextEditor
                      value={this.state.english}
                      onChange={this.onEnEditorChange}
                      toolbarConfig={toolbarConfig}
                      id="int-05"
                    />
                  </Paper>
                  <TextField
                    className={classes.formControl}
                    id="int-06"
                    label="Author"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    name="author"
                    margin="normal"
                    value={this.state.item.en.author}
                    placeholder="Enter author name"
                    onChange={this.handleEnglishInput}
                    helperText="e.g. - Deacon Daniel"
                  />
                </TabContainer>
              )}
              <CardActions>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={this.handleFormClear}
                  id="int-07"
                >
                  Clear
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.handleFormUpdate}
                  id="int-08"
                >
                  Submit
                </Button>
              </CardActions>
              <CardContent>
                <Typography color="error" id="int-09">
                  {this.state.error.name !== '' &&
                    `Name: ${this.state.error.name} Message: ${this.state.error.message}`}
                </Typography>
              </CardContent>
            </form>

            <CardContent>
              <Typography variant="headline" component="h2">
                Introduction
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
}

export default withRoot(withStyles(styles, { withTheme: true })(IntroductionForm));
