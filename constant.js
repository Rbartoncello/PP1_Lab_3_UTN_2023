const inputsDefault = [
  { name: "Id", id: "id", type: "text" },
  { name: "Modelo", id: "modelo", type: "text" },
  { name: "Año de fabricacion", id: "anoFab", type: "number", min: 1885 },
  { name: "Velocidad Maxima", id: "velMax", type: "number", min: 0 },
];

const inputsAir = [
  { name: "Altura Maxima", id: "altMax", type: "number", min: 0 },
  { name: "Autonomia", id: "autonomia", type: "number", min: 0 },
];

const inputsLand = [
  { name: "Cantidad Puertas", id: "cantPue", type: "number", min: -1 },
  { name: "Cantidad Ruedas", id: "cantRue", type: "number", min: 0 },
];
