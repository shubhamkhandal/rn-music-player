import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import {addTrack, setupPlayer} from '../musicPlayerService';
import MusicPlayer from './screens/MusicPlayer';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);

  const setup = async () => {
    let isSetup = await setupPlayer();

    if (isSetup) {
      await addTrack();
    }
    setIsPlayerReady(isSetup);
  };

  useEffect(() => {
    setup();
  }, []);

  if (!isPlayerReady) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <MusicPlayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
