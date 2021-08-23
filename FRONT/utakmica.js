import { SluzbenoLice } from "./sluzbenoLice.js";
import { Kolo } from "./kolo.js";
export class Utakmica{
    constructor(host,redosled,ID,timA,timB,mestoOdigravanja,vremeOdigravanja,datum,kolo)
    {
        this.kolo = kolo;
        this.redosled = redosled;
        this.ID  = ID;
        this.timA = timA;
        this.timB = timB;
        this.mestoOdigravanja = mestoOdigravanja;
        this.vremeOdigravanja = vremeOdigravanja;
        this.datum = datum;
        this.miniKontejner = null;
        this.sluzbenaLica = [" "," "," "," "];
        this.crtajUtakmicu(host);

        console.log(this.redosled);
    }
    proverizauzetost(sluzbenoLice)
    {
        let kontejner2 = document.querySelector(".utakmica"+this.timA+this.timB);
        console.log(kontejner2);
        let kontejner = kontejner2.querySelector(".div2");

        let uloga = sluzbenoLice.uloga;
        let lbl = "";
        switch(uloga)
        {
            case "Glavni Sudija":
                
            lbl = kontejner.querySelector(".glavniSudijaLabel");
            if (lbl.innerHTML.length>16)
                return "zauzet"; break;
            case "Prvi Pomocni Sudija":

                 lbl = kontejner.querySelector(".ppslbl");
                 if (lbl.innerHTML.length>22)
                return "zauzet"; break;
            case "Drugi Pomocni Sudija":
                lbl = kontejner.querySelector(".drugiPomocniSudijaLabel");
             
                //console.log("DPS -> "+lbl.innerHTML);
                if (lbl.innerHTML.length>23)
                return "zauzet"; break;
            case "Delegat":
                lbl = kontejner.querySelector(".delegatLabel");
                if (lbl.innerHTML.length>17)
                return "zauzet"; break;
            default:
                return "slobodan";
        }

    }
    vratiZauzetiID(uloga)
    {
        console.log(this.sluzbenaLica);
        switch(uloga)
        {
            case "Glavni Sudija":
                return this.sluzbenaLica[0].ID;
            case "Prvi Pomocni Sudija":
                return this.sluzbenaLica[1].ID;
            case "Drugi Pomocni Sudija":
                return this.sluzbenaLica[2].ID;
            case "Delegat":
                return this.sluzbenaLica[3].ID;

            default:
                return -1;
        }
    }
    dodajSluzbenoLice(sluzbenoLice)
    {
        let kontejner2 = document.querySelector(".utakmica"+this.timA+this.timB);
        console.log(kontejner2);
        let kontejner = kontejner2.querySelector(".div2");
        switch(sluzbenoLice.getUloga())
        {  
        case "Glavni Sudija":
            this.sluzbenaLica[0] = sluzbenoLice;
            let gsl = kontejner.querySelector(".glavniSudijaLabel");
            gsl.innerHTML = "Glavni sudija: "+this.sluzbenaLica[0].getIme() + "(" +sluzbenoLice.getMesto()+ ")"; break;
        case "Prvi Pomocni Sudija":
            this.sluzbenaLica[1] = sluzbenoLice;
            let ppsl = kontejner.querySelector(".ppslbl");
            ppsl.innerHTML ="Prvi pomocni sudija: "+ this.sluzbenaLica[1].getIme() + "(" +sluzbenoLice.getMesto()+ ")"; break;
        case "Drugi Pomocni Sudija":
            this.sluzbenaLica[2] = sluzbenoLice;
            let dpsl = kontejner.querySelector(".drugiPomocniSudijaLabel");
            dpsl.innerHTML = "Drugi pomocni sudija: "+ this.sluzbenaLica[2].getIme() + "(" +sluzbenoLice.getMesto()+ ")"; break;
        case "Delegat":
            this.sluzbenaLica[3] = sluzbenoLice;
            let dlg = kontejner.querySelector(".delegatLabel");
            dlg.innerHTML = "Delegat: "+this.sluzbenaLica[3].getIme() + "(" +sluzbenoLice.getMesto()+ ")"; break; 
        
        
        }
    }
    crtajUtakmicu(host)
    {
        this.miniKontejner = document.createElement("div");
        this.miniKontejner.className="utakmica"+this.timA+this.timB;

        let div1 = document.createElement("div");

        div1.className = "div1";
        let mestoLabel = document.createElement("h4");
        mestoLabel.className = "mestoLabel";
        mestoLabel.innerHTML = this.mestoOdigravanja;
        div1.appendChild(mestoLabel);

        let datumLabel = document.createElement("h4");
        datumLabel.className = "datumLabel";
        datumLabel.innerHTML = this.datum + " " +this.vremeOdigravanja;
        div1.appendChild(datumLabel);

        this.miniKontejner.appendChild(div1);

        let div2 = document.createElement("div");
        div2.className ="div2";

        let timAlabel = document.createElement("h4");
        timAlabel.className = "timAlabel";
        timAlabel.innerHTML = this.timA;

       // let crta = document.createTextNode(" - ")

        let timBlabel = document.createElement("h4");
        timBlabel.className = "timBlabel";
        timBlabel.innerHTML = this.timB;

        let utakmicaLabel = document.createElement("h4");
        utakmicaLabel.className ="utakmicaLabel";
        utakmicaLabel.innerHTML = timAlabel.innerHTML+" - "+timBlabel.innerHTML;

        div2.appendChild(utakmicaLabel);
        let glavniSudijaLabel = document.createElement("h4");
        glavniSudijaLabel.className = "glavniSudijaLabel";
        glavniSudijaLabel.innerHTML = "Glavni sudija: "+this.sluzbenaLica[0];
        div2.appendChild(glavniSudijaLabel);

        let prviPomocniSudijaLabel = document.createElement("h4");
        prviPomocniSudijaLabel.className = "ppslbl";
        prviPomocniSudijaLabel.innerHTML = "Prvi pomocni sudija: "+this.sluzbenaLica[1];
        div2.appendChild(prviPomocniSudijaLabel);
        let drugiPomocniSudijaLabel = document.createElement("label");
        drugiPomocniSudijaLabel.className = "drugiPomocniSudijaLabel";
        drugiPomocniSudijaLabel.innerHTML = "Drugi pomocni sudija: " +this.sluzbenaLica[2];
        div2.appendChild(drugiPomocniSudijaLabel);

        let delegatLabel = document.createElement("h4");
        delegatLabel.className = "delegatLabel";
        delegatLabel.innerHTML = "Delegat: "+this.sluzbenaLica[3];
        div2.appendChild(delegatLabel);

        this.miniKontejner.appendChild(div2);

        let div3 = document.createElement("div");

        div3.className = "div3";
        let deleteLabel = document.createElement("button");
        div3.appendChild(deleteLabel);
        deleteLabel.className = "obrisi";
        deleteLabel.innerHTML = "Obrisi";
        deleteLabel.onclick = () =>
        {
            Kolo.izbrisiUtakmicu(this);
            this.miniKontejner.remove();
            let opcija = document.querySelector("."+this.timA+"-"+this.timB);
            let fader = document.querySelector(".selekcijaUtakmice");
            fader.removeChild(opcija);
         
        }
        this.miniKontejner.appendChild(div3);

        let selektor = document.querySelector(".selekcijaUtakmice");
        let opcija = document.createElement("option");
        opcija.innerHTML = this.timA + "-" +this.timB;
        opcija.className = this.timA + "-"+ this.timB;
        selektor.appendChild(opcija);



        host.appendChild(this.miniKontejner);
    }
    crtajUtakmicu2(host){
        this.miniKontejner = document.createElement("div");
        this.miniKontejner.className="utakmica"+this.timA+this.timB;
        console.log(this.miniKontejner.className);

        let tabelica = document.createElement('table');
        tabelica.className="tabela";
        
        let tr = document.createElement("tr");
        tabelica.appendChild(tr);

        let td = document.createElement('td');
        
        let mestoLabel = document.createElement("label");
        mestoLabel.className = "mestoLabel";
        mestoLabel.innerHTML = this.mestoOdigravanja;
        td.appendChild(mestoLabel);
        td.setAttribute("rowspan",3);
        td.setAttribute("width","30%");
        td.setAttribute("color","red");
        tr.appendChild(td);
        td = document.createElement('td');
        let timAlabel = document.createElement("label");
        timAlabel.className = "timAlabel";
        timAlabel.innerHTML = this.timA;
        let timBlabel = document.createElement("label");
        timBlabel.className = "timBlabel";
        timBlabel.innerHTML = this.timB;
        td.appendChild(timAlabel);
        td.appendChild(document.createTextNode(" - "));
        td.appendChild(timBlabel);
        tr.appendChild(td);
       
        
        tr = document.createElement("tr");
        td = document.createElement('td');
        let glavniSudijaLabel = document.createElement("label");
        glavniSudijaLabel.className = "glavniSudijalabel";
        glavniSudijaLabel.innerHTML = "Glavni sudija: "+this.sluzbenaLica[0];
        td.appendChild(glavniSudijaLabel);
        tr.appendChild(td);
     
        tabelica.appendChild(tr);

        tr = document.createElement("tr");
        td = document.createElement('td');
        let prviPomocniSudijaLabel = document.createElement("label");
        prviPomocniSudijaLabel.className = "ppslbl";
        prviPomocniSudijaLabel.innerHTML = "Prvi pomocni sudija: "+this.sluzbenaLica[1];
        td.appendChild(prviPomocniSudijaLabel);
        tr.appendChild(td);
        
        tabelica.appendChild(tr);

        tr = document.createElement("tr");
        td = document.createElement('td');
        td.setAttribute("rowspan",3);
        let datumLabel = document.createElement("label");
        datumLabel.className = "datumLabel";
        datumLabel.innerHTML = this.datum + " " +this.vremeOdigravanja;
        td.appendChild(datumLabel);
        tr.appendChild(td);
        tabelica.appendChild(tr);

        tr = document.createElement("tr");
        td = document.createElement('td');
        let drugiPomocniSudijaLabel = document.createElement("label");
        drugiPomocniSudijaLabel.className = "drugiPomocniSudijaLabel";
        drugiPomocniSudijaLabel.innerHTML = "Drugi pomocni sudija: " +this.sluzbenaLica[2];
        td.appendChild(drugiPomocniSudijaLabel);
        tr.appendChild(td);
        tabelica.appendChild(tr);

        tr = document.createElement("tr");
        td = document.createElement('td');
        let delegatLabel = document.createElement("label");
        delegatLabel.className = "delegatLabel";
        delegatLabel.innerHTML = "Delegat: "+this.sluzbenaLica[3];
        td.appendChild(delegatLabel);
        tr.appendChild(td);

        

        tabelica.appendChild(tr);
        tr = document.createElement("tr");
        td = document.createElement('td');
        td.setAttribute("colspan",3);
        let deleteLabel = document.createElement("button");
        deleteLabel.className = "obrisi";
        deleteLabel.innerHTML = "Obrisi";
        deleteLabel.onclick = () =>
        {
            Kolo.izbrisiUtakmicu(this);
            this.miniKontejner.remove();
            let opcija = this.kolo.vratiGlavniDiv().querySelector("."+this.timA+"-"+this.timB);
            let fader = this.kolo.vratiGlavniDiv().querySelector(".selekcijaUtakmice");

            fader.removeChild(opcija);
            console.log(Kolo.nizUtakmica);
            console.log(Kolo.vratiRedosled());
         
        }
        td.appendChild(deleteLabel);
        tr.appendChild(td);
        tabelica.appendChild(tr);

        let selektor = document.querySelector(".selekcijaUtakmice");
        let opcija = document.createElement("option");
        opcija.innerHTML = this.timA + "-" +this.timB;
        opcija.className = this.timA + "-"+ this.timB;
        selektor.appendChild(opcija);
        this.miniKontejner.appendChild(tabelica);
        host.appendChild(this.miniKontejner);
    }

