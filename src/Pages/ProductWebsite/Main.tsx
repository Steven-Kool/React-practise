import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";

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
      fetch('https://world.openfoodfacts.org?page_size=10&json=true')
         .then(response => response.json())
         .then(data => {
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
         <Navbar scroll={scrollY}/>
      </div>
   );
};

export default ProductWebsite;
