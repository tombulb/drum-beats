// create a seed file that the programmer can run to set up database with data. Recommend 'drop table [table-name] cascade;' before adding data.

const {Pool} = require('pg')
const db = new Pool({
  database: 'drum_beats',
  password: process.env.PG_PASSWORD
})

const userIds = [1,2,3,4,5,6,7,8,9,10]
const userNames = ['GypsyCat', 'Operation Hectic', 'Cincinatti Doctor', 'Love Doctor', 'MelbourneBeast', 'Boston Renegade', 'JimmyBringsDope', 'SunshineRain', 'CrowsFeet', 'PleaseBrother']
const trackSnippets = ['in 3/4', 'in 130bpm','rough around the edges', 'in Chicago', 'live in Melbourne', 'in Johannesberg', 'drums', 'drums with a smooth touch', 'drums in modern style']
const genres = [
    {
        genre: 'Dubstep',
        url: 'https://res.cloudinary.com/dgpuwpmjk/video/upload/v1625195306/dubstep_ch9vbj.wav'
    },
    {
        genre: 'Country',
        url: 'https://res.cloudinary.com/dgpuwpmjk/video/upload/v1625195302/country_ibrryq.wav'
    },
    {
        genre: 'Blues',
        url: 'https://res.cloudinary.com/dgpuwpmjk/video/upload/v1625195304/blues_jr1j3n.wav'
    },
    {
        genre: 'Heavy Metal',
        url: 'https://res.cloudinary.com/dgpuwpmjk/video/upload/v1625195302/heavy-metal_z3jvy0.wav'
    },
    {
        genre: 'Jazz',
        url: 'https://res.cloudinary.com/dgpuwpmjk/video/upload/v1625195301/jazz_pp6iyz.wav'
    },
    {
        genre: 'Rock',
        url: 'https://res.cloudinary.com/dgpuwpmjk/video/upload/v1625195300/rock_kquiwc.wav'
    },
    {
        genre: 'Disco',
        url: 'https://res.cloudinary.com/dgpuwpmjk/video/upload/v1625195299/disco_h1toxs.wav'
    },
    {
        genre: 'Reggae',
        url: 'https://res.cloudinary.com/dgpuwpmjk/video/upload/v1625195296/reggae_nny7hg.wav'
    }
]

userIds.forEach( (userId, index) => {
    let sql = 'INSERT INTO users (user_name, password) VALUES ($1, $2)';
    db.query(sql, [userNames[index], 'demo'])
})

for (let i = 0; i < 100; i++) {
    let sql = `INSERT INTO tracks 
            (track_name, user_id, cloudinary_url, genres)
             VALUES ($1, $2, $3, $4)`
    let userId = Math.floor(Math.random() * 11)
    let genreIndex = Math.floor(Math.random() * 8)
    let trackSnippetIndex = Math.floor(Math.random() * 10)
    db.query(sql, [`${genres[genreIndex].genre} ${trackSnippets[trackSnippetIndex]}`, userId, genres[genreIndex].url, genres[genreIndex].genre])
}
