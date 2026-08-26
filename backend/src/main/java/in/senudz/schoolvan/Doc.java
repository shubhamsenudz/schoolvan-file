package in.senudz.schoolvan;
import jakarta.persistence.*;
@Entity @Table(name="docs")
public class Doc {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private Long tenantId;
    private String ownerType;
    private Long ownerId;
    private String docType;
    private String expiryOn;
    private String createdAt;
    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public Long getTenantId(){return tenantId;}
    public void setTenantId(Long tenantId){this.tenantId=tenantId;}
    public String getOwnerType(){return ownerType;}
    public void setOwnerType(String ownerType){this.ownerType=ownerType;}
    public Long getOwnerId(){return ownerId;}
    public void setOwnerId(Long ownerId){this.ownerId=ownerId;}
    public String getDocType(){return docType;}
    public void setDocType(String docType){this.docType=docType;}
    public String getExpiryOn(){return expiryOn;}
    public void setExpiryOn(String expiryOn){this.expiryOn=expiryOn;}
    public String getCreatedAt(){return createdAt;}
    public void setCreatedAt(String createdAt){this.createdAt=createdAt;}
}
