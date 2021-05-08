import React from 'react';
import { GET_REQUEST } from '../../util';
import Spinner from '../Spinner/Spinner.js';
import SearchBox from '../SearchBox/SearchBox.js'
import SongBox from '../SongBox/SongBox.js'

class AllSongs extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            spinner: true,
            pictures: [],
            picturesBkp: [],
            search: ""
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.getAlbumData()
    }

    componentWillUnmount() {
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
            var finalDataArray = photoVals.slice(0, 100)
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

    searchBoxChange = (e) => {
        var searchtext = e.target.value
        this.setState({ search: searchtext })
        this.filterSearchBox(searchtext)
    }

    filterSearchBox = (searchtext) => {
        var allSongs = this.state.picturesBkp
        var filteredSongs = allSongs.filter(item => {
            return item.title.toLowerCase().indexOf(searchtext.toLowerCase()) > -1
        })
        this.setState({ pictures: filteredSongs, searchDataCount: filteredSongs.length })
    }

    render() {
        const { spinner, pictures } = this.state;
        return (
            <React.Fragment>
                <SearchBox
                    searchBoxText={this.state.search}
                    searchBoxChange={this.searchBoxChange}
                    searchDataCount={this.state.searchDataCount}
                />
                <SongBox
                    songData={pictures}
                    remove={false}
                    add={false}
                    allsongs={true}
                />
                <Spinner
                    showSpinner={spinner}
                />
            </React.Fragment>
        )
    }
}

export default AllSongs;