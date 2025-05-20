import React from 'react';
import './UserProfileButton.css';

const UserProfileButton = ({user}) => {
    const getInitials = (name) => {
        if (!name || typeof name !== 'string') return '';
        const cleaned = name.trim();
        if (!cleaned) return '';

        const names = cleaned.split(/\s+/);
        const firstInitial = names[0][0].toUpperCase();
        const lastInitial = names.length > 1
            ?names[names.length - 1][0].toUpperCase()
            : '';
            return `${firstInitial}${lastInitial}`;
    };

    return (
        <button className='profile-button'>
            <div className='UserInfo'>
                <span className='username'>{user.name}</span>
                <span className='userrole'>{user.role}</span>
            </div>
            <div className='initials-circle'>{getInitials(user.name)}</div>
        </button>
    );
};


export default UserProfileButton;