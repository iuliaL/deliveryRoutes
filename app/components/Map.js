import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {
	withGoogleMap,
	GoogleMap,
	Marker
} from "react-google-maps";

import withScriptjs from "react-google-maps/lib/async/withScriptjs";


const AsyncGoogleMap = props =>{
		const { markers } = props;
		console.log('markers', markers);
		return (
			<GoogleMap
				ref={props.onMapLoad}
				defaultZoom={11}
				defaultCenter={{lat: 30.66386, lng: 76.85830}}
				onClick={props.onMapClick}
			>
				{markers.map(marker => (
					<Marker
						{...marker}
						key={marker.order_id}
					/>
				))}
			</GoogleMap>
		)
	};

AsyncGoogleMap.propTypes ={
	markers: PropTypes.array.isRequired
};

export default withScriptjs(withGoogleMap(AsyncGoogleMap));