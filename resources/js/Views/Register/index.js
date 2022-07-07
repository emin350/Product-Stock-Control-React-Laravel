
// kullanılan şifre paketleri

// npm i crypto-js jwt-encode jwt-decode --save
//npm i crypto-browserify


// 401 hatası alındığında 
// vendor\laravel\framework\src\Illuminate\Auth\EloquentUserProvider 

// dosyasından;

// public function validateCredentials(UserContract $user, array $credentials)
//     {
//         $plain = $credentials['password'];

//         return $this->hasher->check($plain, $user->getAuthPassword());
//     }  

//     fonksiyonuna;

//     public function validateCredentials(UserContract $user, array $credentials)
//     {
//         $plain = $credentials['password'];
//         return md5($plain) == $user->getAuthPassword();
//         return $this->hasher->check($plain, $user->getAuthPassword());
//     }

//     md5 şifrelemesi return yapılıyor.

import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { inject, observer } from 'mobx-react';


const Register = (props) => {
  console.log(props)
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState('');


  const handleSubmit = (values) => {
    axios.post(`/api/auth/register`, { ...values })
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
          props.history.push('/');
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
        <h1 class="h3 mb-3 font-weight-normal">Hemen Kayıt Ol</h1>

        {arr.length != 0 && arr.map((item) => (<p>{item}</p>))}
        {error != '' && ((<p>{item}</p>))}

        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            password_confirmation: ''
          }}

          onSubmit={handleSubmit}
          validationSchema={
            Yup.object().shape({
              email: Yup
                .string()
                .email('Email Formatı Hatalı')
                .required('Email Zorunludur'),
              name: Yup.string().required('Ad Soyad Zorunludur'),
              password: Yup.string().required('Şifre Zorunludur'),
              password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Şifreler Eşleşmiyor')
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
                <label for="inputEmail" class="sr-only">AD SOYAD</label>
                <input
                  type="text"
                  class="form-control"
                  name="name"
                  onBlur={handleBlur}
                  placeholder="Ad Soyad"
                  value={values.name}
                  onChange={handleChange('name')}
                />
                {(errors.name && touched.name) && <p>{errors.name}</p>}
              </div>

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

              <div className='form-group'>
                <label for="inputPassword" class="sr-only">Şifre Tekrarı</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Şifre Tekrarı"
                  value={values.password_confirmation}
                  onChange={handleChange('password_confirmation')}
                />
                {(errors.password_confirmation && touched.password_confirmation) && <p>{errors.password_confirmation}</p>}
              </div>

              <button
                disabled={!isValid || isSubmitting}
                class="btn btn-lg btn-primary btn-block"
                type="button"
                onClick={handleSubmit}
              >Kayıt Ol
              </button>
            </div>
          )}
        </Formik>

        <Link to="/login" className='mt-3' style={{ display: 'block' }}> Giriş</Link>
        <p class="mt-5 mb-3 text-muted">&copy; 2022</p>
      </form>
    </div>
  )
}

export default inject("AuthStore")(observer(Register));