using Microsoft.EntityFrameworkCore;
using TeamManagement.Application.Abstractions;
using TeamManagement.Application.Member.Commands;
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

        public async Task<Member?> UpdateMember(UpdateMember member)
        {
            var toUpdate = await _dbContext.Members.FirstOrDefaultAsync(m => m.Id == member.Id);

            if (toUpdate is null)
                return null;
            
            if (!string.IsNullOrEmpty(member.Email))
                toUpdate.Email = member.Email;

            if (!string.IsNullOrEmpty(member.Name))
                toUpdate.Name = member.Name;

            if (!string.IsNullOrEmpty(member.PhoneNumber))
                toUpdate.PhoneNumber = member.PhoneNumber;

            if (member.IsActive.HasValue)
                toUpdate.IsActive = member.IsActive.Value;

            await _dbContext.SaveChangesAsync();

            return toUpdate;
        }
    }
}
