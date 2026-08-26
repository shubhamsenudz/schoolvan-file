package in.senudz.schoolvan;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    List<Vehicle> findByTenantId(Long tenantId);
}
