import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import db from '../database';

const TaxPaymentsScreen = () => {
  const navigation = useNavigation();
  const [period, setPeriod] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);

  const taxPeriods = ['Mensual', 'Trimestral', 'Semestral', 'Anual'];

  const handleAddTaxPayment = async () => {
    if (!period || !amount) {
      Alert.alert('Error', 'Por favor completa los campos requeridos');
      return;
    }

    try {
      await db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO tax_payments (period, amount, due_date, paid) VALUES (?, ?, ?, ?)',
          [period, parseFloat(amount), dueDate, 0],
          (tx, results) => {
            Alert.alert('Éxito', 'Impuesto programado correctamente');
            navigation.goBack();
          },
          (tx, error) => {
            Alert.alert('Error', 'No se pudo programar el impuesto');
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
        <Text style={styles.header}>Programar Pago de Impuestos</Text>
        <Text style={styles.description}>
          Registra tus pagos de impuestos programados por periodo
        </Text>

        <Text style={styles.label}>Periodo *</Text>
        <View style={styles.periodButtons}>
          {taxPeriods.map((taxPeriod, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.periodButton,
                period === taxPeriod && styles.periodButtonSelected,
              ]}
              onPress={() => setPeriod(taxPeriod)}
            >
              <Text
                style={[
                  styles.periodButtonText,
                  period === taxPeriod && styles.periodButtonTextSelected,
                ]}
              >
                {taxPeriod}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Monto a Pagar *</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
        />

        <Text style={styles.label}>Fecha de Vencimiento</Text>
        <TextInput
          style={styles.input}
          value={dueDate}
          onChangeText={setDueDate}
          placeholder="YYYY-MM-DD"
        />

        <View style={styles.infoBox}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <Text style={styles.infoText}>
            Los impuestos programados se descontarán automáticamente en las nóminas según el periodo seleccionado.
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAddTaxPayment}>
          <Text style={styles.buttonText}>Programar Impuesto</Text>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
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
  periodButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  periodButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: '#795548',
    borderRadius: 8,
    margin: 4,
  },
  periodButtonSelected: {
    backgroundColor: '#795548',
  },
  periodButtonText: {
    color: '#795548',
    fontWeight: 'bold',
  },
  periodButtonTextSelected: {
    color: '#fff',
  },
  infoBox: {
    backgroundColor: '#FFF3E0',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#795548',
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

export default TaxPaymentsScreen;