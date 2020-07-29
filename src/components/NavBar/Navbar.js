import React from 'react';
import './navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-sm navbar-light ">
      <a className="navbar-brand" href="/">
        <FontAwesomeIcon icon={faCameraRetro} size="lg" /> ImgProcessor
      </a>
      <button
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="/about">
              /About
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/contact">
              /Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
