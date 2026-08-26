package in.senudz.schoolvan;
import org.springframework.web.bind.annotation.*;
import java.time.Instant;
import java.util.Map;
@RestController @RequestMapping("/api/import")
public class ImportController {
    private final VehicleRepository vehicles;
    public ImportController(VehicleRepository vehicles) { this.vehicles = vehicles; }
    @PostMapping("/vehicles")
    public Map<String,Integer> vehicles(@RequestBody Map<String,String> body) {
        int n = 0; Long tid = TenantContext.getTenantId();
        for (Map<String,String> row : Csv.parse(body.get("csv"))) {
            Vehicle v = new Vehicle();
            v.setTenantId(tid);
            v.setRegNo(row.getOrDefault("regNo", row.get("reg")));
            v.setKind(row.getOrDefault("kind", "van"));
            v.setCreatedAt(Instant.now().toString());
            vehicles.save(v); n++;
        }
        return Map.of("imported", n);
    }
}
