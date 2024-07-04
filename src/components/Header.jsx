import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import { useAuthContext } from "../App";
import { supabase } from "@/main";

function getLinkStyle({ isActive }) {
  return {
    textDecoration: isActive ? "underline" : "none",
  };
}

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();

  const onLogout = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        alert(error.message);
      } else {
        setUser(null);
        navigate("/login");
      }
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error.message);
      alert(error.message);
    }
  };

  return (
    <header>
      <nav className="navigator">
        <div className="navigator-components">
          <li>
            <NavLink style={getLinkStyle} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink style={getLinkStyle} to="/todolist">
              TodoList
            </NavLink>
          </li>
        </div>
        <div className="navigator-components">
          {user ? (
            <>
              <li>안녕하세요, {user.email}님</li>
              <li>
                <button onClick={onLogout}>로그아웃</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink style={getLinkStyle} to="/login">
                  로그인
                </NavLink>
              </li>
              <li>
                <NavLink style={getLinkStyle} to="/signup">
                  회원가입
                </NavLink>
              </li>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
