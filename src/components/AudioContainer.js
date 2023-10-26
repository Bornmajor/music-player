import { View, Text,Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '../styles/styles'
import { FontAwesome } from '@expo/vector-icons';
import { useContext } from 'react';
import MusicContext from '../context/context';

const AudioContainer = ({title,url,id,duration}) => {
   
   //audio card display in list screen

   const {playSpecificMusic,convertTime} = useContext(MusicContext);
    
   
  return (
    <Pressable style={styles.audioContainer} onPress={() => playSpecificMusic(id) }>
      <View style={{flexDirection:'row'}}>
        <FontAwesome name="music" size={30} color="black" style={{margin:5}} />
      <Text style={{fontSize:17,margin:5}} ellipsizeMode='tail' numberOfLines={1}>{title}</Text>  
      </View>
      <Text style={{marginHorizontal:10}}>{convertTime(duration)}</Text>
    
    
    </Pressable>
  )
}

export default AudioContainer