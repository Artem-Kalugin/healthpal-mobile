import * as HapticsExpo from 'expo-haptics';

class Haptics {
  static impactLight() {
    HapticsExpo.impactAsync(HapticsExpo.ImpactFeedbackStyle.Light);
  }

  static impactMedium() {
    HapticsExpo.impactAsync(HapticsExpo.ImpactFeedbackStyle.Medium);
  }

  static impactHeavy() {
    HapticsExpo.impactAsync(HapticsExpo.ImpactFeedbackStyle.Heavy);
  }

  static impactRigid() {
    HapticsExpo.impactAsync(HapticsExpo.ImpactFeedbackStyle.Rigid);
  }

  static impactSoft() {
    HapticsExpo.impactAsync(HapticsExpo.ImpactFeedbackStyle.Soft);
  }

  static impactError() {
    HapticsExpo.notificationAsync(HapticsExpo.NotificationFeedbackType.Error);
  }

  static impactSuccess() {
    HapticsExpo.notificationAsync(HapticsExpo.NotificationFeedbackType.Success);
  }

  static notificationWarning() {
    HapticsExpo.notificationAsync(HapticsExpo.NotificationFeedbackType.Warning);
  }
}

export default Haptics;
