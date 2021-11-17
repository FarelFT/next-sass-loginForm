import { Fragment, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Styles from './Login.module.scss';
import Image from 'next/image';

export default function Login() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);

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

      return data;
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
            {!isLogin && (
              <div>
                <input type='text' name='' id='name' placeholder='Name' />
              </div>
            )}
            <div>
              <input
                type='text'
                name=''
                id='email'
                placeholder='Email'
                ref={emailInputRef}
              />
            </div>
            <div>
              <input
                type='text'
                name=''
                id='password'
                placeholder='Password'
                ref={passwordInputRef}
              />
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
