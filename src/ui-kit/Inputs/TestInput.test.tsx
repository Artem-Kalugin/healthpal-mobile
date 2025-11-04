import React, { createRef } from 'react';
import { TextInput as RNTextInput } from 'react-native';

import { fireEvent, render } from '@testing-library/react-native';

import { Icon } from '../Icon';
import { TextInput } from './TextInput';

describe('TextInput', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  const inputRef = createRef<RNTextInput>();

  const renderComponent = (props = {}) =>
    render(
      <TextInput
        errors={['Error 1']}
        IconLeft={
          <Icon
            name="search"
            testID="icon-left"
          />
        }
        IconRight={null}
        inputRef={inputRef}
        label="Test Label"
        placeholder="Type here"
        testID="text-input"
        value="hello"
        onBlur={jest.fn()}
        onChange={jest.fn()}
        onErase={jest.fn()}
        onFocus={jest.fn()}
        {...props}
      />,
    );

  it('Рендрится и отображает дочерние InputLabel and InputErrorBlock', () => {
    const { getByText } = renderComponent();

    expect(getByText('Test Label')).toBeTruthy();
    expect(getByText('• Error 1')).toBeTruthy();
  });

  it('отображает leftIcon', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('icon-left')).toBeTruthy();
  });

  it('отображает rightIcon', () => {
    const rightIcon = (
      <Icon
        name="check"
        testID="icon-right"
      />
    );
    const { getByTestId } = renderComponent({ IconRight: rightIcon });
    expect(getByTestId('icon-right')).toBeTruthy();
  });

  it('Вызывает onFocus и onBlur', () => {
    const onFocusMock = jest.fn();
    const onBlurMock = jest.fn();
    const { getByTestId } = renderComponent({
      onFocus: onFocusMock,
      onBlur: onBlurMock,
    });

    const textInput = getByTestId('text-input');
    fireEvent(textInput, 'focus');
    expect(onFocusMock).toHaveBeenCalledTimes(1);

    fireEvent(textInput, 'blur');
    expect(onBlurMock).toHaveBeenCalledTimes(1);
  });

  describe('onChange при вводе текста', () => {
    it('Вызывает onChange с новым значением при вводе текста', () => {
      const onChangeMock = jest.fn();
      const { getByTestId } = renderComponent({
        value: '',
        onChange: onChangeMock,
      });

      const textInput = getByTestId('text-input');
      fireEvent.changeText(textInput, 'new text');

      expect(onChangeMock).toHaveBeenCalledWith('new text');
      expect(onChangeMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('Кнопка очистки - условия показа/скрытия', () => {
    it('Показывает кнопку очистки при фокусе и наличии значения', () => {
      const { getByTestId, queryByTestId } = renderComponent({
        value: 'hello',
        IconRight: null,
      });

      expect(queryByTestId('erase-button')).toBeNull();

      fireEvent(getByTestId('text-input'), 'focus');
      expect(getByTestId('erase-button')).toBeTruthy();
    });

    it('не показывает кнопку очистки, если IconRight передан', () => {
      const { getByTestId, queryByTestId } = renderComponent({
        value: 'hello',
        IconRight: (
          <Icon
            name="check"
            testID="custom-icon"
          />
        ),
      });

      fireEvent(getByTestId('text-input'), 'focus');

      expect(queryByTestId('erase-button')).toBeNull();
      expect(getByTestId('custom-icon')).toBeTruthy();
    });

    it('не показывает кнопку очистки, если value пустое', () => {
      const { getByTestId, queryByTestId } = renderComponent({
        value: '',
        IconRight: null,
      });

      fireEvent(getByTestId('text-input'), 'focus');
      expect(queryByTestId('erase-button')).toBeNull();
    });

    it('не показывает кнопку очистки для disabled инпута', () => {
      const { getByTestId, queryByTestId } = renderComponent({
        value: 'hello',
        disabled: true,
        IconRight: null,
      });

      fireEvent(getByTestId('text-input'), 'focus');
      expect(queryByTestId('erase-button')).toBeNull();
    });

    it('Скрывает кнопку очистки при потере фокуса (showEraseOnlyIfFocused=true)', () => {
      const { getByTestId, queryByTestId } = renderComponent({
        value: 'hello',
        showEraseOnlyIfFocused: true,
        IconRight: null,
      });

      const textInput = getByTestId('text-input');

      fireEvent(textInput, 'focus');
      expect(getByTestId('erase-button')).toBeTruthy();

      fireEvent(textInput, 'blur');
      expect(queryByTestId('erase-button')).toBeNull();
    });
  });

  describe('Fallback логика onErase || onChange', () => {
    it('Использует onChange, если onErase не передан', () => {
      const onChangeMock = jest.fn();
      const { getByTestId } = renderComponent({
        value: 'hello',
        onErase: undefined,
        onChange: onChangeMock,
        IconRight: null,
      });

      fireEvent(getByTestId('text-input'), 'focus');
      const eraseButton = getByTestId('erase-button');
      fireEvent.press(eraseButton);

      expect(onChangeMock).toHaveBeenCalledWith('');
      expect(onChangeMock).toHaveBeenCalledTimes(1);
    });

    it('Приоритет onErase над onChange при наличии обоих', () => {
      const onEraseMock = jest.fn();
      const onChangeMock = jest.fn();
      const { getByTestId } = renderComponent({
        value: 'hello',
        onErase: onEraseMock,
        onChange: onChangeMock,
        IconRight: null,
      });

      fireEvent(getByTestId('text-input'), 'focus');
      const eraseButton = getByTestId('erase-button');
      fireEvent.press(eraseButton);

      expect(onEraseMock).toHaveBeenCalledWith('');
      expect(onChangeMock).not.toHaveBeenCalled();
    });

    it('Вызывает onChange с пустой строкой, если onErase = null', () => {
      const onChangeMock = jest.fn();
      const { getByTestId } = renderComponent({
        value: 'hello',
        onErase: null,
        onChange: onChangeMock,
        IconRight: null,
      });

      fireEvent(getByTestId('text-input'), 'focus');
      const eraseButton = getByTestId('erase-button');
      fireEvent.press(eraseButton);

      expect(onChangeMock).toHaveBeenCalledWith('');
    });
  });

  describe('showEraseOnlyIfFocused поведение', () => {
    it('Показывает кнопку очистки всегда, если showEraseOnlyIfFocused=false', () => {
      const { getByTestId } = renderComponent({
        value: 'hello',
        showEraseOnlyIfFocused: false,
        IconRight: null,
      });

      expect(getByTestId('erase-button')).toBeTruthy();
    });

    it('Показывает кнопку очистки только при фокусе, если showEraseOnlyIfFocused=true', () => {
      const { getByTestId, queryByTestId } = renderComponent({
        value: 'hello',
        showEraseOnlyIfFocused: true,
        IconRight: null,
      });

      expect(queryByTestId('erase-button')).toBeNull();

      fireEvent(getByTestId('text-input'), 'focus');
      expect(getByTestId('erase-button')).toBeTruthy();
    });

    it('Кнопка остаётся видимой после blur, если showEraseOnlyIfFocused=false', () => {
      const { getByTestId } = renderComponent({
        value: 'hello',
        showEraseOnlyIfFocused: false,
        IconRight: null,
      });

      const textInput = getByTestId('text-input');

      fireEvent(textInput, 'focus');
      expect(getByTestId('erase-button')).toBeTruthy();

      fireEvent(textInput, 'blur');
      expect(getByTestId('erase-button')).toBeTruthy();
    });

    it('Кнопка исчезает после blur, если showEraseOnlyIfFocused=true', () => {
      const { getByTestId, queryByTestId } = renderComponent({
        value: 'hello',
        showEraseOnlyIfFocused: true,
        IconRight: null,
      });

      const textInput = getByTestId('text-input');

      fireEvent(textInput, 'focus');
      expect(getByTestId('erase-button')).toBeTruthy();

      fireEvent(textInput, 'blur');
      expect(queryByTestId('erase-button')).toBeNull();
    });
  });

  describe('Комплексные сценарии', () => {
    it('Полный цикл взаимодействия с инпутом', () => {
      const onChangeMock = jest.fn();
      const onFocusMock = jest.fn();
      const onBlurMock = jest.fn();

      const { getByTestId, queryByTestId } = renderComponent({
        value: 'hello',
        onChange: onChangeMock,
        onFocus: onFocusMock,
        onBlur: onBlurMock,
        onErase: undefined,
        IconRight: null,
        showEraseOnlyIfFocused: true,
      });

      const textInput = getByTestId('text-input');

      expect(queryByTestId('erase-button')).toBeNull();

      fireEvent(textInput, 'focus');
      expect(onFocusMock).toHaveBeenCalledTimes(1);
      expect(getByTestId('erase-button')).toBeTruthy();

      const eraseButton = getByTestId('erase-button');
      fireEvent.press(eraseButton);
      expect(onChangeMock).toHaveBeenCalledWith('');

      fireEvent(textInput, 'blur');
      expect(onBlurMock).toHaveBeenCalledTimes(1);
    });

    it('Кнопка очистки работает корректно при смене showEraseOnlyIfFocused', () => {
      const { getByTestId, queryByTestId, rerender } = render(
        <TextInput
          IconRight={null}
          inputRef={inputRef}
          showEraseOnlyIfFocused={true}
          testID="text-input"
          value="hello"
          onChange={jest.fn()}
        />,
      );

      expect(queryByTestId('erase-button')).toBeNull();

      rerender(
        <TextInput
          IconRight={null}
          inputRef={inputRef}
          showEraseOnlyIfFocused={false}
          testID="text-input"
          value="hello"
          onChange={jest.fn()}
        />,
      );

      expect(getByTestId('erase-button')).toBeTruthy();
    });
  });
});
