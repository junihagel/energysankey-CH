/* =========================================================
   2) KNOTEN (ALLE!) Mit Farben sowie outgoing Pfad-Farben
   ========================================================= */
const nodes = [
  // Fossile Energieträger – dunkelbraun
  { name: "Oil",         color: "#4b2e2b", linkColor: "rgba(75, 46, 43, 0.45)" }, // dunkelbraun → heller
  { name: "Natural Gas", color: "#4b2e2b", linkColor: "rgba(75, 46, 43, 0.45)" }, // dunkelbraun → heller

  // Biomasse & Abfall
  { name: "Wood",  color: "#2e7d32", linkColor: "rgba(46, 125, 50, 0.45)" }, // grün → heller
  { name: "Waste", color: "#9e9e9e", linkColor: "rgba(158, 158, 158, 0.45)" }, // grau → heller

  // Ambient Heat & Solar Thermal – gelb
  { name: "Ambient",       color: "#f2c300", linkColor: "rgba(242, 195, 0, 0.45)" }, // gelb → heller
  { name: "Solar Thermal", color: "#f2c300", linkColor: "rgba(242, 195, 0, 0.45)" }, // gelb → heller

  // Nuklear – pink
  { name: "Uranium", color: "#e377c2", linkColor: "rgba(227, 119, 194, 0.45)" }, // pink → heller

  // Electricity generation & import – blau / grau
  { name: "Hydro River",  color: "#1f77b4", linkColor: "rgba(31, 119, 180, 0.45)" }, // blau → heller
  { name: "Hydro Dams",   color: "#1f77b4", linkColor: "rgba(31, 119, 180, 0.45)" }, // blau → heller
  { name: "Photovoltaic", color: "#f2c300", linkColor: "rgba(242, 195, 0, 0.45)" }, // gelb → heller
  { name: "Wind",         color: "#8fd3f4", linkColor: "rgba(143, 211, 244, 0.45)" }, // hellblau → heller
  { name: "Import",       color: "#bdbdbd", linkColor: "rgba(189, 189, 189, 0.45)" }, // hellgrau → heller

  // Fuels for mobility – braun
  { name: "Gasoline", color: "#8b5a2b", linkColor: "rgba(139, 90, 43, 0.45)" }, // braun → heller
  { name: "Diesel",   color: "#8b5a2b", linkColor: "rgba(139, 90, 43, 0.45)" }, // braun → heller
  { name: "Jet fuel", color: "#8b5a2b", linkColor: "rgba(139, 90, 43, 0.45)" }, // braun → heller

  // Wärmeerzeugung – rot
  { name: "Boilers", color: "#d62728", linkColor: "rgba(214, 39, 40, 0.45)" }, // rot → heller
  { name: "KVA",     color: "#d62728", linkColor: "rgba(214, 39, 40, 0.45)" }, // rot → heller
  { name: "CHP",     color: "#d62728", linkColor: "rgba(214, 39, 40, 0.45)" }, // rot → heller

  // Power Plant & Electricity – blau
  { name: "Power Plant", color: "#1f77b4", linkColor: "rgba(31, 119, 180, 0.45)" }, // blau → heller
  { name: "Electricity", color: "#1f77b4", linkColor: "rgba(31, 119, 180, 0.45)" }, // blau → heller

  // Heat pump & mobility
  { name: "Heat Pumps", color: "#d62728", linkColor: "rgba(214, 39, 40, 0.45)" }, // rot → heller
  { name: "Mobility",   color: "#8b5a2b", linkColor: "rgba(139, 90, 43, 0.45)" }, // braun → heller

  // District heat / heat / loss
  { name: "District Heat", color: "#d62728", linkColor: "rgba(214, 39, 40, 0.45)" }, // rot → heller
  { name: "Heat",          color: "#d62728", linkColor: "rgba(214, 39, 40, 0.45)" }, // rot → heller
  { name: "Loss",          color: "#cccccc", linkColor: "rgba(204, 204, 204, 0.45)" }, // grau → heller

  // Outputs
  { name: "Space Heat", color: "#d62728", linkColor: "rgba(214, 39, 40, 0.45)" }, // rot → heller
  { name: "Hot Water",  color: "#d62728", linkColor: "rgba(214, 39, 40, 0.45)" }, // rot → heller
  { name: "Ind Heat",   color: "#d62728", linkColor: "rgba(214, 39, 40, 0.45)" }, // rot → heller

  // Export
  { name: "Export", color: "#bdbdbd", linkColor: "rgba(189, 189, 189, 0.45)" }, // hellgrau → heller

  // End consumers – blau
  { name: "Households", color: "#1f77b4", linkColor: "rgba(31, 119, 180, 0.45)" }, // blau → heller
  { name: "Services",   color: "#1f77b4", linkColor: "rgba(31, 119, 180, 0.45)" }, // blau → heller
  { name: "Industry",   color: "#1f77b4", linkColor: "rgba(31, 119, 180, 0.45)" }, // blau → heller

  // Transport modes – hellbraun
  { name: "Road",     color: "#D2B48C", linkColor: "rgba(210, 180, 140, 0.45)" }, // hellbraun → heller
  { name: "Rail",     color: "#D2B48C", linkColor: "rgba(210, 180, 140, 0.45)" }, // hellbraun → heller
  { name: "Aviation", color: "#D2B48C", linkColor: "rgba(210, 180, 140, 0.45)" }  // hellbraun → heller
];



