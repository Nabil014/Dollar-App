export const getDollar = async () => {
  try {
    const response = await fetch(
      'https://www.dolarsi.com/api/api.php?type=valoresprincipales'
    )
    const json = await response.json()
    return json
      .filter((cotizaciones) =>
        [
          'Dolar Oficial',
          'Dolar Blue',
          'Dolar Bolsa',
          'Dolar Contado con Liqui',
        ].includes(cotizaciones.casa.nombre)
      )
      .map((cotizacion) => ({
        nombre: cotizacion.casa.nombre,
        compra: parseFloat(cotizacion.casa.compra.replace(',', '.')),
        venta: parseFloat(cotizacion.casa.venta.replace(',', '.')),
      }))
  } catch (error) {
    console.error(error)
  }
}
