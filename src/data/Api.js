import React, { useState, useEffect } from 'react';
import firebaseApp, { database } from "../config/firebase";
import { getDoc, doc, updateDoc, addDoc, collection } from "firebase/firestore";
import { Spin } from 'antd';
import coinIcons, { getIcon } from '../icons/Icons'

function Api() {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const cryptoArray = Object.keys(coinIcons);
        cryptoArray.forEach(async crypto => {
            const response = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${crypto}&tsyms=USD`);
            if (response.ok) {
                const json = await response.json();
                await addDoc(collection(database, 'crypto'), {
                    "name": crypto,
                    "price": json.USD,
                    "time": Math.floor(Date.now() / 1000)
                });
            } else {
                console.log('error', response.statusText);
            }
        });
        setTimeout(() => {
            setIsLoading(false);
            window.location.pathname = '/dashboard';
        }, 1000);
    }, []);

    return (
        <div>
            {isLoading ? (
                <Spin size="large" tip="Loading...">
                    <div style={{ padding: '100px' }} />
                </Spin>
            ) : null}
        </div>
    );
}

export default Api;
