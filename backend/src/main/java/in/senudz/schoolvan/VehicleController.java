package in.senudz.schoolvan;
import org.springframework.web.bind.annotation.*;
import java.time.Instant;
import java.util.List;
@RestController @RequestMapping("/api/vehicles")
public class VehicleController {
    private final VehicleRepository repo;
    public VehicleController(VehicleRepository repo){ this.repo = repo; }
    @GetMapping public List<Vehicle> list(){ return repo.findByTenantId(TenantContext.getTenantId()); }
    @PostMapping public Vehicle create(@RequestBody Vehicle body){
        body.setId(null); body.setTenantId(TenantContext.getTenantId()); body.setCreatedAt(Instant.now().toString());
        return repo.save(body);
    }
    @PutMapping("/{id}") public Vehicle update(@PathVariable Long id, @RequestBody Vehicle body){
        Vehicle e = repo.findById(id).orElseThrow();
        if(!e.getTenantId().equals(TenantContext.getTenantId())) throw new RuntimeException("forbidden");
        if(body.getContractorId()!=null) e.setContractorId(body.getContractorId());
        if(body.getRegNo()!=null) e.setRegNo(body.getRegNo());
        if(body.getKind()!=null) e.setKind(body.getKind());
        return repo.save(e);
    }
    @DeleteMapping("/{id}") public void delete(@PathVariable Long id){
        Vehicle e = repo.findById(id).orElseThrow();
        if(!e.getTenantId().equals(TenantContext.getTenantId())) throw new RuntimeException("forbidden");
        repo.delete(e);
    }
}
