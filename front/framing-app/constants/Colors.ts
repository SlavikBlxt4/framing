/**
 * Color theme used across the app.
 * Both light and dark themes share the same colors for consistency.
 */

const shared = {
  text: '#000000',               // Texto principal
  background: '#FFFFFF',         // Fondo general
  tint: '#359C9B',               // Color destacado (botones, links)
  icon: '#359C9B',               // Iconos generales
  tabIconDefault: '#999999',     // Icono en tab inactivo
  tabIconSelected: '#359C9B',    // Icono en tab activo
  accent: '#F2FFFF',             // Color de acento (sutiles)
  border: '#E5E5E5',             // Bordes (tabBar, inputs...)
};

export const Colors = {
  light: shared,
  dark: shared,
};
