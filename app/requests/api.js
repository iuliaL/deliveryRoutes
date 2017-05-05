'use strict';
/*
 * Keeping API requests organized
 * */

import makeRequest from './fetchHelper';
import data from './blob.json';

export default class Api {
	static fetchMarkers() {
		return Promise.resolve(data)
	}
}