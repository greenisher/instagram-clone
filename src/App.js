import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Post from './components/Post';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";


const client = new ApolloClient({
  uri : "http://localhost:4000"
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header />
        <section className="App-main">
          <Post />
        </section>
      </div>
    </ApolloProvider>
  );
};
export default App;