import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

export type SubscriptionCardType = {
  id: string;
  name: string;
  amount: number;
};

type SubscriptionCardProps = {
  checked: boolean;
  onCheck: () => void;
  item: SubscriptionCardType;
};

const SubscriptionItem: React.FC<SubscriptionCardProps> = ({
  checked,
  onCheck,
  item,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onCheck}>
      <View style={[styles.radio, checked && styles.checkedRadio]}>
        {checked && <View style={styles.checkedIndicator} />}
      </View>
      <View>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.amountText}>$ {item.amount}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SubscriptionItem;
