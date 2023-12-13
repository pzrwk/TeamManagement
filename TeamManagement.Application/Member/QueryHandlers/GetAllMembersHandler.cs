using MediatR;
using TeamManagement.Application.Abstractions;
using TeamManagement.Application.Member.Queries;

namespace TeamManagement.Application.Member.QueryHandlers;

public class GetAllMembersHandler : IRequestHandler<GetAllMembers, ICollection<Domain.Entities.Member>>
{
    private readonly IMemberRepository _memberRepository;

    public GetAllMembersHandler(IMemberRepository memberRepository)
    {
        _memberRepository = memberRepository;
    }

    public async Task<ICollection<Domain.Entities.Member>> Handle(GetAllMembers request, CancellationToken cancellationToken)
    {
        return await _memberRepository.GetAll();
    }
}