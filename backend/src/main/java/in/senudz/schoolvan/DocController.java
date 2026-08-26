package in.senudz.schoolvan;
import org.springframework.web.bind.annotation.*;
import java.time.Instant;
import java.util.List;
@RestController @RequestMapping("/api/docs")
public class DocController {
    private final DocRepository repo;
    public DocController(DocRepository repo){ this.repo = repo; }
    @GetMapping public List<Doc> list(){ return repo.findByTenantId(TenantContext.getTenantId()); }
    @PostMapping public Doc create(@RequestBody Doc body){
        body.setId(null); body.setTenantId(TenantContext.getTenantId()); body.setCreatedAt(Instant.now().toString());
        return repo.save(body);
    }
    @PutMapping("/{id}") public Doc update(@PathVariable Long id, @RequestBody Doc body){
        Doc e = repo.findById(id).orElseThrow();
        if(!e.getTenantId().equals(TenantContext.getTenantId())) throw new RuntimeException("forbidden");
        if(body.getOwnerType()!=null) e.setOwnerType(body.getOwnerType());
        if(body.getOwnerId()!=null) e.setOwnerId(body.getOwnerId());
        if(body.getDocType()!=null) e.setDocType(body.getDocType());
        if(body.getExpiryOn()!=null) e.setExpiryOn(body.getExpiryOn());
        return repo.save(e);
    }
    @DeleteMapping("/{id}") public void delete(@PathVariable Long id){
        Doc e = repo.findById(id).orElseThrow();
        if(!e.getTenantId().equals(TenantContext.getTenantId())) throw new RuntimeException("forbidden");
        repo.delete(e);
    }
}
