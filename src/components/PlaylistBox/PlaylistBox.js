import React from "react";
import './../Assets/_css.scss'

class PlaylistBox extends React.Component {
    constructor(props) {
        super(props)
        this.deletePlaylist = this.deletePlaylist.bind(this)
        this.editPlaylist = this.editPlaylist.bind(this)
        this.state = {
            editPlaylist: false
        }
    }

    deletePlaylist = (vals) => {
        let localStoragedata = JSON.parse(localStorage.getItem("playlistData"))
        let filteredData = localStoragedata.filter(item => {
            return item.id !== vals.id
        })
        localStorage.removeItem("playlistData")
        localStorage.setItem("playlistData", JSON.stringify(filteredData))
        this.props.deletePlaylist()
    }

    editPlaylist = (vals) => {
        this.props.editPlaylist(vals)
    }



    render() {
        const PlayLists = !this.state.editPlaylist && this.props.playlistData ? this.props.playlistData.map((playlist) => {
            return (
                <div className="card mb-4 mt-2 animate-zoom transform" key={playlist.id} style={{ cursor: "pointer", backgroundColor: "rgb(242, 242, 242)" }}>
                    <div className="row no-gutters" style={{ paddingBottom: "2%" }}>
                        <div className="col-md-12 mt-">
                            <div className="card-body">
                                <div style={{ float: "left", width: "98%" }}
                                >
                                    <h4 className="card-title">
                                        <span>Playlist : </span> {playlist.playlistName}
                                    </h4>
                                    <h6 className="card-subtitle text-muted">
                                        <span>Created Date : </span>
                                        {new Date(playlist.createdDate).toISOString().split('T')[0]}
                                    </h6>
                                </div>
                                <div className="d-flex" style={{ float: "right", position: "absolute", right: "2%" }}>
                                    <button variant="light" title="Edit Playlist" className="Button mb-2 ml-2 mr-2 pt-md-6 pt-sm-1 pb-sm-1" onClick={() => this.editPlaylist(playlist)}>
                                        <i className="fa fa-pencil"></i>
                                    </button>
                                    <button variant="light" title="Delete Playlist" className="Button mb-2 mt-2 pt-md-6 pt-sm-1 pb-sm-1" onClick={() => this.deletePlaylist(playlist)}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }) : ""
        return (
            <div className="container animatecss">
                {PlayLists}
            </div>

        )
    }
}

export default PlaylistBox;