import React from "react";
import './../Assets/_css.scss'
import SearchBox from '../SearchBox/SearchBox.js'
import SongBox from '../SongBox/SongBox.js'

class CreatePlaylist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            addSongs: [],
            addSongsCount: 0,
            playlistName: "Playlist 1",
            search: "",
            searchDataCount: 0,
            pictures: [],
            picturesBkp: [],
        }
        this.saveplaylist = this.saveplaylist.bind(this)
    }

    componentDidMount() {
        let localStorageData = JSON.parse(localStorage.getItem("playlistData"))
        let newPlaylistName;
        if (localStorageData !== null && localStorageData !== undefined && localStorageData.length > 0) {
            var lastId = parseInt(localStorageData[localStorageData.length - 1].id) + 1
            newPlaylistName = "Playlist " + lastId
        }
        this.setState({ pictures: this.props.songList, picturesBkp: this.props.songList, playlistName: newPlaylistName })
    }

    searchBoxChange = (e) => {
        var searchtext = e.target.value
        this.setState({ search: searchtext })
        this.filterSearchBox(searchtext)
    }

    filterSearchBox = (searchtext) => {
        let allSongs = this.state.picturesBkp
        let filteredSongs = allSongs.filter(item => {
            return item.title.toLowerCase().indexOf(searchtext.toLowerCase()) > -1
        })
        const finalFiltered = filteredSongs.filter((elem) => !this.state.addSongs.find(({ id }) => elem.id === id));
        this.setState({ pictures: finalFiltered, searchDataCount: finalFiltered.length })
    }

    onPlaylistNameChange = (val) => {
        let playlistName = val.target.value
        this.setState({ playlistName: playlistName })
    }

    addSong = (vals) => {
        let songsArray = this.state.addSongs
        songsArray.push(vals)
        this.setState({ addSongs: songsArray, addSongsCount: songsArray.length }, this.removeSongsFromAddList(vals))

    }

    removeSongsFromAddList = (vals) => {
        let filteredSongs = this.state.pictures.filter(item => {
            return item.title.toLowerCase().indexOf(vals.title.toLowerCase()) === -1
        })
        this.setState({ pictures: filteredSongs, searchDataCount: filteredSongs.length })
    }

    saveplaylist = () => {
        let localstoragedata = JSON.parse(localStorage.getItem("playlistData"))
        let dataArray = localstoragedata === null ? [] : localstoragedata
        let playlistData = {}
        playlistData.id = 0
        playlistData.createdDate = new Date()
        playlistData.playlistName = ""
        playlistData.songs = this.state.addSongs
        if (localstoragedata === null || localstoragedata.length === 0) {
            localStorage.removeItem("playlistData")
            playlistData.id += 1
            playlistData.playlistName = this.state.playlistName ? this.state.playlistName : "Playlist 1"
            dataArray.push(playlistData)
            localStorage.setItem("playlistData", JSON.stringify(dataArray))
        }
        else {
            let lastplaylistId = localstoragedata[localstoragedata.length - 1].id + 1
            playlistData.id = lastplaylistId
            playlistData.playlistName = this.state.playlistName.length > 0 ? this.state.playlistName : "Playlist " + lastplaylistId
            localstoragedata.push(playlistData)
            localStorage.setItem("playlistData", JSON.stringify(localstoragedata))
        }
        this.props.saveplaylist()
        this.props.allPlaylist()
    }

    render() {
        const { pictures, addSongsCount } = this.state;
        return (
            <div>
                <div className="container animatecss animate-zoom">
                    <div className="row no-gutters mb-0 mt-2">
                        <div className="col-sm-10 px-3">
                            <h6 className="d-flex">
                                <label style={{ lineHeight: "2rem" }}>Playlist &nbsp;</label>
                                <input className="mb-2"
                                    type="text"
                                    className="form-control"
                                    name="playlistName"
                                    id="playlistName"
                                    placeholder="Playlist name "
                                    autoFocus=""
                                    onChange={this.onPlaylistNameChange}
                                    autoComplete="off"
                                    style={{ width: "100%" }}
                                    value={this.state.playlistName}
                                />
                            </h6>
                        </div>
                        <div className="col-sm-2">
                            <div aria-label="list type" className="d-flex">
                                <button variant="light" className="Button mb-2 mt-1 pt-md-6 pt-sm-1 pb-sm-1"
                                    onClick={() => this.saveplaylist()}>
                                    <i className="fa fa-random"></i> Save playlist
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="" style={{ textAlign: "center" }}><strong>{addSongsCount} song(s) added </strong></div>
                <SearchBox
                    searchBoxText={this.state.search}
                    searchBoxChange={this.searchBoxChange}
                    searchDataCount={this.state.searchDataCount}
                />
                <SongBox
                    songData={pictures}
                    remove={false}
                    add={true}
                    allsongs={false}
                    addSong={this.addSong}
                />
            </div>

        )
    }
}

export default CreatePlaylist;