import * as api from '../api/APIindex';

export const createSpotifyPlaylist = async (code, tracks, name, description) => {
    try {
        input = {
            "code": code,
            "tracks": tracks,
            "name": name,
            "description": description
        }
        const {data} = await api.createSpotifyPlist(input)
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}