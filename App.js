import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import IncomeScreen from './screens/IncomeScreen';
import ExpensesScreen from './screens/ExpensesScreen';
import BankAccountsScreen from './screens/BankAccountsScreen';
import PayrollScreen from './screens/PayrollScreen';
import ReportsScreen from './screens/ReportsScreen';
import TaxPaymentsScreen from './screens/TaxPaymentsScreen';
import ExportScreen from './screens/ExportScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'MYPIME - Gestión Financiera' }}
        />
        <Stack.Screen 
          name="Income" 
          component={IncomeScreen}
          options={{ title: 'Registrar Ingresos' }}
        />
        <Stack.Screen 
          name="Expenses" 
          component={ExpensesScreen}
          options={{ title: 'Registrar Gastos' }}
        />
        <Stack.Screen 
          name="BankAccounts" 
          component={BankAccountsScreen}
          options={{ title: 'Cuentas Bancarias' }}
        />
        <Stack.Screen 
          name="Payroll" 
          component={PayrollScreen}
          options={{ title: 'Nóminas' }}
        />
        <Stack.Screen 
          name="Reports" 
          component={ReportsScreen}
          options={{ title: 'Reportes' }}
        />
        <Stack.Screen 
          name="TaxPayments" 
          component={TaxPaymentsScreen}
          options={{ title: 'Impuestos Programables' }}
        />
        <Stack.Screen 
          name="Export" 
          component={ExportScreen}
          options={{ title: 'Exportar' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;