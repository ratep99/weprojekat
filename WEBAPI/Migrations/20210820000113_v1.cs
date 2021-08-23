using Microsoft.EntityFrameworkCore.Migrations;

namespace WEBAPI.Migrations
{
    public partial class v1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Kolo",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BrojUtakmica = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kolo", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Utakmica",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Redosled = table.Column<int>(type: "int", nullable: false),
                    TimA = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TimB = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MestoOdigravanja = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VremeOdigravanja = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Datum = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KoloId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Utakmica", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Utakmica_Kolo_KoloId",
                        column: x => x.KoloId,
                        principalTable: "Kolo",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SluzbenoLice",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Mesto = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Uloga = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UtakmicaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SluzbenoLice", x => x.ID);
                    table.ForeignKey(
                        name: "FK_SluzbenoLice_Utakmica_UtakmicaID",
                        column: x => x.UtakmicaID,
                        principalTable: "Utakmica",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SluzbenoLice_UtakmicaID",
                table: "SluzbenoLice",
                column: "UtakmicaID");

            migrationBuilder.CreateIndex(
                name: "IX_Utakmica_KoloId",
                table: "Utakmica",
                column: "KoloId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SluzbenoLice");

            migrationBuilder.DropTable(
                name: "Utakmica");

            migrationBuilder.DropTable(
                name: "Kolo");
        }
    }
}
