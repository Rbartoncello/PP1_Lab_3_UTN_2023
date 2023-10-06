class Empleado extends Persona {
  constructor(id, nombre, apellido, edad, sueldo, ventas) {
    super(id, nombre, apellido, edad);
    this.sueldo = sueldo;
    this.ventas = ventas;
  }

  toString() {
    return (
      super.toString() + `, Sueldo: ${this.sueldo}, Ventas: ${this.ventas}`
    );
  }

  toJson() {
    const personaJson = super.toJson();
    const empleadoJson = JSON.stringify({
      sueldo: this.sueldo,
      ventas: this.ventas,
    });
    return Object.assign(JSON.parse(personaJson), JSON.parse(empleadoJson));
  }

  update(data){
    super.update(data);
    this.sueldo = Number(data.sueldo);
    this.ventas = Number(data.ventas);
  }
}