import '../styles/animation.css';

const Alert = ({ type }: { type: string }) => {
   return (
      <div className={`container showup rounded p-5 mb-3 flex justify-center items-center ${type === 'success' ? 'bg-lime-700' : type === 'danger' ? 'bg-yellow-600' : 'bg-red-600'} `} >
         <div className="text-white text-lg font-medium">
            {
               type === 'success' ? (
                  'Successfully Added'
               ) : type === 'danger' ? (
                  'Please Type In Something'
               ) : (
                  'Successfully Deleted'
               )
            }
         </div>
      </div>
   );
};

export default Alert;
