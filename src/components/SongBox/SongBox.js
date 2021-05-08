import React from 'react';
import './../Assets/_css.scss'

class SongBox extends React.Component {
    constructor(props) {
        super(props);
        this.addSong = this.addSong.bind(this);
        this.removeSong = this.removeSong.bind(this)
    }

    addSong = (val) => {
        this.props.addSong(val);
    }

    removeSong = (val) => {
        this.props.removeSongs(val);
    }

    render() {
        const songs = this.props.songData ? this.props.songData.map((songDetails) => {
            return (
                <div key={songDetails.id} className="card mb-4 animate-zoom transform">
                    <div style={{ backgroundColor: "rgb(242, 242, 242)" }}>
                        <div className="row no-gutters">
                            <div className="col-md-2">
                                <img src={songDetails.thumbnailUrl} className="card-img " alt="album art" />
                            </div>
                            <div className="col-md-8 pt-md-6 pt-sm-1">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <span><strong>Title :</strong> </span> {songDetails.title}
                                    </h5>
                                    <h6 className="card-subtitle text-muted  pt-md-1 pt-sm-1 ">
                                        <span><strong>Album : </strong></span>
                                        {songDetails.ablumName}
                                    </h6>
                                    <p className="card-text pt-md-1 pt-sm-1">
                                        <strong>Playtime : </strong>{Math.floor(Math.random() * 9) + 1}:{Math.floor(Math.random() * (59 - 10 + 1)) + 10}
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-2 px-auto pt-md-6 pt-sm-1 mb-2 ">
                                {this.props.remove ?
                                    <button variant="light" className="Button mt-md-5 pt-md-6 pt-sm-1 pb-sm-1"
                                        onClick={() => this.removeSong(songDetails)}>
                                        <i className="fa fa-minus-circle"></i> Remove
                                    </button> : ""}
                                {this.props.add ?
                                    <button variant="light" className="Button mt-md-5 pt-md-6 pt-sm-1 pb-sm-1"
                                        onClick={() => this.addSong(songDetails)}>
                                        <i className="fa fa-plus-circle"></i> Add Song
                                    </button> : ""}
                                {this.props.allsongs ?
                                    <button variant="light" className="Button mt-md-5 pt-md-6 pt-sm-1 pb-sm-1">
                                        <i className="fa fa-play-circle"></i> Play Now
                                    </button> : ""}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }) : ""
        return (
            <div className="container animatecss">
                <div className="justify-content-md-center">
                    <div className="row">
                        <div className="container">
                            {songs}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SongBox;