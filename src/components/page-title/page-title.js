import React from 'react';
import PropTypes from 'prop-types';
import './page-title.css';


const PageTitle = ({title}) => {
    return (
        <h1 className="page-title">{title}</h1>
    );
};

PageTitle.propTypes = {
    title: PropTypes.string.isRequired,
};

export default PageTitle;
