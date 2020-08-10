import React from 'react';
import Header from './pages/common/Header';
import Footer from './pages/common/Footer';
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import Home from './pages/home';
import SinglePost from './pages/single-post';
import NewPost from './pages/new-post';
import { Provider } from 'react-redux';
import store from './redux/store';
import ScrollToTop from './utils/ScrollToTop';
import PageNotFound from './pages/404/PageNotFound';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql/'
});

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('authKey') || '';

  operation.setContext({
    headers: {
      authorization: token
    }
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop />
          <Header />
          <main className="l-index">
            <Switch>
              <Route path="/" exact component={Home} />
              <PrivateRoute path="/news/new" component={NewPost} />
              <Route path="/news/:id" component={SinglePost} />
              <Route path="*" render={() => <PageNotFound />} />
            </Switch>
          </main>
          <Footer />
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  );
}
