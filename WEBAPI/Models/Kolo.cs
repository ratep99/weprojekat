using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WEBAPI.Models
{
    [Table("Kolo")]
    public class Kolo{

        [Key]
        [Column("ID")]
        public int Id{get;set;}

        [Column("BrojUtakmica")]
        public int BrojUtakmica{get;set;}

        public virtual List<Utakmica> NizUtakmica{get;set;}
    }
}