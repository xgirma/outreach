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
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from '@material-ui/core';
import { toolbarConfig } from '../helper';
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
    add: false,
    error: blankError,
    amharic: createEmptyValue(),
    english: createEmptyValue(),
    value: 0,
  };

  async componentDidMount() {
    const { getMedia } = this.props;
    const result = await getMedia();
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
    const { deleteMedia, getMedia } = this.props;
    const result = await deleteMedia(id);
    const { status, data } = result;
    if (status === 'success') {
      const newResult = await getMedia();
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
              Media
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
                  <RichTextEditor
                    value={this.state.amharic}
                    onChange={this.onAmEditorChange}
                    toolbarConfig={toolbarConfig}
                  />
                </TabContainer>
              )}
              {value === 1 && (
                <TabContainer>
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
                  label="Title"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  name="title"
                  value={this.state.item.title}
                  placeholder="Enter media author"
                  onChange={this.handleItemInput}
                  helperText="e.g. - ለመድሃኔአለም ምስጋና ይድረሰው Medhanialem Mezmur - Ethiopia Orthodox Tewahedo Mezmur"
                />

                <TextField
                  className={classes.formControl}
                  id="full-width"
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

                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="media-simple">Type</InputLabel>
                  <Select
                    value={this.state.item.mediaType}
                    onChange={this.handleMediaTypeChange}
                    inputProps={{ name: 'mediaType' }}
                  >
                    <MenuItem value="video">video</MenuItem>
                    <MenuItem value="audio">audio</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  className={classes.formControl}
                  id="full-width"
                  label="Tags"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  name="tag"
                  value={this.state.item.tag.toString()}
                  placeholder="Enter your blog tags comma separated"
                  onChange={this.handleItemInput}
                  helperText="epiphany,ጥምቀት,holy matrimony,ቅዱስ ጋብቻ"
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
            <Typography className={classes.title} color="textSecondary">
              Database
            </Typography>
            <Typography variant="headline" component="h2">
              Media
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
                      <div onClick={() => this.handleEdit(item)}>{item.title}</div>
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

export default withRoot(withStyles(styles, { withTheme: true })(MediaForm));
