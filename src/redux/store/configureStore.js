// 引入createStore创建store，引入applyMiddleware 来使用中间件
import { createStore, applyMiddleware } from 'redux'
import reducer from './../reducer' // 引入所有的reducer
import { composeWithDEvTools } from 'redux-devtools-extension'
const initialState = {
  menuName: '首页'
}
const configureStore = () => createStore(reducer, initialState)

export default configureStore
