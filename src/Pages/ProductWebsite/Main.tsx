import '/src/styles/productwebsite.css';
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import Slide from "../../components/Slides";

interface SlideData {
   category: string;
   description: string;
   image: string;
   title: string;
}

const ProductWebsite = () => {
   const [scrollY, setScrollY] = useState(0);
   const [slides, setSlides] = useState<SlideData[]>([]);
   const [slideLoading, setSlideLoading] = useState(true);

   useEffect(() => {
      const handleScroll = () => {
         setScrollY(window.scrollY);
      }

      window.addEventListener('scroll', handleScroll);

      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   useEffect(() => {
      if (slides) {
         setSlideLoading(false);
      } else {
         setSlideLoading(true);
      }
   }, [slides]);

   useEffect(() => {
      fetch('https://fakestoreapi.com/products?limit=5')
         .then(response => response.json())
         .then(data => {
            console.log(data);
            setSlides(data);
         })
         .catch(error => {
            console.error(error);
         });
   }, []);

   return (
      <div className="main-holder">
         <Navbar scroll={scrollY} />

         <div className="slide-holder">
            <div className="slide-container">
               <div className='slide-flexing'>
                  {slides.map((slide, index) => (
                     <Slide
                        key={index}
                        imgUrl={slide.image}
                        category={slide.category}
                        productName={slide.title}
                        description={slide.description}
                        loading={slideLoading}
                     />
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProductWebsite;
