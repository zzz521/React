import React from 'react'; //编译jsx
import ReactDOM from 'react-dom'; 
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {Route,Switch,Redirect,BrowserRouter} from 'react-router-dom';
import reducers from './Reducers.js';
import './config.js';//运行config.js的代码，当作全局运行    
import Reg from './container/reg/reg.js'
import Login from './container/login/login.js'
import AuthRoute from './component/authroute/authroute.js'
import Bossinfo from './container/bossinfo/bossinfo.js'
import Niureninfo from './container/niureninfo/niureninfo.js'
import Dashboard from './component/dashboard/dashboard.js'
import Chat from './component/chat/chat.js'
import './index.css'


// import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
// const composeEnhancers = composeWithDevTools({
//     // options like actionSanitizer, stateSanitizer
//   });
//  const store = createStore(reducers, composeEnhancers(
//     applyMiddleware(thunk)
//   ));
// const store = createStore(reducers,composeWithDevTools(applyMiddleware(thunk)));

// const reduxDevtools = window.devToolsExtension ? window.devToolsExtension():f=>f

// const composeEnhancers =
//   typeof window === 'object' &&
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//       // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
//     }) : compose;

// const enhancer = composeEnhancers(
//   applyMiddleware(thunk),
//   // other store enhancers if any
// );
// const store = createStore(reducers, enhancer);

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducers,compose(
// // //     const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
//     applyMiddleware(thunk),
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__():f=>f
// // // //     reduxDevtools
// // // //     // window.__REDUX_DEVTOOLS_EXTENSION__?window.__REDUX_DEVTOOLS_EXTENSION__():f=>f
// ))

var store = createStore(reducers,applyMiddleware(thunk));

    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <AuthRoute></AuthRoute>
                    {/* <Login></Login> */}
                    <Switch>
                        <Route path='/login' component={Login}></Route>
                        <Route path='/reg' component={Reg}></Route>
                        <Route path='/bossinfo' component={Bossinfo}></Route>
                        <Route path='/niureninfo' component={Niureninfo}></Route>
                        <Route path='/chat/:user' component={Chat}></Route>
                        <Route component={Dashboard}></Route>
                    </Switch>
                    {/* <Redirect to='/dashboard'></Redirect> */}
                </div>
            </BrowserRouter>
        </Provider>,
        document.getElementById('root')

    )