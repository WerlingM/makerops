import React from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const Main:React.FunctionComponent = () => {
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

export default Main;