import "/src/styles/tailwind.css";
import MainPage from "./Pages/MainPage.tsx";
import Todo from "./Pages/Todo/Todo.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductWebsite from "./Pages/ProductWebsite/Main.tsx";
import Product from "./Pages/ProductWebsite/Product.tsx";

const App = () => {
   return (
      <Router>
         <Routes>
         <Route path="/">
            <Route index element={<MainPage />} />
            <Route path="todo-list" element={<Todo description="Todo List" />} />
            <Route path="product-website" element={<ProductWebsite />}>
               <Route path=":productname" element={<Product />}></Route> 
            </Route>
         </Route>
         </Routes>
      </Router>
   );
};

export default App;
