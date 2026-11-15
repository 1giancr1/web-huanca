// ============================================================================
// CONFIGURACIÓN CENTRAL DE FIREBASE - TRANSPORTES SEÑOR DE HUANCA S.A.C.
// Conectado al proyecto: transportes-sr-de-huanca
// ============================================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export const firebaseConfig = {
  apiKey: "AIzaSyAcCCMIDyl5cdNItiKrelFY5iA-AwF0_FM",
  authDomain: "transportes-sr-de-huanca.firebaseapp.com",
  projectId: "transportes-sr-de-huanca",
  storageBucket: "transportes-sr-de-huanca.firebasestorage.app",
  messagingSenderId: "442018051416",
  appId: "1:442018051416:web:485a25687755c2a2f1612d"
};

// Datos operativos de tu empresa
export const EMPRESA_CONFIG = {
  nombre: "Señor de Huanca Espinar S.A.C.",
  ruc: "20612345678",
  whatsappCentral: "51984000111",
  yapeEmpresa: "984-000-111 (Señor de Huanca Espinar S.A.C.)",
  cuentaBCP: "BCP Soles: 285-9918273-0-44 | CCI: 002-28500991827304452",
  claveGerencia: "2026",
  retencionPorDefecto: 22,
  limiteDeudaBloqueo: 100
};

export const isFirebaseConfigured = !firebaseConfig.apiKey.includes("PEGA_AQUI");

let app = null;
let db = null;

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
}

export {
  db,
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
};

// Flota inicial de 20 unidades
export const FLOTA_INICIAL = [
  { id: "U01", numero: "01", placa: "V8B-512", chofer: "Carlos Mamani Quispe", dni: "41234501", vehiculo: "Toyota Corolla Sedan", yape: "984-111-001", deuda: 45.00, activo: true },
  { id: "U02", numero: "02", placa: "X4K-219", chofer: "Juan Quispe Condori", dni: "41234502", vehiculo: "Hyundai Elantra", yape: "984-111-002", deuda: 130.00, activo: false },
  { id: "U03", numero: "03", placa: "V9M-804", chofer: "Luis Huamán Ccama", dni: "41234503", vehiculo: "Toyota Yaris", yape: "984-111-003", deuda: 22.00, activo: true },
  { id: "U04", numero: "04", placa: "B7T-331", chofer: "Marco Antonio Choque", dni: "41234504", vehiculo: "Kia Cerato", yape: "984-111-004", deuda: 0.00, activo: true },
  { id: "U05", numero: "05", placa: "C2R-615", chofer: "Edgar Flores Apaza", dni: "41234505", vehiculo: "Toyota Hilux 4x4", yape: "984-111-005", deuda: 60.00, activo: true },
  { id: "U06", numero: "06", placa: "D5N-902", chofer: "Wilber Cárdenas Tito", dni: "41234506", vehiculo: "Nissan Sentra", yape: "984-111-006", deuda: 15.00, activo: true },
  { id: "U07", numero: "07", placa: "F1P-448", chofer: "René Vilca Huanca", dni: "41234507", vehiculo: "Toyota Corolla", yape: "984-111-007", deuda: 0.00, activo: true },
  { id: "U08", numero: "08", placa: "G8L-773", chofer: "Héctor Mendoza Puma", dni: "41234508", vehiculo: "Hyundai Tucson", yape: "984-111-008", deuda: 35.00, activo: true },
  { id: "U09", numero: "09", placa: "H3S-129", chofer: "José Luis Cutipa", dni: "41234509", vehiculo: "Toyota Avanza", yape: "984-111-009", deuda: 0.00, activo: true },
  { id: "U10", numero: "10", placa: "J6W-550", chofer: "Percy Supo Mamani", dni: "41234510", vehiculo: "Kia Sportage", yape: "984-111-010", deuda: 50.00, activo: true },
  { id: "U11", numero: "11", placa: "K9Y-304", chofer: "Raúl Calcina Chura", dni: "41234511", vehiculo: "Toyota Yaris", yape: "984-111-011", deuda: 0.00, activo: true },
  { id: "U12", numero: "12", placa: "L2Z-817", chofer: "Óscar Hancco Nina", dni: "41234512", vehiculo: "Nissan Versa", yape: "984-111-012", deuda: 40.00, activo: true },
  { id: "U13", numero: "13", placa: "M4X-662", chofer: "David Ticona Larico", dni: "41234513", vehiculo: "Toyota Hilux 4x4", yape: "984-111-013", deuda: 0.00, activo: true },
  { id: "U14", numero: "14", placa: "N7V-941", chofer: "Víctor Hugo Turpo", dni: "41234514", vehiculo: "Hyundai Accent", yape: "984-111-014", deuda: 25.00, activo: true },
  { id: "U15", numero: "15", placa: "P1Q-208", chofer: "Ángel Cruz Pacori", dni: "41234515", vehiculo: "Toyota Corolla", yape: "984-111-015", deuda: 0.00, activo: true },
  { id: "U16", numero: "16", placa: "Q5B-739", chofer: "Rolando Quispe Yana", dni: "41234516", vehiculo: "Kia Rio Sedan", yape: "984-111-016", deuda: 70.00, activo: true },
  { id: "U17", numero: "17", placa: "R8D-415", chofer: "César Augusto Merma", dni: "41234517", vehiculo: "Toyota RAV4", yape: "984-111-017", deuda: 0.00, activo: true },
  { id: "U18", numero: "18", placa: "S3F-890", chofer: "Fredy Coaquira Huarca", dni: "41234518", vehiculo: "Hyundai Elantra", yape: "984-111-018", deuda: 18.00, activo: true },
  { id: "U19", numero: "19", placa: "T6G-154", chofer: "Mario Alberto Jara", dni: "41234519", vehiculo: "Nissan Frontier 4x4", yape: "984-111-019", deuda: 0.00, activo: true },
  { id: "U20", numero: "20", placa: "U9H-627", chofer: "Efraín Condori Salas", dni: "41234520", vehiculo: "Toyota Corolla", yape: "984-111-020", deuda: 30.00, activo: true }
];

export async function asegurarFlotaInicial() {
  if (!db) return;
  const u01Ref = doc(db, "unidades", "U01");
  const snap = await getDoc(u01Ref);
  if (!snap.exists()) {
    for (const u of FLOTA_INICIAL) {
      await setDoc(doc(db, "unidades", u.id), u);
    }
  }
}
