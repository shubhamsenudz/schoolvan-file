package in.senudz.schoolvan;
import jakarta.persistence.*;
@Entity @Table(name="vehicles")
public class Vehicle {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private Long tenantId;
    private Long contractorId;
    private String regNo;
    private String kind;
    private String createdAt;
    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public Long getTenantId(){return tenantId;}
    public void setTenantId(Long tenantId){this.tenantId=tenantId;}
    public Long getContractorId(){return contractorId;}
    public void setContractorId(Long contractorId){this.contractorId=contractorId;}
    public String getRegNo(){return regNo;}
    public void setRegNo(String regNo){this.regNo=regNo;}
    public String getKind(){return kind;}
    public void setKind(String kind){this.kind=kind;}
    public String getCreatedAt(){return createdAt;}
    public void setCreatedAt(String createdAt){this.createdAt=createdAt;}
}
