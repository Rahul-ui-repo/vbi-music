import React from 'react';
import './_spinner.scss';

const Spinner = ({ showSpinner }) => {
    return (
        <div style={{ display: showSpinner ? "block" : "none" }}>
            <div className="spinner-section">
                <div className="spinner-border spinner"></div>
            </div>
        </div>
    )
}

export default Spinner;