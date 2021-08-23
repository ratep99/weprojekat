import {Kolo} from "./kolo.js"
import { SluzbenoLice } from "./sluzbenoLice.js";
import { Utakmica } from "./utakmica.js";

fetch("https://localhost:5001/Delegiranje/PreuzmiKolo", {
    method: "GET"
}).then(p => {
    p.json().then(data =>{
        data.forEach(kolo => {
          const kolo1= new Kolo(kolo.id,kolo.brojUtakmica);
          kolo1.nacrtajKolo(document.body);
          kolo.nizUtakmica.forEach(utakmica=>{
            const utakmica1= new Utakmica(kolo1.vratiDivZaUtakmice(),utakmica.redosled,utakmica.id,utakmica.timA,utakmica.timB,utakmica.mestoOdigravanja,utakmica.vremeOdigravanja,utakmica.datum);
          
            utakmica.sluzbenaLica.forEach(sl=>
              {
                const sl1 = new SluzbenoLice(sl.id,sl.ime,sl.mesto,sl.uloga);
                console.log(sl1);
                utakmica1.dodajSluzbenoLice(sl1);
              });
            kolo1.dodajUtakmicu(utakmica1);
          });
          kolo1.crtajUtakmice(document.body);
        });
        
    });
}).catch(err => {
  console.log(err);
});