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
  address: {
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  },
  phone: '',
  email: '',
  dateStart: '',
  dateEnd: '',
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

class EventForm extends Component {
  static displayName = 'event-form';

  static propTypes = {
    getEvent: PropTypes.func.isRequired,
    deleteEvent: PropTypes.func.isRequired,
    updateEvent: PropTypes.func.isRequired,
    addEvent: PropTypes.func.isRequired,
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
    const { getEvent } = this.props;
    const result = await getEvent();
    const { status, data } = result;
    if (status === 'success' && data.length > 0) {
      const amharicHtml = data[0].am.description;
      const englishHtml = data[0].en.description;
      this.setState({
        items: data,
        item: data.length > 0 ? data[0] : {},
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

  handleAddressInput = (event) => {
    const { value, name } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      item: {
        ...prevState.item,
        address: { ...prevState.item.address, [name]: value },
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

  handleFormUpdate = async (event) => {
    event.preventDefault();
    const { updateEvent, getEvent, addEvent } = this.props;

    const result = this.state.add
      ? await addEvent(this.state.item)
      : await updateEvent(this.state.item);

    const { status, data } = result;
    if (status === 'success') {
      const newResult = await getEvent();
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

  handleDelete = async (id) => {
    const { deleteEvent, getEvent } = this.props;
    const result = await deleteEvent(id);
    const { status, data } = result;
    if (status === 'success') {
      const newResult = await getEvent();
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
        <form onSubmit={this.handleSubmit}>
          {/* amharic */}
          <label>Amharic</label>
          <Input
            type="text"
            title="Title"
            name="title"
            value={this.state.item.am.title}
            placeholder="Enter your event title"
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
            placeholder="Enter your event title"
            onChange={this.handleEnglishInput}
          />
          <label>Description</label>
          <RichTextEditor
            value={this.state.english}
            onChange={this.onEnEditorChange}
            toolbarConfig={toolbarConfig}
          />
          {/* address */}
          <label>Address: </label>
          <Input
            type="text"
            title="Street"
            name="street"
            value={this.state.item.address.street}
            placeholder="Enter your event street"
            onChange={this.handleAddressInput}
          />
          <Input
            type="text"
            title="City"
            name="city"
            value={this.state.item.address.city}
            placeholder="Enter your event city"
            onChange={this.handleAddressInput}
          />
          <Input
            type="text"
            title="State"
            name="state"
            value={this.state.item.address.state}
            placeholder="Enter your event state"
            onChange={this.handleAddressInput}
          />
          <Input
            type="text"
            title="Zip"
            name="zip"
            value={this.state.item.address.zip}
            placeholder="Enter your event zip"
            onChange={this.handleAddressInput}
          />
          <Input
            type="text"
            title="Country"
            name="country"
            value={this.state.item.address.country}
            placeholder="Enter your event country"
            onChange={this.handleAddressInput}
          />
          {/* phone, email, date range */}
          <label>Phone, email</label>
          <Input
            type="text"
            title="Phone"
            name="phone"
            value={this.state.item.phone}
            placeholder="Enter your event phone"
            onChange={this.handleItemInput}
          />
          <Input
            type="text"
            title="Email"
            name="email"
            value={this.state.item.email}
            placeholder="Enter your event email"
            onChange={this.handleItemInput}
          />
          <Input
            type="text"
            title="Start date"
            name="dateStart"
            value={this.state.item.dateStart}
            placeholder="Enter your event start date"
            onChange={this.handleItemInput}
          />
          <Input
            type="text"
            title="End date"
            name="dateEnd"
            value={this.state.item.dateEnd}
            placeholder="Enter your event start date"
            onChange={this.handleItemInput}
          />
          {/* clear, submit */}
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

export default EventForm;
