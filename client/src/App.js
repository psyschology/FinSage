// App.js

import React from 'react';
import './App.css'; // Import your CSS file for styling

import LineChart from './components/LineChart'; // Adjust the path as per your project structure

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Financial Analytics Dashboard</h1>
      </header>
      <main className="App-main">
        <section className="chart-section">
          <h2>Financial Performance</h2>
          <LineChart />
        </section>
        {/* Other components or content */}
      </main>
      <footer className="App-footer">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
