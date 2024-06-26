import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useToggle from "../hooks/useToggle";
import styles from "./Signup.module.css";
import { useAuthContext } from "../App";
import { supabase } from "@/main";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [showPassword, toggleShowPassword] = useToggle(false);
  const [signupError, setSignupError] = useState("");
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();

  const password = watch("password");

  const onSubmit = async (formData, e) => {
    e.preventDefault(); // 폼 기본 동작 방지

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
      console.log("signup: ", { data, error });
      if (error) {
        setSignupError(error.message);
      } else {
        setUser(data);
        navigate("/");
      }
    } catch (error) {
      console.error("회원 가입 중 오류 발생:", error.message);
      setSignupError(error.message);
    } finally {
      console.log(formData);
    }
  };

  console.log(user);

  return (
    <div>
      <h2>가입</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>이메일:</label>
          <input
            type="text"
            {...register("email", {
              required: "이메일을 입력해주세요.",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "올바른 이메일 형식이 아닙니다.",
              },
              minLength: {
                value: 6,
                message: "이메일은 최소 6자 이상이어야 합니다.",
              },
            })}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>
        <div>
          <label>비밀번호:</label>
          <div>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
                minLength: {
                  value: 8,
                  message: "비밀번호는 최소 8자 이상이어야 합니다.",
                },
              })}
            />
          </div>
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>
        <div>
          <label>비밀번호 확인:</label>
          <div>
            <input
              type={showPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "비밀번호를 다시 입력해주세요.",
                validate: (value) =>
                  value === password || "비밀번호가 동일하지 않습니다.",
              })}
            />
            <button type="button" onClick={toggleShowPassword}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword.message}</p>
          )}
        </div>
        {signupError && <p className={styles.error}>{signupError}</p>}
        <button type="submit">가입</button>
      </form>
    </div>
  );
};

export default Signup;
