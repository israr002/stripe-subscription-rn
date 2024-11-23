import React, {useState, useEffect} from 'react';
import {StripeProvider, useStripe} from '@stripe/stripe-react-native';
import {ActivityIndicator, Alert, Text, TextInput, View} from 'react-native';
import {styles} from './styles';
import SubscriptionItem, {
  SubscriptionCardType,
} from 'components/SubscriptionCard';
import {API_ENDPOINTS} from 'constants/apiEndpoints';
import {PresentOptions} from '@stripe/stripe-react-native/lib/typescript/src/types/PaymentSheet';
import PaymentButtonComponent from 'components/PaymentButton';

const Subscription = () => {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [subscriptions, setSubscriptions] = useState<SubscriptionCardType[]>(
    [],
  );
  const [selected, setSelected] = useState<SubscriptionCardType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);

  const stripe = useStripe();

  useEffect(() => {
    getSubscriptionData();
  }, []);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  }, [email]);

  const getSubscriptionData = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.GET_SUBSCRIPTIONS, {
        method: 'GET',
      });

      const data = await response.json();
      setSubscriptions(data.subscriptions);
      setSelected(data.subscriptions[0]);
    } catch (error) {
      console.log('error', error);
      Alert.alert('Error', 'Something went wrong, please try again later');
    } finally {
      setIsLoading(false);
    }
  };

  const makePayment = async () => {
    setIsBtnLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.SUBSCRIBE, {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          subscriptionType: selected?.id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        return Alert.alert('Error', data.message);
      }
      const clientSecret = data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Merchant Name',
      });
      if (initSheet.error) {
        return Alert.alert('init sheet error', initSheet.error.message);
      }
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      } as PresentOptions);
      if (presentSheet.error) {
        return Alert.alert('present sheet error', presentSheet.error.message);
      }
      Alert.alert('Info', 'Your subscription payment is complete');
    } catch (error) {
      Alert.alert('Error', 'Something went wrong, please try again later');
    } finally {
      setEmail('');
      setIsBtnLoading(false);
    }
  };

  return (
    <StripeProvider publishableKey={process.env.PUBLISHABLE_KEY as string}>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator color={'black'} />
        ) : (
          <>
            <Text style={styles.headingText}>Subscription Payment</Text>
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              placeholder="Enter your email"
              placeholderTextColor={'grey'}
              keyboardType="email-address"
              style={[
                styles.input,
                !isEmailValid && email !== '' ? {borderColor: 'red'} : {},
              ]}
            />
            {!isEmailValid && email !== '' && (
              <Text style={styles.errorText}>Please enter a valid email</Text>
            )}
            {subscriptions?.map((i: any) => {
              return (
                <SubscriptionItem
                  checked={i.id === selected?.id}
                  onCheck={() => setSelected(i)}
                  item={i}
                />
              );
            })}
            <PaymentButtonComponent
              onPress={makePayment}
              isLoading={isBtnLoading}
              disabled={!isEmailValid}
              label="Buy Subscription"
            />
          </>
        )}
      </View>
    </StripeProvider>
  );
};

export default Subscription;
