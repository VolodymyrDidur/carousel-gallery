import React from 'react';

export const Gallery: React.FC<{ items: any[] }> = ({ items }) => {
  return (
    <div className="gallery">
      {items.map((item, index) => (
        <div key={index} className="gallery-item">
          <img src={item.src} alt={`Item ${index + 1}`} />
          <h3>{item.title}</h3>
        </div>
      ))}
    </div>
  );
};