/* =========================================================
   3) WERTEARRAYS  [index = years]
   ========================================================= */
/* YEARS */
years = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

/* Fuels → Boilers */
OilToBoilers = [57.9, 62.99, 57.84, 60.68, 59.85, 59.92, 57.69, 50.2, 52.29, 50.58, 52.89, 41.9, 44.76, 46.79, 35.43, 37.19, 37.88, 35.54, 32.12, 31.2, 28.09, 31.03, 25.21, 24.53, 23.39];
NaturalGasToBoilers = [24.64, 25.89, 25.22, 26.76, 27.76, 28.71, 27.77, 27.09, 29.06, 27.57, 30.53, 26.68, 29.71, 31.89, 27.64, 29.99, 31.02, 31.25, 29.83, 30.12, 29.4, 31.65, 26.31, 23.93, 23.67];
NaturalGasToCHP = [3.66, 3.57, 3.69, 3.8, 3.77, 3.66, 3.7, 3.55, 3.58, 3.76, 4.48, 4.37, 4.32, 3.95, 3.41, 3.19, 3.83, 3.75, 3.36, 3.94, 3.76, 4.42, 3.38, 3.55, 4.24];
WoodToBoilers = [7.98, 8.49, 8.16, 8.77, 8.76, 9.13, 9.33, 9.16, 10.51, 11.07, 12.04, 10.68, 12.01, 13.19, 11.32, 11.77, 12.72, 13, 12.29, 12.83, 12.66, 14.8, 13.42, 14.01, 14.24];

/* Waste */
WasteToKVA = [9.44, 9.99, 10.27, 10.14, 10.3, 10.8, 11.91, 11.91, 11.79, 11.7, 12.11, 12.28, 12.6, 12.16, 12.39, 12.8, 13.26, 13.33, 13.44, 13.54, 13.57, 13.3, 12.77, 12.86, 13.2];

/* Ambient / Solar Thermal */
AmbientToHeatPumps = [1.19, 1.3, 1.32, 1.45, 1.53, 1.69, 1.75, 1.9, 2.26, 2.49, 3.01, 2.89, 3.38, 3.78, 3.5, 4, 4.42, 4.62, 4.54, 5, 5.18, 6.1, 5.82, 6.37, 6.8];
SolarThermalToHeat = [0.15, 0.17, 0.18, 0.19, 0.2, 0.22, 0.23, 0.26, 0.29, 0.34, 0.4, 0.46, 0.51, 0.57, 0.61, 0.66, 0.68, 0.7, 0.72, 0.73, 0.74, 0.74, 0.74, 0.73, 0.72];

