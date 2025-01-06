using System.Reflection;
using Intership.Application.Commands.AddCandidate;
using Intership.Application.Commands.CreateRecruitmentSession;
using Intership.Application.Commands.CreateUser;
using Intership.Application.Interfaces;
using Intership.Application.Queries.GetAllCandidates;
using Intership.Application.Queries.GetAllRecruitmentSessions;
using Intership.Application.Queries.GetSummary;
using Intership.Application.Queries.GetUserById;
using Intership.Domain.Entities;
using Intership.Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Register DbContext
builder.Services.AddDbContext<IntershipDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register the repository
builder.Services.AddScoped<IIntershipRepository, IntershipRepository>();

// Add services to the container.

builder.Services.AddAuthorization();
builder.Services.AddAuthentication().AddCookie(IdentityConstants.ApplicationScheme);
builder.Services.AddIdentityCore<>();


// Register MediatR and scan for handlers in the Application assembly
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(
   Assembly.GetAssembly(typeof(Intership.Application.Commands.CreateIntern.CreateInternCommandHandler))));

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(
    Assembly.GetAssembly(typeof(CreateUserCommandHandler))));

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(
    Assembly.GetAssembly(typeof(GetUserByIdQueryHandler))));


// Register MediatR and scan for handlers in the Application assembly
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(
    Assembly.GetAssembly(typeof(GetSummaryQueryHandler)),
    Assembly.GetAssembly(typeof(AddCandidateCommandHandler)),
    Assembly.GetAssembly(typeof(GetAllCandidatesQueryHandler)),
    Assembly.GetAssembly(typeof(CreateRecruitmentSessionCommandHandler)),
    Assembly.GetAssembly(typeof(GetAllRecruitmentSessionsQueryHandler))
));


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();







// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
