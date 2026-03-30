import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const menuItems = [
    { title: '💰 Ingresos', screen: 'Income', color: '#4CAF50' },
    { title: '💸 Gastos', screen: 'Expenses', color: '#F44336' },
    { title: '🏦 Cuentas Bancarias', screen: 'BankAccounts', color: '#2196F3' },
    { title: '👥 Nóminas', screen: 'Payroll', color: '#FF9800' },
    { title: '📊 Reportes', screen: 'Reports', color: '#9C27B0' },
    { title: '📅 Impuestos', screen: 'TaxPayments', color: '#795548' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MYPIME</Text>
        <Text style={styles.headerSubtitle}>Gestión Económica Empresarial</Text>
      </View>

      <View style={styles.menuGrid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.menuItem, { backgroundColor: item.color }]}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E3F2FD',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '48%',
    height: 120,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;