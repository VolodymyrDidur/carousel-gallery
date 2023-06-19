import React, { useCallback, useEffect } from 'react';
import { Carousel, Gallery, Toggle } from './components';

import './App.css';
import { IImage } from './domain';
import { useToggle } from './hooks';

function App() {
  const [toggler, toggle] = useToggle(false);

  const [carouselImages, setCarouselImages] = React.useState<IImage[]>([]);
  const [galleryImages, setGalleryImages] = React.useState<IImage[]>([]);

  const fetchImages = useCallback(async () => {
    const response = await fetch('http://localhost:4000/images');
    const images = await response.json();
    
    setCarouselImages(images.map((image: IImage) => image.url));
    setGalleryImages(images.map((image: IImage) => ({ src: image.url, title: image.title})));
  }, []);

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="App">
      <Toggle onToggle={toggle} />
      { toggler ? 
      <Carousel images={carouselImages} />
      :
      <Gallery items={galleryImages} />
      }
    </div>
  );
}

export default App;