/* KVA and District Heat */
KVAToDistrictHeat = [2.11, 2.23, 2.27, 2.39, 2.46, 2.6, 2.77, 2.83, 2.89, 2.81, 3.17, 3.07, 3.04, 3.13, 3.06, 3.4, 3.62, 3.71, 3.73, 4, 3.93, 4.24, 3.93, 4.07, 4.47];
KVAToElectricity = [0.89, 0.97, 1.01, 1.04, 1.11, 1.19, 1.35, 1.32, 1.37, 1.31, 1.39, 1.45, 1.54, 1.61, 1.72, 1.73, 1.86, 1.87, 1.84, 1.87, 1.87, 1.76, 1.74, 1.67, 1.73];
KVAToLoss = [6.44, 6.79, 6.98, 6.71, 6.73, 7.01, 7.79, 7.76, 7.53, 7.58, 7.56, 7.77, 8.01, 7.42, 7.62, 7.66, 7.78, 7.75, 7.87, 7.67, 7.77, 7.3, 7.11, 7.12, 7];
WoodToDistrictHeat = [0.05, 0.05, 0.06, 0.08, 0.09, 0.1, 0.09, 0.09, 0.11, 0.21, 0.26, 0.3, 0.44, 0.5, 0.51, 0.57, 0.6, 0.61, 0.59, 0.92, 0.91, 1.01, 1.03, 1.05, 1.38];
HPTtoDistrictHeat = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
GasToDistrictHeat = [1.56, 1.69, 1.62, 1.83, 1.82, 1.83, 1.52, 1.37, 1.59, 1.5, 1.69, 1.24, 1.58, 1.91, 1.27, 1.72, 2.08, 1.91, 1.82, 1.92, 1.89, 2.34, 1.79, 1.6, 1.67];
PowerPlantToDistrictHeat = [0.31, 0.33, 0.3, 0.31, 0.32, 0.31, 0.36, 0.35, 0.36, 0.36, 0.36, 0.36, 0.38, 0.35, 0.33, 0.31, 0.37, 0.37, 0.38, 0.38, 0.39, 0.42, 0.39, 0.4, 0.38];
DistrictHeatToHeat = [3.97, 4.26, 4.16, 4.44, 4.59, 4.63, 4.71, 4.54, 4.69, 4.66, 5.19, 4.76, 5.04, 5.38, 4.87, 5.53, 5.88, 6.01, 5.91, 6.54, 6.46, 7.17, 6.59, 6.74, 7.45];

/* Electricity generation */
HydroRiverToElectricity = [17.57, 17.75, 17.62, 15.4, 16.04, 15, 15.82, 16.55, 16.69, 16.11, 16.03, 14.73, 17.83, 17.76, 17.24, 16.6, 16.57, 15.95, 16.91, 17.7, 17.65, 16.96, 15.49, 17.49, 19.4];
HydroDamsToElectricity = [20.28, 24.51, 18.89, 21.05, 19.08, 17.76, 16.74, 19.83, 20.87, 21.03, 21.42, 19.06, 22.07, 21.81, 22.06, 22.89, 19.75, 20.72, 20.52, 22.86, 22.97, 22.54, 18.01, 23.29, 28.93];
UraniumToPowerPlant = [74.85, 75.88, 77.08, 77.79, 76.3, 66.06, 78.73, 79.03, 78.4, 78.36, 75.61, 76.68, 73.04, 74.61, 79.11, 66.28, 60.7, 58.5, 73.24, 75.84, 68.97, 55.59, 69.34, 70, 68.95];
PowerPlantToElectricity = [24.95, 25.29, 25.69, 25.93, 25.43, 22.02, 26.24, 26.34, 26.13, 26.12, 25.2, 25.56, 24.34, 24.87, 26.37, 22.1, 20.24, 19.5, 24.41, 25.28, 22.99, 18.53, 23.11, 23.33, 22.98];
PowerPlantToLoss = [49.9, 50.59, 51.38, 51.86, 50.86, 44.04, 52.49, 52.69, 52.26, 52.24, 50.41, 51.12, 48.69, 49.74, 52.74, 44.19, 40.47, 39, 48.83, 50.56, 45.98, 37.06, 46.23, 46.67, 45.97];
WindToElectricity = [0, 0, 0, 0, 0.01, 0.01, 0.02, 0.02, 0.02, 0.02, 0.04, 0.07, 0.09, 0.09, 0.1, 0.11, 0.11, 0.13, 0.12, 0.15, 0.14, 0.14, 0.15, 0.17, 0.17];
SolarToElectricity = [0.01, 0.01, 0.02, 0.02, 0.02, 0.02, 0.02, 0.03, 0.04, 0.05, 0.09, 0.17, 0.3, 0.5, 0.84, 1.12, 1.33, 1.68, 1.94, 2.18, 2.69, 2.96, 4.07, 4.91, 5.96];
ImportToElectricity = [24.33, 24.1, 27.8, 30.08, 27.06, 38.35, 33.8, 34.82, 31.6, 31.37, 33.4, 34.82, 31.55, 29.87, 28.53, 34.03, 34.1, 36.5, 31.02, 29.5, 26.99, 31.53, 33.12, 27.46, 25.96];

