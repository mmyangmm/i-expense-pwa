export const firebaseConfig = {
  apiKey: "AIzaSyBflzaANT9BnCbMfBVbjvxyM8KnirJBAvo",
  authDomain: "i-expense-pwa.firebaseapp.com",
  projectId: "i-expense-pwa",
  storageBucket: "i-expense-pwa.firebasestorage.app",
  messagingSenderId: "160747680735",
  appId: "1:160747680735:web:1ce0be9463eb033f318a6a"
};

export const firebaseIsConfigured =
  Boolean(firebaseConfig.apiKey) &&
  Boolean(firebaseConfig.authDomain) &&
  Boolean(firebaseConfig.projectId) &&
  Boolean(firebaseConfig.appId);
