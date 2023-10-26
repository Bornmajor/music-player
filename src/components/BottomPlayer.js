import { View, Text,Pressable } from 'react-native'
import React, { useEffect } from 'react'
import TrackPlayer, { State } from 'react-native-track-player';
import { useState } from 'react';
import { styles } from '../styles/styles';
import { FontAwesome } from '@expo/vector-icons';
import { useContext } from 'react';
import MusicContext from '../context/context';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

//bottom player on list screen whith pause and play btn also display current audio
const BottomPlayer = () => {

    const {currentMusicTitle,pauseState,
      bottomPlayerVisible,setPauseState,
      resumeCurrentMusic,pauseCurrentMusic,
    } = useContext(MusicContext);

    const navigation = useNavigation();

  

  return (
    <Pressable style={[styles.bottomSheet,{display: bottomPlayerVisible ?'flex': 'none'}]} onPress={() =>navigation.navigate('player')}>
         <FontAwesome name="music" size={30} color="white" style={{margin:5}} />
         <Text style={{fontSize:18,margin:5,color:'white',maxWidth:200}} ellipsizeMode='tail' numberOfLines={1}
         >{currentMusicTitle}
         </Text>
         {pauseState ?
         <Pressable onPress={() =>resumeCurrentMusic()} style={{padding:10}}>
          <Ionicons name="play-sharp" size={30} color="white" />
          </Pressable>
         :
          <Pressable onPress={() =>  pauseCurrentMusic()} style={{padding:10}}>
            <MaterialIcons name="pause" size={32} color="white"/>
         </Pressable>
         }
        
    </Pressable>
  )
}

export default BottomPlayer