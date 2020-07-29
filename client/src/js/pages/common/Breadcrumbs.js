import React from 'react';
import { Link } from 'react-router-dom';
import '../../../sass/components/Breadcrumbs.scss';

function Breadcrumbs(props) {
  return(
    <div className="breadcrumbs">
      <div className="l-container">
        <ul className="flex">
          <li className="breadcrumbs-item">
            <Link to="/">HOME</Link>
          </li>
          <li className="breadcrumbs-item">{props.title}</li>
        </ul>
      </div>
    </div>
  )
}

export default Breadcrumbs;
