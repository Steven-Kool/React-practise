import { Link } from "react-router-dom";

interface Props {
   imgUrl?: string;
   category?: string;
   productName?: string;
   description?: string;
   loading: boolean;
}

const Slide = ({ imgUrl, category, productName, description, loading }: Props) => {
   return (
      <div className={`relative w-full h-full flex ${!loading ? 'justify-end' : 'justify-center'} items-center`} style={{backgroundColor: 'rgb(50, 50, 40)'}}>
         {!loading ? (
            <>
               <div className="image-info-holder">
                  <div className="category-holder"># {category}</div>
                  <div className="productname-holder">{productName}</div>
                  <div className="description-holder">{description}</div>
                  <div className="button-holder">
                  <Link to={`/product-website/${productName}`} className="text-decoration-none">
                     <button className="w-12 h-10 border-none rounded-lg background-white"></button>
                  </Link>
                  </div>
               </div>
               
               <div className="img-holder">
                  <img src={imgUrl} />
                  <div className="image-cover"></div>
               </div>
            </>
         ) : (
            <div>
               <img src='/src/public/22.gif' />
            </div>
         )}
      </div>
   )
};

export default Slide;
