import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import db from '../database';

const PayrollScreen = () => {
  const navigation = useNavigation();
  const [employeeName, setEmployeeName] = useState('');
  const [salary, setSalary] = useState('');
  const [taxes, setTaxes] = useState('');
  const [vacation, setVacation] = useState('');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);

  const calculateNetSalary = () => {
    const salaryNum = parseFloat(salary) || 0;
    const taxesNum = parseFloat(taxes) || 0;
    const vacationNum = parseFloat(vacation) || 0;
    return salaryNum - taxesNum - vacationNum;
  };

  const handleAddPayroll = async () => {
    if (!employeeName || !salary) {
      Alert.alert('Error', 'Por favor completa los campos requeridos');
      return;
    }

    const netSalary = calculateNetSalary();

    try {
      await db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO payroll (employee_name, salary, taxes, vacation, net_salary, payment_date) VALUES (?, ?, ?, ?, ?, ?)',
          [
            employeeName,
            parseFloat(salary),
            parseFloat(taxes) || 0,
            parseFloat(vacation) || 0,
            netSalary,
            paymentDate,
          ],
          (tx, results) => {
            Alert.alert('Éxito', `Nómina registrada.\nSalario Neto: $${netSalary.toFixed(2)}`);
            navigation.goBack();
          },
          (tx, error) => {
            Alert.alert('Error', 'No se pudo registrar la nómina');
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
        <Text style={styles.label}>Nombre del Empleado *</Text>
        <TextInput
          style={styles.input}
          placeholder="Juan Pérez"
          value={employeeName}
          onChangeText={setEmployeeName}
        />

        <Text style={styles.label}>Salario Bruto *</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          value={salary}
          onChangeText={setSalary}
          keyboardType="decimal-pad"
        />

        <View style={styles.deductionsSection}>
          <Text style={styles.sectionTitle}>Deducciones</Text>
          
          <Text style={styles.label}>Impuestos Programables</Text>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            value={taxes}
            onChangeText={setTaxes}
            keyboardType="decimal-pad"
          />

          <Text style={styles.label}>Vacaciones</Text>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            value={vacation}
            onChangeText={setVacation}
            keyboardType="decimal-pad"
          />
        </View>

        <Text style={styles.label}>Fecha de Pago</Text>
        <TextInput
          style={styles.input}
          value={paymentDate}
          onChangeText={setPaymentDate}
          placeholder="YYYY-MM-DD"
        />

        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Salario Bruto:</Text>
          <Text style={styles.summaryValue}>${parseFloat(salary || 0).toFixed(2)}</Text>
          
          <Text style={styles.summaryLabel}>Impuestos:</Text>
          <Text style={styles.summaryDeduction}>-${parseFloat(taxes || 0).toFixed(2)}</Text>
          
          <Text style={styles.summaryLabel}>Vacaciones:</Text>
          <Text style={styles.summaryDeduction}>-${parseFloat(vacation || 0).toFixed(2)}</Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.summaryLabelBold}>Salario Neto:</Text>
          <Text style={styles.summaryNetValue}>${calculateNetSalary().toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAddPayroll}>
          <Text style={styles.buttonText}>Guardar Nómina</Text>
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
  deductionsSection: {
    backgroundColor: '#FFF3E0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F57C00',
    marginBottom: 15,
  },
  summaryBox: {
    backgroundColor: '#E3F2FD',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  summaryDeduction: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F44336',
    marginBottom: 10,
  },
  divider: {
    height: 2,
    backgroundColor: '#2196F3',
    marginVertical: 10,
  },
  summaryLabelBold: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
    marginTop: 5,
  },
  summaryNetValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  button: {
    backgroundColor: '#FF9800',
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

export default PayrollScreen;