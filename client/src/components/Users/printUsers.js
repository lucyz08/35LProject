import React from "react";
import {useSelector} from 'react-redux';

const Users = () => {
    const allusers = useSelector((state) => state.users);
    console.log(allusers)

}

export default Users;