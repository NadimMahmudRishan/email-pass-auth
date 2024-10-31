import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../../firebase/firebase.config";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [errormessage, setErrormessage] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const auth = getAuth(app);
  const handelSignup = (e) => {
    e.preventDefault();
    setErrormessage(null);
    setSuccess(null);
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    if (password.length < 6) {
      setErrormessage(
        "Password should be at least 6 character (weak-password)."
      );
      return;
    } else if ((!/[A-Z]/.test(password)) || (!/[a-z]/.test(password))) {
      setErrormessage(
        "Password should be mix of Upper-case[A-Z] and Lower-case[a-z]."
      );
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setSuccess("Signup successfull");
      })
      .catch((error) => {
        const errorMessage = error.message;
        if (errorMessage.includes("email-already-in-use")) {
          setErrormessage(
            "This email already exist. (Please try with other email)"
          );
          return;
        }
        setErrormessage(errorMessage);
      });
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Signup now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handelSignup} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
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

              <label className="label">
                {errormessage && <p className="text-red-600">{errormessage}</p>}
                {success && <p className="text-green-400">{success}</p>}
              </label>
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
