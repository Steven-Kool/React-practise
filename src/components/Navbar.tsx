import { useEffect, useState } from "react";
import { Search } from "../public/TodoSvg";
import Button from "./Button";

const Navbar = ({ scroll }: { scroll: number }) => {
   const [dataArray, setDataArray] = useState([]);
   const [filterLoading, setFilterLoading] = useState(true);

   useEffect(() => {
      fetch('https://world.openfoodfacts.org?page_size=2000&json=true')
         .then(response => response.json())
         .then(data => {
            setDataArray(data.products)
            setFilterLoading(false);
         })
         .catch(error => {
            console.error(error);
            setFilterLoading(false);
         });
   }, []);

   const handleFilter = () => {
      return console.log('hi');
   };

   return (
      <div className={`w-screen transition duration-300 ease-in-out fixed h-20 top-0 pr-7 flex flex-row justify-between items-center z-10`} style={scroll === 0 ? {backgroundColor: 'rgba(32, 32, 32, 0)'} : {backgroundColor: 'rgba(32, 32, 32, 0.5)'}}>
         <div className="flex-1 flex flex-row justify-around items-center">
            <div className="basis-1/3 flex justify-center items-center text-emerald-500 text-4xl font-sans text-extrabold">
               Foodee
            </div>

            <div className="relative basis-2/3 flex flex-row justify-center items-center mr-10">
               <input type="text" className="flex-1 p-3 pr-28 focus:shadow-inset rounded-sm text-black text-xl font-medium placeholder:text-slate-500 outline-0 placeholder:text-xl"
                  placeholder="Search Items here..." />
               <Search />
               <Button innerText="Filter" click={handleFilter} size="absolute bg-zinc-700 hover:bg-zinc-600 rounded tracking-widest p-2 text-sm text-white right-3" />
            </div>
         </div>

         <div className="basis-1/6 flex flex-row justify-center items-center">
            <div className="flex justify-center items-center">
               User
            </div>
         </div>
      </div>
   );
};

export default Navbar;
