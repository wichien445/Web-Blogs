import { BrowserRouter , Routes, Route } from "react-router-dom";
import App from "./App";
import FormComnent from "./components/FormComnent";
import SingleComponent from "./components/SingleComponent";
import EditComponent from "./components/EditComponent";
import LoginComponent from "./components/LoginComponent";

function MyRoute() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" exact Component={App}/>
            <Route path="/create" exact Component={FormComnent}/>
            <Route path="/blog/:slug" exact Component={SingleComponent}/>
            <Route path="/blog/edit/:slug" exact Component={EditComponent}/>
            <Route path="/login" exact Component={LoginComponent}/>
        </Routes>
    </BrowserRouter>
  )
}

export default MyRoute