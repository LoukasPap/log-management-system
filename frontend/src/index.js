// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import customTheme from './customTheme';
import { ChakraProvider } from '@chakra-ui/react';


ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
