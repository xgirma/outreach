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

class IntroductionForm extends Component {
  static displayName = 'introduction-form';

  static propTypes = {
    getIntroduction: PropTypes.func.isRequired,
    deleteIntroduction: PropTypes.func.isRequired,
    updateIntroduction: PropTypes.func.isRequired,
    addIntroduction: PropTypes.func.isRequired,
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
    const { getIntroduction } = this.props;
    const result = await getIntroduction();
    const { status, data } = result;
    if (status === 'success' && data.length > 0) {
      const amharicHtml = data[0].am.intro;
      const englishHtml = data[0].en.intro;
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

  onAmEditorChange = (amharic) => {
    const introduction = amharic.toString('html');
    this.setState((prevState) => ({
      ...prevState,
      amharic,
      item: {
        ...prevState.item,
        am: {
          ...prevState.item.am,
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
    const amharicHtml = item.am.intro;
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
      if (newResult.status === 'success' && newResult.data.length > 0) {
        const amharicHtml = newResult.data[0].am.intro;
        const englishHtml = newResult.data[0].en.intro;
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
      if (newResult.status === 'success' && newResult.data.length > 0) {
        const amharicHtml = newResult.data[0].am.intro;
        const englishHtml = newResult.data[0].en.intro;
        this.setState({
          items: newResult.data,
          item: newResult.data.length > 0 ? newResult.data[0] : {},
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

  render() {
    return (
      <div>
        <div>
          {this.state.error.name !== '' &&
            `Name: ${this.state.error.name} Message: ${this.state.error.message}`}
        </div>
        <form onSubmit={this.handleSubmit}>
          {/* amharic */}
          <label>Amharic</label>
          <Input
            type="text"
            title="Title"
            name="title"
            value={this.state.item.am.title}
            placeholder="Enter your introduction title"
            onChange={this.handleAmharicInput}
          />
          <Input
            type="text"
            title="Author"
            name="author"
            value={this.state.item.am.author}
            placeholder="Enter your introduction author"
            onChange={this.handleAmharicInput}
          />
          <label>Introduction</label>
          <RichTextEditor
            value={this.state.amharic}
            onChange={this.onAmEditorChange}
            toolbarConfig={toolbarConfig}
          />
          {/* english */}
          <label>English</label>
          <Input
            type="text"
            title="Title"
            name="title"
            value={this.state.item.en.title}
            placeholder="Enter your introduction title"
            onChange={this.handleEnglishInput}
          />
          <Input
            type="text"
            title="Author"
            name="author"
            value={this.state.item.en.author}
            placeholder="Enter your introduction author"
            onChange={this.handleEnglishInput}
          />
          <label>Introduction</label>
          <RichTextEditor
            value={this.state.english}
            onChange={this.onEnEditorChange}
            toolbarConfig={toolbarConfig}
          />
          <Button action={this.handleFormClear} title="Clear" />
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

export default IntroductionForm;
