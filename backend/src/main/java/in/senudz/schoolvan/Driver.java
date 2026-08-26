package in.senudz.schoolvan;
import jakarta.persistence.*;
@Entity @Table(name="drivers")
public class Driver {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private Long tenantId;
    private String name;
    private String dlNo;
    private String dlExpiry;
    private String policeVerifyExpiry;
    private String createdAt;
    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public Long getTenantId(){return tenantId;}
    public void setTenantId(Long tenantId){this.tenantId=tenantId;}
    public String getName(){return name;}
    public void setName(String name){this.name=name;}
    public String getDlNo(){return dlNo;}
    public void setDlNo(String dlNo){this.dlNo=dlNo;}
    public String getDlExpiry(){return dlExpiry;}
    public void setDlExpiry(String dlExpiry){this.dlExpiry=dlExpiry;}
    public String getPoliceVerifyExpiry(){return policeVerifyExpiry;}
    public void setPoliceVerifyExpiry(String policeVerifyExpiry){this.policeVerifyExpiry=policeVerifyExpiry;}
    public String getCreatedAt(){return createdAt;}
    public void setCreatedAt(String createdAt){this.createdAt=createdAt;}
}
