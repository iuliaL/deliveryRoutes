import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {
	withGoogleMap,
	GoogleMap,
	Marker,
	Polyline
} from "react-google-maps";

import withScriptjs from "react-google-maps/lib/async/withScriptjs";

class AsyncGoogleMap extends Component{
		constructor(props){
			super(props);
		}
		componentWillReceiveProps(nextProps) {
			const lines = nextProps.lines;
			for (let key in lines) {
				lines[key] = google.maps.geometry.encoding.decodePath(lines[key])
			}

			let routes = [];
			for (let key in lines){
				if(lines.hasOwnProperty(key)){
					let currRoute = {key};
					currRoute.linePath = lines[key].map((item)=>({lat: item.lat() / 10, lng: item.lng() /10}));
					currRoute.strokeColor = getRandomColor();
					routes.push(currRoute);
				}
			}
			this.routes = routes;
			
		}
	
		render(){
			const { markers } = this.props;
			return (
				<GoogleMap
					ref={this.props.onMapLoad}
					defaultZoom={12}
					defaultCenter={{lat: 30.69886, lng: 76.85950}}
					onClick={this.props.onMapClick}
				>
					{markers.map(marker => (
						<Marker
							{...marker}
							key={marker.order_id}
						/>
					))}
					{ this.routes && this.routes.map(route => (
						<Polyline
							onClick={_.noop}
							onRightClick={_.noop}
							onDragStart={_.noop}
							key={route.key}
							path={route.linePath}
							options={ {
								strokeColor: route.strokeColor,
								strokeOpacity: 0.7, strokeWeight: 4
							} }
						
					/>))}
					
				</GoogleMap>
			)
	}
}
AsyncGoogleMap.defaultProps = {
	routes: [],
	markers: []
};

AsyncGoogleMap.propTypes ={
	markers: PropTypes.array.isRequired
};

export default withScriptjs(withGoogleMap(AsyncGoogleMap));



function getRandomColor() {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++ ) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}
