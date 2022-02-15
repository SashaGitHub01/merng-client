import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client'
import { client } from './apollo/index'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/auth'

ReactDOM.render(
   <BrowserRouter>
      <AuthProvider>
         <ApolloProvider client={client}>
            <App />
         </ApolloProvider>
      </AuthProvider>
   </BrowserRouter>,
   document.getElementById('root')
);

reportWebVitals();
