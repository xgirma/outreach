import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

function EditButton({ onEdit }) {
  return (
    <button type="submit" onClick={onEdit}>
      Edit
    </button>
  );
}

EditButton.propTypes = {
  onEdit: PropTypes.func.isRequired,
};

function DeleteButton({ onDelete }) {
  return (
    <button type="submit" onClick={onDelete}>
      Delete
    </button>
  );
}

DeleteButton.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

function TableRow({ item, onDelete, onEdit }) {
  return (
    <tr>
      <td>{moment(item.date).format('L')}</td>
      <td>{item.adminname}</td>
      <td>{item.en.name}</td>
      <td>{<EditButton onEdit={() => onEdit(item)} />}</td>
      <td>{<DeleteButton onDelete={() => onDelete(item._id)} />}</td>
    </tr>
  );
}

TableRow.propTypes = {
  item: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

class InformationForm extends Component {
  displayName = 'information-form';

  static propTypes = {
    getInformation: PropTypes.func.isRequired,
    deleteInformation: PropTypes.func.isRequired,
  };

  state = {
    items: [],
    item: {},
    error: [],
  };

  async componentDidMount() {
    const { getInformation } = this.props;
    const result = await getInformation();
    const { status, data } = result;
    if (status === 'success') {
      this.setState({
        items: data,
        item: data.length > 0 ? data[0] : {},
      });
    }

    if (status === 'fail') {
      this.setState({
        error: data,
      });
    }
  }

  handleDelete = async (id) => {
    const { deleteInformation, getInformation } = this.props;
    const result = await deleteInformation(id);
    const { status, data } = result;
    if (status === 'success') {
      const newResult = await getInformation();
      if (newResult.status === 'success') {
        this.setState({
          items: newResult.data,
          item: newResult.data.length > 0 ? newResult.data[0] : {},
        });
      }

      if (newResult.status === 'fail') {
        this.setState({
          error: newResult.data,
        });
      }
    }

    if (status === 'fail') {
      this.setState({
        error: data,
      });
    }
  };

  handleEdit = (item) => {
    this.setState({ item });
  };

  render() {
    const { items } = this.state;

    return (
      <div>
        <div className="table-div">
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
      </div>
    );
  }
}

export default InformationForm;
