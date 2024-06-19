import React, { useState } from 'react';
import { addFruit } from '../api';

const AddFruit = ({ onAdd }) => {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newFruit = await addFruit(name);
        onAdd(newFruit);
        setName('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Fruit Name" />
            <button type="submit">Add Fruit</button>
        </form>
    );
};

export default AddFruit;
