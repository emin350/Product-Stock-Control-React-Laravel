
import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { inject, observer } from 'mobx-react';


const Login = (props) => {
  
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if(props.AuthStore.appState != null){
      if(props.AuthStore.appState.isLoggedIn){
        return props.history.push('/');
      }
    }
  });


  const handleSubmit = (values) => {
    axios.post(`/api/auth/login`, { ...values })
      .then((res) => {

        if (res.data.success) {

          const userData = {
            id: res.data.id,
            name: res.data.name,
            email: res.data.email,
            access_token: res.data.access_token
          };
          const appState = {
            isLoggedIn: true,
            user: userData
          };
          props.AuthStore.saveToken(appState);
          //props.history.push('/');
          //window.location.reload();
        }
        else {
          alert(' Giriş Yapılmadı');
        }

      })
      .catch(error => {
        if (error.response) {
          let err = error.response.data;

          console.log(err.errors)
          setErrors(err.errors);


        }
        else if (error.request) {
          let err = error.request;
          setError(err);
        }
        else {
          setError(error.message);
        }
      });
  }

  let arr = [];
  Object.values(errors).forEach(value => {
    arr.push(value)
  });

  return (
    <div className="login-register-container" >
      <form class="form-signin">
        <img class="mb-4" src="https://cdn.wallpapersafari.com/23/88/QrUxBF.png" alt="" width="150" height="150" />
        <h1 class="h3 mb-3 font-weight-normal">Giriş</h1>

        {arr.length != 0 && arr.map((item) => (<p>{item}</p>))}
        {error != '' && ((<p>{item}</p>))}

        <Formik
          initialValues={{
            email: '',
            password: '',
         }}

          onSubmit={handleSubmit}
          validationSchema={
            Yup.object().shape({
              email: Yup
                .string()
                .email('Email Formatı Hatalı')
                .required('Email Zorunludur'),
           password: Yup.string().required('Şifre Zorunludur'),
            })
          }
        >
          {({
            values,
            handleChange,
            handleSubmit,
            handleBlur,
            errors,
            isValid,
            isSubmitting,
            touched
          }) => (
            <div>
               <div className='form-group'>
                <label for="inputEmail" class="sr-only">Email Adres</label>
                <input
                  type="email"
                  class="form-control"
                  placeholder="Email Adres"
                  value={values.email}
                  onChange={handleChange('email')}
                />
                {(errors.email && touched.email) && <p>{errors.email}</p>}
              </div>

              <div className='form-group'>
                <label for="inputPassword" class="sr-only">Şifre</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Şifre"
                  value={values.password}
                  onChange={handleChange('password')}
                />
                {(errors.password && touched.password) && <p>{errors.password}</p>}
              </div>

             
              <button
                disabled={!isValid || isSubmitting}
                class="btn btn-lg btn-primary btn-block"
                type="button"
                onClick={handleSubmit}
              >Giriş Yap
              </button>
            </div>
          )}
        </Formik>

        <Link to="/register" className='mt-3' style={{ display: 'block' }}> Kayıt Ol</Link>
        <p class="mt-5 mb-3 text-muted">&copy; 2022</p>
      </form>
    </div>
  )
}

export default inject("AuthStore")(observer(Login));