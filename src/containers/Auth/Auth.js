import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import {updateObject, checkValidity} from '../../shared/utility';

const auth = props => {

   const[authForm, setAuthForm] = useState({
           email: {
               elementType: 'input',
               elementConfig: {
                   type: 'email',
                   placeholder: 'Your Email',
               },
               value: '',
               validation: {
                   required: true,
                   isEmail: true
               },
               valid: false,
               touched: false
           },
           password: {
               elementType: 'input',
               elementConfig: {
                   type: 'password',
                   placeholder: 'Password',
               },
               value: '',
               validation: {
                   required: true,
                   minLength: 6
               },
               valid: false,
               touched: false
           }
       }
   );
   const [isSignUp, setIsSignUp] = useState(true);

   useEffect(() => {
       if(!props.buildingBurger && props.authRedirectPath !== '/') {
           props.onSetAuthRedirectPath();
       }
   }, [])

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(authForm, {
            [controlName]: updateObject(authForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[controlName].validation),
                touched: true
            })
        });
        setAuthForm(updatedControls);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(authForm.email.value, authForm.password.value, isSignUp);
    };

    const switchAuthModeHandler = () => {
        setIsSignUp(!isSignUp);
    };

    const formElementArray = [];
    for (let key in authForm) {
        formElementArray.push({
            id: key,
            config: authForm[key]
        });
    }
    let form = formElementArray.map(element => (
        <Input key = {element.id}
               elementType = {element.config.elementType}
               elementConfig = {element.config.elementConfig}
               value={element.config.value}
               invalid={!element.config.valid}
               shouldValidate = {element.config.validation}
               touched={element.config.touched}
               changed={(event) => inputChangedHandler(event, element.id)}
        />
    ));
    if(props.loading) {
        form = <Spinner/>
    }
    let errorMsg = null;
    if(props.error) {
        errorMsg = (
            <p>{props.error.message}</p>
        );
    }
    let authRedirect = null
    if (props.isAuthenticated) {
        authRedirect = <Redirect to ={props.authRedirectPath}/>
    }
    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMsg}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">Submit</Button>
            </form>
            <Button
                clicked={switchAuthModeHandler}
                btnType="Danger">SWITCH TO {isSignUp ? 'SIGNIN' : 'SIGNUP'}
            </Button>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch (actions.setAuthRedirectPath('/'))
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (auth);
