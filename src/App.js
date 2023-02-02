import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import BalanceRequest from "./pages/BalanceRequest";
import CategoryList from "./pages/category/CategoryList";
import DetailsCategory from "./pages/category/DetailsCategory";
import FormCategory from "./pages/category/FormCategory";
import Home from './pages/Home' ;
import Layout from './pages/Layout' ;
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Login /> } /> 
        <Route path="login" element={ <Login /> } /> 
        <Route path="login/:id" element={ <Login /> } /> 
        <Route path="/" element={ <Layout /> } >
          <Route path="home" element={ <Home /> } />
          <Route path="categories" element={<CategoryList />} />
          <Route path="create-categories" element={<FormCategory />} />
          <Route path="category/:id" element={<DetailsCategory />} />
          <Route path="balance-requests" element={<BalanceRequest />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
