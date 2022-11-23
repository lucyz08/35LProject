import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import {useState, useEffect} from 'react';
//must include a file in src called passwords.js containing export constants CLIENT_ID and CLIENT_SECRET
import { CLIENT_ID, CLIENT_SECRET, CONNECTION_URL } from './passwords';
// const mongoose = require("mongoose");



function App() {

  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    //API Access Token
    var AuthParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body:'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', AuthParameters)
    .then(result => result.json())
    .then(data => setAccessToken(data.access_token))
  }, [])

  async function addToDatabase(data){
    console.log(data)
    //   const newRohanTestSong = new rohanTestSong({ 
    //     name: data.name,
    //     artists: ['hello'],
    //     spotifyID: data.external_ids,
    //     albumCoverURL: data.album.images[0].url
    //   })
    //   try {
    //     await newRohanTestSong.save();
    //     console.log(newRohanTestSong);
    // } catch (error) {
    //     console.log(error)
    // }
  }
  //Search
  async function search() {

    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }

    let SongID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=track', searchParameters)
    .then(response => response.json())
    .then(data => {

      console.log(data)
      setSongs(data.tracks.items)
    })

    //Display those albums to the user
  }

  console.log(songs);

  return (
    <div className="App">
      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholder="Search for Song"
            type="input"
            onKeyPress={event => {
              if (event.key == "Enter"){
                search();
              }
            }}
            onChange = {event => setSearchInput(event.target.value)}
          />
          <Button onClick={search}>
              Search
          </Button>
        </InputGroup>
      </Container>
      <Container>
        <Row className = "mx-2 row row-cols-4">
          {songs.map( (song, i) => {
            console.log(song);
            return (
              <div onClick={() => addToDatabase(song)}>
            <Card>
              <Card.Img src = {song.album.images[0].url}/>
              <Card.Body>
                <Card.Title>{song.name}</Card.Title>
                <Card.Text>{song.artists[0].name}</Card.Text>
            </Card.Body>
          </Card>
          </div>
            )
          })}
        </Row>
      </Container>
    </div>
  );
}

export default App;
