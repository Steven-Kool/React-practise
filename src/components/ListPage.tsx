import { ReactNode } from "react";

interface Props {
   title: string;
   children: ReactNode
}

const ListPage = ({title, children}: Props) => {
   return (
      <div className='h-screen w-full flex flex-col justify-start items-center'>
         <div className='py-10 text-4xl text-center font-semibold'>
            {title}
         </div>

         {children}
      </div>
   )
};

export default ListPage;
