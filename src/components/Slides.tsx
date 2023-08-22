interface Props {
   imgUrl: string;
   productName: string;
}

const Slide = ({ imgUrl, productName }: Props) => {
   return (
      <div className="w-full h-auto relative">
         <img className="w-auto h-auto" src={imgUrl}></img>
         <div className="absolute text-3xl text-black">
            {productName}
         </div>
      </div>
   )
};

export default Slide;
