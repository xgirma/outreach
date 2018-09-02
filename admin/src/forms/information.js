/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Input, Button } from '../components';

function TableRow({ item, onDelete, onEdit }) {
  return (
    <tr>
      <td>{moment(item.date).format('L')}</td>
      <td>{item.adminname}</td>
      <td>{item.en.name}</td>
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

const blankItem = {
  am: {
    name: '',
    denomination: '',
    bible: {
      verse: '',
      from: '',
    },
  },
  en: {
    name: '',
    denomination: '',
    bible: {
      verse: '',
      from: '',
    },
  },
  phone: '',
  email: '',
  address: {
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  },
};

const blankError = {
  message: '',
  name: '',
};

class InformationForm extends Component {
  static displayName = 'information-form';

  static propTypes = {
    getInformation: PropTypes.func.isRequired,
    deleteInformation: PropTypes.func.isRequired,
    updateInformation: PropTypes.func.isRequired,
    addInformation: PropTypes.func.isRequired,
  };

  state = {
    items: [],
    item: blankItem,
    add: false,
    error: blankError,
  };

  async componentDidMount() {
    const { getInformation } = this.props;
    const result = await getInformation();
    const { status, data } = result;
    if (status === 'success') {
      this.setState({
        items: data,
        item: data.length > 0 ? data[0] : blankItem,
        error: blankError,
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

  handleDelete = async (id) => {
    const { deleteInformation, getInformation } = this.props;
    const result = await deleteInformation(id);
    const { status, data } = result;
    if (status === 'success') {
      const newResult = await getInformation();
      if (newResult.status === 'success' && newResult.data.length > 0) {
        this.setState({
          items: newResult.data,
          item: newResult.data[0],
          error: blankError,
        });
      }

      if (newResult.status === 'success' && newResult.data.length === 0) {
        this.setState({
          items: newResult.data,
          item: blankItem,
          add: true,
          error: blankError,
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
    const { updateInformation, getInformation, addInformation } = this.props;

    const result = this.state.add
      ? await addInformation(this.state.item)
      : await updateInformation(this.state.item);

    const { status, data } = result;
    if (status === 'success') {
      const newResult = await getInformation();
      if (newResult.status === 'success' && newResult.data.length > 0) {
        this.setState({
          items: newResult.data,
          item: newResult.data[0],
          error: blankError,
          add: true,
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
    this.setState({ item, add: false });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  handleFormClear = (event) => {
    event.preventDefault();
    this.setState({ item: blankItem, add: true });
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

  handleAmharicBibleInput = (event) => {
    const { value, name } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      item: {
        ...prevState.item,
        am: { ...prevState.item.am, bible: { ...prevState.item.am.bible, [name]: value } },
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

  handleEnglishBibleInput = (event) => {
    const { value, name } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      item: {
        ...prevState.item,
        en: { ...prevState.item.en, bible: { ...prevState.item.en.bible, [name]: value } },
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
            title="Name"
            name="name"
            value={this.state.item.am.name}
            placeholder="Enter your church name"
            onChange={this.handleAmharicInput}
          />
          <Input
            type="text"
            title="Denomination"
            name="denomination"
            value={this.state.item.am.denomination}
            placeholder="Enter your church denomination name"
            onChange={this.handleAmharicInput}
          />
          <Input
            type="text"
            title="Verse"
            name="verse"
            value={this.state.item.am.bible.verse}
            placeholder="Enter your church verse"
            onChange={this.handleAmharicBibleInput}
          />
          <Input
            type="text"
            title="From"
            name="from"
            value={this.state.item.am.bible.from}
            placeholder="Enter your church verse from"
            onChange={this.handleAmharicBibleInput}
          />
          {/* english */}
          <label>English</label>
          <Input
            type="text"
            title="Name"
            name="name"
            value={this.state.item.en.name}
            placeholder="Enter your church name"
            onChange={this.handleEnglishInput}
          />
          <Input
            type="text"
            title="Denomination"
            name="denomination"
            value={this.state.item.en.denomination}
            placeholder="Enter your church denomination name"
            onChange={this.handleEnglishInput}
          />
          <Input
            type="text"
            title="Verse"
            name="verse"
            value={this.state.item.en.bible.verse}
            placeholder="Enter your church verse"
            onChange={this.handleEnglishBibleInput}
          />
          <Input
            type="text"
            title="From"
            name="from"
            value={this.state.item.en.bible.from}
            placeholder="Enter your church verse from"
            onChange={this.handleEnglishBibleInput}
          />
          {/* phone, email */}
          <label>Phone, email</label>
          <Input
            type="text"
            title="Phone"
            name="phone"
            value={this.state.item.phone}
            placeholder="Enter your church phone"
            onChange={this.handleItemInput}
          />
          <Input
            type="text"
            title="Email"
            name="email"
            value={this.state.item.email}
            placeholder="Enter your church email"
            onChange={this.handleItemInput}
          />
          {/* address */}
          <label>Address: </label>
          <Input
            type="text"
            title="Street"
            name="street"
            value={this.state.item.address.street}
            placeholder="Enter your church street"
            onChange={this.handleAddressInput}
          />
          <Input
            type="text"
            title="City"
            name="city"
            value={this.state.item.address.city}
            placeholder="Enter your church city"
            onChange={this.handleAddressInput}
          />
          <Input
            type="text"
            title="State"
            name="state"
            value={this.state.item.address.state}
            placeholder="Enter your church state"
            onChange={this.handleAddressInput}
          />
          <Input
            type="text"
            title="Zip"
            name="zip"
            value={this.state.item.address.zip}
            placeholder="Enter your church zip"
            onChange={this.handleAddressInput}
          />
          <Input
            type="text"
            title="Country"
            name="country"
            value={this.state.item.address.country}
            placeholder="Enter your church country"
            onChange={this.handleAddressInput}
          />
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

export default InformationForm;
