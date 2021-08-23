export class SluzbenoLice{

    constructor(ID,ime,mesto,uloga){
        this.ID = ID;
        this.ime = ime;
        this.mesto = mesto;
        this.uloga = uloga;
    }
    getIme(){
        return this.ime;
    }
    getUloga()
    {
        return this.uloga;
    }
    getMesto()
    {
        return this.mesto;
    }
    setID(id)
    {
        this.ID = id;
    }
}