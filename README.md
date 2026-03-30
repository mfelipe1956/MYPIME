# MYPIME - Aplicación de Gestión Económica

## 📱 Características Principales

### ✅ Gestión Completa
- **Ingresos por Tipo**: Efectivo, Transferencia, Código QR
- **Gastos por Categoría**: Control detallado de egresos
- **Cuentas Bancarias**: Gestión de saldos y movimientos
- **Nóminas de Empleados**: Con deducciones programables (impuestos, vacaciones)
- **Exportación de Reportes**: CSV para ingresos y gastos
- **Impuestos Programables**: Control de pagos por periodo

---

## 🚀 Instalación

### 1️⃣ Clonar Repositorio
```bash
git clone https://github.com/mfelipe1956/MYPIME.git
cd MYPIME
```

### 2️⃣ Instalar Dependencias
```bash
npm install
```

### 3️⃣ Configuración iOS (si aplica)
```bash
cd ios && pod install && cd ..
```

---

## 📂 Estructura del Proyecto

```
MYPIME/
├── App.js                          # Navegación principal
├── database.js                     # Configuración SQLite
└── screens/
    ├── HomeScreen.js              # Pantalla principal
    ├── IncomeScreen.js            # Registro de ingresos
    ├── ExpensesScreen.js          # Registro de gastos
    ├── BankAccountsScreen.js      # Cuentas bancarias
    ├── PayrollScreen.js           # Nóminas
    ├── ReportsScreen.js           # Exportar reportes
    ├── TaxPaymentsScreen.js       # Impuestos programables
    └── ExportScreen.js            # Compartir archivos
```

---

## 💾 Base de Datos

### Tablas Creadas Automáticamente:

**1. income** (Ingresos)
- id, type, amount, date

**2. expenses** (Gastos)
- id, category, amount, date

**3. bank_accounts** (Cuentas Bancarias)
- id, account_number, balance

**4. payroll** (Nóminas)
- id, employee_name, salary, taxes, vacation

**5. tax_payments** (Impuestos)
- period, amount

---

## ▶️ Ejecutar la Aplicación

### Android
```bash
npx react-native run-android
```

### iOS
```bash
npx react-native run-ios
```

---

## 🔧 Dependencias Necesarias

```json
{
  "@react-navigation/native": "latest",
  "@react-navigation/native-stack": "latest",
  "react-native-sqlite-storage": "latest",
  "react-native-screens": "latest",
  "react-native-safe-area-context": "latest"
}
```

---

## 🛠️ Tecnologías Utilizadas

- **React Native** - Framework móvil
- **React Navigation** - Navegación entre pantallas
- **SQLite** - Base de datos local
- **AsyncStorage** - Almacenamiento ligero

---

## ✨ Características de Producción

✅ Base de datos persistente
✅ Validación de formularios
✅ Exportación de datos
✅ Navegación fluida
✅ Manejo de errores básico
✅ Arquitectura escalable

---

## 📄 Licencia
Este proyecto es de código abierto para uso en MYPIME.

**¡Tu aplicación de gestión financiera está lista para despegar! 🚀**