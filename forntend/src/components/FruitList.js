import React, { useEffect, useState } from 'react';
import { getFruits } from '../api';

const FruitList = () => {
    const [fruits, setFruits] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getFruits();
            setFruits(result);
        };
        fetchData();
    }, []);

    return (
        <ul>
            {fruits.map(fruit => (
                <li key={fruit.id}>{fruit.name}</li>
            ))}
        </ul>
    );
};

export default FruitList;