/* Mobility */
GasolineToMobility = [47.04, 45.74, 44.83, 44.61, 43.82, 42.49, 41.18, 40.79, 39.89, 38.81, 37.42, 35.98, 34.71, 33.13, 31.8, 29.46, 28.54, 27.67, 27.23, 27, 23.92, 24.44, 23.72, 24.53, 24.26];
DieselToMobility = [15.55, 15.83, 16.39, 17.39, 18.68, 20.4, 22.07, 23.7, 26.01, 26.4, 27.42, 28.16, 29.88, 31.22, 32.01, 31.57, 31.92, 31.82, 32.22, 32.24, 30.55, 30.9, 30.84, 30.19, 29.32];
JetToMobility = [18.91, 17.84, 16.5, 14.85, 14.01, 14.2, 14.88, 15.88, 16.99, 16.3, 17.12, 18.25, 18.7, 18.91, 19.04, 19.67, 20.6, 21.1, 22.3, 22.52, 8.51, 9.44, 16.63, 19.79, 21.59];

MobilityToRoad = [62.82, 61.8, 61.45, 62.23, 62.72, 63.11, 63.48, 64.71, 66.13, 65.44, 65.07, 64.36, 64.82, 64.6, 64.06, 61.3, 60.74, 59.79, 59.78, 59.6, 54.85, 55.83, 55.24, 55.58, 54.69];
MobilityToRail = [2.64, 2.7, 2.8, 2.98, 2.94, 2.98, 3.09, 3.08, 3.14, 3.06, 3.16, 3.06, 3.09, 3.14, 3.07, 3.14, 3.2, 3.15, 3.09, 3.04, 2.82, 2.97, 3.03, 3.02, 3.08];
MobilityToAviation = [18.91, 17.84, 16.5, 14.85, 14.01, 14.2, 14.88, 15.88, 16.99, 16.3, 17.12, 18.25, 18.7, 18.91, 19.04, 19.67, 20.6, 21.1, 22.3, 22.52, 8.51, 9.44, 16.63, 19.79, 21.59];

/* Conversions */
BoilersToHeat = [94.18, 100.94, 94.92, 100.01, 100.14, 101.42, 98.49, 90, 95.44, 92.98, 99.93, 83.63, 90.8, 95.82, 77.79, 82.13, 85.45, 83.54, 77.61, 78.08, 73.91, 81.9, 68.32, 66.03, 65.54];
CHPToHeat = [0.78, 0.82, 0.84, 0.86, 0.88, 0.9, 0.9, 0.89, 0.86, 0.84, 0.81, 0.78, 0.79, 0.78, 0.76, 0.74, 0.74, 0.7, 0.69, 0.69, 0.72, 0.71, 0.69, 0.68, 0.66];
HPToHeat = [1.82, 1.97, 2, 2.19, 2.29, 2.53, 2.61, 2.8, 3.34, 3.65, 4.44, 4.21, 4.93, 5.52, 5.05, 5.77, 6.39, 6.66, 6.5, 7.17, 7.4, 8.74, 8.25, 9.02, 9.6];
CHPToElectricity = [1.59, 1.57, 1.63, 1.67, 1.66, 1.62, 1.64, 1.6, 1.62, 1.69, 1.98, 1.96, 1.97, 1.85, 1.64, 1.57, 1.84, 1.83, 1.69, 1.95, 1.92, 2.2, 1.79, 1.87, 2.15];

/* Heat outputs */
HeatToSpace = [72.97, 79.57, 73.09, 79.65, 78.03, 80.61, 78.01, 68.19, 75.7, 74.29, 83.8, 64.57, 73.25, 80.93, 60.13, 66.97, 71.75, 69.1, 62.81, 63.89, 59.4, 70.44, 55.83, 57.51, 58.76];
HeatToWater = [13.8, 13.71, 13.74, 13.74, 13.7, 13.65, 13.68, 13.69, 13.67, 13.69, 13.63, 13.56, 13.46, 13.41, 13.32, 13.24, 13.14, 13.01, 12.95, 12.94, 13.28, 12.94, 12.82, 12.55, 11.85];
HeatToIndHeat = [29.93, 29.5, 28.06, 28.11, 28.38, 28.82, 28.8, 29.25, 28.91, 25.92, 27.21, 27.15, 27.38, 27.13, 26.53, 25.81, 26.02, 25.94, 26.28, 26.11, 25, 26, 26.03, 24.69, 24.9];


