package in.senudz.schoolvan;
import jakarta.persistence.*;
@Entity @Table(name="contractors")
public class Contractor {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private Long tenantId;
    private String name;
    private String phone;
    private String gstin;
    private String createdAt;
    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public Long getTenantId(){return tenantId;}
    public void setTenantId(Long tenantId){this.tenantId=tenantId;}
    public String getName(){return name;}
    public void setName(String name){this.name=name;}
    public String getPhone(){return phone;}
    public void setPhone(String phone){this.phone=phone;}
    public String getGstin(){return gstin;}
    public void setGstin(String gstin){this.gstin=gstin;}
    public String getCreatedAt(){return createdAt;}
    public void setCreatedAt(String createdAt){this.createdAt=createdAt;}
}
