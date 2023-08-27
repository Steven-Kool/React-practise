import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import Slide from "../../components/Slides";

interface SlideData {
   title: string;
   price: number;
   description: string;
   category: string;
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
      fetch('https://jsonplaceholder.typicode.com/todos')
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
      <div className="w-full m-0 p-0" style={{height: '2000px'}}>
         <Navbar scroll={scrollY} />

         {!slideLoading ? (
            <div className="w-full h-auto mt-0 p-0">
            {slides.map((slide, index) => (
               <Slide
                  key={index}
                  imgUrl={slide.category}
                  productName={slide.title}
               />
            ))}
         </div>
         ) : (
            <div>Loading...</div>
         )}
      </div>
   );
};

export default ProductWebsite;
