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
   const [loading, setSlideLoading] = useState(true);
   const [leftMargin, setLeftMargin] = useState(0);
   const [isClicked, setIsClicked] = useState(false);

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
            console.error('This is ' + error);
         });
   }, []);

   const clickOrNot = () => {
      setIsClicked(true);
   }

   useEffect(() => {
      const intervalId = setInterval(() => {
         if (!isClicked) {
            setLeftMargin(prevMargin => (prevMargin - 100 >= -400) ? prevMargin - 100 : 0)
         }
      }, 5000);

      return () => {
         clearInterval(intervalId);
      };
   }, [isClicked]);

   return (
      <div className="m-0" style={{padding: '100px 0 0 50px', backgroundColor: 'rgb(36, 36, 40)'}}>
         <Navbar scroll={scrollY} />

         <div className="w-full h-auto m-0 p-2.5 flex justify-center">
            <div className="m-0 p-0 border-0 rounded-2xl overflow-hidden" style={{width: '80%', height: '500px'}}>
               {loading ? (
                  <div className="w-full h-full flex justify-center items-center" style={{ backgroundColor: 'rgb(80, 80, 80)' }}>
                     <div>
                        <img src="/src/public/22.gif" className='w-full h-full z-10'/>
                     </div>
                  </div>
               ) : (
                  <div className='h-full flex flex-row' style={{width: '500%', marginLeft: `${leftMargin}%`, transition: 'margin-left 0.3s'}}>
                     {slides.map((slide, index) => (
                        <Slide
                           key={index}
                           imgUrl={slide.image}
                           category={slide.category}
                           productName={slide.title}
                           description={slide.description}
                           clickOrNot={clickOrNot}
                        />
                     ))} 
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default ProductWebsite;
