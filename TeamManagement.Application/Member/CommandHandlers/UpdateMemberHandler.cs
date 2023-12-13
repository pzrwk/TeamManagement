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
        var member = new Domain.Entities.Member
        {
            Email = request.Email,
            IsActive = request.IsActive,
            Name = request.Name,
            PhoneNumber = request.PhoneNumber
        };

        return await _memberRepository.UpdateMember(request.Id, member);
    }
}