function formatPrecio(precio) {
  if (precio) {
    return Math.round(precio * 100) / 100;
  } else {
    return 0;
  }
}
export { formatPrecio };
