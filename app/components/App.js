'use strict';

import React, { Component } from 'react';
 import _ from "lodash";

import AsyncGoogleMap from './Map'
import Api from '../requests/api';

export default class App extends Component {
	constructor(){
		super();
		this.handleMapLoad = this.handleMapLoad.bind(this);
		this.getRoutes = this.getRoutes.bind(this);
		
		this.state = {
			markers : []
		}
	}
	handleMapLoad(map) {
		this._mapComponent = map;
		if (map) {
			// test if working
			//console.log(map.getZoom());
		}
	}
	getRoutes(vehiclesNum){
		// vehiclesNum to enable deciding fleetSize
		 const service = this.state.markers.map((order)=>{
			return {
				lat: order.delivery_latitude,
				lng: order.delivery_longitude,
				id: order.order_id,
				name: order.order_id,
				duration: 5 // don't know what this is
			}
		});
		Api.getRoutes(service)
			.then((res)=> console.log('whats happening, expecting ROUTES back',res))
	}
	componentDidMount(){
		Api.fetchMarkers()
		.then(data => {
			this.setState(function() {
				return {
					markers: data
				};
			});
		});
	}
	render() {
		const markers = this.state.markers.map(m=> { return {
			...m,
			position: {
				lat:  m.delivery_latitude,
				lng:  m.delivery_longitude
			}
		}
		});
		return (
			<div style={{ 'height' : '90vh'}}>
				<AsyncGoogleMap
					googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCwTJcSPTo9_Cd3fMWX16wriM1G9bcgrOA"
					loadingElement={<div style={{ height: `100%` }}></div>}
					containerElement={<div style={{ height: `100%` }}></div>}
					mapElement={<div style={{ height: `100%` }}></div>}
					onMapLoad={this.handleMapLoad}
					onMapClick={_.noop}
					markers={markers}
					/>
				<button type="button"
				        style={{ 'marginTop' : '10px'}}
				        onClick={() => this.getRoutes()}>Generate Routes</button>
			</div>
		)
	}
}
