import React from 'react';

const UserDetails = (props) => {
    const {id} = props;

    const handleClick = () => {
        console.log(id);
    }

    return (
        <div onClick={handleClick}>
           this is user detail
        </div>
    );
};

export default UserDetails;