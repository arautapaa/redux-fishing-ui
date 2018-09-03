import { takeLatest } from "redux-saga";
import { fork } from "redux-saga/effects";
import { getAllDraughts, getAllSelections, saveNewDraught, getDraught, updateDraught, deleteDraught } from './draughts.js';
import { getPlaces, savePlace } from './places.js';

// main saga generators
export function* sagas() {
	yield [
		fork(takeLatest, 'DRAUGHTS_GET_ALL', getAllDraughts),
  		fork(takeLatest, 'SELECTIONS_GET_ALL', getAllSelections),
  		fork(takeLatest, 'SAVE_NEW_DRAUGHT', saveNewDraught),
  		fork(takeLatest, 'GET_DRAUGHT', getDraught),
  		fork(takeLatest, 'UPDATE_DRAUGHT', updateDraught),
  		fork(takeLatest, 'DELETE_DRAUGHT', deleteDraught),
  		fork(takeLatest, 'GET_PLACES', getPlaces),
  		fork(takeLatest, 'SAVE_PLACE', savePlace)
  	]
  }
