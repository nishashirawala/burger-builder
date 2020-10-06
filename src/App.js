import React, { useEffect, Suspense } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from "./containers/Auth/Logout/Logout";
import * as Actions from './store/actions/index';

const Checkout = React.lazy(()=>{
    return import('./containers/Checkout/Checkout')
});
const Orders = React.lazy(()=>{
    return import('./containers/Orders/Orders')
});
const Auth = React.lazy(()=>{
    return import('./containers/Auth/Auth')
});

const app = props => {

    const effect = useEffect(() => {
        props.onTryAutoSignUp();
    }, []);

    let routes = (
        <switch>
            <Route path="/auth" render={(props) => <Auth {...props}/>}/>
            <Route path="/" exact component={BurgerBuilder}/>
            <Redirect to="/"/>
        </switch>
    );
    if (props.isAuthenticated) {
        routes = (
            <switch>
                <Route path="/checkout" render={(props) => <Checkout {...props}/>}/>
                <Route path="/orders" render={(props) => <Orders {...props}/>}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/auth" render={(props) => <Auth {...props}/>}/>
                <Route path="/" exact component={BurgerBuilder}/>
                <Redirect to="/"/>
            </switch>
        );
    }
    return (
      <div>
        <Layout>
            <Suspense fallback={<p>Loading...</p>}>
                {routes}
            </Suspense>
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
