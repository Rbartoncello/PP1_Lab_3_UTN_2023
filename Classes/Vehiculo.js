class Vehiculo {
    constructor(id, modelo, anoFab, velMax) {
        this.id = id;
        this.modelo = modelo;
        this.anoFab = anoFab;
        this.velMax = velMax;
    }

    toString() {
        return `ID: ${this.id}, Modelo: ${this.modelo}, Año de fabricacion: ${this.anoFab}, Velociadad Maxima: ${this.velMax}`;
    }

    toJson() {
        return JSON.stringify({
            id: this.id,
            modelo: this.modelo,
            anoFab: this.anoFab,
            velMax: this.velMax
        });
    }

    update(data){
        this.modelo = data.modelo;
        this.anoFab = Number(data.anoFab);
        this.velMax = Number(data.velMax);
    }
}