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
    
    if (status === 'fail' || status === 'error') {
      this.setState({
        error: { ...data },
      });
    }
  }
  
  render() {
    return <div>Hello blog</div>;
  }
}

export default BlogForm
