import { View, Text, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '~/components/FormField';
import Button from '~/components/Button';
import { getCurrentUser, signIn } from '../lib/appwrite';
import { Link, router } from 'expo-router';
import { Alert } from 'react-native';
import { useGlobalContext } from '../context/GlobalProvider'
import images from '../../assets/images.png'; 

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submit = async () => {
    if(!form.email || !form.password) {
      Alert.alert('Error', "Please fill in every field");
      return;  
    }
    
    setIsSubmitting(true);
    try {
      
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      
      router.replace('/home');  
    } catch (error) {
      Alert.alert('Error', "Invalid Credentials");
      console.error(error); 
    } finally {
      setIsSubmitting(false); 
    }
};

  return (
    <View className="bg-WmGreen flex-1">
      <SafeAreaView>
        <View>
          <Image source={images} style={{ width: 200, height: 200, alignSelf: 'center' }} />
        </View>
        <ScrollView>
          <View className="w-full justify-center px-4 py-6 min-h-[45vh]">
            <Text className='text-3xl text-white font-semibold mt-10'>
              Sign in
            </Text>
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(text) => setForm({ ...form, email: text })}
              otherStyles="mt-7"
              keyboardType="email-address"
            />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(text) => setForm({ ...form, password: text })}
              otherStyles="mt-7"
              keyboardType="default" 
            />
            <Button
              title='Sign In'
              handlePress={submit}
              containerStyles='mt-7'
              isLoading={isSubmitting} />
            <View className='justify-center pt-5 gap-2 flex-row'>
                <Text className='text-lg text-white'>Don't have an account?</Text>
                <Link href="/sign-up" className='text-lg font-semibold text-white'>Sign Up</Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SignIn;
