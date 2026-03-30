import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import db from '../database';

const IncomeScreen = () => {
  const navigation = useNavigation();
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const incomeTypes = ['Efectivo', 'Transferencia', 'Código QR'];

  const handleAddIncome = async () => {
    if (!selectedType || !amount) {
      Alert.alert('Error', 'Por favor completa los campos requeridos');
      return;
    }

    try {
      await db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO income (type, amount, date, description) VALUES (?, ?, ?, ?)',
          [selectedType, parseFloat(amount), date, description],
          (tx, results) => {
            Alert.alert('Éxito', 'Ingreso registrado correctamente');
            navigation.goBack();
          },
          (tx, error) => {
            Alert.alert('Error', 'No se pudo registrar el ingreso');
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
        <Text style={styles.label}>Tipo de Ingreso *</Text>
        <View style={styles.typeButtons}>
          {incomeTypes.map((incomeType, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.typeButton,
                selectedType === incomeType && styles.typeButtonSelected,
              ]}
              onPress={() => setSelectedType(incomeType)}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  selectedType === incomeType && styles.typeButtonTextSelected,
                ]}
              >
                {incomeType}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Monto *</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
        />

        <Text style={styles.label}>Fecha</Text>
        <TextInput
          style={styles.input}
          value={date}
          onChangeText={setDate}
          placeholder="YYYY-MM-DD"
        />

        <Text style={styles.label}>Descripción (Opcional)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Detalles del ingreso..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.button} onPress={handleAddIncome}>
          <Text style={styles.buttonText}>Guardar Ingreso</Text>
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
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
    backgroundColor: '#4CAF50',
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

export default IncomeScreen;