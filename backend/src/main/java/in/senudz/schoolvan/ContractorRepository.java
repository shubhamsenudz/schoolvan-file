package in.senudz.schoolvan;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface ContractorRepository extends JpaRepository<Contractor, Long> {
    List<Contractor> findByTenantId(Long tenantId);
}
