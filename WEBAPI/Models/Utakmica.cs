using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WEBAPI.Models
{
    [Table("Utakmica")]
    public class Utakmica{
        [Key]
        [Column("ID")]
        public int ID{get;set;}

        [Column("Redosled")]
        public int Redosled{get;set;}
       [Column("TimA")]
        public string TimA{get;set;}
        [Column("TimB")]
        public string TimB{get;set;}
        [Column("MestoOdigravanja")]
        public string MestoOdigravanja{get;set;}
        [Column("VremeOdigravanja")]
        public string VremeOdigravanja{get;set;}

        [Column("Datum")]
        public string Datum{get;set;}
        public virtual List<SluzbenoLice> SluzbenaLica{get;set;}

        
        [JsonIgnore]
        public Kolo Kolo{get;set;}

    }
}