import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom'
import { auth } from "../config/firebase";
import './Firebase.css';
import { message } from 'antd';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  const validatePasswords = (_, value) => {
    if (value && value !== password) {
      return Promise.reject("Les mots de passe ne correspondent pas");
    }
    return Promise.resolve();
  };

  const onSignup = (e) => {
    e.preventDefault();
    form.validateFields().then(fields => {
      if (password !== confirmPassword) {
        setError("Les mots de passe ne correspondent pas");
        form.setFields([
          { name: 'password', errors: ['Les mots de passe ne correspondent pas'] },
          { name: 'confirmPassword', errors: ['Les mots de passe ne correspondent pas'] }
        ]);
      } else {
        setError(null);
        createUserWithEmailAndPassword(auth, email, password)
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
      }
    })
  }

  return (
    <main className="container">
      <section className="form-section">
        <div className="form-content">
          <p> Inscription </p>
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
              name="password"
              rules={[
                { required: true, message: "Veuillez entrer votre mot de passe" },
                { min: 6, message: "Le mot de passe doit contenir au moins 6 caractères" }
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
            <Form.Item
              name="confirmPassword"
              rules={[
                { required: true, validator: validatePasswords }
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmer mot de passe"
              />
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
              <Button type="primary" htmlType="submit" onClick={onSignup}>
                S'inscrire
              </Button>
            </Form.Item>
          </Form>
          <div style={{ textAlign: 'center' }}>
            <p className="text-sm text-white text-center">
              Déjà un compte ?
            </p>
            <Link to='/login'>
              <Button type="primary" id="login">Se connecter</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Signup;