    kreirajSluzbenoLice(sluzbenoLice)
    {
        fetch("https://localhost:5001/Delegiranje/KreirajSluzbenoLice/"+this.ID,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ime: sluzbenoLice.getIme(),
                mesto: sluzbenoLice.getMesto(),
                uloga: sluzbenoLice.getUloga()
        })
    }).then(response => {
        if(response.status ==200){
            response.json().then(id => {
                console.log("KRAJ1"+id);
                sluzbenoLice.ID = id;
                console.log(sluzbenoLice.ID);
                this.dodajSluzbenoLice(sluzbenoLice)

            })

        }
        else if(p.status == 406){
            alert("Input all informations.");
        }
        return response.status;
    }).catch(p=>
                {
                    console.log("Error: "+p);
                });
    }

    azurirajSluzbenoLice(sluzbenoLice)
    {
        fetch("https://localhost:5001/Delegiranje/AzurirajSluzbenoLice",{
            method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                id: sluzbenoLice.ID,
                ime: sluzbenoLice.ime,
                mesto: sluzbenoLice.mesto,
                uloga: sluzbenoLice.uloga

                    })
                }).then(p => {
                    if(p.ok){
                        console.log("Succesful")
                        this.dodajSluzbenoLice(sluzbenoLice)
                    }
                    else if(p.status == 406){
                        alert("Input all informations.");
                    }
                }).catch(p=>
                            {
                                console.log("Error: "+p);
                            });
    }

}