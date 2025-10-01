import * as HapticsExpo from 'expo-haptics';

class Haptics {
  static impactLight() {
    (async () =>
      HapticsExpo.impactAsync(HapticsExpo.ImpactFeedbackStyle.Light))();
  }

  static impactMedium() {
    (async () =>
      HapticsExpo.impactAsync(HapticsExpo.ImpactFeedbackStyle.Medium))();
  }

  static impactHeavy() {
    (async () =>
      HapticsExpo.impactAsync(HapticsExpo.ImpactFeedbackStyle.Heavy))();
  }

  static impactRigid() {
    (async () =>
      HapticsExpo.impactAsync(HapticsExpo.ImpactFeedbackStyle.Rigid))();
  }

  static impactSoft() {
    (async () =>
      HapticsExpo.impactAsync(HapticsExpo.ImpactFeedbackStyle.Soft))();
  }

  static impactError() {
    (async () =>
      HapticsExpo.notificationAsync(
        HapticsExpo.NotificationFeedbackType.Error,
      ))();
  }

  static impactSuccress() {
    (async () =>
      HapticsExpo.notificationAsync(
        HapticsExpo.NotificationFeedbackType.Success,
      ))();
  }

  static notificationWarning() {
    (async () =>
      HapticsExpo.notificationAsync(
        HapticsExpo.NotificationFeedbackType.Warning,
      ))();
  }

  static notificationError() {
    (async () => HapticsExpo.selectionAsync())();
  }
}

export default Haptics;
