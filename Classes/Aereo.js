class Aereo extends Vehiculo {
  constructor(id, modelo, anoFab, velMax, altMax, autonomia) {
    super(id, modelo, anoFab, velMax);
    this.altMax = altMax;
    this.autonomia = autonomia;
  }

  toString() {
    return (
      super.toString() + `, Altura Maxima: ${this.altMax}, Autonomia: ${this.autonomia}`
    );
  }

  toJson() {
    const vehiculoJson = super.toJson();
    const aereoJson = JSON.stringify({
      altMax: this.altMax,
      autonomia: this.autonomia,
    });
    return Object.assign(JSON.parse(vehiculoJson), JSON.parse(aereoJson));
  }

  update(data){
    super.update(data);
    this.altMax = Number(data.altMax);
    this.autonomia = Number(data.autonomia);
  }
}