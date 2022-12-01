import FriendForm from "../components/Forms/friendForm.js";
import Songs from '../components/Songs/printSongs';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getSongs} from '../actions/songFetching';
import {getPrompts} from '../actions/promptFetching';
import { getPlaylists } from "../actions/userFetching";
import { setUserData } from "../actions/userFetching";

import './friends.css';



export default function Friends() {

  const dispatch = useDispatch();

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
    <div className="friendPic">
        <h1 className="picText">your friends</h1>
    </div>
    <div className="friendplay">
      <div className="friends">
        <h1 className="friendTitle">Your Friends</h1>
        <div className="friendList" >
          {results}
        </div>
      </div>
    </div>
    <div className="proForm">
            <div className="form">
                <FriendForm/> 
            </div>
        </div>
    
    </>
  )
}
