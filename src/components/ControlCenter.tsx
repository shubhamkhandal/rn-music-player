import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ControlCenter = () => {
  const playBackState = usePlaybackState();

  const SkipToNext = async () => {
    await TrackPlayer.skipToNext();
  };
  const SkipToPrev = async () => {
    await TrackPlayer.skipToPrevious();
  };

  const togglePlayback = async (playback: any) => {
    const currrentTrack = await TrackPlayer.getActiveTrackIndex();

    if (currrentTrack !== null) {
      if (playback.state === State.Paused || playback.state === State.Ready) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  return (
    <View style={Styles.container}>
      <Pressable onPress={() => SkipToPrev()}>
        <Icon style={Styles.icon} name="skip-previous" size={40} />
      </Pressable>
      <Pressable onPress={() => togglePlayback(playBackState)}>
        <Icon
          style={Styles.icon}
          name={playBackState.state === State.Playing ? 'pause' : 'play-arrow'}
          size={75}
        />
      </Pressable>
      <Pressable onPress={() => SkipToNext()}>
        <Icon style={Styles.icon} name="skip-next" size={40} />
      </Pressable>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    marginBottom: 56,

    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: '#FFFFFF',
  },
  playButton: {
    marginHorizontal: 24,
  },
});

export default ControlCenter;
