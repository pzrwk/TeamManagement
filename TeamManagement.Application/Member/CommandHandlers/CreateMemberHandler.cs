using MediatR;
using TeamManagement.Application.Abstractions;
using TeamManagement.Application.Member.Commands;

namespace TeamManagement.Application.Member.CommandHandlers;

public class CreateMemberHandler : IRequestHandler<CreateMember, Domain.Entities.Member?>
{
    private readonly IMemberRepository _memberRepository;
    
    public CreateMemberHandler(IMemberRepository memberRepository)
    {
        _memberRepository = memberRepository;
    }
    
    public async Task<Domain.Entities.Member?> Handle(CreateMember request, CancellationToken cancellationToken)
    {
        var member = new Domain.Entities.Member
        {
            Email = request.Email,
            IsActive = request.IsActive,
            Name = request.Name,
            PhoneNumber = request.PhoneNumber,
            AvatarUrl = request.AvatarUrl
        };

        return await _memberRepository.AddMember(member);
    }
}