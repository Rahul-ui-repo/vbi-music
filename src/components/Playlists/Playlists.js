import React from 'react';
import './../Assets/_css.scss'
import PlaylistBox from "./../PlaylistBox/PlaylistBox";
import CreatePlaylist from "../CreatePlaylist/CreatePlaylist";
import Spinner from '../Spinner/Spinner.js';
import { GET_REQUEST } from '../../util';
import EditPlaylist from '../EditPlaylist/EditPlaylist';

class Playlist extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            spinner: true,
            create: false,
            buttonName: "Create playlist",
            buttonIcon: "fa fa-plus",
            pictures: [],
            picturesBkp: [],
            search: "",
            playlistData: [],
            editPlaylist: false,
            editPlaylistData: {}
        }

    }

    componentDidMount() {
        this._isMounted = true;
        this.getAlbumData()
        this.seePlaylist()
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    spinner = (show) => {
        this.setState({ spinner: show })
    }

    getAlbumData = () => {
        const getAblums = GET_REQUEST('https://jsonplaceholder.typicode.com/albums')
        getAblums.then((albumVals) => {
            this.getPhotoData(albumVals)
        })
    }

    getPhotoData = (albums) => {
        const getPictures = GET_REQUEST('https://jsonplaceholder.typicode.com/photos')
        getPictures.then((photoVals) => {
            var finalDataArray = photoVals.slice(0, 101)
            finalDataArray.forEach(photo => {
                albums.forEach(album => {
                    if (photo.albumId === album.id) {
                        photo.ablumName = album.title
                    }
                })
            })
            this.setState({ pictures: finalDataArray, picturesBkp: finalDataArray })
            this.spinner(false)
        })
    }

    createPlaylist = (vals) => {
        var status = !this.state.create
        var buttonName = !this.state.create ? "Back to Playlist" : "Create playlist"
        var icon = !this.state.create ? "fa fa-arrow-left" : "fa fa-plus"
        var editPlaylist = vals === true ? true : false
        this.setState({ create: status, buttonName: buttonName, buttonIcon: icon, editPlaylist: editPlaylist })
    }

    seePlaylist = () => {
        var localStorageData = JSON.parse(localStorage.getItem("playlistData"))
        this.setState({ playlistData: localStorageData })
    }

    editPlaylist = (vals) => {
        let localStorageData = JSON.parse(localStorage.getItem("playlistData"))
        let editableData = localStorageData.filter(item => {
            return item.id === vals.id
        })
        this.setState({ editPlaylistData: editableData[0] })
        this.createPlaylist(true)
    }

    render() {
        const { create, spinner, pictures, playlistData, editPlaylist, editPlaylistData, buttonIcon, buttonName } = this.state
        return (
            <>
                <div className="animatecss">
                    <div className="container animate-zoom">
                        <div className="d-flex justify-content-center">
                            <button variant="light" className="Button mb-2 mt-4 pt-md-6 pt-sm-1 pb-sm-1" onClick={() => this.createPlaylist()}>
                                <i className={buttonIcon}></i> {buttonName}
                            </button>
                        </div>
                    </div>
                    {create ?
                        editPlaylist ?
                            <EditPlaylist
                                editPlaylistData={editPlaylistData}
                                playlistData={playlistData}
                                addtoPlaylist={pictures}
                                saveplaylist={this.createPlaylist}
                                allPlaylist={this.seePlaylist} />
                            : <CreatePlaylist
                                songList={pictures}
                                saveplaylist={this.createPlaylist}
                                allPlaylist={this.seePlaylist} />
                        : <PlaylistBox
                            playlistData={playlistData}
                            deletePlaylist={this.seePlaylist}
                            editPlaylist={this.editPlaylist} />
                    }
                    <Spinner
                        showSpinner={spinner}
                    />
                </div>
            </>
        )
    }
}

export default Playlist;