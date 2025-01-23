using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Intership.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class session : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Candidates_RecruitmentSessions_RecruitmentSessionId",
                table: "Candidates");

            migrationBuilder.DropForeignKey(
                name: "FK_RecruitmentSessions_SuperVisors_SupervisorId",
                table: "RecruitmentSessions");

            migrationBuilder.DropTable(
                name: "InternRecruitmentSessions");

            migrationBuilder.DropIndex(
                name: "IX_RecruitmentSessions_SupervisorId",
                table: "RecruitmentSessions");

            migrationBuilder.DropIndex(
                name: "IX_Candidates_RecruitmentSessionId",
                table: "Candidates");

            migrationBuilder.DropColumn(
                name: "SupervisorId",
                table: "RecruitmentSessions");

            migrationBuilder.DropColumn(
                name: "RecruitmentSessionId",
                table: "Candidates");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateEnded",
                table: "RecruitmentSessions",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateEnded",
                table: "RecruitmentSessions");

            migrationBuilder.AddColumn<int>(
                name: "SupervisorId",
                table: "RecruitmentSessions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RecruitmentSessionId",
                table: "Candidates",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "InternRecruitmentSessions",
                columns: table => new
                {
                    InternId = table.Column<int>(type: "int", nullable: false),
                    RecruitmentSessionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InternRecruitmentSessions", x => new { x.InternId, x.RecruitmentSessionId });
                    table.ForeignKey(
                        name: "FK_InternRecruitmentSessions_Interns_InternId",
                        column: x => x.InternId,
                        principalTable: "Interns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InternRecruitmentSessions_RecruitmentSessions_RecruitmentSessionId",
                        column: x => x.RecruitmentSessionId,
                        principalTable: "RecruitmentSessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RecruitmentSessions_SupervisorId",
                table: "RecruitmentSessions",
                column: "SupervisorId");

            migrationBuilder.CreateIndex(
                name: "IX_Candidates_RecruitmentSessionId",
                table: "Candidates",
                column: "RecruitmentSessionId");

            migrationBuilder.CreateIndex(
                name: "IX_InternRecruitmentSessions_RecruitmentSessionId",
                table: "InternRecruitmentSessions",
                column: "RecruitmentSessionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Candidates_RecruitmentSessions_RecruitmentSessionId",
                table: "Candidates",
                column: "RecruitmentSessionId",
                principalTable: "RecruitmentSessions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RecruitmentSessions_SuperVisors_SupervisorId",
                table: "RecruitmentSessions",
                column: "SupervisorId",
                principalTable: "SuperVisors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