/* Electricity usage */
ElectricityToHouseholds = [8.79, 9.13, 9.31, 9.58, 9.76, 10, 10.17, 10.28, 10.54, 10.66, 10.93, 10.7, 10.78, 10.84, 10.57, 10.71, 10.62, 10.5, 10.31, 10.04, 9.97, 9.76, 9.49, 9.47, 9.31];
ElectricityToIndustry = [15.6, 15.44, 14.97, 15.03, 15.22, 15.28, 14.98, 15.32, 15.47, 14.47, 15.08, 15.21, 14.96, 14.68, 14.54, 14.21, 14.1, 14.03, 14.11, 14, 13.44, 14, 14.01, 13.41, 13.16];
ElectricityToServices = [13.51, 13.85, 13.96, 14.35, 14.39, 14.63, 14.88, 14.99, 15.39, 15.53, 15.92, 15.74, 15.76, 15.77, 15.46, 15.68, 15.44, 15.3, 15.21, 15.15, 14.45, 14.52, 14.37, 14.24, 14.74];
ElectricityToLoss = [5.91, 5.98, 6.48, 7.03, 6.65, 6.94, 7.06, 6.42, 7.1, 6.84, 6.99, 6.87, 6.85, 6.59, 6.68, 6.68, 7.3, 8.55, 8.32, 8.44, 8.68, 8.57, 9.93, 9.64, 9.14];
ElectricityToHP = [0.63, 0.68, 0.68, 0.74, 0.77, 0.85, 0.86, 0.91, 1.08, 1.17, 1.43, 1.32, 1.55, 1.74, 1.55, 1.78, 1.97, 2.04, 1.97, 2.17, 2.22, 2.64, 2.44, 2.65, 2.8];
ElectricityToHeat = [13.19, 13.47, 13.09, 13.37, 13.46, 13.74, 13.81, 13.67, 14.16, 13.7, 14.49, 13.78, 14.18, 14.49, 13.62, 13.73, 14.02, 13.87, 13.85, 13.93, 13.55, 14.1, 13.64, 13.46, 10.07];
ElectricityToMobility = [2.87, 2.93, 3.03, 3.21, 3.17, 3.21, 3.32, 3.3, 3.37, 3.29, 3.39, 3.29, 3.33, 3.38, 3.32, 3.4, 3.48, 3.45, 3.41, 3.4, 3.2, 3.46, 3.7, 3.88, 4.19];
ElectricityToExport = [31.4, 34.54, 32.31, 33.2, 27.76, 32, 31.1, 36.88, 32.74, 33.52, 32.88, 32.24, 33.75, 32.27, 34.02, 35.07, 30.17, 30.95, 32.61, 35.76, 32.55, 29.12, 29.73, 33.86, 40.35];





/* =========================================================
   4) LINK-DEFINITIONEN (ALLE!)
   ========================================================= */
