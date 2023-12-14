using Microsoft.EntityFrameworkCore;
using TeamManagement.Application.Abstractions;
using TeamManagement.Domain.Entities;

namespace TeamManagement.Infrastructure.Repositories
{
    public class MemberRepository : IMemberRepository
    {
        private readonly TeamManagementDbContext _dbContext;
        
        public MemberRepository(TeamManagementDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        public async Task<Member?> AddMember(Member? member)
        {
            _dbContext.Members.Add(member);

            await _dbContext.SaveChangesAsync();

            return member;
        }

        public async Task<ICollection<Member>> GetAll()
        {
            return await _dbContext.Members.ToListAsync();
        }

        public async Task<Member?> GetMemberById(int id)
        {
            return await _dbContext.Members.FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<Member?> UpdateMember(int memberId, Member member)
        {
            var toUpdate = await _dbContext.Members.FirstOrDefaultAsync(m => m.Id == memberId);

            if (toUpdate is null)
                return null;
            
            toUpdate.Email = member.Email;
            toUpdate.Name = member.Name;
            toUpdate.PhoneNumber = member.PhoneNumber;
            toUpdate.IsActive = member.IsActive;

            await _dbContext.SaveChangesAsync();

            return toUpdate;
        }

        public async Task<Member?> ChangeMemberStatus(int memberId, bool status)
        {
            var toUpdate = await _dbContext.Members.FirstOrDefaultAsync(m => m.Id == memberId);
            
            if (toUpdate is null)
                return null;

            if (toUpdate.IsActive == status)
                return null;

            toUpdate.IsActive = status;

            await _dbContext.SaveChangesAsync();

            return toUpdate;
        }
    }
}
