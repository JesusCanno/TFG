// filters.js
export function filterApartments(apartments, filters, searchTerm = "") {
  console.log("Inmuebles recibidos para filtrar:", apartments);
  return apartments.filter((apartment) => {
    // Filtro por nombre de vivienda (que en el backend se llama 'titulo')
    if (searchTerm && !apartment.titulo.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Filtro por tipo de inmueble
    if (filters.tipoInmueble && apartment.tipo !== filters.tipoInmueble) {
      return false;
    }

    // Convertir precio del apartamento a número (soporta string o número)
    let precioNumerico = apartment.precio;
    if (typeof precioNumerico === 'string') {
      precioNumerico = parseInt(precioNumerico.replace(/[.€\s]/g, ""));
    } else {
      precioNumerico = Number(precioNumerico);
    }

    // Filtro por precio
    if (
      (filters.precioMin && precioNumerico < filters.precioMin) ||
      (filters.precioMax && precioNumerico > filters.precioMax)
    ) {
      return false;
    }

    // Convertir área a número (que en el backend se llama 'metro')
    let areaNumerico = apartment.metro;
    if (typeof areaNumerico === 'string') {
      const areaString = areaNumerico.replace(/[m²\s]/g, "").replace(",", ".");
      areaNumerico = parseFloat(areaString);
    } else {
      areaNumerico = Number(areaNumerico);
    }

    // Filtro por metros cuadrados
    if (
      (filters.metrosMin && areaNumerico < filters.metrosMin) ||
      (filters.metrosMax && areaNumerico > filters.metrosMax)
    ) {
      return false;
    }

    // Filtro por habitaciones (que en el backend se llama 'habitacion' en singular)
    if (
      (filters.habitacionesMin && apartment.habitacion < filters.habitacionesMin) ||
      (filters.habitacionesMax && apartment.habitacion > filters.habitacionesMax)
    ) {
      return false;
    }

    return true;
  });
}
