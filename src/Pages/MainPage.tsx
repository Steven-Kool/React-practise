import Card from "../components/Card.tsx";

const MainPage = () => {
   const items: { 
      headerContent: string, 
      color: string, 
      bodyContent: string, 
      destination: string 
   }[] = [
      { 
         headerContent: 'Todo List', 
         color: 'bg-red-600', 
         bodyContent: 'A User can add todo lists and it also provide editable and removable. Additionally, user can sort the todo list out which are not finished yet or which are already done', 
         destination: '/todo-list' 
      },
      { 
         headerContent: 'Product Website', 
         color: 'bg-green-500', 
         bodyContent: 'Simple Product website. A user can add to cart and remove.', 
         destination: '/product-website' 
      },
   ];   

   return (
      <div className="flex flex-col justify-center items-center">
         <div className="text-5xl text-red-900 font-semibold my-7">My React Collection</div>

         <div className="px-5 grid grid-cols-3 gap-6">
            { items.map((item, index) => (
               <Card key={index} headerContent={item.headerContent} headerBg={item.color} bodyContent={item.bodyContent} destination={item.destination} />
            )) }
         </div>
      </div>
   );
};

export default MainPage;
