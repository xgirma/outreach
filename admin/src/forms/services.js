/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import RichTextEditor, { createEmptyValue, createValueFromString } from 'react-rte';
import { withStyles } from '@material-ui/core/styles';
import { toolbarConfig } from '../helper';
import { Input, Button } from '../components';
import withRoot from '../withRoot';
import styles from '../styles';

const blankItem = {
  am: {
    title: '',
    description: '',
    contact: '',
  },
  en: {
    title: '',
    description: '',
    contact: '',
  },
  phone: '',
  email: '',
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

class ServicesForm extends Component {
  displayName = 'services-form';

  static propTypes = {
    getServices: PropTypes.func.isRequired,
    deleteServices: PropTypes.func.isRequired,
    updateServices: PropTypes.func.isRequired,
    addServices: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
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
    const { getServices } = this.props;
    const result = await getServices();
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

    if (this.state.items.length === 0) {
      this.setState({ add: true });
    }

    if (status === 'fail' || status === 'error') {
      this.setState({
        error: { ...data },
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
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
    this.setState({
      item,
      add: false,
      amharic: createValueFromString(amharicHtml, 'html'),
      english: createValueFromString(englishHtml, 'html'),
    });
  };

  handleFormUpdate = async (event) => {
    event.preventDefault();
    const { updateServices, getServices, addServices } = this.props;

    const result = this.state.add
      ? await addServices(this.state.item)
      : await updateServices(this.state.item);

    const { status, data } = result;
    if (status === 'success') {
      const newResult = await getServices();
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
    const { deleteServices, getServices } = this.props;
    const result = await deleteServices(id);
    const { status, data } = result;
    if (status === 'success') {
      const newResult = await getServices();
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

    return (
      <div className={classes.root}>
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
            placeholder="Enter your service title"
            onChange={this.handleAmharicInput}
          />
          <label>Description</label>
          <RichTextEditor
            value={this.state.amharic}
            onChange={this.onAmEditorChange}
            toolbarConfig={toolbarConfig}
          />
          <Input
            type="text"
            title="Contact"
            name="contact"
            value={this.state.item.am.contact}
            placeholder="Enter your service title"
            onChange={this.handleAmharicInput}
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
          <Input
            type="text"
            title="Contact"
            name="contact"
            value={this.state.item.en.contact}
            placeholder="Enter your service title"
            onChange={this.handleEnglishInput}
          />
          {/* phone, email */}
          <label>Phone, email</label>
          <Input
            type="text"
            title="Phone"
            name="phone"
            value={this.state.item.phone}
            placeholder="Enter your service contact phone"
            onChange={this.handleItemInput}
          />
          <Input
            type="text"
            title="Email"
            name="email"
            value={this.state.item.email}
            placeholder="Enter your service contact email"
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

export default withRoot(withStyles(styles, { withTheme: true })(ServicesForm));
