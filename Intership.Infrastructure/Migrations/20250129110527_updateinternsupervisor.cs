using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Intership.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class updateinternsupervisor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Interns_SuperVisors_SupervisorId",
                table: "Interns");

            migrationBuilder.AddForeignKey(
                name: "FK_Interns_SuperVisors_SupervisorId",
                table: "Interns",
                column: "SupervisorId",
                principalTable: "SuperVisors",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Interns_SuperVisors_SupervisorId",
                table: "Interns");

            migrationBuilder.AddForeignKey(
                name: "FK_Interns_SuperVisors_SupervisorId",
                table: "Interns",
                column: "SupervisorId",
                principalTable: "SuperVisors",
                principalColumn: "Id");
        }
    }
}
