using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Intership.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Test : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SuperVisors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SuperVisors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RoleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Interns",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    School = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Level = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SupervisorId = table.Column<int>(type: "int", nullable: true),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Interns", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Interns_SuperVisors_SupervisorId",
                        column: x => x.SupervisorId,
                        principalTable: "SuperVisors",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "RecruitmentSessions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Year = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SupervisorId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecruitmentSessions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RecruitmentSessions_SuperVisors_SupervisorId",
                        column: x => x.SupervisorId,
                        principalTable: "SuperVisors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Candidates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    School = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Level = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CvFilePath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RecruitmentSessionId = table.Column<int>(type: "int", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Candidates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Candidates_RecruitmentSessions_RecruitmentSessionId",
                        column: x => x.RecruitmentSessionId,
                        principalTable: "RecruitmentSessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

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
                name: "IX_Candidates_RecruitmentSessionId",
                table: "Candidates",
                column: "RecruitmentSessionId");

            migrationBuilder.CreateIndex(
                name: "IX_InternRecruitmentSessions_RecruitmentSessionId",
                table: "InternRecruitmentSessions",
                column: "RecruitmentSessionId");

            migrationBuilder.CreateIndex(
                name: "IX_Interns_SupervisorId",
                table: "Interns",
                column: "SupervisorId");

            migrationBuilder.CreateIndex(
                name: "IX_RecruitmentSessions_SupervisorId",
                table: "RecruitmentSessions",
                column: "SupervisorId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_RoleId",
                table: "Users",
                column: "RoleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Candidates");

            migrationBuilder.DropTable(
                name: "InternRecruitmentSessions");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Interns");

            migrationBuilder.DropTable(
                name: "RecruitmentSessions");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "SuperVisors");
        }
    }
}
