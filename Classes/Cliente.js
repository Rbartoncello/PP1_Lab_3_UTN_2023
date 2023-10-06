class Cliente extends Persona {
    constructor(id, nombre, apellido, edad, compras, telefono) {
        super(id, nombre, apellido, edad);
        this.compras = compras;
        this.telefono = telefono;
    }

    mostrarInformacion() {
        super.mostrarInformacion();
        console.log(`Compras: ${this.compras}`);
        console.log(`Teléfono: ${this.telefono}`);
    }

    toString() {
        return (
        super.toString() +
        `, Compras: ${this.compras}, Teléfono: ${this.telefono}`
        );
    }

    toJson() {
        const personaJson = super.toJson();
        const clienteJson = JSON.stringify({
        compras: this.compras,
        telefono: this.telefono,
        });
        return Object.assign(JSON.parse(personaJson), JSON.parse(clienteJson));
    }
    
    update(data){
        super.update(data);
        this.compras = data.compras;
        this.telefono = data.telefono;
    }
}