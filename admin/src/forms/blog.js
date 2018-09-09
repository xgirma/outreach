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
import { toolbarConfig, dateFormat } from '../helper';
import withRoot from '../withRoot';
import styles from '../styles';
import TabContainer from '../components/tab-container';

const pubDate = moment()
  .add(7, 'days')
  .hours(9)
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
  author: '',
  dateStart: '',
  tag: [],
};

const blankError = {
  message: '',
  name: '',
};

class BlogForm extends Component {
  displayName = 'blog-form';

  static propTypes = {
    getBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    updateBlog: PropTypes.func.isRequired,
    addBlog: PropTypes.func.isRequired,
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
    const { getBlog } = this.props;
    const result = await getBlog();
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
    const { updateBlog, getBlog, addBlog } = this.props;

    const result = this.state.add
      ? await addBlog(this.state.item)
      : await updateBlog(this.state.item);

    const { status, data } = result;
    if (status === 'success') {
      const newResult = await getBlog();
      if (newResult.status === 'success') {
        this.setState({
          items: newResult.data,
          item: blankItem,
          add: false,
          error: blankError,
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

  handleDelete = async (id) => {
    const { deleteBlog, getBlog } = this.props;
    const result = await deleteBlog(id);
    const { status, data } = result;
    if (status === 'success') {
      const newResult = await getBlog();
      if (newResult.status === 'success') {
        this.setState({
          items: newResult.data,
          item: blankItem,
          error: blankError,
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
                <Tab label="Amharic" id="blo-01" />
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
                    value={this.state.item.am.title}
                    placeholder="የጦማር ርዕስዎን እዚህ ይፃፉ"
                    onChange={this.handleAmharicInput}
                    helperText="ለምሳሌ - ክርስትና በኢትዮጵያ"
                  />
                  <Paper className={classes.paper} elevation={0}>
                    <Typography variant="caption">Blog content</Typography>
                    <RichTextEditor
                      value={this.state.amharic}
                      onChange={this.onAmEditorChange}
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
                    value={this.state.item.en.title}
                    placeholder="Enter your blog title"
                    onChange={this.handleEnglishInput}
                    helperText="e.g - Christianity in Ethiopia"
                  />
                  <RichTextEditor
                    value={this.state.english}
                    onChange={this.onEnEditorChange}
                    toolbarConfig={toolbarConfig}
                    id="blo-06"
                  />
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
                  value={this.state.item.author}
                  placeholder="Enter blog author"
                  onChange={this.handleItemInput}
                  helperText="e.g. - Deacon Daniel"
                />

                <TextField
                  className={classes.formControl}
                  id="blo-08"
                  label="Publication date (yyyy-mm-dd h:mm am)"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  name="dateStart"
                  value={this.state.item.dateStart}
                  placeholder="Enter your blog publication date, it can be future date"
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
                  helperText="history, ታሪክ"
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
                  color="primary"
                  onClick={this.handleFormUpdate}
                  id="blo-11"
                >
                  Submit
                </Button>
              </CardActions>
            </form>

            <CardContent>
              <Typography color="error" id="blo-12">
                {this.state.error.name !== '' &&
                  `Name: ${this.state.error.name} Message: ${this.state.error.message}`}
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

export default withRoot(withStyles(styles, { withTheme: true })(BlogForm));
