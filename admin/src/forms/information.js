/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  AppBar,
  Tabs,
  Tab,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import withRoot from '../withRoot';
import styles from '../styles';
import TabContainer from '../components/tab-container';

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
    classes: PropTypes.object.isRequired,
  };

  state = {
    items: [],
    item: blankItem,
    add: false,
    error: blankError,
    value: 0,
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

  handleChange = (event, value) => {
    this.setState({ value });
  };

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
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={24} alignContent="center">
          <Grid item xs={12}>
            <Typography variant="headline">Information</Typography>
            <Typography color="inherit" noWrap>
              {this.state.error.name !== '' &&
                `Name: ${this.state.error.name} Message: ${this.state.error.message}`}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <form onSubmit={this.handleSubmit}>
              <AppBar position="static" color="default">
                <Tabs value={value} onChange={this.handleChange}>
                  <Tab label="Amharic" />
                  <Tab label="English" />
                </Tabs>
              </AppBar>
              {value === 0 && (
                <TabContainer>
                  <TextField
                    className={classes.formControl}
                    id="full-width"
                    label="Name"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    name="name"
                    value={this.state.item.am.name}
                    placeholder="Enter your church name"
                    onChange={this.handleAmharicInput}
                    helperText="ለምሳሌ - የሲያትል ደብረ ሚካኤል የኢትዮጵያ ኦርቶዶክስ ተዋህዶ ቤተክርስቲያን"
                  />
                  <TextField
                    className={classes.formControl}
                    id="full-width"
                    label="Denomination"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    name="denomination"
                    value={this.state.item.am.denomination}
                    placeholder="Enter your church denomination name"
                    onChange={this.handleAmharicInput}
                    helperText="ለምሳሌ - የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተክርስትያን"
                  />
                  <TextField
                    className={classes.formControl}
                    id="full-width"
                    label="Bible verse"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    name="verse"
                    value={this.state.item.am.bible.verse}
                    placeholder="Enter your church verse"
                    onChange={this.handleAmharicBibleInput}
                    helperText="ለምሳሌ - ሁለት ወይም ሦስት በስሜ በሚሰበሰቡበት በዚያ በመካከላቸው እሆናለሁና"
                  />
                  <TextField
                    className={classes.formControl}
                    id="full-width"
                    label="Source"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    name="from"
                    value={this.state.item.am.bible.from}
                    placeholder="Enter your church verse from"
                    onChange={this.handleAmharicBibleInput}
                    helperText="ለምሳሌ - ማቴዎስ 18:20"
                  />
                </TabContainer>
              )}
              {value === 1 && (
                <TabContainer>
                  <TextField
                    className={classes.formControl}
                    id="full-width"
                    label="Name"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    name="name"
                    value={this.state.item.en.name}
                    placeholder="Enter your church name"
                    onChange={this.handleEnglishInput}
                    helperText="e.g. Seattle Debre Mihret St.Michael Ethiopian Orthodox Tewahedo Church"
                  />
                  <TextField
                    className={classes.formControl}
                    id="full-width"
                    label="Denomination"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    name="denomination"
                    value={this.state.item.en.denomination}
                    placeholder="Enter your church denomination name"
                    onChange={this.handleEnglishInput}
                    helperText="e.g. Ethiopian Orthodox Tewahedo Church"
                  />
                  <TextField
                    className={classes.formControl}
                    id="full-width"
                    label="Bible verse"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    name="verse"
                    value={this.state.item.en.bible.verse}
                    placeholder="Enter your church verse"
                    onChange={this.handleEnglishBibleInput}
                    helperText="e.g. For where two or three are gathered together in my name, there am I in the midst of them."
                  />
                  <TextField
                    className={classes.formControl}
                    id="full-width"
                    label="Source"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    name="from"
                    value={this.state.item.en.bible.from}
                    placeholder="Enter your church verse from"
                    onChange={this.handleEnglishBibleInput}
                    helperText="e.g. Matthew 18:20"
                  />
                </TabContainer>
              )}

              <TextField
                className={classes.formControl}
                id="full-width"
                label="Phone"
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="normal"
                name="phone"
                value={this.state.item.phone}
                placeholder="Enter your church phone"
                onChange={this.handleItemInput}
                helperText="e.g. (425) 000-1234"
              />

              <TextField
                className={classes.formControl}
                id="full-width"
                label="Email"
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="normal"
                name="email"
                value={this.state.item.email}
                placeholder="Enter your church email"
                onChange={this.handleItemInput}
                helperText="e.g. xyz@gmail.com"
              />

              <TextField
                className={classes.formControl}
                id="full-width"
                label="Street"
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="normal"
                name="street"
                value={this.state.item.address.street}
                placeholder="Enter your church street"
                onChange={this.handleAddressInput}
                helperText="e.g. 123 Main Street"
              />

              <TextField
                className={classes.formControl}
                id="full-width"
                label="City"
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="normal"
                name="city"
                value={this.state.item.address.city}
                placeholder="Enter your church city"
                onChange={this.handleAddressInput}
                helperText="e.g. Seattle"
              />

              <TextField
                className={classes.formControl}
                id="full-width"
                label="State"
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="normal"
                name="state"
                value={this.state.item.address.state}
                placeholder="Enter your church state"
                onChange={this.handleAddressInput}
                helperText="e.g. WA"
              />

              <TextField
                className={classes.formControl}
                id="full-width"
                label="Zip"
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="normal"
                name="zip"
                value={this.state.item.address.zip}
                placeholder="Enter your church zip"
                onChange={this.handleAddressInput}
                helperText="e.g. 90102"
              />

              <TextField
                className={classes.formControl}
                id="full-width"
                label="Country"
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="normal"
                name="country"
                value={this.state.item.address.country}
                placeholder="Enter your church country"
                onChange={this.handleAddressInput}
                helperText="e.g. United State"
              />

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={this.handleFormClear}
                >
                  Add New
                </Button>

                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={this.handleFormUpdate}
                >
                  Submit
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Created on</TableCell>
                <TableCell>By</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.items.map((item) => (
                <TableRow key={item._id}>
                  <TableCell component="th" scope="row">
                    {moment(item.date).format('L')}
                  </TableCell>
                  <TableCell>{item.adminname}</TableCell>
                  <TableCell>{item.en.name}</TableCell>
                  <TableCell>
                    {
                      <Button
                        variant="contained"
                        className={classes.button}
                        onClick={() => this.handleEdit(item)}
                      >
                        Edit
                      </Button>
                    }
                  </TableCell>
                  <TableCell>
                    {
                      <Button
                        variant="contained"
                        className={classes.button}
                        onClick={() => this.handleDelete(item._id)}
                      >
                        Delete
                      </Button>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default withRoot(withStyles(styles, { withTheme: true })(InformationForm));
