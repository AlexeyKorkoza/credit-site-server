import React from 'react';
import { Link } from 'react-router-dom';

const List = props => {
    const { managers } = props;

    return (
        <div>
            {managers.map(manager => {
                return <Link to={`/managers/${manager.id}`}>Edit</Link>
            })}
            <Link to="/managers/add">Add</Link>
        </div>
    );
};

export default List;
