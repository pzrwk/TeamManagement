using MediatR;
using TeamManagement.Application.Abstractions;
using TeamManagement.Application.Member.Queries;

namespace TeamManagement.Application.Member.QueryHandlers;

public class GetMemberByIdHandler : IRequestHandler<GetMemberById, Domain.Entities.Member?>
{
    private readonly IMemberRepository _memberRepository;

    public GetMemberByIdHandler(IMemberRepository memberRepository)
    {
        _memberRepository = memberRepository;
    }


    public async Task<Domain.Entities.Member?> Handle(GetMemberById request, CancellationToken cancellationToken)
    {
        return await _memberRepository.GetMemberById(request.Id);
    }
}