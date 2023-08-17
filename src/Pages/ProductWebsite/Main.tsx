import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import Slide from "../../components/Slides";

const ProductWebsite = () => {
   const [scrollY, setScrollY] = useState(0);
   const [slides, setSlides] = useState([]);
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
      fetch('https://world.openfoodfacts.org?page_size=5&json=true')
         .then(response => response.json())
         .then(data => {
            console.log(data.products);
            setSlides(data.products);
            setSlideLoading(false);
         })
         .catch(error => {
            console.error(error);
            setSlideLoading(false);
         });
   }, []);

   return (
      <div className="w-full m-0 p-0" style={{height: '2000px'}}>
         <Navbar scroll={scrollY} />

         <div className="w-full h-auto mt-0 p-0">
            {slides.map((slide, index) => (
               <Slide
                  key={index}
                  imgUrl={slide.image_url}
                  productName={slide.product_name}
               />
            ))}
         </div>
      </div>
   );
};

export default ProductWebsite;
