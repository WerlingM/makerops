import React from 'react';
import { Store } from "redux";
import { connect } from "react-redux";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { AppState } from "./Store";
import { login as loginAction } from "./state/Auth";
import './styles/App.css';

interface Props {
  store: Store<AppState>;
  loggedIn: boolean;
  login: typeof loginAction;
}

const App:React.FunctionComponent<Props> = (props: Props) => {
  const [tools, setTools] = React.useState<any[]>([]);

  const client = new ApolloClient({
    uri: "/api/graphql",
    cache: new InMemoryCache()
  });

  React.useEffect( () => {
    console.log("Getting all tools");
    client.query({
      query: gql`
        query tools {
          tools { name brand}
        }`
    }).then((result) => {
      console.log("Response from API", result);
      setTools(result.data.tools);
    })
  }, []);

  return (
    <div className="App">
      Some Tools
      <header className="App-header">
        {tools.map((tool) => (<div key={tool.name}>{tool.name}</div>))}
      </header>
    </div>
  );
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

