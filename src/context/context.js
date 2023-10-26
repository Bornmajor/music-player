import { createContext,useEffect,useState, } from "react";
import TrackPlayer, { State,Event,RepeatMode } from 'react-native-track-player';
import { useTrackPlayerEvents } from "react-native-track-player";
import { ToastAndroid } from "react-native";

//create music context
const MusicContext = createContext();

export const MusicContextProvider = (props) =>{

  

    const [appTheme,setAppTheme] = useState('#626873');
    const [bottomPlayerVisible,setBottomPlayerVisible] = useState(false);
    const [pauseState,setPauseState] = useState(true);
    const [currentMusicTitle,setCurrentMusicTitle] = useState('loading');
    const [playBackState,setCurrentPlayBackState] = useState('');
    const [trackIndex,setTrackIndex] = useState();


    //executes when playback changes
    useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
        if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
            const track = await TrackPlayer.getTrack(event.nextTrack);

            const {title} = track || {};
            setCurrentMusicTitle(title);  //updating current music title
            let trackindex = await TrackPlayer.getActiveTrackIndex();
            setTrackIndex(trackindex);

        }
    });

    //execute when playback state changes
    useTrackPlayerEvents([Event.PlaybackState],async event =>{
        if(event.type === Event.PlaybackState){
            const state = await TrackPlayer.getState();
            if (state === State.Playing) {
                console.log('The player is playing');
                setPauseState(false);
                
            }else if(state === State.Paused){
                setPauseState(true);
            }else if(state === State.Ended){
                
                setPauseState(true);
            }
            
            setCurrentPlayBackState(state);
            console.log(state);
        //    console.log('Playback state changed');  
        }
       
    });

    //function the plays a specific audio from queue
    const playSpecificMusic = async (id) =>{
     //   await TrackPlayer.reset();
        await TrackPlayer.skip(id);
        // console.log(id);
       
        await TrackPlayer.play();

          setBottomPlayerVisible(true);
          setPauseState(false);

  
          //get track title
         // let trackIndex = await TrackPlayer.getCurrentTrack();
          let trackObject = await TrackPlayer.getTrack(id);
         //r setCurrentMusicTitle(trackObject.title);
          console.log(trackObject.title)
        
      }

  
     //resume audio which was paused
      const resumeCurrentMusic = async()=>{
        if(playBackState === 'ended'){
         await TrackPlayer.retry();
        }else if(playBackState === 'paused'){
         await TrackPlayer.play();    
        }
       
       //console.log('resume');
      
      }
    //pause current playing music
      const pauseCurrentMusic = async () =>{
         await TrackPlayer.pause();
         // console.log('pause');
      

      }

       //seeking music executed via slider/seekbar
      const seekCurrentMusic = async (value) =>{
       await TrackPlayer.seekTo(value);
       console.log(`Seek - ${value}`)
      

      }

      //skip to next music in queue
      const setNxtMusic = async() =>{
        await TrackPlayer.skipToNext();
        await TrackPlayer.play();

      }

      //skip to previous music in queue
      const setPrevMusic = async () =>{
        await TrackPlayer.skipToPrevious();
        await TrackPlayer.play();
      }


      //show toast msg used by repeatmode
        const showToast = (msg) => {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
      };

     //set repeat mode off
      const setRepeatModeOff = async() =>{
     
       await TrackPlayer.setRepeatMode(RepeatMode.Off)
       showToast('Repeat mode turned Off');
      }


        //set repeat mode to track which repeat current playing music
      const setRepeatModeTrack = async() =>{
        await TrackPlayer.setRepeatMode(RepeatMode.Track)
        showToast('Repeat current music');

      }

       //set repeat mode to queue repeats queue
      const setRepeatModeQueue = async() =>{
        await TrackPlayer.setRepeatMode(RepeatMode.Queue);
        showToast('Repeat queue');
      }

     //convert duration time to mins
      const convertTime = (min)=> {
        if(min){
          const hrs = min/60;
          const minute = hrs.toString().split('.')[0];
          const percent = parseInt(hrs.toString().split('.')[1].slice(0,2));
          const sec = Math.ceil((60 * percent) /100);
    
          if(parseInt(minute)< 10 && sec < 10){
            return `${minute}:${sec}`;
          }
          if(parseInt(minute) < 10){
            return `${minute}:${sec}`;
          }
          if(sec <10){
            return `${minute}:${sec}`;
          }
          return `${minute}:${sec}`;
        }
      };
    
      

     



    

    return(
        <MusicContext.Provider 
         value={{
        appTheme,playSpecificMusic,
        currentMusicTitle,
        pauseState,setPauseState,
        resumeCurrentMusic,pauseCurrentMusic,
        bottomPlayerVisible,setNxtMusic,setPrevMusic,
        setRepeatModeOff,setRepeatModeQueue,setRepeatModeTrack,
        playBackState,trackIndex,
        convertTime,seekCurrentMusic 
        }}>
          {props.children} 
        </MusicContext.Provider>
    )
}

export default MusicContext;