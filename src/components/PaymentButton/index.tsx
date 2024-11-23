import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {styles} from './styles';

type PaymentButtonComponentProps = {
  onPress: () => void;
  isLoading: boolean;
  label: string;
  disabled?: boolean;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
};

const PaymentButtonComponent: React.FC<PaymentButtonComponentProps> = ({
  onPress,
  isLoading,
  label,
  disabled = false,
  buttonStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled || isLoading}>
      <Text style={[styles.buttonText, textStyle]}>{label}</Text>
      {isLoading && <ActivityIndicator color="white" />}
    </TouchableOpacity>
  );
};

export default PaymentButtonComponent;
