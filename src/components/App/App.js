import React from 'react';

import NotificationList from '../NotificationList';
import { ServicesProvider } from '../ServicesContext';
import Services from '../../services';
import closeIcon from '../../assets/img/back-icon.svg';
import './App.css';

const App = () => {
  return (
    <ServicesProvider value={new Services()}>
      <header>
        <button className='btn-close'>
          <i className='btn-close__icon'>
            <img src={closeIcon} alt='profile' />
          </i>
        </button>
        <h1>Notifications</h1>
      </header>
      <main>
        <section className='notifications'>
          <NotificationList />
        </section>
      </main>
    </ServicesProvider >
  )
}

export default App;