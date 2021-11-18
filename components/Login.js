import { Fragment, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Styles from './Login.module.scss';
import Image from 'next/image';

async function createUser(email, password) {
  const response = await fetch('https://reqres.in/api/register', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (data.error) {
    alert(data.error);
  }

  return data;
}

export default function Login() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handlePasswordChange = (props) => (event) => {
    setValues({ ...values, [props]: event.target.value });
  };

  async function submitHandler(event) {
    event.preventDefault();

    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;

    if (isLogin) {
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      localStorage.setItem('token', data.token);

      if (!data.error) {
        router.replace('/friends');
      }
    } else {
      try {
        const result = await createUser(email, password);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.card}>
        <div className={Styles.cardTextBox}>
          <h1 className={Styles.cardTextHeading}>
            {isLogin ? 'Login' : 'Create Account'}
          </h1>

          {!isLogin && (
            <Fragment>
              <ul className={Styles.cardIcon}>
                <li>
                  <a href='#'>
                    <ion-icon
                      class='social-icon'
                      name='logo-instagram'></ion-icon>
                  </a>
                </li>
                <li>
                  <a href='#'>
                    <ion-icon
                      class='social-icon'
                      name='logo-facebook'></ion-icon>
                  </a>
                </li>
                <li>
                  <a href='#'>
                    <ion-icon
                      class='social-icon'
                      name='logo-twitter'></ion-icon>
                  </a>
                </li>
              </ul>

              <p className={Styles.cardParagraph}>
                or use your email for registration:
              </p>
            </Fragment>
          )}

          <form onSubmit={submitHandler} className={Styles.cardForm}>
            {/* {!isLogin && (
              <div>
                <input type='text' name='' id='name' placeholder='Name' />
              </div>
            )} */}
            <div>
              <input
                type='text'
                name='email'
                id='email'
                placeholder='Email'
                ref={emailInputRef}
              />
            </div>
            <div className={Styles.passwordWrapper}>
              <input
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handlePasswordChange('password')}
                id='password'
                placeholder='Password'
                ref={passwordInputRef}
              />
              <button
                onClick={handleClickShowPassword}
                className={Styles.passwordIcon}>
                {values.showPassword ? (
                  <ion-icon name='eye-outline'></ion-icon>
                ) : (
                  <ion-icon name='eye-off-outline'></ion-icon>
                )}
              </button>
            </div>

            <div className={Styles.btnContainer}>
              <button className={Styles.btnFull}>
                {isLogin ? 'Sign In' : 'Sign Up'}
              </button>

              <button
                type='button'
                className={Styles.btnOutline}
                onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </div>
          </form>
        </div>
        <div className={Styles.cardImgBox}>
          <Image alt='Ilustrasi' src='/login.jpg' layout='fill' />
        </div>
      </div>
    </div>
  );
}
