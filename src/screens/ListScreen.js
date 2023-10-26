import { View, Text,ScrollView, FlatList } from 'react-native'
import React, { useCallback, useEffect,useState } from 'react'
import AudioContainer from '../components/AudioContainer'
import * as MediaLibrary from 'expo-media-library';
import { Pressable } from 'react-native';
import MyButton from '../components/MyButton';
import { useContext } from 'react';
import TrackPlayer,{State} from 'react-native-track-player';
import BottomPlayer from '../components/BottomPlayer';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const ListScreen = () => {
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
    const [perm,setPermStatus] = useState(true);
    const [tracks,setTracks] = useState([]);
    const [n,setN] = useState('');
    const navigation = useNavigation();


  

    useEffect(()=>{
      //check if media permission allowed before fetching local audios
      checkPermissions()

      navigation.setOptions({
        headerRight:() =>(
          <Pressable style={{margin:10}} onPress={() => getAudioFiles()}>
            <Ionicons name="reload" size={24} color="white" />
          </Pressable>
        )
      })
    },[])


     //get all local audio files
    const getAudioFiles = async() =>{
    //using media library r(react native expo library to get all audio media content)
    const countmedia = await MediaLibrary.getAssetsAsync({
        mediaType: "audio",
        });
    const totalmedia = countmedia.totalCount;
        const media = await MediaLibrary.getAssetsAsync({
        mediaType: "audio",
        first: totalmedia
        });
       // console.log(media.assets);

       //map a new array with url,title,duration,id this properties are require 
       //before add tracks to trackplayer
        const audioFiles = media.assets.map(obj => ({
            url:obj.uri,
            title:obj.filename,
            duration:obj.duration,
            id:obj.id
          
        }))
       //reset trackplayer if intial track exist 
        await TrackPlayer.reset();
        //add local audio to track player
        await TrackPlayer.add(audioFiles,);


        const trackList = await TrackPlayer.getQueue();  
        //state array of tracks add 
        setTracks(trackList);
        //change permission state to ttrue if media permission allowed
        setPermStatus(true);
        setN('ok');
         //console.log(tracks);
    }



    //check if media permission is allowed
    const checkPermissions = async() =>{
    console.log('Check permission');
    const permissions = await MediaLibrary.getPermissionsAsync();
    const permissionStatus = permissions.status;

    if (permissionStatus === 'granted') {
      //change permission state to ttrue if media permission allowed
        setPermStatus(true)
        //get all local audio files
        getAudioFiles();
       console.log('granted')
       
        // The user has granted the app permission to access their media library.
      }else{
        setPermStatus(false);
        askForPermission();
      }
    }

    //display permission prompt from app to allow user accept
    const askForPermission = async() =>{
      const permission = await MediaLibrary.requestPermissionsAsync();
     if (permission.granted){
      //is permission granted allow fetching of local audios
     getAudioFiles();
     setPermStatus(false);
     }

     
        
    }
 
  return (
    <View style={{flex:1}}>

       {perm ?
     <>
       <FlatList
       
        data={tracks}
        keyExtractor={item => item.id}
        renderItem={({item,index}) =>{
         
          return(
            <AudioContainer title={item.title} id={index} duration={item.duration} />
          )
        }}

       />
     
       <BottomPlayer />
     </>
    
       :
       <View style={{alignItems:'center',justifyContent:'center',margin:40}}>
            <Text style={{fontSize:18,textAlign:'center'}}>You need to allow permission to play audio files</Text>
            <MyButton title='Allow permission' fn={() => checkPermissions()}/>
         </View> 
        } 
     
       
    
     
    </View>
  )
}

export default ListScreen
