import "/src/styles/tailwind.css";
import MainPage from './Pages/MainPage.tsx';
import Todo from './Pages/Todo.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductWebsite from "./Pages/ProductWebsite/Main.tsx";

const App = () => {
   return (
      <Router>
         <Routes>
            <Route path='/'>
               <Route index element={<MainPage />} />
               <Route path='todo-list' element={<Todo description='Todo List' />} />
               <Route path='product-website' element={<ProductWebsite />} />
            </Route>
         </Routes>
      </Router>
   );
};

export default App;
