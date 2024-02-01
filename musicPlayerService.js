import TrackPlayer, {Event, RepeatMode} from 'react-native-track-player';
import {PlayListData} from './src/constants';

export async function setupPlayer() {
  let isSetup = false;

  try {
    await TrackPlayer.getActiveTrack();
    isSetup = true;
  } catch (err) {
    await TrackPlayer.setupPlayer();
    isSetup = true;
  } finally {
    return isSetup;
  }
}

export async function addTrack() {
  try {
    await TrackPlayer.add(PlayListData);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
  } catch (err) {
  } finally {
    return;
  }
}

export async function playbackService() {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    TrackPlayer.skipToNext();
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    TrackPlayer.skipToPrevious();
  });
}
