import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class DeleteButton extends Component {
  render() {
    return <button onClick={() => alert('click')}>Delete</button>;
  }
}

class EditButton extends Component {
  render() {
    return <button onClick={() => alert('click')}>Edit</button>;
  }
}

class InformationRow extends Component {
  render() {
    const { item } = this.props;
    const { _id, date, adminname, en } = item;

    return (
      <tr>
        <td>{moment(date).format('L')}</td>
        <td>{adminname}</td>
        <td>{en.name}</td>
        <td>{<EditButton id={_id} />}</td>
        <td>{<DeleteButton id={_id} />}</td>
      </tr>
    );
  }
}

class InformationTable extends Component {
  render() {
    const { items } = this.props;
    return (
      <div>
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
            {items.map((item) => (
              <InformationRow key={item._id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

class InformationForm extends Component {
  displayName = 'information-form';

  static propTypes = {
    getInformation: PropTypes.func.isRequired,
  };

  state = {
    items: [],
    error: [],
  };

  async componentDidMount() {
    const result = await this.props.getInformation();
    const { status, data } = result;
    if (status === 'success') {
      this.setState({
        items: data,
      });
    }

    if (status === 'fail') {
      this.setState({
        error: data, // 2018-08-30T02:14:52.827Z
      });
    }
  }

  render() {
    const { items } = this.state;
    return (
      <div>
        <InformationTable items={items} />
      </div>
    );
  }
}

export default InformationForm;
