/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import RichTextEditor, { createEmptyValue, createValueFromString } from 'react-rte';
import { toolbarConfig } from '../helper';
import { Input, Button } from '../components';

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

function TableRow({ item, onDelete, onEdit }) {
  return (
    <tr>
      <td>{moment(item.date).format('L')}</td>
      <td>{item.adminname}</td>
      <td>{item.en.title}</td>
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

class BlogForm extends Component {
  displayName = 'blog-form';

  static propTypes = {
    getBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    updateBlog: PropTypes.func.isRequired,
    addBlog: PropTypes.func.isRequired,
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
    const { getBlog } = this.props;
    const result = await getBlog();
    const { status, data } = result;
    if (status === 'success' && data.length > 0) {
      const amharicHtml = data[0].am.description;
      const englishHtml = data[0].en.description;
      this.setState({
        items: data,
        item: data[0],
        error: blankError,
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
    this.setState({
      item,
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
      if (newResult.status === 'success' && newResult.data.length > 0) {
        const amharicHtml = newResult.data[0].am.description;
        const englishHtml = newResult.data[0].en.description;
        this.setState({
          items: newResult.data,
          item: newResult.data[0],
          add: false,
          error: blankError,
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
    const { deleteBlog, getBlog } = this.props;
    const result = await deleteBlog(id);
    const { status, data } = result;
    if (status === 'success') {
      const newResult = await getBlog();
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
          <Input
            type="text"
            title="Title"
            name="title"
            value={this.state.item.am.title}
            placeholder="Enter your blog title"
            onChange={this.handleAmharicInput}
          />
          <label>Description</label>
          <RichTextEditor
            value={this.state.amharic}
            onChange={this.onAmEditorChange}
            toolbarConfig={toolbarConfig}
          />
          {/* english */}
          <Input
            type="text"
            title="Title"
            name="title"
            value={this.state.item.en.title}
            placeholder="Enter your service title"
            onChange={this.handleEnglishInput}
          />
          <label>Description</label>
          <RichTextEditor
            value={this.state.english}
            onChange={this.onEnEditorChange}
            toolbarConfig={toolbarConfig}
          />
          {/* author, date, tags */}
          <label>author, date, tags</label>
          <Input
            type="text"
            title="Author"
            name="author"
            value={this.state.item.author}
            placeholder="Enter author name"
            onChange={this.handleItemInput}
          />
          <Input
            type="text"
            title="Start date"
            name="dateStart"
            value={this.state.item.dateStart}
            placeholder="Enter your blog publication date, it can be future date"
            onChange={this.handleItemInput}
          />
          <Input
            type="text"
            title="Tags"
            name="tag"
            value={this.state.item.tag.toString()}
            placeholder="Enter your blog tags comma separated date"
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

export default BlogForm;
