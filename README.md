# 🖥️ Simulador de Algoritmos de Planificación de Procesos

Un simulador interactivo y en tiempo real que permite comparar los algoritmos de planificación **FCFS** y **SJF** con y sin expropiación, desarrollado con React, TypeScript y Tailwind CSS.

## 👥 Autores

**Estudiantes de Ingeniería de Sistemas y Computación - UPTC**
- 👨‍💻 **Luis Hernández**
- 👨‍💻 **Pedro Cruz** 
- 👨‍💻 **Jhon Castro**

---

## 📋 Descripción

Este proyecto implementa un simulador educativo que permite visualizar y comparar el comportamiento de diferentes algoritmos de planificación de procesos del sistema operativo:

- **FCFS** (First Come First Served) - Primero en llegar, primero en ser atendido
- **SJF** (Shortest Job First) - Trabajo más corto primero
- **SRTF** (Shortest Remaining Time First) - SJF con expropiación

## ✨ Características Principales

### 🎯 Funcionalidades Core
- ⚡ **Simulación en tiempo real** con control de velocidad
- 🔄 **Comparación simultánea** de algoritmos FCFS vs SJF
- 🔀 **SJF con/sin expropiación** (SRTF)
- 📊 **Estadísticas detalladas** (tiempo de espera, tiempo de retorno)
- 🎲 **Generación automática** de procesos aleatorios
- ⏯️ **Controles de simulación** (play, pause, reset)

### 🎨 Interfaz de Usuario
- 📱 **Diseño responsive** compatible con móviles y escritorio
- 🎭 **Animaciones suaves** para transiciones de estado
- 🎨 **Colores diferenciados** para cada algoritmo
- 📈 **Visualización clara** del estado de cada proceso
- ℹ️ **Panel informativo** con explicaciones

### 🏗️ Arquitectura Técnica
- ⚙️ **TypeScript** para type safety
- 🎣 **Custom Hooks** para lógica de estado
- 🧩 **Componentes modulares** reutilizables
- 🔧 **Algoritmos separados** en utilidades puras
- 🎯 **Separación clara** de responsabilidades

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js 18+
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/process-scheduler-simulator.git
cd process-scheduler-simulator
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:5173
```

## 🎮 Cómo Usar el Simulador

### Configuración Inicial
1. **Generar procesos**: Usa "Agregar Proceso" o "Generar 5 Procesos"
2. **Configurar velocidad**: Ajusta el delay de simulación (100ms - 3000ms)
3. **Seleccionar modo**: Activa/desactiva la expropiación para SJF

### Controles de Simulación
- ▶️ **Iniciar/Pausar**: Controla la ejecución de la simulación
- 🔄 **Reset**: Reinicia la simulación manteniendo los procesos
- 🗑️ **Limpiar Todo**: Elimina todos los procesos y reinicia
- ➕ **Agregar Proceso**: Crea un proceso aleatorio nuevo

### Interpretación de Resultados
- **AT**: Arrival Time (Tiempo de llegada)
- **BT**: Burst Time (Tiempo de ráfaga original)
- **RT**: Remaining Time (Tiempo restante)
- **WT**: Waiting Time (Tiempo de espera)
- **TAT**: Turnaround Time (Tiempo de retorno)
- **Size**: Tamaño del proceso en KB

## 🏛️ Arquitectura del Proyecto

```
src/
├── components/           # Componentes React reutilizables
│   ├── AlgorithmSimulator.tsx
│   ├── ControlPanel.tsx
│   ├── InfoPanel.tsx
│   ├── ProcessCard.tsx
│   └── ProcessList.tsx
├── hooks/               # Custom hooks
│   └── useProcessScheduler.ts
├── types/               # Definiciones TypeScript
│   └── process.ts
├── utils/               # Funciones utilitarias
│   ├── fcfsAlgorithm.ts
│   ├── sjfAlgorithm.ts
│   └── processGenerator.ts
├── App.tsx              # Componente principal
├── main.tsx             # Entry point
└── index.css            # Estilos globales
```

## 🔬 Algoritmos Implementados

### FCFS (First Come First Served)
- **Características**: Sin expropiación, orden de llegada
- **Ventajas**: Simple, justo en orden temporal
- **Desventajas**: Puede causar convoy effect

### SJF Sin Expropiación
- **Características**: Selecciona el trabajo más corto disponible
- **Ventajas**: Minimiza tiempo de espera promedio
- **Desventajas**: Puede causar starvation

### SRTF (Shortest Remaining Time First)
- **Características**: SJF con expropiación
- **Ventajas**: Óptimo para tiempo de espera
- **Desventajas**: Mayor overhead de context switching

## 🛠️ Tecnologías Utilizadas

- **Frontend Framework**: React 19
- **Lenguaje**: TypeScript 5.8
- **Build Tool**: Vite 7
- **Estilos**: Tailwind CSS 3.4
- **Iconos**: Lucide React
- **Linting**: ESLint 9
- **Package Manager**: npm

## 📚 Conceptos de Sistemas Operativos

Este simulador ayuda a entender conceptos fundamentales como:

- 🔄 **Planificación de CPU**
- ⏰ **Tiempo de espera y tiempo de retorno**
- 🔀 **Expropiación vs No expropiación**
- 📊 **Métricas de rendimiento**
- 🏃‍♂️ **Context switching**
- 🍽️ **Problema de starvation**

## 🎓 Propósito Educativo

Desarrollado como herramienta de aprendizaje para la materia de **Sistemas Operativos** en la **Universidad Pedagógica y Tecnológica de Colombia (UPTC)**, este simulador permite:

- Visualizar el comportamiento de los algoritmos en tiempo real
- Comparar eficiencia entre diferentes estrategias
- Experimentar con diferentes configuraciones
- Comprender el impacto de la expropiación
