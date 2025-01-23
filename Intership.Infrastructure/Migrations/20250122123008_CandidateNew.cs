using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Intership.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CandidateNew : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RecruitmentSessionId",
                table: "Candidates",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Candidates_RecruitmentSessionId",
                table: "Candidates",
                column: "RecruitmentSessionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Candidates_RecruitmentSessions_RecruitmentSessionId",
                table: "Candidates",
                column: "RecruitmentSessionId",
                principalTable: "RecruitmentSessions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Candidates_RecruitmentSessions_RecruitmentSessionId",
                table: "Candidates");

            migrationBuilder.DropIndex(
                name: "IX_Candidates_RecruitmentSessionId",
                table: "Candidates");

            migrationBuilder.DropColumn(
                name: "RecruitmentSessionId",
                table: "Candidates");
        }
    }
}
