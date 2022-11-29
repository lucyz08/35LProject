import './profile.css'

import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getSongs} from '../actions/songFetching';
import {getPrompts} from '../actions/promptFetching';
import Songs from '../components/Songs/printSongs';
import Prompts from '../components/Prompts/printPrompts';
import { setUserData } from "../actions/userFetching";


const Profile = () => {

    const dispatch = useDispatch();
  
    useEffect(() => {
        dispatch(getSongs());
    }, [dispatch]);
    useEffect(() => {
      dispatch(getPrompts());
    }, [dispatch]);
    useEffect(() => {
        dispatch(setUserData());
    }, [dispatch]);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  useEffect(() => {
      const token = user?.token

      setUser(JSON.parse(localStorage.getItem('profile')))
  }, [])

  const [friendList, setFriends] = useState(JSON.parse(localStorage.getItem('userdata')))
    useEffect(() => {
        setFriends(JSON.parse(localStorage.getItem('userdata')))
    }, [])
    console.log(friendList)
    const results = [];
    if (user)
    {
        if (friendList.friends)
        {
            for (const friend of friendList.friends) {
                results.push(
                <div key={friend.id}>
                    <h2 className="friendList">{friend}</h2>
                </div>,
                );
            }
        }
    }

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
        <div className="friendPlay">
            <div className="friends">
                <h3 className="friendTitle">Your Friends</h3>
                <div className="yourfriends">
                    {results}
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