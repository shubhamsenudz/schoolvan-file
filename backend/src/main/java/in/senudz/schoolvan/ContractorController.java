package in.senudz.schoolvan;
import org.springframework.web.bind.annotation.*;
import java.time.Instant;
import java.util.List;
@RestController @RequestMapping("/api/contractors")
public class ContractorController {
    private final ContractorRepository repo;
    public ContractorController(ContractorRepository repo){ this.repo = repo; }
    @GetMapping public List<Contractor> list(){ return repo.findByTenantId(TenantContext.getTenantId()); }
    @PostMapping public Contractor create(@RequestBody Contractor body){
        body.setId(null); body.setTenantId(TenantContext.getTenantId()); body.setCreatedAt(Instant.now().toString());
        return repo.save(body);
    }
    @PutMapping("/{id}") public Contractor update(@PathVariable Long id, @RequestBody Contractor body){
        Contractor e = repo.findById(id).orElseThrow();
        if(!e.getTenantId().equals(TenantContext.getTenantId())) throw new RuntimeException("forbidden");
        if(body.getName()!=null) e.setName(body.getName());
        if(body.getPhone()!=null) e.setPhone(body.getPhone());
        if(body.getGstin()!=null) e.setGstin(body.getGstin());
        return repo.save(e);
    }
    @DeleteMapping("/{id}") public void delete(@PathVariable Long id){
        Contractor e = repo.findById(id).orElseThrow();
        if(!e.getTenantId().equals(TenantContext.getTenantId())) throw new RuntimeException("forbidden");
        repo.delete(e);
    }
}
