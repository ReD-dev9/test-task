import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import client from './services';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </StrictMode>,
);
