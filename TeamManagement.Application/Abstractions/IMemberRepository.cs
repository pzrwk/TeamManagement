using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamManagement.Domain.Entities;

namespace TeamManagement.Application.Abstractions
{
    public interface IMemberRepository
    {
        Task<ICollection<Domain.Entities.Member>> GetAll();
        Task<Domain.Entities.Member?> GetMemberById(int id);
        Task<Domain.Entities.Member?> AddMember(Domain.Entities.Member? member);
        Task<Domain.Entities.Member?> UpdateMember(int memberId, Domain.Entities.Member member);
    }
}
