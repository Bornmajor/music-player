import { View, Text ,ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useContext } from 'react'
import MusicContext from '../context/context'
import { FontAwesome } from '@expo/vector-icons';
import { styles } from '../styles/styles'
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import TrackPlayer, { useProgress,RepeatMode } from 'react-native-track-player';
import { Pressable } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';


const PlayerScreen = () => {
   
  const navigation = useNavigation();
  const {
    currentMusicTitle,setNxtMusic,
    setPrevMusic,pauseState,
    resumeCurrentMusic,pauseCurrentMusic,
    setRepeatModeOff,setRepeatModeQueue,setRepeatModeTrack,
    playBackState,playSpecificMusic,trackIndex,
    convertTime,seekCurrentMusic 
  } = useContext(MusicContext);
  const progress = useProgress();

  const [trackRepeatState,setTrackRepeatState] = useState();
  const [queueRepeatState,setQueueRepeatState] = useState(false);
  const [repeatState,setRepeatState] = useState(false);
  const [sliderValue,setSliderValue] = useState(progress.position);


useEffect(()=>{
  //allow title of current music to display when loaded
   navigation.setOptions({
    title:currentMusicTitle
   })

  //  console.log(RepeatMode.Off);

},[currentMusicTitle])

useEffect(()=>{
  //updates slider/seekbar based on current music playing
  setSliderValue(progress.position);
 // console.log(sliderValue)
},[progress.position])
   
//show what  repeat mode is actived
   const updateRepeatModeState = async () => {
      const repeatMode = await TrackPlayer.getRepeatMode();
      if(repeatMode === RepeatMode.Off){
     // Repeat mode is off.
       console.log('Off');
       setRepeatState(true);
       setQueueRepeatState(false);
       setTrackRepeatState(false);
  
      }else if(repeatMode === RepeatMode.Track){
  // Repeat mode current track on.
        setTrackRepeatState(true);
        setRepeatState(false);
        setQueueRepeatState(false);
     
   
      }else if(repeatMode === RepeatMode.Queue){
        //repeat mode  queue is one
        setQueueRepeatState(true);
        setRepeatState(false);
        setTrackRepeatState(false);
      };
    };

     useEffect(()=>{
      //show what  repeat mode is actived
      updateRepeatModeState();
   
     },[])
 



  return (
    <ScrollView  contentContainerStyle={{flex:1}}>

       <ScrollView>

       <View  style={styles.bigMusicIcon}>
       <FontAwesome name="music" size={200} color="black" style={{margin:5}} /> 
       </View>

       <View style={styles.UiContainer}>


      <View style={styles.shuffleContainer}>
        <Pressable style={{marginHorizontal:10}} onPress={() => {
        setRepeatModeOff();  
        updateRepeatModeState();
        }}>
        <Ionicons name="shuffle" size={30} color={repeatState ? "blue":"black"} />
        </Pressable>

        <Pressable style={{marginHorizontal:10}} onPress={() =>
           {
            setRepeatModeTrack();
            updateRepeatModeState();
            }}>
        <MaterialIcons name="repeat-one" size={30} color={trackRepeatState ? "blue":"black"} />
        </Pressable> 

        <Pressable style={{marginHorizontal:10}} onPress={() => 
        {
          setRepeatModeQueue()
          updateRepeatModeState();
        }
          }>
        <MaterialIcons name="repeat" size={30} color={queueRepeatState ? "blue":"black"} />
        </Pressable> 

      </View>
        


        <Text style={{fontSize:18,textAlign:'center'}}>{currentMusicTitle}</Text>

       
       
        <Slider
          style={{width: '100%', height: 40}}
           value={sliderValue}
           onValueChange={(v) => seekCurrentMusic(v)}
           minimumValue={0}
           maximumValue={progress.buffered}
        
        />

        <View style={styles.durationContainer}>

        <Text>{convertTime(progress.position)}</Text>
        <Text>{convertTime(progress.duration)}</Text> 

        </View>
        

        <View style={styles.playBackForward}>

      <Pressable style={{margin:15}} onPress={() => setPrevMusic()}>
      <Ionicons name="play-back" size={60} color="black" />
      </Pressable>

     {pauseState ? 

      <Pressable style={{margin:15}} onPress={() => playBackState !== 'paused'? playSpecificMusic(trackIndex)
      : resumeCurrentMusic()}>
      <Ionicons name="play" size={80} color="black" />
      </Pressable>
     : 
      <Pressable style={{margin:15}} onPress={() => pauseCurrentMusic()}>
      <Ionicons name="pause" size={80} color="black" />
      </Pressable>

     }
     

     


      <Pressable style={{margin:15}} onPress={() => setNxtMusic()}>
      <Ionicons name="play-forward" size={60} color="black" />  
      </Pressable>


        </View>

    



       </View>
       </ScrollView>

    </ScrollView>
  )
}


export default PlayerScreen