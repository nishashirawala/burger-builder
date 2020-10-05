import React, { Component, useEffect } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from "./containers/Auth/Logout/Logout";
import * as Actions from './store/actions/index';

const asyncCheckout = asyncComponent(()=>{
    return import('./containers/Checkout/Checkout')
});
const asyncOrders = asyncComponent(()=>{
    return import('./containers/Orders/Orders')
});
const asyncAuth = asyncComponent(()=>{
    return import('./containers/Auth/Auth')
});

const app = props => {

    const effect = useEffect(() => {
        props.onTryAutoSignUp();
    }, []);

    let routes = (
        <switch>
            <Route path="/auth" component={asyncAuth}/>
            <Route path="/" exact component={BurgerBuilder}/>
            <Redirect to="/"/>
        </switch>
    );
    if (props.isAuthenticated) {
        routes = (
            <switch>
                <Route path="/checkout" component={asyncCheckout}/>
                <Route path="/orders" component={asyncOrders}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/auth" component={asyncAuth}/>
                <Route path="/" exact component={BurgerBuilder}/>
                <Redirect to="/"/>
            </switch>
        );
    }
    return (
      <div>
        <Layout>
            {routes}
        </Layout>
      </div>
    );

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(Actions.authCheckState())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
