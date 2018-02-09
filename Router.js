// import React from 'react';
// import { Scene, Router, Actions } from 'react-native-router-flux';
// import AuthScreen from './src/screens/AuthScreen';
// import GeneticScreen from './src/screens/GeneticScreen';
// import HomeScreen from './src/screens/HomeScreen';
//
// const RouterComponent = () => {
//   return (
//     <Router sceneStyle={{ paddingTop: 60 }}>
//       <Scene key='root' hideNavBar>
//         <Scene key='login'>
//           <Scene key='auth' component={AuthScreen} initial hideNavBar />
//         </Scene>
//         <Scene key='main' hideNavBar>
//           <Scene
//             onRight={() => Actions.genetic()}
//             rightTitle='Add'
//             key='home'
//             component={HomeScreen}
//             title='Genetics'
//             hideNavBar
//           />
//           <Scene key='genetic' component={GeneticScreen} hideNavBar />
//         </Scene>
//       </Scene>
//     </Router>
//   )
// }
//
// export default RouterComponent;
