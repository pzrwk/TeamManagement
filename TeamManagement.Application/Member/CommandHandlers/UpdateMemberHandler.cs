using MediatR;
using TeamManagement.Application.Abstractions;
using TeamManagement.Application.Member.Commands;

namespace TeamManagement.Application.Member.CommandHandlers;

public class UpdateMemberHandler : IRequestHandler<UpdateMember, Domain.Entities.Member?>
{
    private readonly IMemberRepository _memberRepository;
    
    public UpdateMemberHandler(IMemberRepository memberRepository)
    {
        _memberRepository = memberRepository;
    }
    
    public async Task<Domain.Entities.Member?> Handle(UpdateMember request, CancellationToken cancellationToken)
    {
        return await _memberRepository.UpdateMember(request);
    }
}