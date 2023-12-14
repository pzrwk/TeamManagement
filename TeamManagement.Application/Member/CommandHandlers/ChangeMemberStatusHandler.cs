using MediatR;
using TeamManagement.Application.Abstractions;
using TeamManagement.Application.Member.Commands;

namespace TeamManagement.Application.Member.CommandHandlers;

public class ChangeMemberStatusHandler : IRequestHandler<ChangeMemberStatus, Domain.Entities.Member?>
{
    private readonly IMemberRepository _memberRepository;

    public ChangeMemberStatusHandler(IMemberRepository memberRepository)
    {
        _memberRepository = memberRepository;
    }
    
    public async Task<Domain.Entities.Member?> Handle(ChangeMemberStatus request, CancellationToken cancellationToken)
    {
        return await _memberRepository.ChangeMemberStatus(request.Id, request.IsActive);
    }
}