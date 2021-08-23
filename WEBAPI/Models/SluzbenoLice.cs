using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WEBAPI.Models

{
    [Table("SluzbenoLice")]
    public class SluzbenoLice{

        [Key]
        [Column("ID")]
        public int Id{get;set;}
        [Column("Ime")]
        public string Ime{get;set;}
        [Column("Mesto")]
        public string Mesto{get;set;}
        [Column("Uloga")]
        public string Uloga{get;set;}


        [JsonIgnore]
        public Utakmica Utakmica{get;set;}
        
    }
}