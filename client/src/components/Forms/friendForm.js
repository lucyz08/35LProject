import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFriend } from "../../actions/userFetching";
import './form.css'

const FriendForm = () => {
    const [dataOfFriend, setData] = useState({
        username: ''
    });

    const dispatch = useDispatch();

    const doFriendSubmission = (e) =>{
        e.preventDefault();
        dispatch(addFriend(dataOfFriend));
    }
    return (
        <div className="Add-friend">
            <h2>Find Friends on Arpeggio</h2>
            <form className="AddFriend-form" onSubmit={doFriendSubmission}>
                <label className="username" for="username">Username</label>
                <input value={dataOfFriend.username} onChange={(e) => setData({ ...dataOfFriend, username: e.target.value })} type="username" placeholder="username" id="username" name="username"/>

                <button type="submit">Follow Friend</button>
            </form>
        </div>
    );
}

export default FriendForm;