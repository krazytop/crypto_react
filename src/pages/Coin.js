import React, { useState, useEffect } from 'react';
import moment from 'moment';
import firebase, { auth, database, disconnect } from "../config/firebase";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Layout, Button, Card } from 'antd';

function Coin() {
    const [data, setData] = useState([]);
    const [username, setUsername] = useState('');
    const { Header, Content } = Layout;

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUsername(user.email);
        });
    }, [firebase]);

    const handleLogout = () => {
        disconnect(auth);
    };

    useEffect(() => {
        async function fetchData() {
            const cryptoData = [];
            const cryptoDocs = await getDocs(query(collection(database, 'crypto'), where("name", "==", window.location.pathname.replace('/coin/', '')), orderBy('time', "desc"), limit(100)));
            cryptoDocs.forEach(doc => {
                cryptoData.push(doc.data());
                setData(cryptoData);
            });
        }
        fetchData();
    }, []);

    return (
        <div>
            <Header className="header">
                <div className="header-left">
                    <Button className="dashboard" href='/dashboard'>Dashboard</Button>
                </div>
                <div className="header-center">
                    <Button className="update" href='/api'>Mettre à jour</Button>
                </div>
                <div className="header-right">
                    <div className="right-elements">
                        <p>Bonjour, {username} !</p>
                        <Button className="disconnect" onClick={handleLogout}>Se déconnecter</Button>
                    </div>
                </div>
            </Header>
            <LineChart width={1500} height={700} data={data}>
                <XAxis dataKey="time" tickFormatter={(unixTime) => moment.unix(unixTime).format('DD/MM')} />
                <YAxis dataKey="price" tickFormatter={(value) => `${value} $`} domain={['auto', 'auto']} autoScale={true} />
                <Line type="monotone" dataKey="price" stroke="#8884d8" />
                <Tooltip />
            </LineChart>
        </div>
    );
}

export default Coin;
