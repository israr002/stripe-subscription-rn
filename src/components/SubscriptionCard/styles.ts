import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  radio: {
    borderWidth: 1.5,
    height: 20,
    width: 20,
    marginRight: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000000',
    backgroundColor: 'transparent',
  },
  checkedRadio: {
    borderColor: '#000000',
  },
  checkedIndicator: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#000000',
  },
  nameText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  amountText: {
    color: '#000000',
    fontSize: 14,
  },
});
