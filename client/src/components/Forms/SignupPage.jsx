import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Form.scss'
import useSignup from './../../hooks/useSignup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupPage = () => {
  let navigate = useNavigate();
  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    role: ""
  });
  let name, value;

  const handleinput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setFormData({ ...FormData, [name]: value });
  }

  const { signup, isLoading, error } = useSignup()

  useEffect(() => {
    if (error) {
      toast.error(error, toast_property());
    }
  }, [error]);

  const RegisterUser = async (e) => {
    e.preventDefault();
    console.log(FormData);

    const { name, email, username, password, role } = FormData;
    const response = await signup(name, email, username, password, role)

    if (!error && response) {
      navigate("/");
    }
  }


  const toast_property = () => {
    const obj = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    }
    return obj
  }
  return (
    <>
      {/* adding react tostify to page */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="form-body">
        <div className="form-box">
          <div className="form-header">
            <h3>Sign up</h3>
          </div>
          <div className="form-inner-body" onSubmit={RegisterUser}>
            <form method='post'>
              <div className="input-group">
                <input value={FormData.name} onChange={handleinput} type="text" placeholder='Name' name="name" id="name" />
                <label htmlFor="name">Name</label>
              </div>
              <div className="input-group">
                <input value={FormData.username} onChange={handleinput} type="text" placeholder='Username' name="username" id="username" />
                <label htmlFor="username">Username</label>
              </div>
              <div className="input-group">
                <input value={FormData.email} onChange={handleinput} type="email" placeholder='Email' name="email" id="email" />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-group">
                <input value={FormData.password} onChange={handleinput} type="password" placeholder='Password' name="password" id="password" />
                <label htmlFor="password">Password</label>
              </div>
              <div className="input-group">
                <select value={FormData.role} onChange={handleinput} name="role" id="role">
                  <option value="" disabled defaultValue>Select role...</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="input-group">
                <input type="checkbox" name="term" id="term" />

                <label htmlFor='term' className="checkbox">
                  i agree with term & condition
                </label>
              </div>
              <div className="input-group">
                <button className='btn' type="submit">
                  <div className="spinner-or-text">
                    {isLoading ? <div className="spinner"></div> : "Submit"}
                  </div>
                </button>
              </div>
            </form>
            <p>Already have account ? <Link to={'/login'}>Sign in</Link></p>

          </div>
        </div>
      </div>

    </>
  )
}

export default SignupPage