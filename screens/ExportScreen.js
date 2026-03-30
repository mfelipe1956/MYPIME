import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

const ExportScreen = () => {
  const shareFile = (fileType) => {
    Alert.alert(
      'Compartir Archivo',
      `Funcionalidad de compartir ${fileType} estará disponible en la versión completa.\n\nNecesitarás instalar:\n- react-native-fs\n- react-native-share`,
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Compartir Archivos</Text>
        <Text style={styles.description}>
          Comparte tus reportes y archivos generados
        </Text>

        <TouchableOpacity
          style={styles.exportButton}
          onPress={() => shareFile('CSV de Ingresos')}
        >
          <Text style={styles.exportIcon}>📄</Text>
          <View style={styles.exportTextContainer}>
            <Text style={styles.exportTitle}>Compartir CSV de Ingresos</Text>
            <Text style={styles.exportSubtitle}>Exportar y compartir registro de ingresos</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.exportButton}
          onPress={() => shareFile('CSV de Gastos')}
        >
          <Text style={styles.exportIcon}>📄</Text>
          <View style={styles.exportTextContainer}>
            <Text style={styles.exportTitle}>Compartir CSV de Gastos</Text>
            <Text style={styles.exportSubtitle}>Exportar y compartir registro de gastos</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.exportButton}
          onPress={() => shareFile('Reporte Completo')}
        >
          <Text style={styles.exportIcon}>📊</Text>
          <View style={styles.exportTextContainer}>
            <Text style={styles.exportTitle}>Compartir Reporte Completo</Text>
            <Text style={styles.exportSubtitle}>Exportar resumen financiero completo</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>🛠️ Configuración Adicional Necesaria</Text>
          <Text style={styles.infoText}>
            Para activar la funcionalidad de compartir archivos, instala:{"\n\n"}
            npm install react-native-fs{"\n"}
            npm install react-native-share{"\n\n"}
            Luego actualiza el código en ExportScreen.js con la implementación completa.
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
  exportButton: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  exportIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  exportTextContainer: {
    flex: 1,
  },
  exportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  exportSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  infoBox: {
    backgroundColor: '#FFF3E0',
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F57C00',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    fontFamily: 'monospace',
  },
});

export default ExportScreen;