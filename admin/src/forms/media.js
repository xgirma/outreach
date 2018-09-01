/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import RichTextEditor, { createEmptyValue, createValueFromString } from 'react-rte';
import { toolbarConfig } from '../helper';
import { Input, Button } from '../components';

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

function TableRow({ item, onDelete, onEdit }) {
  return (
    <tr>
      <td>{moment(item.date).format('L')}</td>
      <td>{item.adminname}</td>
      <td>{item.title}</td>
      <td>{<Button action={() => onEdit(item)} title="Edit" />}</td>
      <td>{<Button action={() => onDelete(item._id)} title="Delete" />}</td>
    </tr>
  );
}

TableRow.propTypes = {
  item: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

class MediaForm extends Component {
  displayName = 'media-form';

  static propTypes = {
    getMedia: PropTypes.func.isRequired,
    deleteMedia: PropTypes.func.isRequired,
    updateMedia: PropTypes.func.isRequired,
    addMedia: PropTypes.func.isRequired,
  };

  state = {
    items: [],
    item: blankItem,
    add: false,
    error: blankError,
    amharic: createEmptyValue(),
    english: createEmptyValue(),
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
  
    if(this.state.items.length === 0){
      this.setState({add: true})
    }

    if (status === 'fail' || status === 'error') {
      this.setState({
        error: { ...data },
      });
    }
  }

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
    return (
      <div>
        <div>
          {this.state.error.name !== '' &&
            `Name: ${this.state.error.name} Message: ${this.state.error.message}`}
        </div>

        <form onSubmit={this.handleSubmit}>
          {/* amharic */}
          <label>Description</label>
          <RichTextEditor
            value={this.state.amharic}
            onChange={this.onAmEditorChange}
            toolbarConfig={toolbarConfig}
          />
          {/* english */}
          <label>Description</label>
          <RichTextEditor
            value={this.state.english}
            onChange={this.onEnEditorChange}
            toolbarConfig={toolbarConfig}
          />
          {/* title, url, type, tag */}
          <label>title, url, type, tag</label>
          <Input
            type="text"
            title="Title"
            name="title"
            value={this.state.item.title}
            placeholder="Enter media title"
            onChange={this.handleItemInput}
          />
          <Input
            type="text"
            title="Url"
            name="url"
            value={this.state.item.url}
            placeholder="Enter media url"
            onChange={this.handleItemInput}
          />
          {/* TODO drop-down with audio/video */}
          <Input
            type="text"
            title="Media Type"
            name="mediaType"
            value={this.state.item.mediaType}
            placeholder="Enter media type"
            onChange={this.handleItemInput}
          />
          <Input
            type="text"
            title="Tags"
            name="tag"
            value={this.state.item.tag.toString()}
            placeholder="Enter your media tags comma separated date"
            onChange={this.handleItemInput}
          />
          {/* clear, submit */}
          <Button action={this.handleFormClear} title="Add New" />
          <Button action={this.handleFormUpdate} title="Submit" />
        </form>

        <table>
          <thead>
            <tr>
              <th>Created on</th>
              <th>By</th>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.items.map((item) => (
              <TableRow
                key={item._id}
                item={item}
                onDelete={this.handleDelete}
                onEdit={this.handleEdit}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default MediaForm;
