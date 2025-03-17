import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// import './App.css'

import { store } from "./store/store.js"
import { Home } from './pages/Home.jsx';
import { AppHeader } from './cmps/AppHeader.jsx';
import { About } from './pages/About.jsx';
import { AboutVision } from './cmps/AboutVision.jsx';
import { AboutTeam } from './cmps/AboutTeam.jsx';
import { ToyIndex } from './pages/ToyIndex.jsx';
import { ToyDetails } from './pages/ToyDetails.jsx';

function App() {

  return (
    <Provider store={store}>
      <Router>
        <section className="app main-layout">
          <AppHeader />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />}>
                <Route path="team" element={<AboutTeam />} />
                <Route path="vision" element={<AboutVision />} />
              </Route>
              <Route path="/toy/:toyId" element={<ToyDetails />} />
              {/* // <Route path="/toy/edit/:toyId" element={<TodoEdit />} /> */}
              {/* // <Route path="/toy/edit" element={<TodoEdit />} /> */}
              <Route path="/toy" element={<ToyIndex />} />
              {/* // <Route path="/dashboard" element={<Dashboard />} />  */}

              {/* <Route path="/user/:userId" element={<UserDetails />} /> */}

            </Routes>
          </main>
        </section>
      </Router>
      {/* <UserMsg /> */}
    </Provider>
  )
}

export default App
