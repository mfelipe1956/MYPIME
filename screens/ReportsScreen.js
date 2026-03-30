import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import db from '../database';

const ReportsScreen = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  const exportIncomeToCSV = async () => {
    try {
      await db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM income ORDER BY date DESC',
          [],
          (tx, results) => {
            const rows = results.rows.raw();
            if (rows.length === 0) {
              Alert.alert('Info', 'No hay ingresos para exportar');
              return;
            }

            let csv = 'ID,Tipo,Monto,Fecha,Descripción\n';
            rows.forEach(row => {
              csv += `${row.id},${row.type},${row.amount},${row.date},"${row.description || ''}"\n`;
            });

            Alert.alert('Éxito', `CSV de Ingresos generado:\n${rows.length} registros`);
            console.log('CSV Ingresos:', csv);
          },
          (tx, error) => {
            Alert.alert('Error', 'No se pudieron obtener los ingresos');
          }
        );
      });
    } catch (error) {
      Alert.alert('Error', 'Error en la base de datos');
    }
  };

  const exportExpensesToCSV = async () => {
    try {
      await db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM expenses ORDER BY date DESC',
          [],
          (tx, results) => {
            const rows = results.rows.raw();
            if (rows.length === 0) {
              Alert.alert('Info', 'No hay gastos para exportar');
              return;
            }

            let csv = 'ID,Categoría,Monto,Fecha,Descripción\n';
            rows.forEach(row => {
              csv += `${row.id},${row.category},${row.amount},${row.date},"${row.description || ''}"\n`;
            });

            Alert.alert('Éxito', `CSV de Gastos generado:\n${rows.length} registros`);
            console.log('CSV Gastos:', csv);
          },
          (tx, error) => {
            Alert.alert('Error', 'No se pudieron obtener los gastos');
          }
        );
      });
    } catch (error) {
      Alert.alert('Error', 'Error en la base de datos');
    }
  };

  const generateFinancialSummary = async () => {
    try {
      await db.transaction((tx) => {
        tx.executeSql('SELECT SUM(amount) as total FROM income', [], (tx, results) => {
          const totalIncome = results.rows.item(0).total || 0;
          
          tx.executeSql('SELECT SUM(amount) as total FROM expenses', [], (tx, results) => {
            const totalExpenses = results.rows.item(0).total || 0;
            const balance = totalIncome - totalExpenses;

            Alert.alert(
              'Resumen Financiero',
              `Ingresos Totales: $${totalIncome.toFixed(2)}\n` +
              `Gastos Totales: $${totalExpenses.toFixed(2)}\n` +
              `Balance: $${balance.toFixed(2)}`,
              [{ text: 'OK' }]
            );
          });
        });
      });
    } catch (error) {
      Alert.alert('Error', 'Error al generar resumen');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Exportar Reportes</Text>
        <Text style={styles.description}>
          Genera reportes en formato CSV de tus ingresos y gastos
        </Text>

        <TouchableOpacity style={styles.buttonIncome} onPress={exportIncomeToCSV}>
          <Text style={styles.buttonIcon}>💰</Text>
          <Text style={styles.buttonText}>Exportar Ingresos a CSV</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonExpense} onPress={exportExpensesToCSV}>
          <Text style={styles.buttonIcon}>💸</Text>
          <Text style={styles.buttonText}>Exportar Gastos a CSV</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSummary} onPress={generateFinancialSummary}>
          <Text style={styles.buttonIcon}>📊</Text>
          <Text style={styles.buttonText}>Ver Resumen Financiero</Text>
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>ℹ️ Información</Text>
          <Text style={styles.infoText}>
            • Los archivos CSV se pueden abrir en Excel{"\n"}
            • Los datos se ordenan por fecha (más reciente primero){"\n"}
            • Puedes compartir los archivos generados
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
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
  buttonIncome: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
  },
  buttonExpense: {
    backgroundColor: '#F44336',
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
  },
  buttonSummary: {
    backgroundColor: '#9C27B0',
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    elevation: 3,
  },
  buttonIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  infoBox: {
    backgroundColor: '#E3F2FD',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
});

export default ReportsScreen;