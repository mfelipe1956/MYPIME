import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import db from '../database';

const BankAccountsScreen = () => {
  const navigation = useNavigation();
  const [accountNumber, setAccountNumber] = useState('');
  const [balance, setBalance] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountType, setAccountType] = useState('');

  const accountTypes = ['Ahorros', 'Corriente', 'Nómina'];

  const handleAddAccount = async () => {
    if (!accountNumber || !balance || !bankName) {
      Alert.alert('Error', 'Por favor completa los campos requeridos');
      return;
    }

    try {
      await db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO bank_accounts (account_number, balance, bank_name, account_type) VALUES (?, ?, ?, ?)',
          [accountNumber, parseFloat(balance), bankName, accountType],
          (tx, results) => {
            Alert.alert('Éxito', 'Cuenta bancaria registrada correctamente');
            navigation.goBack();
          },
          (tx, error) => {
            Alert.alert('Error', 'No se pudo registrar la cuenta');
            console.log(error);
          }
        );
      });
    } catch (error) {
      Alert.alert('Error', 'Error en la base de datos');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Número de Cuenta *</Text>
        <TextInput
          style={styles.input}
          placeholder="0000-0000-0000-0000"
          value={accountNumber}
          onChangeText={setAccountNumber}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Nombre del Banco *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Banco Nacional"
          value={bankName}
          onChangeText={setBankName}
        />

        <Text style={styles.label}>Tipo de Cuenta</Text>
        <View style={styles.typeButtons}>
          {accountTypes.map((type, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.typeButton,
                accountType === type && styles.typeButtonSelected,
              ]}
              onPress={() => setAccountType(type)}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  accountType === type && styles.typeButtonTextSelected,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Saldo Inicial *</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          value={balance}
          onChangeText={setBalance}
          keyboardType="decimal-pad"
        />

        <TouchableOpacity style={styles.button} onPress={handleAddAccount}>
          <Text style={styles.buttonText}>Guardar Cuenta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  typeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderWidth: 2,
    borderColor: '#2196F3',
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  typeButtonSelected: {
    backgroundColor: '#2196F3',
  },
  typeButtonText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  typeButtonTextSelected: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BankAccountsScreen;