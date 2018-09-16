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
    author: '',
    intro: '',
  },
  en: {
    title: '',
    author: '',
    intro: '',
  },
};

const blankState = {
  item: blankItem,
  add: true,
  amharic: createValueFromString('', 'html'),
  english: createValueFromString('', 'html'),
};

class IntroductionForm extends Component {
  static displayName = 'introduction-form';

  static defaultProps = {
    getFailed: false,
    deleteFailed: false,
    updateFailed: false,
    addFailed: false,
  };

  static propTypes = {
    getIntroduction: PropTypes.func.isRequired,
    deleteIntroduction: PropTypes.func.isRequired,
    updateIntroduction: PropTypes.func.isRequired,
    addIntroduction: PropTypes.func.isRequired,
    clearIntroForm: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    introduction: PropTypes.object.isRequired,
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
    await this.props.getIntroduction();
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
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

  handleEdit = (item) => {
    this.props.clearIntroForm();
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
    this.props.clearIntroForm();
    this.setState({ ...blankState });
  };

  handleDelete = async (id) => {
    await this.props.deleteIntroduction(id);
    this.setState({ ...blankState });
    await this.props.getIntroduction();
  };

  handleFormUpdate = async (event) => {
    event.preventDefault();
    const result = this.state.add
      ? await this.props.addIntroduction(this.state.item)
      : await this.props.updateIntroduction(this.state.item);

    if (result && Object.keys(result).length !== 0 && result.status === 'success') {
      this.setState({ ...blankState });
      await this.props.getIntroduction();
    }
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    if (this.props.introduction.getFailed) {
      return <Failed name="introduction" />;
    }

    if (this.props.introduction.isLoading) {
      return <LinearProgress />;
    }

    if (this.props.introduction.items) {
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
                    color={this.state.add ? 'primary' : 'secondary'}
                    className={classes.button}
                    onClick={this.handleFormUpdate}
                    id="int-08"
                  >
                    {this.state.add ? 'Submit New' : 'Submit Update'}
                  </Button>
                </CardActions>
                <CardContent>
                  <Typography color="error" id="int-09">
                    {Object.keys(this.props.introduction.error).length !== 0 &&
                      `Name: ${this.props.introduction.error.name} Message: ${
                        this.props.introduction.error.message
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
                    {this.props.introduction.items.map((item) => (
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

export default withRoot(withStyles(styles, { withTheme: true })(IntroductionForm));
