import React from 'react';
import './../Assets/_css.scss';
import SearchBox from '../SearchBox/SearchBox.js';
import SongBox from '../SongBox/SongBox.js';

class EditPlaylist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            addSongPlaylist: [],
            addSongPlaylistBkp: [],
            editPlaylistData: {},
            pictures: [],
            picturesBkp: [],
            search: "",
            searchDataCount: 0,
            playlistName: "",
            removedSongs: [],
            addToList: false,
            addRemoveButton: "Add",
            addRemoveButtonIcon: "fa fa-plus"

        }
        this.saveEditedPlaylist = this.saveEditedPlaylist.bind(this)
    }

    componentDidMount() {
        var playlistData = this.props.editPlaylistData
        const finalFilteredSongs = this.props.addtoPlaylist.filter((elem) => !playlistData.songs.find(({ id }) => elem.id === id));
        this.setState({
            editPlaylistData: playlistData,
            pictures: playlistData.songs,
            playlistName: playlistData.playlistName,
            picturesBkp: playlistData.songs,
            addSongPlaylist: finalFilteredSongs,
            addSongPlaylistBkp: finalFilteredSongs
        })
    }


    shuffleSongs = () => {
        let shuffledSongs = this.state.pictures.map((a) => ({ sort: Math.random(), value: a }))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value);
        this.setState({ pictures: shuffledSongs })
    }

    searchBoxChange = (e) => {
        var searchtext = e.target.value
        this.setState({ search: searchtext })
        this.filterSearchBox(searchtext)
    }

    filterSearchBox = (searchtext) => {
        if (!this.state.addToList) {
            let allSongs = this.state.picturesBkp
            let filteredSongs = allSongs.filter(item => {
                return item.title.toLowerCase().indexOf(searchtext.toLowerCase()) > -1
            })
            const finalFiltered = filteredSongs.filter((elem) => !this.state.removedSongs.find(({ id }) => elem.id === id));
            this.setState({ pictures: finalFiltered, searchDataCount: finalFiltered.length })
        }
        else {
            let allSongs = this.state.addSongPlaylistBkp
            let filteredSongs = allSongs.filter(item => {
                return item.title.toLowerCase().indexOf(searchtext.toLowerCase()) > -1
            })
            const finalFiltered = filteredSongs.filter((elem) => !this.state.pictures.find(({ id }) => elem.id === id));
            this.setState({ addSongPlaylist: finalFiltered, searchDataCount: finalFiltered.length })
        }
    }

    onPlaylistNameChange = (val) => {
        let playlistName = val.target.value
        this.setState({ playlistName: playlistName })
    }

    removedSongs = (vals) => {
        let songsArray = this.state.removedSongs
        songsArray.push(vals)
        let allSongsArray = this.state.addSongPlaylist
        allSongsArray.unshift(vals)
        this.setState({ addSongPlaylist: allSongsArray, removedSongs: songsArray, removedSongsCount: songsArray.length }, this.removeFromPlaylist(vals))

    }

    removeFromPlaylist = (vals) => {
        let allSongs = this.state.pictures
        let filteredSongs = allSongs.filter(item => {
            return item.id !== vals.id
        })
        this.setState({ pictures: filteredSongs, searchDataCount: filteredSongs.length, })
    }

    addSong = (vals) => {
        let songsArray = this.state.pictures
        songsArray.push(vals)
        this.setState({ pictures: songsArray }, this.removeSongsFromAddList(vals))
    }

    removeSongsFromAddList = (vals) => {
        let filteredSongs = this.state.addSongPlaylist.filter(item => {
            return item.title.toLowerCase().indexOf(vals.title.toLowerCase()) === -1
        })
        this.setState({ addSongPlaylist: filteredSongs, searchDataCount: filteredSongs.length })
    }

    addToList = () => {
        var buttonVal = !this.state.addToList
        var buttonName = !this.state.addToList ? "Song List" : "Add"
        var icon = !this.state.addToList ? "fa fa-arrow-left" : "fa fa-plus"
        this.setState({ addToList: buttonVal, addRemoveButton: buttonName, addRemoveButtonIcon: icon })
    }

    saveEditedPlaylist = () => {
        let playlistData = this.state.editPlaylistData
        let localStorageData = JSON.parse(localStorage.getItem("playlistData"))
        localStorageData.forEach(item => {
            if (item.id === playlistData.id) {
                item.playlistName = this.state.playlistName.length > 0 ? this.state.playlistName : "Untitled"
                item.songs = this.state.pictures
            }
        })
        let finalLocalData = JSON.stringify(localStorageData)
        localStorage.removeItem("playlistData")
        localStorage.setItem("playlistData", finalLocalData)
        this.props.saveplaylist()
        this.props.allPlaylist()
    }


    render() {
        const { pictures, playlistName, addToList, addSongPlaylist } = this.state
        return (
            <div className="container animatecss ">
                <div className="row no-gutters mb-3 mt-2 animate-zoom" >
                    <div className="col-sm-9 px-3">
                        <h6 className="d-flex">
                            <label style={{ lineHeight: "2rem" }}>Playlist &nbsp;</label>
                            <input className="mb-2"
                                type="text"
                                className="form-control"
                                name="playlistName"
                                id="playlistName"
                                placeholder="playlist name "
                                autoFocus=""
                                onChange={(event) => this.onPlaylistNameChange(event)}
                                autoComplete="off"
                                style={{ width: "85%" }}
                                value={playlistName}
                            />
                        </h6>
                    </div>
                    <div className="col-sm-3">
                        <div aria-label="list type" className="d-flex">
                            <button variant="light" className="Button mb-2 mt-1 pt-md-6 pt-sm-1 pb-sm-1" onClick={() => this.addToList()}>
                                <i className={this.state.addRemoveButtonIcon}></i> {this.state.addRemoveButton}
                            </button>
                            <button variant="light" className="Button mb-2 mt-1 pt-md-6 pt-sm-1 pb-sm-1" onClick={() => this.shuffleSongs()}>
                                <i className="fa fa-random"></i> Shuffle</button>
                            <button variant="light" className="Button mb-2 mt-1 pt-md-6 pt-sm-1 pb-sm-1" onClick={() => this.saveEditedPlaylist()}>
                                <i className="fa fa-save"></i> Save
                            </button>
                        </div>
                    </div>
                </div>
                <SearchBox
                    searchBoxText={this.state.search}
                    searchBoxChange={this.searchBoxChange}
                    searchDataCount={this.state.searchDataCount}
                />
                <SongBox
                    songData={addToList ? addSongPlaylist : pictures}
                    remove={!addToList}
                    add={addToList}
                    allsongs={false}
                    removeSongs={this.removedSongs}
                    addSong={this.addSong}
                />
            </div>
        )
    }

}

export default EditPlaylist;