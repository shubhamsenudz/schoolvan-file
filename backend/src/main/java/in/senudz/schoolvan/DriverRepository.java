package in.senudz.schoolvan;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface DriverRepository extends JpaRepository<Driver, Long> {
    List<Driver> findByTenantId(Long tenantId);
}
