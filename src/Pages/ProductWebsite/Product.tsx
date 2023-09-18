import { useParams } from "react-router-dom"

const Product = () => {
   const { productname } = useParams();
   
   return (
      <div>Hello {productname}</div>
   )
}

export default Product;
