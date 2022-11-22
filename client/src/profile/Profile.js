import './profile.css'

import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getSongs} from '../actions/songFetching';
import {getPrompts} from '../actions/promptFetching';
import Songs from '../components/Songs/printSongs';
import Prompts from '../components/Prompts/printPrompts';

const Profile = () => {

    const dispatch = useDispatch();
  
    useEffect(() => {
        dispatch(getSongs());
    }, [dispatch]);
    useEffect(() => {
      dispatch(getPrompts());
    }, [dispatch]);

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
                <h2 className="tresponse">Your respons will go here</h2>
            </div>
    </div>
    <div>
        <div className="friendPlay">
            <div className="friends">
                <h3 className="friendtitle">Your Friends</h3>
                <div className="yourfriends">
                    put friends here
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