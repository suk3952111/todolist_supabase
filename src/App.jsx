import { createContext, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ToDoList from "./pages/ToDoList";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";
import useAuth from "@/hooks/useAuth";

const AuthContext = createContext(null);

export const useAuthContext = () => useContext(AuthContext);

function App() {
  const { user, setUser } = useAuth();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/todolist" element={<ToDoList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
