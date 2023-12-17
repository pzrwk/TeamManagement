using TeamManagement.Application.Member.Commands;

namespace TeamManagement.Application.Abstractions
{
    public interface IMemberRepository
    {
        Task<ICollection<Domain.Entities.Member>> GetAll();
        Task<Domain.Entities.Member> AddMember(Domain.Entities.Member member);
        Task<Domain.Entities.Member?> UpdateMember(UpdateMember member);
        
    }
}
