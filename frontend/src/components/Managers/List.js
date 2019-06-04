import React from 'react';

const List = props => {
    const { managers } = props;

    return (
        <div>
            {managers.map(manager => {
                return <span>{manager.id}</span>
            })}
        </div>
    );
};

export default List;
