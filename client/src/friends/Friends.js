import FriendForm from "../components/Forms/friendForm.js";
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { compileResponses } from "../actions/userFetching";
import { promptResp, setCustomResponses } from "../actions/promptFetching"

import './friends.css';
import '../components/Forms/form.css'



export default function Friends() {

  function arrayToString(array){
    var artistString = array.join(', ');
    return artistString
}

  const dispatch = useDispatch();
  promptResp();

  useEffect(() => {
    dispatch(compileResponses());
  }, [dispatch]);
  useEffect(() => {
    dispatch(promptResp());
  }, [dispatch]);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  useEffect(() => {
      const token = user?.token

      setUser(JSON.parse(localStorage.getItem('profile')))
  }, [])

  const [data, setUserData] = useState(JSON.parse(localStorage.getItem('userdata')))
  useEffect(() => {
      const token = user?.token

      setUserData(JSON.parse(localStorage.getItem('userdata')))
  }, [])

  const [friendResponses, setFriendResponses] = useState(JSON.parse(localStorage.getItem('userdata')))
    useEffect(() => {
        setFriendResponses(JSON.parse(localStorage.getItem('userdata')))
    }, [])

  const [friendList, setFriends] = useState(JSON.parse(localStorage.getItem('userdata')))
    useEffect(() => {
        setFriends(JSON.parse(localStorage.getItem('userdata')))
    }, [])

    const [promptResponses, setPromptResponses] = useState(JSON.parse(localStorage.getItem('promptResponses')))
    useEffect(() => {
        const token = user?.token

        setPromptResponses(JSON.parse(localStorage.getItem('promptResponses')))
    }, [])


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


    const friendResults = [];
    if (promptResponses)
    {
      for (const item in promptResponses) {
        const iter = promptResponses[item]
                friendResults.push(
                <div className="friendResult">
                  <div className="prompt">
                   {iter.prompt}
                  </div>
                <div className="friendResponse">
                  <div className="friendsFriend">
                    <h3 className="friendName">{iter.user}</h3>
                  </div>
                <div className="friendIndividualSong">
                    <div className="songDiv">
                        <img className="songImg" src = {iter.song.albumCoverURL} width={60} height={60} alt="Image cannot be displayed"/>
                    </div>
                    <div className="songartist">
                        <h3 className="songName">Song: {iter.song.name} </h3>
                        <h3 className="artistName">Album: {iter.song.album} </h3>
                    </div>
                    <div className="album">
                        <h3 className="albumName">Artist: {arrayToString(iter.song.artists)} </h3>
                    </div>
                </div>
                </div>
                </div>,
                );
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
      <div className="playlist">
        <h1 className="friendTitle">Friend Responses to Your Prompts</h1>
        <div className="playlistSongs">
          {friendResults}
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
