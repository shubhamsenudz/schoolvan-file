package in.senudz.schoolvan;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.*;
@RestController @RequestMapping("/api/work")
public class WorkController {
    private final DocRepository docs;
    public WorkController(DocRepository docs) { this.docs = docs; }
    @GetMapping
    public Map<String,Object> today() {
        Long tid = TenantContext.getTenantId();
        LocalDate today = LocalDate.now();
        List<Map<String,Object>> expired = new ArrayList<>();
        List<Map<String,Object>> soon = new ArrayList<>();
        for (Doc d : docs.findByTenantId(tid)) {
            Map<String,Object> row = new LinkedHashMap<>();
            row.put("id", d.getId());
            row.put("ownerType", d.getOwnerType());
            row.put("ownerId", d.getOwnerId());
            row.put("docType", d.getDocType());
            row.put("expiryOn", d.getExpiryOn());
            try {
                LocalDate exp = LocalDate.parse(d.getExpiryOn());
                long days = java.time.temporal.ChronoUnit.DAYS.between(today, exp);
                row.put("daysLeft", days);
                if (exp.isBefore(today)) expired.add(row);
                else if (days <= 30) soon.add(row);
            } catch (Exception e) { soon.add(row); }
        }
        return Map.of("expired", expired, "expiring30", soon, "alerts", expired.size() + soon.size());
    }
}
