export const GuardarEnStorage = (clave, elemento) => {

    // Conseguir los elementos que ya tenemos en localStorage
    let elementos = JSON.parse(localStorage.getItem(clave));

    // Comprobar si es un array
    if (Array.isArray(elementos)) {

      // Guardar dentro del array new element
      elementos.push(elemento);

    } else {

      // Crear array con nuevo elemento
      elementos = [elemento];
      
    }

    console.log(elementos);

    // Guardar en localStorage
    localStorage.setItem(clave, JSON.stringify(elementos));

    // Devolver obj guardado
    return elemento;
}