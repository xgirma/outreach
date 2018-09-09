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

const blankItem = {
  am: {
    description: '',
  },
  en: {
    description: '',
  },
  title: '',
  url: '',
  mediaType: '',
  tag: [],
};

const blankError = {
  message: '',
  name: '',
};

class MediaForm extends Component {
  displayName = 'media-form';

  static propTypes = {
    getMedia: PropTypes.func.isRequired,
    deleteMedia: PropTypes.func.isRequired,
    updateMedia: PropTypes.func.isRequired,
    addMedia: PropTypes.func.isRequired,
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
    const { getMedia } = this.props;
    const result = await getMedia();
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

  handleMediaTypeChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
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
    const { updateMedia, getMedia, addMedia } = this.props;

    const result = this.state.add
      ? await addMedia(this.state.item)
      : await updateMedia(this.state.item);

    const { status, data } = result;
    if (status === 'success') {
      const newResult = await getMedia();
      if (newResult.status === 'success') {
        this.setState({
          items: newResult.data,
          item: blankItem,
          error: blankError,
          add: false,
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
    const { deleteMedia, getMedia } = this.props;
    const result = await deleteMedia(id);
    const { status, data } = result;
    if (status === 'success') {
      const newResult = await getMedia();
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
                <Tab label="Amharic" id="med-01" />
                <Tab label="English" id="med-02" />
              </Tabs>
              {value === 0 && (
                <TabContainer>
                  <Paper className={classes.paper} elevation={0}>
                    <Typography variant="caption">Media description</Typography>
                    <RichTextEditor
                      value={this.state.amharic}
                      onChange={this.onAmEditorChange}
                      toolbarConfig={toolbarConfig}
                      id="med-03"
                    />
                  </Paper>
                </TabContainer>
              )}
              {value === 1 && (
                <TabContainer>
                  <Paper className={classes.paper} elevation={0}>
                    <Typography variant="caption">Media description</Typography>
                    <RichTextEditor
                      value={this.state.english}
                      onChange={this.onEnEditorChange}
                      toolbarConfig={toolbarConfig}
                      id="med-04"
                    />
                  </Paper>
                </TabContainer>
              )}

              <TabContainer>
                <TextField
                  className={classes.formControl}
                  id="med-05"
                  label="Title"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  name="title"
                  value={this.state.item.title}
                  placeholder="Enter media title"
                  onChange={this.handleItemInput}
                  helperText="e.g. - ለመድሃኔአለም ምስጋና ይድረሰው Medhanialem Mezmur - Ethiopia Orthodox Tewahedo Mezmur"
                />

                <TextField
                  className={classes.formControl}
                  id="med-06"
                  label="Media URL"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  name="url"
                  value={this.state.item.url}
                  placeholder="Enter your media URL"
                  onChange={this.handleItemInput}
                  helperText="e.g. https://www.youtube.com/watch?v=farii-8XWxE"
                />

                <TextField
                  className={classes.formControl}
                  id="med-07"
                  label="Media type"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  name="mediaType"
                  value={this.state.item.mediaType}
                  placeholder="Enter media type (video or audio)"
                  onChange={this.handleItemInput}
                  helperText="video"
                />

                <TextField
                  className={classes.formControl}
                  id="med-08"
                  label="Tags"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  name="tag"
                  value={this.state.item.tag.toString()}
                  placeholder="Enter your blog tags comma separated"
                  onChange={this.handleItemInput}
                  helperText="epiphany, ጥምቀት"
                />
              </TabContainer>

              <CardActions>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={this.handleFormClear}
                  id="med-09"
                >
                  Clear
                </Button>

                <Button
                  variant="contained"
                  className={classes.button}
                  color="primary"
                  onClick={this.handleFormUpdate}
                  id="med-10"
                >
                  Submit
                </Button>
              </CardActions>
            </form>

            <CardContent>
              <Typography color="error" id="med-11">
                {this.state.error.name !== '' &&
                  `Name: ${this.state.error.name} Message: ${this.state.error.message}`}
              </Typography>
            </CardContent>

            <CardContent>
              <Typography variant="headline" component="h2">
                Media
              </Typography>
              <Typography paragraph>
                Enter media metadata. All records will be visible. To edit exiting record click the
                Edit button.
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
                        <div onClick={() => this.handleEdit(item)}>{item.title}</div>
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

export default withRoot(withStyles(styles, { withTheme: true })(MediaForm));
