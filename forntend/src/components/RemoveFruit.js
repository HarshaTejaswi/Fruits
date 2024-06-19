import React from 'react';
import { removeFruit } from '../api';

const RemoveFruit = ({ id, onRemove }) => {
    const handleClick = async () => {
        await removeFruit(id);
        onRemove(id);
    };

    return (
        <button onClick={handleClick}>Remove</button>
    );
};

export default RemoveFruit;
