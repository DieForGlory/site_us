import React from 'react';
import './ProjectMap.css';

const ProjectMap = ({ address }) => {
    return (
        <div className="content-block map-block">
            <div className="map-placeholder">
                <p>Здесь будет интерактивная карта</p>
                <p><strong>Адрес:</strong> {address}</p>
            </div>
        </div>
    );
};

export default ProjectMap;