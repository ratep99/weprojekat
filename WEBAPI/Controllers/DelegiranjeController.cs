using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WEBAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace WEBAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DelegiranjeController : ControllerBase
    {
      public DelegiranjeContext Context{get;set;}

        public DelegiranjeController(DelegiranjeContext context)
        {
           Context = context;
        }

        [Route("PreuzmiKolo")]
        [HttpGet]
        public async Task<List<Kolo>> preuzimiKolo()
        {
            return await Context.Kolo.Include(p=>p.NizUtakmica).ThenInclude(a => a.SluzbenaLica).ToListAsync();
        }

        [Route("UpisiKolo")]
        [HttpPost]
        public async Task UpisiKolo([FromBody] Kolo kolo)
        {
            Context.Kolo.Add(kolo);
            await Context.SaveChangesAsync();

        }
        [Route("PreuzmiSluzbenoLice")]
        [HttpGet]
        public async Task<List<SluzbenoLice>> PreuzmiSluzbenoLice()
        {
            return await Context.SluzbenoLice.ToListAsync();
        }
        [Route("PreuzmiUtakmice")]
        [HttpGet]
        public async Task<List<Utakmica>> PreuzmiUtakmice()
        {
            return await Context.Utakmica.Include(p =>p.SluzbenaLica).ToListAsync();
        }

       [Route("KreirajUtakmicu/{KoloID}")]
       [HttpPost]
       public async Task<int> KreirajUtakmicu(int KoloID,[FromBody] Utakmica utakmica)
       {
           var kolo= await Context.Kolo.FindAsync(KoloID);
           utakmica.Kolo=kolo;
           Context.Utakmica.Add(utakmica);
           await Context.SaveChangesAsync();

           return utakmica.ID;

       }

        [Route("ObrisiUtakmicu/{id}")]
        [HttpDelete]
        public async Task ObrisiUtakmicu(int id)
        {
            var sluzbenalica =await Context.SluzbenoLice.Where(v => v.Utakmica.ID==id).ToListAsync();
            if(sluzbenalica!=null)
                sluzbenalica.ForEach(v => Context.Remove(v));
            var utakmica = await Context.Utakmica.FindAsync(id);
            Context.Remove(utakmica);
            await Context.SaveChangesAsync();
        }

        [Route("KreirajSluzbenoLice/{ID}")]
        [HttpPost]
       public async Task<int> KreirajSluzbenoLice(int ID,[FromBody] SluzbenoLice sluzbenoLice)
        {
            var utakmica= await Context.Utakmica.Where(g => g.ID == ID).Include(g => g.Kolo).FirstOrDefaultAsync();
            sluzbenoLice.Utakmica = utakmica;
            
                Context.SluzbenoLice.Add(sluzbenoLice);
                await Context.SaveChangesAsync();
                int a= sluzbenoLice.Id;
                return a;
        }

         
        [Route("AzurirajSluzbenoLice")]
        [HttpPut]
        public async Task<IActionResult> AzurirajSluzbenoLice([FromBody] SluzbenoLice sluzbenoLice)
        {
            
            if(sluzbenoLice.Ime=="" || sluzbenoLice.Mesto=="" || sluzbenoLice.Uloga =="")
            {
                return StatusCode(406);
            }
            else
            {
                Context.Update<SluzbenoLice>(sluzbenoLice);
                await Context.SaveChangesAsync();
                return Ok();
            }

        }

        [Route("ObrisiSluzbenoLice/{id}")]
        [HttpDelete]
        public async Task ObrisiSluzbenoLice(int id)
        {
            var sl = await Context.SluzbenoLice.FindAsync(id);
            Context.Remove(sl);
            await Context.SaveChangesAsync();
        }

    }
}
