import './profile.css'

import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import Prompts from '../components/Prompts/printPrompts';


const Profile = () => {

    // const dispatch = useDispatch();

    // const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    // useEffect(() => {
    //     const token = user?.token

    //     setUser(JSON.parse(localStorage.getItem('profile')))
    // }, [])
    // useEffect(() => {
    //     dispatch(setUser());
    // }, [dispatch]);
 

    // const [data, setUserData] = useState(JSON.parse(localStorage.getItem('userdata')))
    // useEffect(() => {
    //     const token = user?.token

    //     setUserData(JSON.parse(localStorage.getItem('userdata')))
    // }, [])
    // useEffect(() => {
    //     dispatch(setUserData());
    // }, [dispatch]);
 

    
    // const [friendDisplay, setFriends] = useState(JSON.parse(localStorage.getItem('userdata')))
    // useEffect(() => {
    //     setFriends(JSON.parse(localStorage.getItem('userdata')))
    // }, [])
    // console.log("got this far")
    // const results = [];
    // if (user)
    // {
    //     console.log("past user")
    //     if ((friendDisplay.friends).length != 0)
    //     console.log("past friends")
    //     {
    //         for (const friend of friendDisplay.friends) {
    //             results.push(
    //             <div key={friend.id}>
    //                 <h2 className="friendList">{friend}</h2>
    //                 <hr />
    //             </div>,
    //             );
    //         }
    //     }
    // }

    return (
    <>
    <div className="topPic">
        <h1 className="head">all about you</h1>
    </div>
    <div className="todayAnswer">
            <h2 className="tprompt">Today: </h2>
            <div className="todayprompt">
                <Prompts/>
            </div>
            <div className="todayresponse">
                <h2 className="tresponse">Your response will go here</h2>
            </div>
    </div>
    <div>
        <div className="profileMain">
            <div className="friends">
                <h3 className="friendTitle">Your Friends</h3>
                <div className="yourfriends">
                         {/* {results} */}
                         we need to fix this
                </div>
            </div>
            <div className="playlist">
                <h3 className="playlistTitle">Your Playlist</h3>
                <div className="yourplaylist">
                    put your personalized playlist here
                </div>
            </div>
        </div>
    </div>
    </>
    );
}

export default Profile