const linkDefs = [
  // Fuels → Boilers
  { source: "Oil", target: "Boilers", key: "OilToBoilers", label: "Oil → Boilers", values: OilToBoilers },
  { source: "Natural Gas", target: "Boilers", key: "NaturalGasToBoilers", label: "Natural Gas → Boilers", values: NaturalGasToBoilers },
  { source: "Natural Gas", target: "CHP", key: "NaturalGasToCHP", label: "Natural Gas → CHP", values: NaturalGasToCHP },
  { source: "Wood", target: "Boilers", key: "WoodToBoilers", label: "Wood → Boilers", values: WoodToBoilers },

  // Waste
  { source: "Waste", target: "KVA", key: "WasteToKVA", label: "Waste → KVA", values: WasteToKVA },

  // Ambient / Solar
  { source: "Ambient", target: "Heat Pumps", key: "AmbientToHeatPumps", label: "Ambient → Heat Pumps", values: AmbientToHeatPumps },
  { source: "Solar Thermal", target: "Heat", key: "SolarThermalToHeat", label: "Solar Thermal → Heat", values: SolarThermalToHeat },

  // District heat
  { source: "KVA", target: "District Heat", key: "KVAToDistrictHeat", label: "KVA → District Heat", values: KVAToDistrictHeat },
  { source: "KVA", target: "Electricity", key: "KVAToElectricity", label: "KVA → Electricity", values: KVAToElectricity },
  { source: "KVA", target: "Loss", key: "KVAToLoss", label: "KVA → Loss", values: KVAToLoss },
  { source: "Wood", target: "District Heat", key: "WoodToDistrictHeat", label: "Wood → District Heat", values: WoodToDistrictHeat },
  { source: "Heat Pumps", target: "District Heat", key: "HPTtoDistrictHeat", label: "Heat Pumps → District Heat", values: HPTtoDistrictHeat },
  { source: "Natural Gas", target: "District Heat", key: "GasToDistrictHeat", label: "Gas → District Heat", values: GasToDistrictHeat },
  { source: "Power Plant", target: "District Heat", key: "PowerPlantToDistrictHeat", label: "Power Plant → District Heat", values: PowerPlantToDistrictHeat },
  { source: "District Heat", target: "Heat", key: "DistrictHeatToHeat", label: "District Heat → Heat", values: DistrictHeatToHeat },

  // Electricity generation
  { source: "Hydro River", target: "Electricity", key: "HydroRiverToElectricity", label: "Hydro River → Electricity", values: HydroRiverToElectricity },
  { source: "Hydro Dams", target: "Electricity", key: "HydroDamsToElectricity", label: "Hydro Dams → Electricity", values: HydroDamsToElectricity },
  { source: "Uranium", target: "Power Plant", key: "UraniumToPowerPlant", label: "Uranium → Power Plant", values: UraniumToPowerPlant },
  { source: "Power Plant", target: "Electricity", key: "PowerPlantToElectricity", label: "Power Plant → Electricity", values: PowerPlantToElectricity },
  { source: "Power Plant", target: "Loss", key: "PowerPlantToLoss", label: "Power Plant → Loss", values: PowerPlantToLoss },
  { source: "Wind", target: "Electricity", key: "WindToElectricity", label: "Wind → Electricity", values: WindToElectricity },
  { source: "Photovoltaic", target: "Electricity", key: "SolarToElectricity", label: "Photovoltaic → Electricity", values: SolarToElectricity },
  { source: "Import", target: "Electricity", key: "ImportToElectricity", label: "Import → Electricity", values: ImportToElectricity },

  // Mobility
  { source: "Gasoline", target: "Mobility", key: "GasolineToMobility", label: "Gasoline → Mobility", values: GasolineToMobility },
  { source: "Diesel", target: "Mobility", key: "DieselToMobility", label: "Diesel → Mobility", values: DieselToMobility },
  { source: "Jet fuel", target: "Mobility", key: "JetToMobility", label: "Jet fuel → Mobility", values: JetToMobility },
  { source: "Mobility", target: "Road", key: "MobilityToRoad", label: "Mobility → Road", values: MobilityToRoad },
  { source: "Mobility", target: "Rail", key: "MobilityToRail", label: "Mobility → Rail", values: MobilityToRail },
  { source: "Mobility", target: "Aviation", key: "MobilityToAviation", label: "Mobility → Aviation", values: MobilityToAviation },

  // Conversions
  { source: "Boilers", target: "Heat", key: "BoilersToHeat", label: "Boilers → Heat", values: BoilersToHeat },
  { source: "CHP", target: "Heat", key: "CHPToHeat", label: "CHP → Heat", values: CHPToHeat },
  { source: "Heat Pumps", target: "Heat", key: "HPToHeat", label: "Heat Pumps → Heat", values: HPToHeat },
  { source: "CHP", target: "Electricity", key: "CHPToElectricity", label: "CHP → Electricity", values: CHPToElectricity },

  // Heat outputs
  { source: "Heat", target: "Space Heat", key: "HeatToSpace", label: "Heat → Space Heat", values: HeatToSpace },
  { source: "Heat", target: "Hot Water", key: "HeatToWater", label: "Heat → Hot Water", values: HeatToWater },
  { source: "Heat", target: "Ind Heat", key: "HeatToIndHeat", label: "Heat → Industrial Heat", values: HeatToIndHeat },

  // Electricity usage
  { source: "Electricity", target: "Households", key: "ElectricityToHouseholds", label: "Electricity → Households", values: ElectricityToHouseholds },
  { source: "Electricity", target: "Industry", key: "ElectricityToIndustry", label: "Electricity → Industry", values: ElectricityToIndustry },
  { source: "Electricity", target: "Services", key: "ElectricityToServices", label: "Electricity → Services", values: ElectricityToServices },
  { source: "Electricity", target: "Loss", key: "ElectricityToLoss", label: "Electricity → Loss", values: ElectricityToLoss },
  { source: "Electricity", target: "Heat Pumps", key: "ElectricityToHP", label: "Electricity → Heat Pumps", values: ElectricityToHP },
  { source: "Electricity", target: "Heat", key: "ElectricityToHeat", label: "Electricity → Heat", values: ElectricityToHeat },
  { source: "Electricity", target: "Mobility", key: "ElectricityToMobility", label: "Electricity → Mobility", values: ElectricityToMobility },
  { source: "Electricity", target: "Export", key: "ElectricityToExport", label: "Electricity → Export", values: ElectricityToExport }
];