import React, { useEffect, useState } from 'react';
import firebase, { auth, database, disconnect } from "../config/firebase";
import { Layout, Button, Card } from 'antd';
import './Dashboard.css';
import coinIcons, { getIcon } from '../icons/Icons'
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";


function Home() {
  const [username, setUsername] = useState('');
  const { Header, Content } = Layout;
  const [data, setData] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUsername(user.email);
    });
  }, [firebase]);

  useEffect(() => {
    async function fetchData() {
      const cryptoData = [];
      for (const crypto of Object.keys(coinIcons)) {
        const cryptoDocs = await getDocs(query(collection(database, 'crypto'), where("name", "==", crypto), orderBy('time', "desc"), limit(1)));
        cryptoDocs.forEach(doc => {
          cryptoData.push(doc.data());
        });
      }
      setData(cryptoData);
    }
    fetchData();
  }, []);


  const handleLogout = () => {
    disconnect(auth);
  };

  const handleCoinStats = (item) => {
    window.location.href = `/coin/${item.name}`;
  };

  return (
    <div>
      <Header className="header">
        <div className="header-left">
          <Button style={{visibility: 'hidden'}} className="dashboard" href='/dashboard'>Dashboard</Button>
        </div>
        <div className="header-center">
          <Button display={false} className="update" href='/api'>Mettre à jour</Button>
        </div>
        <div className="header-right">
          <div className="right-elements">
            <p>Bonjour, {username} !</p>
            <Button className="disconnect" onClick={handleLogout}>Se déconnecter</Button>
          </div>
        </div>
      </Header>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {data.map((item, index) => (
          <Card hoverable onClick={() => handleCoinStats(item)} key={index} title={item.name + ' - ' + item.price + ' $'} style={{ width: 100, width: 170, margin: '10px' }}>
            <img src={getIcon(item.name)} alt="icon" style={{ width: '100%' }} />
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Home;