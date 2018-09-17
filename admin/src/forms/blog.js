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
const pubDate = moment()
  .add(7, 'days')
  .hours(9)
  .format(dateFormat);
const blankItem = {
  sl: {
    title: '',
    description: '',
  },
  en: {
    title: '',
    description: '',
  },
  author: '',
  dateStart: '',
  tag: [],
};

const defaultState = {
  item: blankItem,
  add: true,
  amharic: createValueFromString('', 'html'),
  english: createValueFromString('', 'html'),
};

class BlogForm extends Component {
  displayName = 'blog-form';

  static defaultProps = {
    getFailed: false,
    deleteFailed: false,
    updateFailed: false,
    addFailed: false,
  };

  static propTypes = {
    getBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    updateBlog: PropTypes.func.isRequired,
    addBlog: PropTypes.func.isRequired,
    clearBlogForm: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    blog: PropTypes.object.isRequired,
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
    this.props.getBlog();
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  onSlEditorChange = (amharic) => {
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

  handleSecondaryLanguageInput = (event) => {
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
    this.props.clearBlogForm();
    this.setState({ ...defaultState });
  };

  handleEdit = (item) => {
    this.props.clearBlogForm();
    const amharicHtml = item.sl.description;
    const englishHtml = item.en.description;
    const formattedItem = {
      ...item,
      dateStart: moment(item.dateStart).format(dateFormat),
    };
    this.setState({
      item: formattedItem,
      add: false,
      amharic: createValueFromString(amharicHtml, 'html'),
      english: createValueFromString(englishHtml, 'html'),
    });
  };

  handleFormUpdate = async (event) => {
    event.preventDefault();

    const result = this.state.add
      ? await this.props.addBlog(this.state.item)
      : await this.props.updateBlog(this.state.item);

    if (
      result &&
      typeof result !== 'undefined' &&
      Object.keys(result).length !== 0 &&
      result.status === 'success'
    ) {
      this.setState({ ...defaultState });
      await this.props.getBlog();
    }
  };

  handleDelete = async (id) => {
    await this.props.deleteBlog(id);
    this.setState({ ...defaultState });
    await this.props.getBlog();
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    if (this.props.blog.getFailed) {
      return <Failed name="blog" />;
    }

    if (this.props.blog.isLoading) {
      return <LinearProgress />;
    }

    if (this.props.blog.items) {
      return (
        <div className={classes.root}>
          <Card className={classes.card}>
            <CardContent>
              <form onSubmit={this.handleSubmit}>
                <Tabs value={value} onChange={this.handleChange}>
                  <Tab label={getLanguage()} id="blo-01" />
                  <Tab label="English" id="blo-02" />
                </Tabs>
                {value === 0 && (
                  <TabContainer>
                    <TextField
                      className={classes.formControl}
                      id="blo-03"
                      label="Title"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      margin="normal"
                      name="title"
                      required
                      value={this.state.item.sl.title}
                      placeholder={translate('EVENT_BLOG_PH')}
                      onChange={this.handleSecondaryLanguageInput}
                      helperText={translate('EVENT_BLOG_HT')}
                    />
                    <Paper className={classes.paper} elevation={0}>
                      <Typography variant="caption">Description*</Typography>
                      <RichTextEditor
                        value={this.state.amharic}
                        onChange={this.onSlEditorChange}
                        toolbarConfig={toolbarConfig}
                        id="blo-04"
                      />
                    </Paper>
                  </TabContainer>
                )}
                {value === 1 && (
                  <TabContainer>
                    <TextField
                      className={classes.formControl}
                      id="blo-05"
                      label="Title"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      margin="normal"
                      name="title"
                      required
                      value={this.state.item.en.title}
                      placeholder="Enter your blog title"
                      onChange={this.handleEnglishInput}
                      helperText="e.g - Christianity in Ethiopia"
                    />
                    <Paper className={classes.paper} elevation={0}>
                      <Typography variant="caption">Description*</Typography>
                      <RichTextEditor
                        value={this.state.english}
                        onChange={this.onEnEditorChange}
                        toolbarConfig={toolbarConfig}
                        id="blo-06"
                      />
                    </Paper>
                  </TabContainer>
                )}

                <TabContainer>
                  <TextField
                    className={classes.formControl}
                    id="blo-07"
                    label="Author"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    name="author"
                    required
                    value={this.state.item.author}
                    placeholder="Enter blog author"
                    onChange={this.handleItemInput}
                    helperText="e.g. - Deacon Daniel"
                  />

                  <TextField
                    className={classes.formControl}
                    id="blo-08"
                    label="Publication date and time (yyyy-mm-dd h:mm am)"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    name="dateStart"
                    required
                    value={this.state.item.dateStart}
                    placeholder="Enter your blog publication date and time, it can be future date"
                    onChange={this.handleItemInput}
                    helperText={`e.g. ${pubDate}`}
                  />

                  <TextField
                    className={classes.formControl}
                    id="blo-09"
                    label="Tags"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    name="tag"
                    value={this.state.item.tag.toString()}
                    placeholder="Enter your blog tags comma separated"
                    onChange={this.handleItemInput}
                    helperText={`history, ${translate('TAG')}`}
                  />
                </TabContainer>

                <CardActions>
                  <Button
                    variant="contained"
                    className={classes.button}
                    onClick={this.handleFormClear}
                    id="blo-10"
                  >
                    Clear
                  </Button>

                  <Button
                    variant="contained"
                    className={classes.button}
                    color={this.state.add ? 'primary' : 'secondary'}
                    onClick={this.handleFormUpdate}
                    id="blo-11"
                  >
                    {this.state.add ? 'Submit New' : 'Submit Update'}
                  </Button>
                </CardActions>
              </form>

              <CardContent>
                <Typography color="error" id="ser-17">
                  {Object.keys(this.props.blog.error).length !== 0 &&
                    `Name: ${this.props.blog.error.name} Message: ${this.props.blog.error.message}`}
                </Typography>
                <Typography color="error" id="eve-18">
                  {this.props.getFailed === true && 'Error: failed to fetch data'}
                </Typography>
                <Typography color="error" id="eve-19">
                  {this.props.deleteFailed === true && 'Error: failed to submit delete'}
                </Typography>
                <Typography color="error" id="eve-20">
                  {this.props.updateFailed === true && 'Error: failed to submit update'}
                </Typography>
                <Typography color="error" id="eve-21">
                  {this.props.addFailed === true && 'Error: failed to submit new entry'}
                </Typography>
              </CardContent>

              <CardContent>
                <Typography variant="headline" component="h2">
                  Blog
                </Typography>
                <Typography paragraph>
                  Enter blog articles. All blog posts will be visible. To edit exiting record click
                  the Edit button.
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
                    {this.props.blog.items.map((item) => (
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

export default withRoot(withStyles(styles, { withTheme: true })(BlogForm));
