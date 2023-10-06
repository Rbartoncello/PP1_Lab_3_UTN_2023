class Terrestre extends Vehiculo {
    constructor(id, modelo, anoFab, velMax, cantPue, cantRue) {
        super(id, modelo, anoFab, velMax);
        this.cantPue = cantPue;
        this.cantRue = cantRue;
    }
    
    toString() {
        return (
        super.toString() +
        `, CantPue: ${this.cantPue}, CantPue: ${this.cantRue}`
        );
    }

    toJson() {
        const vehiculoJson = super.toJson();
        const terrestreJson = JSON.stringify({
        cantPue: this.cantPue,
        cantRue: this.cantRue,
        });
        return Object.assign(JSON.parse(vehiculoJson), JSON.parse(terrestreJson));
    }
    
    update(data){
        super.update(data);
        this.cantPue = Number(data.cantPue);
        this.cantRue = Number(data.cantRue);
    }
}