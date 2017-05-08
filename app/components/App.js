'use strict';

import React, { Component } from 'react';
 import _ from "lodash";

import AsyncGoogleMap from './Map'

import {
	google
} from "react-google-maps";

import Api from '../requests/api';

export default class App extends Component {
	constructor(){
		super();
		this.handleMapLoad = this.handleMapLoad.bind(this);
		this.getRoutes = this.getRoutes.bind(this);
		
		this.state = {
			markers : [],
			lines : {},
			loading: false
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
				name: "OrderID" + order.order_id,
				duration: 5 // don't know what this is
			}
		});
		this.setState({loading: true});
		Api.getRoutes(service)
			.then(res=> {
				const lines = res.data.polylines;
				//console.log('poly-lines',lines);
				this.setState(function(prevState) {
					return {
						...prevState,
						loading: false,
						lines: lines
					};
				});
			})
			.catch((err)=> {
				console.log(err);
				this.setState({loading:false})
			} )
	}
	componentDidMount(){
		Api.fetchMarkers()
		.then(data => {
			this.setState(function(prevState) {
				return {
					...prevState,
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
					onMapClick={this.handleMapClick}
					markers={markers}
				    lines={this.state.lines}
					/>
				{ this.state.loading ? <p>Loading...</p> :
					<button type="button"
					        style={{'marginTop': '10px'}}
					        onClick={ this.getRoutes}>Generate Routes</button>
				}
			</div>
		)
	}
}
