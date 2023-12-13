using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using TeamManagement.Application.Abstractions;
using TeamManagement.Application.Member.Commands;
using TeamManagement.Application.Member.Queries;
using TeamManagement.Infrastructure.Repositories;

namespace TeamManagement.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddMediatRServices(this IServiceCollection services)
        {
            services.AddMediatR(configuration =>
            {
                configuration.RegisterServicesFromAssembly(typeof(CreateMember).Assembly);
                configuration.RegisterServicesFromAssembly(typeof(UpdateMember).Assembly);
                configuration.RegisterServicesFromAssembly(typeof(GetAllMembers).Assembly);
                configuration.RegisterServicesFromAssembly(typeof(GetMemberById).Assembly);
            });
            return services;
        }
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            var assembly = typeof(DependencyInjection).Assembly;

            services.AddMediatR(configuration =>
                configuration.RegisterServicesFromAssembly(assembly));

            //services.AddValidatorsFromAssembly(assembly);

            return services;
        }

        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            services.AddScoped<IMemberRepository, MemberRepository>();
            return services;
        }

        public static IServiceCollection AddDbContext(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<TeamManagementDbContext>(options =>
            {
                options.UseNpgsql(connectionString, o =>
                {
                    o.MigrationsAssembly("TeamManagement.Infrastructure");
                });
            });

            return services;
        }
    }
}
