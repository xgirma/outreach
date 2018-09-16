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

const defaultState = {
  item: blankItem,
  add: true,
  amharic: createValueFromString('', 'html'),
  english: createValueFromString('', 'html'),
};

class MediaForm extends Component {
  displayName = 'media-form';

  static defaultProps = {
    getFailed: false,
    deleteFailed: false,
    updateFailed: false,
    addFailed: false,
  };

  static propTypes = {
    getMedia: PropTypes.func.isRequired,
    deleteMedia: PropTypes.func.isRequired,
    updateMedia: PropTypes.func.isRequired,
    addMedia: PropTypes.func.isRequired,
    clearMediaForm: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    media: PropTypes.object.isRequired,
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
    this.props.getMedia();
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
    this.props.clearMediaForm();
    this.setState({ ...defaultState });
  };

  handleEdit = (item) => {
    this.props.clearMediaForm();
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
      ? await this.props.addMedia(this.state.item)
      : await this.props.updateMedia(this.state.item);

    if (
      result &&
      typeof result !== 'undefined' &&
      Object.keys(result).length !== 0 &&
      result.status === 'success'
    ) {
      this.setState({ ...defaultState });
      await this.props.getMedia();
    }
  };

  handleDelete = async (id) => {
    await this.props.deleteMedia(id);
    this.setState({ ...defaultState });
    await this.props.getMedia();
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    if (this.props.media.getFailed) {
      return <Failed name="introduction" />;
    }

    if (this.props.media.isLoading) {
      return <LinearProgress />;
    }

    if (this.props.media.items) {
      return (
        <div className={classes.root}>
          <Card className={classes.card}>
            <CardContent>
              <form onSubmit={this.handleSubmit}>
                <Tabs value={value} onChange={this.handleChange}>
                  <Tab label={getLanguage()} id="med-01" />
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
                    required
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
                    required
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
                    required
                    value={this.state.item.mediaType}
                    placeholder="Enter media type (video or audio)"
                    onChange={this.handleItemInput}
                    helperText="e.g. video"
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
                    helperText={`history ${translate('TAG')}`}
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
                    color={this.state.add ? 'primary' : 'secondary'}
                    onClick={this.handleFormUpdate}
                    id="med-10"
                  >
                    {this.state.add ? 'Submit New' : 'Submit Update'}
                  </Button>
                </CardActions>
              </form>

              <CardContent>
                <Typography color="error" id="ser-11">
                  {Object.keys(this.props.media.error).length !== 0 &&
                    `Name: ${this.props.media.error.name} Message: ${
                      this.props.media.error.message
                    }`}
                </Typography>
                <Typography color="error" id="med-12">
                  {this.props.getFailed === true && 'Error: failed to fetch data'}
                </Typography>
                <Typography color="error" id="med-13">
                  {this.props.deleteFailed === true && 'Error: failed to submit delete'}
                </Typography>
                <Typography color="error" id="med-14">
                  {this.props.updateFailed === true && 'Error: failed to submit update'}
                </Typography>
                <Typography color="error" id="med-15">
                  {this.props.addFailed === true && 'Error: failed to submit new entry'}
                </Typography>
              </CardContent>

              <CardContent>
                <Typography variant="headline" component="h2">
                  Media
                </Typography>
                <Typography paragraph>
                  Enter media metadata. All records will be visible. To edit exiting record click
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
                    {this.props.media.items.map((item) => (
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

    return null;
  }
}

export default withRoot(withStyles(styles, { withTheme: true })(MediaForm));
