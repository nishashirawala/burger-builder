import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalcode:''
        }
    }

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact information</h4>
                <form>
                    <input type="text" name="name" placeholder="your name"/>
                    <input type="email" name="email" placeholder="your email"/>
                    <input type="text" name="street" placeholder="street"/>
                    <input type="text" name="postal code" placeholder="your postal code"/>
                    <Button btnType="Success">ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;
