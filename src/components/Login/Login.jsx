import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import app from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [Error, setError] = useState(null);
  const [Success, setSuccess] = useState(null);
  const [ResetPass, setResetPass] = useState(null);
  const [ResetPasserror, setResetPasserror] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null);
  const auth = getAuth(app);

  const setNull = () => {
    setResetPass(null);
    setResetPasserror(null);
    setError(null);
    setSuccess(null);
  };

  const handelResetPass = () => {
    setNull();
    const email = emailRef.current.value;
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setResetPass(
          "Your password reset request was successful! (Please check your email account.)"
        );
        alert(ResetPass);
        console.log(email);
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        setResetPasserror(errorMessage.slice(8));
        // ..
      });
  };

  const handelLogin = (e) => {
    e.preventDefault();
    setNull();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setSuccess("User Login Successfully.");
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // const e = errorMessage.slice(9,);
        setError("Wring email or password.");
      });
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handelLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                ref={emailRef}
                placeholder="email"
                className="input input-bordered"
                required
                name="email"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                {" "}
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  className="input input-bordered w-full "
                  required
                />
                <span
                  className="absolute right-2 top-1/3 text-lg"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </div>

              <label onClick={handelResetPass} className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            <div>
              <label className="label">
                {Error && <p className="text-red-600">{Error}</p>}
                {Success && <p className="text-green-500">{Success}</p>}
                {ResetPass && <p className="text-green-500">{ResetPass}</p>}
                {ResetPasserror && (
                  <p className="text-green-500">{ResetPasserror}</p>
                )}
              </label>
            </div>
            <p>
              New to this website!{" "}
              <Link className="text-blue-700" to="/signUp">
                Please Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
