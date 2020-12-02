export interface Bolsos {
    Referencia: number; //Referencia única de cada bolso (aparte del id asignado por firestore)
    Nombre: string; //Nombre del bolso
    Categoria: string; //Categoría: (tote, crossbody, clutch, shoulderbag, drawstring, satchel, hobo)
    Color: string; //Color principal del bolso
    Herrajes: string; //color (Oro/Niquel)
    Imagen: string; //URL
    Piel: string; // Tipo de piel (Cuero, Ante, Napa, Serraje, Nobuk, Charol, Textil)
    FechaDiseno: string; //Fecha
    Precio: number; //Precio del bolso
}
