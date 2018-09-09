import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Tabs,
  Tab,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  CardActions,
  CardContent,
  Button,
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { createValueFromString } from 'react-rte';
import { dateFormat } from '../helper';
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
    add: true,
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
        error: blankError,
      });
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
      if (newResult.status === 'success') {
        this.setState({
          items: newResult.data,
          error: blankError,
          item: blankItem,
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

  handleFormUpdate = async (event) => {
    event.preventDefault();
    const { updateInformation, getInformation, addInformation } = this.props;

    const result = this.state.add
      ? await addInformation(this.state.item)
      : await updateInformation(this.state.item);

    const { status, data } = result;
    if (status === 'success') {
      const newResult = await getInformation();
      if (newResult.status === 'success') {
        this.setState({
          items: newResult.data,
          error: blankError,
          item: blankItem,
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
        <Card className={classes.card}>
          <CardContent>
            <form onSubmit={this.handleSubmit}>
              <Tabs value={value} onChange={this.handleChange}>
                <Tab label="Amharic" id="inf-01" />
                <Tab label="English" id="inf-02" />
              </Tabs>
              {value === 0 && (
                <TabContainer>
                  <TextField
                    className={classes.formControl}
                    id="inf-03"
                    label="Name"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    name="name"
                    value={this.state.item.am.name}
                    placeholder="የቤተ ክርስቲያን ስም እዚህ ይፃፉ"
                    onChange={this.handleAmharicInput}
                    helperText="ለምሳሌ - የሲያትል ደብረ ሚካኤል የኢትዮጵያ ኦርቶዶክስ ተዋህዶ ቤተክርስቲያን"
                  />
                  <TextField
                    className={classes.formControl}
                    id="inf-04"
                    label="Denomination"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    name="denomination"
                    value={this.state.item.am.denomination}
                    placeholder="የቤተክርስቲያን ቤተ እምነትን እዚህ ይፃፉ"
                    onChange={this.handleAmharicInput}
                    helperText="ለምሳሌ - የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተክርስትያን"
                  />
                  <TextField
                    className={classes.formControl}
                    id="inf-05"
                    label="Bible verse"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    name="verse"
                    value={this.state.item.am.bible.verse}
                    placeholder="ዋና የመጽሐፍ ቅዱስ ጥቅስ እዚህ ይፃፉ"
                    onChange={this.handleAmharicBibleInput}
                    helperText="ለምሳሌ - ሁለት ወይም ሦስት በስሜ በሚሰበሰቡበት በዚያ በመካከላቸው እሆናለሁ"
                  />
                  <TextField
                    className={classes.formControl}
                    id="inf-06"
                    label="Source"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    name="from"
                    value={this.state.item.am.bible.from}
                    placeholder="ምንጩን እዚህ ይፃፉ"
                    onChange={this.handleAmharicBibleInput}
                    helperText="ለምሳሌ - ማቴዎስ 18:20"
                  />
                </TabContainer>
              )}
              {value === 1 && (
                <TabContainer>
                  <TextField
                    className={classes.formControl}
                    id="inf-07"
                    label="Name"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    name="name"
                    value={this.state.item.en.name}
                    placeholder="Enter church name"
                    onChange={this.handleEnglishInput}
                    helperText="e.g. Seattle Debre Mihret St.Michael Ethiopian Orthodox Tewahedo Church"
                  />
                  <TextField
                    className={classes.formControl}
                    id="inf-08"
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
                    id="inf-09"
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
                    id="inf-10"
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

              <CardContent>
                <TextField
                  className={classes.formControl}
                  id="inf-11"
                  label="Phone"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  name="phone"
                  value={this.state.item.phone}
                  placeholder="Enter phone"
                  onChange={this.handleItemInput}
                />

                <TextField
                  className={classes.formControl}
                  id="inf-12"
                  label="Email"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  name="email"
                  value={this.state.item.email}
                  placeholder="Enter email"
                  onChange={this.handleItemInput}
                />

                <TextField
                  className={classes.formControl}
                  id="inf-13"
                  label="Street"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  name="street"
                  value={this.state.item.address.street}
                  placeholder="Enter street"
                  onChange={this.handleAddressInput}
                />

                <TextField
                  className={classes.formControl}
                  id="inf-14"
                  label="City"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  name="city"
                  value={this.state.item.address.city}
                  placeholder="Enter city"
                  onChange={this.handleAddressInput}
                />

                <TextField
                  className={classes.formControl}
                  id="inf-15"
                  label="State"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  name="state"
                  value={this.state.item.address.state}
                  placeholder="Enter state"
                  onChange={this.handleAddressInput}
                />

                <TextField
                  className={classes.formControl}
                  id="inf-16"
                  label="Zip"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  name="zip"
                  value={this.state.item.address.zip}
                  placeholder="Enter zip"
                  onChange={this.handleAddressInput}
                />

                <TextField
                  className={classes.formControl}
                  id="inf-17"
                  label="Country"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  name="country"
                  value={this.state.item.address.country}
                  placeholder="Enter country"
                  onChange={this.handleAddressInput}
                />
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={this.handleFormClear}
                  id="inf-18"
                >
                  Clear
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.handleFormUpdate}
                  id="inf-18"
                >
                  Submit
                </Button>
              </CardActions>
              <CardContent>
                <Typography color="error" id="inf-19">
                  {this.state.error.name !== '' &&
                    `Name: ${this.state.error.name} Message: ${this.state.error.message}`}
                </Typography>
              </CardContent>
            </form>

            <CardContent>
              <Typography variant="headline" component="h2">
                Information
              </Typography>
              <Typography paragraph>
                Only the first record will be shown in the website. Other records can be added. To
                edit exiting record click the Edit button.
              </Typography>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Created on</TableCell>
                    <TableCell>By</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell />
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.items.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell component="th" scope="row">
                        {moment(item.date).format(dateFormat)}
                      </TableCell>
                      <TableCell>{item.adminname}</TableCell>
                      <TableCell>
                        <div onClick={() => this.handleEdit(item)}>{item.am.name}</div>
                      </TableCell>
                      <TableCell>
                        {
                          <Button
                            variant="contained"
                            className={classes.button}
                            aria-label="Edit"
                            onClick={() => this.handleEdit(item)}
                          >
                            <Edit />
                          </Button>
                        }
                      </TableCell>
                      <TableCell>
                        {
                          <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            aria-label="Delete"
                            onClick={() => this.handleDelete(item._id)}
                          >
                            <Delete />
                          </Button>
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withRoot(withStyles(styles, { withTheme: true })(InformationForm));
