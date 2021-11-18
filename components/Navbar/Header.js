import React from 'react';
import Styles from './Header.module.scss';

export default function Navbar() {
  return (
    <header className={Styles.header}>
      <div className={Styles.logo}>
        <h1>Friend Lists</h1>
      </div>
      <div>Logout</div>
    </header>
  );
}
