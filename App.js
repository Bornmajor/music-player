import { StatusBar } from 'expo-status-bar';
import StackNav from './src/navigation/StackNav';
import {MusicContextProvider} from './src/context/context';
import TrackPlayer,{Event} from 'react-native-track-player';
import { useEffect } from 'react';


export default function App() {
   

  useEffect(()=>{
   //registering background services to allow audio to play in background
  TrackPlayer.registerPlaybackService(() => require('./service.js'));
  //Set up player react native track player
  TrackPlayer.setupPlayer();

 
  },[])


  return (
    //Music context 
    <MusicContextProvider>
      <StatusBar backgroundColor='#626873'/>
       <StackNav />
    </MusicContextProvider>
    
  );
}


