import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {
	withGoogleMap,
	GoogleMap,
	Marker
} from "react-google-maps";

import withScriptjs from "react-google-maps/lib/async/withScriptjs";


// todo make this functional stateless comp
class AsyncGoogleMap extends Component {
	constructor(props){
		super(props);
	}
	render(){
		console.log('Async props', this.props);
		const { markers } = this.props;
		return (
			<GoogleMap
				ref={this.props.onMapLoad}
				defaultZoom={11}
				defaultCenter={{lat: 30.66386, lng: 76.85830}}
				onClick={this.props.onMapClick}
			>
				{markers.map(marker => (
					<Marker
						{...marker}
						key={marker.order_id}
					/>
				))}
			</GoogleMap>
		)
	}
}
AsyncGoogleMap.propTypes ={
	markers: PropTypes.array.isRequired
};

export default withScriptjs(withGoogleMap(AsyncGoogleMap));