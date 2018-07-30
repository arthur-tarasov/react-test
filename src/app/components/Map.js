import React from 'react';
//import axios from "axios";

import { connect } from 'react-redux';
import { getPlaces, postPlaces, addPlace} from "../actions/PlacesActions";
import pluralize from 'pluralize';

@connect((store)=> {
    return {
        markers: store.places.markers,
        newMarkers: store.places.newMarkers
    }
})
export class Map extends React.Component {

    constructor() {
        super();
        var coords = localStorage.getItem("coords");
        var currCoords = JSON.parse(coords);
        //var service = null;
        this.state = {
            lat: currCoords.lat,
            lng: currCoords.lng,
            //markers: [],
            //newMarkers: [],
            selectedPlaces:[],
            map: null,
            placeTypes: [
                "pharmacy", "gas_station", "school", "restaurant"
            ],
            typeValue: "",
            service: null
        };

        this.postPlaces = this.postPlaces.bind(this)
        this.getPlaces = this.getPlaces.bind(this)
        this.placeServiceCallback = this.placeServiceCallback.bind(this)
        this.onSelectTypesChange = this.onSelectTypesChange.bind(this)

    }

    initMap() {
        this.state.map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: this.state.lat, lng: this.state.lng},
            zoom: 13,
            mapTypeId: 'roadmap',
        });

        this.state.service = new window.google.maps.places.PlacesService(this.state.map);
        /*this.state.service.nearbySearch({
            type: [this.state.typeValue],
            location: {lat: this.state.lat, lng: this.state.lng},
            radius: 3500,
        }, this.placeServiceCallback.bind(this));*/




        //current position marker
        this.addMarker({
            coords:{lat: this.state.lat, lng: this.state.lng},
            image:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
        });

        this.state.map.addListener('zoom_changed', () => {
            this.setState({
                zoom: this.state.map.getZoom(),
            });
        });

        this.state.map.addListener('maptypeid_changed', () => {
            this.setState({
                maptype: this.state.map.getMapTypeId(),
            });
        });
        this.state.map.addListener('click', (event) => {

            this.addMarker({coords: event.latLng});
            this.props.dispatch(addPlace(event.latLng));
            console.log(this.props.newMarkers);
        });
    }
    componentDidMount() {
        this.initMap();

    }
    setMapOnAll(map) {
        for (var i = 0; i < this.state.selectedPlaces.length; i++) {
            this.state.selectedPlaces[i].setMap(map);
        }
    }

    // Removes the markers from the map, but keeps them in the array.
    clearMarkers() {
        this.setMapOnAll(null);
    }


    // Deletes all markers in the array by removing references to them.
    deleteMarkers() {
        this.clearMarkers();
        this.state.selectedPlaces.slice(this.state.selectedPlaces.length + 1);
        this.state.selectedPlaces = [];
    }
    placeServiceCallback(results, status) {
        var infowindow = new window.google.maps.InfoWindow();
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                //console.log(results[i]);

                let marker = new window.google.maps.Marker({
                    map: this.state.map,
                    position: results[i].geometry.location,
                    vicinity: results[i].vicinity,
                    name: results[i].name
                });

                //this.state.selectedPlaces.push(marker);


                this.setState(prevState => ({
                    selectedPlaces: [...prevState.selectedPlaces, marker]
                }));
                google.maps.event.addListener(marker, 'click', () => {
                    infowindow.setContent('<div><strong>' + marker.name + '</strong><br>' +
                        '<p>' + marker.vicinity + '</p>' +
                        '</div>');
                    infowindow.open(this.state.map, marker);
                });



            }
        }
    }
    searchPlaces(type) {
        this.state.service.nearbySearch({
            type: [type],
            location: {lat: this.state.lat, lng: this.state.lng},
            radius: 3500,
        }, this.placeServiceCallback.bind(this));
    }
    onSelectTypesChange(event) {
        this.setState({typeValue: event.target.value});
        this.deleteMarkers();
        this.searchPlaces(event.target.value);

    }
    addMarker(props) {

        let marker = new window.google.maps.Marker({
            map: this.state.map,
            position: props.coords,
        });
        if(props.image){
            marker.setIcon( props.image);
        }
    }
    postPlaces() {

        if(this.props.newMarkers.length > 0)
            this.props.dispatch(postPlaces(this.props.newMarkers));

        /*if (this.state.newMarkers.length > 0)
            axios.post('http://react-laravel.local/api/places',this.state.newMarkers)
                .then((response) => {
                    this.setState({
                        newMarkers: []
                    });
                })
                .catch((e) => {
                    console.log(e);
                })*/
    }
    async getPlaces() {
        await this.props.dispatch(getPlaces({map:this.state.map}));

        this.props.markers.forEach((item) => {
            this.addMarker({coords: {lat:Number.parseFloat( item.lat), lng:Number.parseFloat( item.lng)}});
        })
    }
    /*getPlaces() {
        axios.get('http://react-laravel.local/api/places')
            .then((response) => {
                this.setState({
                    markers: response.data
                });
                this.state.markers.forEach((item) => {
                    this.addMarker({coords: {lat:Number.parseFloat( item.lat), lng:Number.parseFloat( item.lng)}});
                })
            })
            .catch((e) => {
                console.log(e);
            })
    }*/
    deletePlaces() {
        this.state.map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: this.state.lat, lng: this.state.lng},
            zoom: 13,
            mapTypeId: 'roadmap',
        });
        this.addMarker({coords:{lat: this.state.lat, lng: this.state.lng}, image:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'});

        this.state.map.addListener('zoom_changed', () => {
            this.setState({
                zoom: this.state.map.getZoom(),
            });
        });

        this.state.map.addListener('maptypeid_changed', () => {
            this.setState({
                maptype: this.state.map.getMapTypeId(),
            });
        });
        this.state.map.addListener('click', (event) => {
            // Add marker
            this.addMarker({coords: event.latLng});
            this.props.dispatch(addPlace(event.latLng));
            console.log(this.props.newMarkers);
        });
    }

    render() {
        const { placeTypes } = this.state;
        const mappedPlaceTypes = placeTypes.map((placeType,i) => <option key={i} value={placeType}>{pluralize.plural(placeType)}</option>)
        return (
            <div >
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="col-md-4 ">
                            <button className="btn bnt-default" onClick={this.postPlaces.bind(this)}>Save</button>
                            <button className="btn bnt-default" onClick={this.getPlaces.bind(this)}>Show</button>
                            <button className="btn bnt-default" onClick={this.deletePlaces.bind(this)}>Clear</button>

                        </div>
                        <div className="col-md-4 ">
                            <select className="form-control" value={this.state.typeValue} onChange={this.onSelectTypesChange.bind(this)} >
                                <option disabled selected value="">-- select an option --</option>
                                { mappedPlaceTypes }
                            </select>
                        </div>
                    </div>
                </div>

             <div id='map' style={{ height: `400px`, width:"100%", marginTop: "20px"}}></div>

            </div>
        );
    }
};

