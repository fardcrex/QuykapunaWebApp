export class EventModel {
  constructor(
    eventoId,
    eventoNombre,
    eventoDescripcion,
    eventoFecha,
    administradorId,
    estadoEventoId,
    empresaId,
    usuarioId,
    condominioId
  ) {
    this.eventoId = eventoId;
    this.eventoNombre = eventoNombre;
    this.eventoDescripcion = eventoDescripcion;
    this.eventoFecha = eventoFecha;
    this.administradorId = administradorId;
    this.estadoEventoId = estadoEventoId;
    this.empresaId = empresaId;
    this.usuarioId = usuarioId;
    this.condominioId = condominioId;
  }
}
/* {
    eventoId: 1,
    eventoNombre: "halasda",
    eventoDescripcion:
      "Para especificar validaciones de propiedades, puede proporcionar un objeto con requisitos de validación ",
    eventoFecha: new Date()
  },
  {
    eventoId: 2,
    eventoNombre: "Validación de la propiedad",
    eventoDescripcion:
      "Tenga en cuenta que los objetos y las matrices en JavaScript se pasan por referencia, por lo que si la propiedad es una matriz u objeto, mutar el objeto o la matriz dentro del componente hijo",
    eventoFecha: new Date()
  },
  {
    eventoId: 3,
    eventoNombre: "halasda",
    eventoDescripcion:
      "Para especificar validaciones de propiedades, puede proporcionar un objeto con requisitos de validación ",
    eventoFecha: new Date()
  },
  {
    eventoId: 4,
    eventoNombre: "Validación de la propiedad",
    eventoDescripcion:
      "Tenga en cuenta que los objetos y las matrices en JavaScript se pasan por referencia, por lo que si la propiedad es una matriz u objeto, mutar el objeto o la matriz dentro del componente hijo",
    eventoFecha: new Date()
  } */
