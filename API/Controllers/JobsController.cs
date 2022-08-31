using Data.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace API.Controllers
{
    public class JobsController : BaseApiController
    {
        private readonly IDbRepository _repo;

        public JobsController(IDbRepository repo)
        {
            _repo = repo;
        }

        [HttpPost] 
        public async Task<IActionResult> Create(Job job)       
        {
            _repo.JobRepository.Add(job);

            if (await _repo.SaveAsync())
            {
                return Ok(job);
            }

            return BadRequest("Somethin went wrong");
        }
    }
}