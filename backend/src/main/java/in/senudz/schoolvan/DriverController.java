package in.senudz.schoolvan;
import org.springframework.web.bind.annotation.*;
import java.time.Instant;
import java.util.List;
@RestController @RequestMapping("/api/drivers")
public class DriverController {
    private final DriverRepository repo;
    public DriverController(DriverRepository repo){ this.repo = repo; }
    @GetMapping public List<Driver> list(){ return repo.findByTenantId(TenantContext.getTenantId()); }
    @PostMapping public Driver create(@RequestBody Driver body){
        body.setId(null); body.setTenantId(TenantContext.getTenantId()); body.setCreatedAt(Instant.now().toString());
        return repo.save(body);
    }
    @PutMapping("/{id}") public Driver update(@PathVariable Long id, @RequestBody Driver body){
        Driver e = repo.findById(id).orElseThrow();
        if(!e.getTenantId().equals(TenantContext.getTenantId())) throw new RuntimeException("forbidden");
        if(body.getName()!=null) e.setName(body.getName());
        if(body.getDlNo()!=null) e.setDlNo(body.getDlNo());
        if(body.getDlExpiry()!=null) e.setDlExpiry(body.getDlExpiry());
        if(body.getPoliceVerifyExpiry()!=null) e.setPoliceVerifyExpiry(body.getPoliceVerifyExpiry());
        return repo.save(e);
    }
    @DeleteMapping("/{id}") public void delete(@PathVariable Long id){
        Driver e = repo.findById(id).orElseThrow();
        if(!e.getTenantId().equals(TenantContext.getTenantId())) throw new RuntimeException("forbidden");
        repo.delete(e);
    }
}
