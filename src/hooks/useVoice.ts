import { useState } from 'react';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';

export function useVoice() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

  const startListening = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) return;

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsListening(true);
    } catch (e) {
      console.error(e);
    }
  };

  const stopListening = async (): Promise<string> => {
    try {
      if (!recording) return '';
      await recording.stopAndUnloadAsync();
      setIsListening(false);
      setRecording(null);
      return 'تم التسجيل';
    } catch (e) {
      return '';
    }
  };

  const speak = (text: string) => {
    setIsSpeaking(true);
    Speech.speak(text, {
      language: 'ar-SA',
      pitch: 1.0,
      rate: 0.9,
      onDone: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  const stopSpeaking = () => {
    Speech.stop();
    setIsSpeaking(false);
  };

  return { isListening, isSpeaking, startListening, stopListening, speak, stopSpeaking };
}
