import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '~/components/FormField';
import Button from '~/components/Button';
import { Link, router } from 'expo-router';
import { createUser } from '../lib/appwrite';
import { Alert } from 'react-native';

import { useGlobalContext } from '../context/GlobalProvider'


const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submit = async () => {
    if(!form.username || !form.email || !form.password) {
      Alert.alert('Error', "Please fill in every field");
      return; 
    }
    
    setIsSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result)
      setIsLoggedIn(true);
      
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', "There was an error");
      console.error(error);  
    } finally {
      setIsSubmitting(false);  
    }
};

  return (
    <View className="bg-WmGreen flex-1">
      <SafeAreaView>
        <ScrollView>
          <View className="w-full justify-center px-4 py-6 min-h-[85vh]">
            <Text className='text-2xl text-white text-semibold mt-10'>
              Sign Up
            </Text>
            <FormField
              title="Username"
              value={form.username}
              handleChangeText={(text) => setForm({ ...form, username: text })}
              otherStyles="mt-7"
            />
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
              title='Sign Up'
              handlePress={submit}
              containerStyles='mt-7'
              isLoading={isSubmitting} />
            <View className='justify-center pt-5 gap-2 flex-row'>
                <Text className='text-lg text-white'>Have An Account Already?</Text>
                <Link href="/sign-in" className='text-lg font-semibold text-white'>Sign In</Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SignUp;
