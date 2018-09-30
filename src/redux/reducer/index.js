/**
 * reducer
 */

  import { combineReducers } from 'redux'
  import { type } from '../action'
  const ebikeData = (state, action) => {
    switch (action.type) {
      case type.SWITCH_MENU:
        return {
          ...state, //原有数据状态
          menuName: action.menuName // 新的数据
        }
      default: 
        return {...state}  
    }
  }

  export default ebikeData