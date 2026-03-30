import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import db from '../database';

const ExpensesScreen = () => {
  const navigation = useNavigation();
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');

  const expenseCategories = [
    'Alquiler',
    'Servicios',
    'Salarios',
    'Suministros',
    'Marketing',
    'Transporte',
    'Impuestos',
    'Otros'
  ];

  const handleAddExpense = async () => {
    if (!category || !amount) {
      Alert.alert('Error', 'Por favor completa los campos requeridos');
      return;
    }

    try {
      await db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO expenses (category, amount, date, description) VALUES (?, ?, ?, ?)',
          [category, parseFloat(amount), date, description],
          (tx, results) => {
            Alert.alert('Éxito', 'Gasto registrado correctamente');
            navigation.goBack();
          },
          (tx, error) => {
            Alert.alert('Error', 'No se pudo registrar el gasto');
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
        <Text style={styles.label}>Categoría *</Text>
        <View style={styles.categoryGrid}>
          {expenseCategories.map((cat, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                category === cat && styles.categoryButtonSelected,
              ]}
              onPress={() => setCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  category === cat && styles.categoryTextSelected,
                ]}
              >
                {cat}
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
          placeholder="Detalles del gasto..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.button} onPress={handleAddExpense}>
          <Text style={styles.buttonText}>Guardar Gasto</Text>
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
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: '#F44336',
    borderRadius: 8,
    margin: 4,
  },
  categoryButtonSelected: {
    backgroundColor: '#F44336',
  },
  categoryText: {
    color: '#F44336',
    fontWeight: 'bold',
  },
  categoryTextSelected: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#F44336',
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

export default ExpensesScreen;