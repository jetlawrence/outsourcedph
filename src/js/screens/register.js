import React from "react";
import moment from "moment";
import {User, Address} from "../model";
import Input from "../components/Input";
import CheckBox from "../components/CheckBox";
import Immutable from 'immutable';

const USER_FIELDS = Object.freeze({
  TITLE: 'title',
  FIRST_NAME: 'fname',
  LAST_NAME: 'lname', 
  ADDRESS: {
    STREET: 'street',
    TOWN: 'town',
    POSTCODE: 'postcode'
  },
  BIRTHDATE: 'birthdate'
});

export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: new User({
        address: new Address()
      }),
      forSubmit: false
    }
  }


  render() {
    let user = this.state.user;

    return (
      <div style={styles.screen}>
        <h1>Register</h1>

        <Input ref={USER_FIELDS.TITLE} style={styles.input} type='text' name='title' label='Title'
          value={user.get('title')} onChange={(val) => this.updateUserVal(USER_FIELDS.TITLE, val)} 
          onBlur={() => this.validateInput(USER_FIELDS.TITLE)} /><br/><br/>
        <Input ref={USER_FIELDS.FIRST_NAME} style={styles.input} type='text' name='fname' label='First Name' 
          value={user.get('fname')} onChange={(val) => this.updateUserVal(USER_FIELDS.FIRST_NAME, val)}
          onBlur={() => this.validateInput(USER_FIELDS.FIRST_NAME)} /><br/><br/>
        <Input ref={USER_FIELDS.LAST_NAME} style={styles.input} type='text' name='lname' label='Last name'
          value={user.get('lname')} onChange={(val) => this.updateUserVal(USER_FIELDS.LAST_NAME, val)}
          onBlur={() => this.validateInput(USER_FIELDS.LAST_NAME)} /><br/><br/>
        <Input ref={USER_FIELDS.ADDRESS.STREET} style={styles.input} type='text' name='street' label='Street'
          value={user.get('address').get('street')} onChange={(val) => this.updateUserVal(USER_FIELDS.ADDRESS.STREET, val)}
          onBlur={() => this.validateInput(USER_FIELDS.ADDRESS.STREET)} /><br/><br/>
        <Input ref={USER_FIELDS.ADDRESS.TOWN} style={styles.input} type='text' name='town' label='Town'
          value={user.get('address').get('town')} onChange={(val) => this.updateUserVal(USER_FIELDS.ADDRESS.TOWN, val)}
          onBlur={() => this.validateInput(USER_FIELDS.ADDRESS.TOWN)} /><br/><br/>
        <Input ref={USER_FIELDS.ADDRESS.POSTCODE} style={styles.input} type='text' name='postcode' label='Postcode'
          value={user.get('address').get('postcode')} onChange={(val) => this.updateUserVal(USER_FIELDS.ADDRESS.POSTCODE, val)}
          onBlur={() => this.validateInput(USER_FIELDS.ADDRESS.POSTCODE)} /><br/><br/>
        <Input ref={USER_FIELDS.BIRTHDATE} style={styles.input} type='date' name='birthdate' label='Birthdate'
          value={user.get('birthdate')} onChange={(val) => this.updateUserVal(USER_FIELDS.BIRTHDATE, val)}
          onBlur={() => this.validateInput(USER_FIELDS.BIRTHDATE)} /><br/><br/>
        
        <CheckBox ref="over18_checkbox" name="over18" label="I am 18 years old or over" 
          onChange={(checked) => this.setState({forSubmit: checked}, () => checked && this.validateInput(USER_FIELDS.BIRTHDATE))} /><br/><br/>
        <button disabled={!this.state.forSubmit} type="submit" onClick={()=>this.onSubmit()}>Submit</button>
      </div>
    );
  }

  updateUserVal(field, val) {
    var user;
    let addressFields = Object.keys(USER_FIELDS.ADDRESS).map(f => USER_FIELDS.ADDRESS[f]); //browser support is limited for Object.values func

    if(addressFields.includes(field)) {
      const address = this.state.user.address.set(field, val);
      user = this.state.user.set('address', address);
    } else {
      user = this.state.user.set(field, val);
    }

    this.setState({user: user});
  }

  onSubmit() {
    var isValid = true;

    for (var field in USER_FIELDS) {
      if (field != 'ADDRESS') {
        isValid = this.validateInput(USER_FIELDS[field]) && isValid;
      }
    }

    for (var field in USER_FIELDS.ADDRESS) {
      isValid = this.validateInput(USER_FIELDS.ADDRESS[field]) && isValid;
    }

    if (!isValid) {
      return false;
    }

    alert( "Success \n\n" +
      "Title: " + this.state.user.get('title') + '\n' +
      "First Name: " + this.state.user.get('fname') + '\n' +
      "Last Name: " + this.state.user.get('lname') + '\n' + 
      "Street: " + this.state.user.get('address').get('street') + '\n' +
      "Town: " + this.state.user.get('address').get('town') + '\n' +
      "Postcode: " + this.state.user.get('address').get('postcode') + '\n' +
      "Birthdate: " + this.state.user.get('birthdate')
    );

  }

  validateInput(field) {
    let inputVal = this.refs[field].getValue();

    if (inputVal == null || inputVal.trim().length == 0) {
      this.refs[field].setErrorLabel("Field can't be empty");
      return false;
    } else if (field == USER_FIELDS.BIRTHDATE) {
      if (this.refs.over18_checkbox.isChecked()) {
        const now = moment();
        const birthdate = moment(inputVal);
        const age = Math.floor(moment.duration(now - birthdate).as('years'));

        if (age < 18) {
          this.refs[field].setErrorLabel("Birthdate age is below 18");
          return false
        }
      }
    }

    this.refs[field].setErrorLabel(null);
    return true;
  }
}

const styles = {
  screen: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'sans-serif'  
  },
  input: {
    width: '300px',
    borderColor: 'red'
  }
}
