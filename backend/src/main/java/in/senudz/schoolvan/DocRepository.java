package in.senudz.schoolvan;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface DocRepository extends JpaRepository<Doc, Long> {
    List<Doc> findByTenantId(Long tenantId);
}
