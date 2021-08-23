import { Utakmica } from "./utakmica.js";
import { SluzbenoLice } from "./sluzbenoLice.js";
var redosled;
export class Kolo{
    
     static nizUtakmica = [];
    constructor(id,maxBrojUtakmica)
    {
        this.id=id;
        this.maxBrojUtakmica = maxBrojUtakmica;
        this.kontejner = null;
        this.glavniDiv = null;
        redosled=1;
    }

    // funckija koja dodaje utakmicu u niz
    dodajUtakmicu(utak)
    {
        console.log(redosled);
        Kolo.nizUtakmica.push(utak);
        redosled++;
        console.log(redosled);
    }
    vratiIndexUtakmice(timovi)
    {
        var b=-1
        Kolo.nizUtakmica.forEach(a => {
            if((a.timA+"-"+a.timB)==timovi)
                b = Kolo.nizUtakmica.indexOf(a);
        })
        return b;
    }
    static izbrisiUtakmicu(broj)
    {
        const index = Kolo.nizUtakmica.indexOf(broj);
        if(index>-1)
            Kolo.nizUtakmica.splice(index,1);
        console.log(broj.ID);
        redosled--;
            fetch("https://localhost:5001/Delegiranje/ObrisiUtakmicu/"+broj.ID, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response=>
                {
                    if(response.ok)
                    {
                        console.log("Succesful" );
                    }
                }).catch(error => console.log("error unpacking response " + error));
    }
    //funckija koja iscrtava pocetnu stranicu
    nacrtajKolo(host)
    {
        if(!host)
            throw new Exception("Ne postoji host!");

            this.glavniDiv = document.createElement("div");
            this.glavniDiv.className="glavniDiv";
            host.appendChild(this.glavniDiv);


            this.kontejner = document.createElement("div");
            this.kontejner.className = "container";
            this.glavniDiv.appendChild(this.kontejner);

            this.crtajUtakmice(this.glavniDiv);
            this.formaZaUnosUtakmice(this.kontejner);
            this.formaDelegiranje(this.kontejner);
            
    }
    vratiGlavniDiv()
    {
    return document.querySelector(".glavniDiv");
    }
    // funkcija za crtanje forme pomocu koje se unose podaci o utakmici
    formaZaUnosUtakmice(host){
        if(!host)
            throw new Exception("Ne postoji!!!");

        let vremeOdigravanja=["10:00","10:30","11:00","16:30","17:00","17:30","18:00","19:00","20:00","20:45"];

        const Forma = document.createElement("div");
        Forma.className="FormaUtk";
        host.appendChild(Forma);

        var elLabela = document.createElement("h3");
        elLabela.innerHTML="Unos utakmice";
        Forma.appendChild(elLabela);

        elLabela = document.createElement("label");
        elLabela.innerHTML="Tim A";
        Forma.appendChild(elLabela);

        let tb= document.createElement("input");
        tb.className="timAinput";
        Forma.appendChild(tb);


        elLabela = document.createElement("label");
        elLabela.innerHTML="Tim B";
        Forma.appendChild(elLabela);

        tb= document.createElement("input");
        tb.className="timBinput";
        Forma.appendChild(tb);

        


        let selVreme = document.createElement("select");
        selVreme.className="vremeInput";
        let lejbel = document.createElement("label");

        lejbel.innerHTML= "Vreme odigravanja";
        Forma.appendChild(lejbel);
        Forma.appendChild(selVreme);
        

        for(let i=0; i<vremeOdigravanja.length;i++){
            let opcija=document.createElement("option");
            opcija.innerHTML=vremeOdigravanja[i];
            opcija.className=vremeOdigravanja[i];
            selVreme.appendChild(opcija);
        }

        elLabela = document.createElement("label");
        elLabela.innerHTML="Mesto";
        Forma.appendChild(elLabela);

        tb= document.createElement("input");
        tb.className="mestoinput";
        Forma.appendChild(tb);

        elLabela = document.createElement("label");
        elLabela.innerHTML="datum";
        Forma.appendChild(elLabela);

        tb= document.createElement("input");
        tb.className="datumInput";
        tb.type = "date";
        Forma.appendChild(tb);


        let dodajUtakmicu = document.createElement("button");
        dodajUtakmicu.className = "dodajUtakmicu";
        dodajUtakmicu.innerHTML= "Dodaj Utakmicu";
        Forma.appendChild(dodajUtakmicu);
   
        dodajUtakmicu.onclick = () => {
            if(redosled>this.maxBrojUtakmica){
                alert("Maksimalan broj utakmica!!!");
                return;
            }
                
                let timAunos = this.glavniDiv.querySelector(".timAinput").value;
                let timBunos = this.glavniDiv.querySelector(".timBinput").value;
                let vremeUnos =this.glavniDiv.querySelector(".vremeInput").value;
                let mestoUnos = this.glavniDiv.querySelector(".mestoinput").value;
                let datumUnos = this.glavniDiv.querySelector(".datumInput").value;

                if(timAunos=="" || timBunos=="" || vremeUnos=="" ||mestoUnos=="" || datumUnos =="")
                {
                    alert("Morate popuniti sva polja!");
                    return;
                }
                    let divovac = this.glavniDiv.querySelector(".divZaUtakmice");

            
             
                fetch("https://localhost:5001/Delegiranje/KreirajUtakmicu/"+this.id,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        timA: timAunos,
                        timB: timBunos,
                        redosled: redosled,
                        mestoOdigravanja: mestoUnos,
                        vremeOdigravanja: vremeUnos,
                        datum:datumUnos
                })
            }).then(p =>{
                if(p.ok){
              
                    p.json().then(k=> {
                
                        let novaUtakmica = new Utakmica(divovac,redosled,k,timAunos,timBunos,mestoUnos,vremeUnos,datumUnos,this);
                        
                        this.dodajUtakmicu(novaUtakmica);
                        console.log("Succesful")
                    }) 
                    
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
    formaDelegiranje(host){
        if(!host)
            throw new Exception("Ne postoji!!!");
        
        const delForma = document.createElement("div");
        delForma.className="FormaDel";
       host.appendChild(delForma);
            
        var elLabela = document.createElement("h3");
        elLabela.innerHTML="Delegiranje";
        delForma.appendChild(elLabela);

        elLabela = document.createElement("label");
        elLabela.innerHTML="Sluzbeno lice";
        delForma.appendChild(elLabela);

        let tb= document.createElement("input");
        tb.className="sluzbenoLice";
        delForma.appendChild(tb);

        let sluzbenaLica =["Glavni Sudija","Prvi Pomocni Sudija","Drugi Pomocni Sudija","Delegat"];

        let selSL= document.createElement("select");
        let lejbel = document.createElement("label");
        lejbel.innerHTML="Vrsice ulogu:"
        delForma.appendChild(lejbel);
        delForma.appendChild(selSL);

        for(let i=0; i<sluzbenaLica.length;i++){
            let opcija=document.createElement("option");
            opcija.innerHTML=sluzbenaLica[i];
            opcija.className=sluzbenaLica[i];
            selSL.appendChild(opcija);
        }

        elLabela = document.createElement("label");
        elLabela.innerHTML="Mesto";
        delForma.appendChild(elLabela);

        tb= document.createElement("input");
        tb.className="gradSudije";
        delForma.appendChild(tb);


        let selUtakmica= document.createElement("select");
        selUtakmica.className="selekcijaUtakmice";
        lejbel = document.createElement("label");
        lejbel.innerHTML="Izaberi utakmicu:"
        delForma.appendChild(lejbel);
        delForma.appendChild(selUtakmica);

        
        let delegiranjeButton = document.createElement("button");
        delegiranjeButton.className = "delegiranjeButton";
        delegiranjeButton.innerHTML= "Delegiraj";
        delForma.appendChild(delegiranjeButton);

        delegiranjeButton.onclick = () => 
        {
            let sluzbenoLiceValue = this.glavniDiv.querySelector(".sluzbenoLice").value;
            let uloga = selSL.value;
            let utakmicaValue = selUtakmica.value;
            let grad = this.glavniDiv.querySelector(".gradSudije").value;

            if(sluzbenoLiceValue=="" || uloga=="" || utakmicaValue=="" || grad=="")
            {
                alert("Morate popuniti sva polja pre delegiranja!");
                return;
            }

            if(Kolo.nizUtakmica.length==0)
            {
                alert("Ne mozete delegirati sudije, ne postoji utakmica!");
                return;
            }
            if(this.vratiIndexUtakmice(selUtakmica.value)==-1)
                {
                    
                    alert("Utakmica sa tim id-om ne postoji!")
            return;
                }
          //  console.log("KLIK!");
          //  console.log(sluzbenoLiceValue);
           // console.log(uloga);



            var sL = new SluzbenoLice(100,sluzbenoLiceValue,grad,uloga);
            
            var i = this.vratiIndexUtakmice(selUtakmica.value);
            if(Kolo.nizUtakmica[i].proverizauzetost(sL) == "zauzet")
            {
                console.log("ZAUZETA LOK-> USO");
                var k = Kolo.nizUtakmica[i].vratiZauzetiID(sL.uloga);
                console.log(k);
                sL.ID = k;
                console.log(sL.ID);
                console.log(sL);
                Kolo.nizUtakmica[i].azurirajSluzbenoLice(sL);
              //  Kolo.nizUtakmica[i].dodajSluzbenoLice(sL);
            }
            else
            {
                Kolo.nizUtakmica[i].kreirajSluzbenoLice(sL);
                //Kolo.nizUtakmica[i].dodajSluzbenoLice(sL);
            }

            
            
            
        }
       
    }
    static smanjiRedosled() {
        redosled--;
    }
    static povecajRedosled()
    {
        redosled++;

    }
    static vratiRedosled()
    {
        return redosled;
    }
    crtajUtakmice(host){

        const divUtakmice = document.createElement("div");
        divUtakmice.className="divZaUtakmice";
        host.appendChild(divUtakmice);    
    }
    vratiDivZaUtakmice()
    {
        let pom = this.glavniDiv.querySelector(".divZaUtakmice");
        return pom;
    }

}
