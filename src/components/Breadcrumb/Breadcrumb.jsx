import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumb.css';

const Breadcrumb = ({ items }) => {
  return (
    <div className="breadcumb">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <svg className="breadcumb-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_2_19729)">
                <path d="M24 0H0V24H24V0Z" fill="white" fillOpacity="0.01"/>
                <path d="M9.5 6L15.5 12L9.5 18" stroke="#333333" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_2_19729">
                  <rect width="24" height="24" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          )}
          {item.path ? (
            <Link to={item.path}>{item.label}</Link>
          ) : (
            <span className="breadcumb-current">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb; 