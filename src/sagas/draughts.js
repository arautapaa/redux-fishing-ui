import { call, put } from "redux-saga/effects";
import DraughtAPI from "../api/draughts";

// fetch the user's list
export function* getAllDraughts(action) {
  // call the api to get the users list
  const draughts = yield call(DraughtAPI.getAllDraughts);

  // save the users in state
  yield put({
    type: 'DRAUGHTS_LIST_SAVE',
    draughts: draughts,
  });
}

export function* getDraught(action) {
  const draught = yield call(DraughtAPI.getDraught, action.id);

  yield put({
    type: 'DRAUGHT_ADD',
    draught: draught
  })
}


export function* saveNewDraught(action) {
  const draught = yield call(DraughtAPI.saveDraught, action.draught);

  yield put({
    type: 'SAVE_DRAUGHT',
    draught: draught
  })
};

export function* getAllSelections(action) {
	const selections = yield call(DraughtAPI.getAllSelections);

	yield put({
		type : 'SELECTIONS_LIST_SAVE',
		selections : selections
	});
}

export function* updateDraught(action) {
  const updated = yield call(DraughtAPI.updateDraught, action.id, action.data);

  yield put({
    type : 'DRAUGHT_UPDATED',
    draught : {...updated, id : action.id} 
  });
}


export function* deleteDraught(action) {
  const update = yield call(DraughtAPI.deleteDraught, action.id);

  yield put({
    type : 'DRAUGHT_DELETED'
  });
}
