import React from 'react';
import axios from "axios";
import { Store } from "redux";
import { connect } from "react-redux";
import qs from "qs";
import { AppState } from "./Store";
import { login as loginAction } from "./state/Auth";
import Main from "./components/Main";
import './styles/App.css';

interface Props {
  store: Store<AppState>;
  loggedIn: boolean;
  login: typeof loginAction;
}

const App:React.FunctionComponent<Props> = (props: Props) => {
  let urlParams = qs.parse(window.location.search.slice(1)); //the string includes the leading ?, remove

  console.log(urlParams);
  if(props.loggedIn) {
    return (
      <div className="App">
        <Main />
      </div>
    );
  } else if(!!urlParams.token){
    props.login();
    return <div>Completing authentication...</div>
  } else {
      const query = qs.stringify({
        client_id: "makeropsdev",
        redirect_uri: "http://localhost:3080/api/login",
        scope: "contacts_me"
      });
      console.log(query);
      window.location.href = 
        `https://makersmiths.org/sys/login/OAuthLogin?${query}`;
      return <div>Loading login...</div>
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    loggedIn: state.auth.loggedIn
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    login: () => dispatch(loginAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

