import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import ModalWrapper from '#components/infrastructure/ModalWrapper';

import { Button, Checkbox, TextXL } from '#ui-kit';

import { ModalsRoutes, ModalsScreenProps } from '#navigation/Modals/types';

import useModal from '#hooks/useModalState';

const Select: React.FC<ModalsScreenProps<ModalsRoutes.Select>> = props => {
  const modal = useModal(true);

  const [selectedItem, setSelectedItem] = useState<any[] | undefined>(
    props.route.params.defaultValue,
  );

  const onSelect = (item: any, index: number) => {
    if (props.route.params.checkedExtractor(item, selectedItem, index)) {
      setSelectedItem(undefined);
    } else {
      setSelectedItem(item);
    }
  };

  const renderItemWrapper = ({
    item,
    index,
  }: {
    item: unknown;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        style={[styles.itemContainer, props.route.params.itemContainerStyle]}
        onPress={() => onSelect(item, index)}
      >
        <Checkbox
          active={props.route.params.checkedExtractor(
            item,
            selectedItem,
            index,
          )}
        />
        {props.route.params.renderItem(item, index)}
      </TouchableOpacity>
    );
  };

  return (
    <ModalWrapper
      visible={modal.visible}
      onClose={modal.close}
    >
      <TextXL weight="600">
        {props.route.params.title || 'Выберите время'}
      </TextXL>

      <FlatList
        contentContainerStyle={styles.listContentContainer}
        data={props.route.params.data}
        initialNumToRender={20}
        ListEmptyComponent={props.route.params.ListEmptyComponent}
        renderItem={renderItemWrapper}
        style={styles.list}
        keyExtractor={props.route.params.keyExtractor}
      />
      <Button
        onPress={() => {
          modal.close();

          props.route.params.onSelectionEnd(selectedItem);
        }}
      >
        Сохранить
      </Button>
    </ModalWrapper>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    gap: 8,
  },
  listContentContainer: {
    gap: 16,
  },
  list: {
    paddingTop: 16,
    paddingBottom: 32,
  },
});

export default Select;
