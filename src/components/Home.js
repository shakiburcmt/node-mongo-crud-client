import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Home = () => {
    const users = useLoaderData();
    const [displayUsers, setDisplayUsers] = useState(users);

    const handleRemoveUser = user => {
        const agree = window.confirm(`Are you sure you want to delete: ${user.name}`);

        if (agree) {
            fetch(`http://localhost:5000/users/${user._id}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        alert('User deleted properly')
                        const remainingUsers = displayUsers.filter(usr => usr._id !== user._id);
                        setDisplayUsers(remainingUsers);
                    }
                });
        }
    }

    return (
        <div>
            <h2>Total Users: {displayUsers.length}</h2>
            <div>
                {
                    displayUsers.map(user => <h3 key={user._id}>
                        {user.name}
                        <Link to={`/update/${user._id}`}><button>Update</button></Link>
                        <button onClick={() => handleRemoveUser(user)}>X
                        </button>
                    </h3>)
                }
            </div>
        </div>
    );
};

export default Home;