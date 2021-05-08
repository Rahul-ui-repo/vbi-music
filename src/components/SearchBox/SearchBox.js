import React from 'react';

class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.searchBoxChange = this.searchBoxChange.bind(this);
    }

    searchBoxChange(event) {
        this.props.searchBoxChange(event.target.value);
    }

    render() {
        return (
            <div className="container animatecss">
                <div className="justify-content-md-center">
                    <div className="row mb-4 mt-4">
                        <div className="container animate-zoom">
                            <div style={{ width: "100%" }}>
                                <input className="mb-3"
                                    type="text"
                                    className="form-control"
                                    name="searchBox"
                                    placeholder="&#128269; Search by song title ... "
                                    id="searchBox"
                                    autoFocus=""
                                    onChange={this.props.searchBoxChange}
                                    style={{ borderRadius: "1.5em" }}
                                    required
                                    autoComplete="off"
                                    value={this.props.searchBoxText}
                                />
                            </div>
                            {this.props.searchBoxText.length > 0 ?
                                <div className="mt-4" style={{ textAlign: "center" }}><strong>{this.props.searchDataCount} record(s) found </strong></div>
                                : ""}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchBox;