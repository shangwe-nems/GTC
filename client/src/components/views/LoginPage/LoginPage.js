import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user_actions";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Icon, Input, Button, Checkbox, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser, faUserLock, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from "react-redux";
import styles from '../LandingPage/landingpage.module.css';
import Footer from "../Footer/Footer";

const { Title } = Typography;

function LoginPage(props) {
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState('')
  const [rememberMe, setRememberMe] = useState(rememberMeChecked)

  const handleRememberMe = () => {
    setRememberMe(!rememberMe)
  };

  const initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';

  return (
    <>
      <div className={styles.contains}>
        <div className={styles.contained}>
         
          <Formik
            initialValues={{
              email: initialEmail,
              password: '',
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Votre adresse email invalide')
                .required('Votre adresse email est exigée'),
              password: Yup.string()
                .min(6, 'Votre mot de passe doit avoir au moins 6 caractères')
                .required('Votre mot de passe est exigé'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                let dataToSubmit = {
                  email: values.email,
                  password: values.password
                };

                dispatch(loginUser(dataToSubmit))
                  .then(response => {
                    if (response.payload.loginSuccess) {
                      window.localStorage.setItem('userId', response.payload.userId);
                      if (rememberMe === true) {
                        window.localStorage.setItem('rememberMe', values.id);
                      } else {
                        localStorage.removeItem('rememberMe');
                      }
                      props.history.push("/main/");
                    } else {
                      setFormErrorMessage('Wrong email or password');
                    }
                  })
                  .catch(err => {
                    setFormErrorMessage(err.response.data.message);
                    setTimeout(() => {
                      setFormErrorMessage("")
                    }, 3000);
                  });
                setSubmitting(false);
              }, 500);
            }}
          >
            {props => {
              const {
                values,
                touched,
                errors,
                dirty,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset,
              } = props;
              return (


                <div className="app" style={{paddingTop:80}}>
                  <div style={{ border: '1px solid #CAC8C7', padding: '30px 50px', paddingTop: 60, boxShadow: '3px 3px 5px 6px #ccc', borderRadius: 4, backgroundColor: 'rgba(251, 255, 255, .9)' }}>
                      <div style={{ width: 150, height:150, marginTop:-140, marginLeft:90, padding:10, border:'2px solid #323232', borderRadius:'50%', display:'grid', placeItems:'center', backgroundColor:'#FBFFFF' }}>
                        <img src={require('../../assets/img/logo.png')} alt="" style={{ width: 90, height:'auto' }}/>
                      </div>
                      <Title level={3} style={{textAlign:'center', marginBottom:20}}>Log into the system...</Title>
                      <form onSubmit={handleSubmit} style={{ width: '330px', fontSize:14 }}>

                        <Form.Item required>
                          <Input
                            id="email"
                            prefix={<FontAwesomeIcon icon={faUser} style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Insert your email address..."
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.email && touched.email ? 'text-input error' : 'text-input'
                            }
                          />
                          {errors.email && touched.email && (
                            <div className="input-feedback">{errors.email}</div>
                          )}
                        </Form.Item>

                        <Form.Item required>
                          <Input
                            
                            id="password"
                            prefix={<FontAwesomeIcon icon={faLock} style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Insert your password..."
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.password && touched.password ? 'text-input error' : 'text-input'
                            }
                          />
                          {errors.password && touched.password && (
                            <div className="input-feedback">{errors.password}</div>
                          )}
                        </Form.Item>

                        {formErrorMessage && (
                          <label ><p style={{ color: '#ff0000bf', fontSize: '0.8rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
                        )}

                        <Form.Item>
                          <Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe} >Remember me</Checkbox>
                          <a className="login-form-forgot" href="/reset_user" style={{ float: 'right' }}>
                            Forgot password ?
                            </a>
                          <div style={{marginTop:20}}>
                            <Button size="large" type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                              Login...
                            </Button>
                          </div>
                        </Form.Item>
                    </form>
                  </div>
                </div>
              );
            }}
          </Formik>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default withRouter(LoginPage);


