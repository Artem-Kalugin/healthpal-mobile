import { ReactElement, ReactNode } from 'react';
import { FlatListProps, ViewStyle } from 'react-native';

import DatePicker from 'react-native-date-picker';

import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { ImagePickerAsset } from 'expo-image-picker';

import { IButton } from '#ui-kit/Button';

import { AppParamList } from '#navigation/types';

import { ModalController } from '#hooks/utils/useModal';

export type UIActionModalButton = Partial<
  Omit<IButton, 'onPress'> & {
    onPress: (
      navigation: StackNavigationProp<AppParamList>,
      modal: ModalController,
    ) => void;
  }
>;

export enum ModalsRoutes {
  /* utils */
  Select = 'Select',
  Dialog = 'Dialog',
  DateTimePicker = 'DateTimePicker',
  ImagePicker = 'ImagePicker',
}

export enum EnumSelectModalLayout {
  'SINGLE' = 'SINGLE',
  'MULTIPLE' = 'MULTIPLE',
}

export type SelectModalParams<T> = {
  title: string;
  defaultValue?: any;
  checkedExtractor: (
    item: T,
    currentItem: T | undefined,
    index: number,
  ) => boolean;
  isMultiple?: boolean;
  layout?: EnumSelectModalLayout;
  renderItem: (item: T, index: number) => ReactElement;
  onSelectionEnd: (item?: T) => void;
  itemContainerStyle?: ViewStyle;
} & Pick<
  FlatListProps<T>,
  'ListEmptyComponent' | 'data' | 'keyExtractor' | 'keyExtractor'
>;

export type ModalsParamList = {
  [ModalsRoutes.Dialog]: {
    text: ReactNode;
    title: string;
    onClose?: () => void;
    confirmButtonProps: UIActionModalButton;
    declineButtonProps?: UIActionModalButton;
  };
  [ModalsRoutes.Select]: SelectModalParams<any>;
  [ModalsRoutes.DateTimePicker]: {
    pickerProps: DatePicker['props'];
    onEnd: (date: Date) => void;
    title?: string;
  };
  [ModalsRoutes.ImagePicker]: {
    onEnd: (image: ImagePickerAsset) => void;
  };
};

export type ModalsScreenProps<RouteName extends ModalsRoutes> =
  StackScreenProps<ModalsParamList, RouteName>;
