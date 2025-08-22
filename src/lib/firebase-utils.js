import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { db } from './firebase';

// Products CRUD
export const getProducts = async () => {
  const q = query(collection(db, 'products'), orderBy('name'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getProduct = async (id) => {
  const docRef = doc(db, 'products', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
};

export const addProduct = async (productData) => {
  const docRef = await addDoc(collection(db, 'products'), productData);
  return docRef.id;
};

export const updateProduct = async (id, productData) => {
  const docRef = doc(db, 'products', id);
  await updateDoc(docRef, productData);
};

export const deleteProduct = async (id) => {
  const docRef = doc(db, 'products', id);
  await deleteDoc(docRef);
};

// Services CRUD
export const getServices = async () => {
  const q = query(collection(db, 'services'), orderBy('name'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getService = async (id) => {
  const docRef = doc(db, 'services', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
};

export const addService = async (serviceData) => {
  const docRef = await addDoc(collection(db, 'services'), serviceData);
  return docRef.id;
};

export const updateService = async (id, serviceData) => {
  const docRef = doc(db, 'services', id);
  await updateDoc(docRef, serviceData);
};

export const deleteService = async (id) => {
  const docRef = doc(db, 'services', id);
  await deleteDoc(docRef);
};

// Orders CRUD
export const getOrders = async () => {
  const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getOrder = async (id) => {
  const docRef = doc(db, 'orders', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
};

export const addOrder = async (orderData) => {
  const orderWithTimestamp = {
    ...orderData,
    createdAt: new Date(),
    status: 'pending'
  };
  const docRef = await addDoc(collection(db, 'orders'), orderWithTimestamp);
  return docRef.id;
};

export const updateOrder = async (id, orderData) => {
  const docRef = doc(db, 'orders', id);
  await updateDoc(docRef, orderData);
};

export const deleteOrder = async (id) => {
  const docRef = doc(db, 'orders', id);
  await deleteDoc(docRef);
};
