interface Props {
   imgUrl?: string;
   productName?: string;
}

const Slide = ({ imgUrl, productName }: Props) => {
   return (
      <div className="slide">
         <div className="image-info-holder">
            {productName}
         </div>
         
         <div className="img-holder">
            <img src={imgUrl} />
            <div className="image-cover"></div>
         </div>
      </div>
   )
};

export default Slide;
