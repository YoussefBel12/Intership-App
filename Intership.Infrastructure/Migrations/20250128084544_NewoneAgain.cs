using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Intership.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class NewoneAgain : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RecruitmentSessionName",
                table: "Candidates");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RecruitmentSessionName",
                table: "Candidates",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
