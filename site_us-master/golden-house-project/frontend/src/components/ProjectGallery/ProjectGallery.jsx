import React from 'react';
import './ProjectGallery.css';

const ProjectGallery = ({ gallery }) => {
    return (
        <div className="content-block gallery-block">
            {gallery.map((img, index) => (
                <div key={index} className="gallery-image" style={{ backgroundImage: `url(${img})` }}></div>
            ))}
        </div>
    );
};

export default ProjectGallery;