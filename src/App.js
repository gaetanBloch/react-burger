import React, { Component } from 'react';

import styles from './App.modules.css';
import Layout from './components/Layout/Layout';

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Layout>
          <p>Test</p>
        </Layout>
      </div>
    )
  }
}

export default App;
