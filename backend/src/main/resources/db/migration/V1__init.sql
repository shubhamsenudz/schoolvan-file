CREATE TABLE tenants (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(255),
    created_at VARCHAR(40)
);
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenants(id),
    full_name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(40),
    created_at VARCHAR(40)
);
CREATE UNIQUE INDEX ux_users_email ON users(email);

CREATE TABLE contractors (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenants(id),
    name VARCHAR(255),
    phone VARCHAR(255),
    gstin VARCHAR(255),
    created_at VARCHAR(40)
);

CREATE TABLE vehicles (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenants(id),
    contractor_id BIGINT,
    reg_no VARCHAR(255),
    kind VARCHAR(255),
    created_at VARCHAR(40)
);

CREATE TABLE drivers (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenants(id),
    name VARCHAR(255),
    dl_no VARCHAR(255),
    dl_expiry VARCHAR(255),
    police_verify_expiry VARCHAR(255),
    created_at VARCHAR(40)
);

CREATE TABLE docs (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenants(id),
    owner_type VARCHAR(255),
    owner_id BIGINT,
    doc_type VARCHAR(255),
    expiry_on VARCHAR(255),
    created_at VARCHAR(40)
);
