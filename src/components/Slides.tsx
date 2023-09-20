import { Link } from "react-router-dom";

interface Props {
   imgUrl?: string;
   category?: string;
   productName?: string;
   description?: string;
   clickOrNot: () => void;
}

const Slide = ({ imgUrl, category, productName, description, clickOrNot }: Props) => {
   return (
      <div className='relative w-full h-full flex flex-row justify-end items-center' style={{backgroundColor: 'rgb(50, 50, 40)'}} onClick={clickOrNot}>
         <div className="absolute left-0 h-full w-1/2 bg-transparent text-slate-200 flex flex-col justify-end items-start z-20" style={{padding: '10px 0 40px 30px'}}>
            <div className="text-2xl font-medium mb-2.5" style={{fontFamily: 'Inconsolata, monospace', color:' rgb(238, 165, 30)'}}># {category}</div>
            <div className="text-4xl font-semibold mb-8" style={{fontFamily: 'Poppins, sans-serif'}}>{productName}</div>
            <div className="text-xl font-medium mb-5" style={{fontFamily: 'Arial, Helvetica, sans-serif', color: 'rgb(255, 94, 120)'}}>{description}</div>
            <div className="button-holder">
            <Link to={`/product-website/${productName}`} className="text-decoration-none">
               <button className="w-12 h-10 border-0 rounded-lg bg-white"></button>
            </Link>
            </div>
         </div>
         
         <div className="mr-0 relative w-3/5 h-full flex justify-center bg-white">
            <img src={imgUrl} className="w-auto h-full" />
            <div className="absolute w-full h-full z-10" style={{background: "linear-gradient(to right, rgba(50, 50, 40, 1), rgba(50, 50, 40, 0.1), rgba(50, 50, 40, 0.1))"}}></div>
         </div>
      </div>
   )
};

export default Slide;
