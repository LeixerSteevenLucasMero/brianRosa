import React, { Component } from "react";
import GoogleMaps from "simple-react-google-maps";
export default class Maps extends Component{
    render() {
        return(
            <div >
                <GoogleMaps
                apiKey={"AIzaSyBqZH0EqUaEFsrK4hDjPJUpqvqMZbRpknw"}
                    style={{height: "470px",width: "450px"}}
                    zoom ={10}
                    center={{
                        lat:-0.9520764214938183,
                        lng: -80.70639545266977,
                    }}
                    markers={[{
                        lat:-0.9520764214938183,
                        lng: -80.70639545266977, }]}
                />
            </div>
        );
        
    }
    
}