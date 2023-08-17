import { Bin, Pencil } from '../public/TodoSvg';
import { useState, useRef, useEffect } from 'react';
import Button from './Button';

interface Props {
   todoName: string;
   finishOrNot: boolean;
   date: string;
   Delete: () => void;
   change: (newChange: string) => boolean;
   changeFinishOrNot: (situation: boolean) => void;
}

const TodoItem = ({ todoName, finishOrNot, date, Delete, change, changeFinishOrNot }: Props) => {
   const [isFinished, setFinishOrNot] = useState(finishOrNot);
   const [isChanged, setIsChanged] = useState(false);
   const [existingName, setExistingName] = useState(todoName);
   const inputRef = useRef<HTMLInputElement | null>(null);

   useEffect(() => {
      inputRef.current?.focus();
   });

   const edit = () => {
      setIsChanged(true);
   };

   const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFinishOrNot(e.target.checked);
      changeFinishOrNot(e.target.checked);


   };

   const changeName = async () => {
      try {
         const promise = new Promise<boolean>((resolve) => {
            try {
               if (change(existingName)) {
                  resolve(true);
               } else {
                  resolve(false);
               }

            } catch (error) {
               console.error(error);
               resolve(false);
            }
         });

         const success = await promise;

         if (success) {
            setIsChanged(false);
         } else {
            setIsChanged(true);
         };
         
      } catch (error) {
         console.error(error);
      }
   };

   const doubleClickHandler = () => {
      if (!isFinished) {
         setIsChanged(true);
      }
   }

   return (
      <div className={`render p-3 mb-4 rounded ${isFinished ? 'bg-teal-200' : 'bg-teal-300'} flex justify-center items-center`}>
         <div className='container flex justify-start items-center basis-11/12'>
            {!isChanged &&
               <div className="m-4 flex justify-start items-center">
                  <input
                     type='checkbox'
                     className="w-5 h-5 cursor-pointer"
                     checked={isFinished}
                     onChange={handleChecked} // Update the state on checkbox change
                  />
               </div>
            }

            {!isChanged &&
               <div onDoubleClick={doubleClickHandler} className="container flex flex-col justify-center items-start">
                  <div className={`text-black text-3xl font-mono flex justify-start items-center text-start mb-2 ${isFinished ? 'line-through' : ''}`}>
                     {todoName}
                  </div>

                  <div className={`text-slate-800 text-sm flex justify-start items-center text-start ${isFinished ? 'line-through' : ''}`} style={{ color: 'rgb(100, 100, 100)', flex: 1 }}>
                     {date}
                  </div>
               </div>
            }

            {isChanged &&
               <>
                  <div className='container flex flex-1 flex-row justify-center items-center'>
                     <input type='text' className='flex-1 p-4 text-black text-xl mx-3 my-2 outline-none rounded' ref={inputRef} value={existingName} onChange={(e) => setExistingName(e.target.value)}></input>
                  </div>
                  <Button innerText='Change' size='bg-gray-950 hover:bg-gray-900 rounded-lg p-3 text-white text-lg' click={changeName} />
               </>
            }
         </div>
   
         <div className='container flex flex-row justify-around items-center basis-1/12'>
            { !isChanged &&
               <div className="">
                  <Pencil finished={isFinished} edit={edit} />
               </div>
            }
   
            <div className="">
               <Bin onDelete={Delete} />
            </div>
         </div>
      </div>
   );
};

export default TodoItem;
