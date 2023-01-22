import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router';
import { auth } from "../config/firebase";
import './Firebase.css';
import { message } from 'antd';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        window.location.pathname = '/'
      }
    });
  }, []);

  const onLogin = (e) => {
    e.preventDefault();
    form.validateFields().then(fields => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          navigate("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorMessage);
          message.error(errorMessage);
        });
    })
  }

  return (
    <main className="container">
      <section className="form-section">
        <div className="form-content">
          <p> Connexion </p>
          <Form form={form}>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Veuillez entrer votre adresse mail" },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || emailRegex.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Veuillez entrer une adresse email valide');
                  },
                }),
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              rules={[
                { required: true, message: "Veuillez entrer votre mot de passe" }
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
              />
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
              <Button type="primary" htmlType="submit" onClick={onLogin}>
                Se connecter
              </Button>
            </Form.Item>
          </Form>
          <div style={{ textAlign: 'center' }}>
            <p className="text-sm text-white text-center">
              Pas encore de compte ?
            </p>
            <Link to='/signup'>
              <Button type="primary" id="signup">S'inscrire</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Login;