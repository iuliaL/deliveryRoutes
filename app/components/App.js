'use strict';

import React, { Component } from 'react';
 import _ from "lodash";

import AsyncGoogleMap from './Map'
import Api from '../requests/api';

export default class App extends Component {
	constructor(){
		super();
		this.handleMapLoad = this.handleMapLoad.bind(this);
		this.state = {
			markers : []
		}
	}
	handleMapLoad(map) {
		this._mapComponent = map;
		console.log('MAP COMPONENT', this._mapComponent)
		if (map) {
			// test if working
			console.log(map.getZoom());
		}
	};
	componentDidMount(){
		Api.fetchMarkers()
		.then(data => {
			this.setState(function() {
				return {
					markers: data.map(m=> { return {
						...m,
						position: {
							lat:  m.delivery_latitude,
							lng:  m.delivery_longitude
						}
					}
					})
				};
			});
			console.log('MARKERS', this.state.markers)
		});
	}
	render() {
		const markers = this.state.markers;
		console.log('rendering', this.state);
		return (
			<div style={{ 'height' : '100vh'}}>
				<AsyncGoogleMap
					googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCwTJcSPTo9_Cd3fMWX16wriM1G9bcgrOA"
					loadingElement={<div style={{ height: `100%` }}></div>}
					containerElement={<div style={{ height: `100%` }}></div>}
					mapElement={<div style={{ height: `100%` }}></div>}
					onMapLoad={this.handleMapLoad}
					onMapClick={_.noop}
					markers={markers}
					/>
				<button type="button">Generate Routes</button>
			</div>
		)
	}
}
