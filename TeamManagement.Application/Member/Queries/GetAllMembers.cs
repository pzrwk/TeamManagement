using MediatR;

namespace TeamManagement.Application.Member.Queries;

public class GetAllMembers : IRequest<ICollection<Domain.Entities.Member>>
{
    
}