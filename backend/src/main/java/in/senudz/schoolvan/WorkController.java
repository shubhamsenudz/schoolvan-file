package in.senudz.schoolvan;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.*;
@RestController @RequestMapping("/api/work")
public class WorkController {
    private final DocRepository docs;
    private final ContractorRepository contractors;
    private final VehicleRepository vehicles;
    private final TenantRepository tenants;
    public WorkController(DocRepository docs, ContractorRepository contractors, VehicleRepository vehicles, TenantRepository tenants) {
        this.docs = docs; this.contractors = contractors; this.vehicles = vehicles; this.tenants = tenants;
    }
    @GetMapping
    public Map<String,Object> today() {
        Long tid = TenantContext.getTenantId();
        Tenant firm = tenants.findById(tid).orElseThrow();
        LocalDate today = LocalDate.now();
        Map<Long, Contractor> cmap = new HashMap<>();
        contractors.findByTenantId(tid).forEach(c -> cmap.put(c.getId(), c));
        Map<Long, Vehicle> vmap = new HashMap<>();
        vehicles.findByTenantId(tid).forEach(v -> vmap.put(v.getId(), v));
        List<Map<String,Object>> expired = new ArrayList<>();
        List<Map<String,Object>> soon = new ArrayList<>();
        for (Doc d : docs.findByTenantId(tid)) {
            String phone = "";
            if ("CONTRACTOR".equalsIgnoreCase(d.getOwnerType()) && cmap.containsKey(d.getOwnerId())) {
                phone = nvl(cmap.get(d.getOwnerId()).getPhone());
            } else if ("VEHICLE".equalsIgnoreCase(d.getOwnerType()) && vmap.containsKey(d.getOwnerId())) {
                Vehicle v = vmap.get(d.getOwnerId());
                if (v.getContractorId()!=null && cmap.containsKey(v.getContractorId()))
                    phone = nvl(cmap.get(v.getContractorId()).getPhone());
            }
            String fallback = "Please renew " + d.getDocType() + " expiring " + d.getExpiryOn() + " so the van can run.";
            String msg = IndiaLinks.applyTemplate(firm.getReminderTemplate(), fallback, d.getDocType(), d.getExpiryOn(), "");
            Map<String,Object> row = new LinkedHashMap<>();
            row.put("id", d.getId());
            row.put("ownerType", d.getOwnerType());
            row.put("ownerId", d.getOwnerId());
            row.put("docType", d.getDocType());
            row.put("expiryOn", d.getExpiryOn());
            row.put("phone", phone);
            row.put("reminder", msg);
            row.put("waLink", IndiaLinks.wa(phone, msg));
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
    private String nvl(String s){ return s==null?"":s; }
}
