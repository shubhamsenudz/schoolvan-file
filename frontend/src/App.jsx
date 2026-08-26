import React, { useEffect, useState } from "react";
async function api(path, opts={}) {
  const token = localStorage.getItem("token");
  const res = await fetch((import.meta.env.VITE_API_URL||"")+"/api"+path, { ...opts, headers: { "Content-Type":"application/json", ...(token?{Authorization:"Bearer "+token}:{}), ...(opts.headers||{}) } });
  if(!res.ok) throw new Error(await res.text());
  const text = await res.text();
  if(!text) return null;
  return JSON.parse(text);
}
function ContractorPage(){
  const [rows,setRows]=useState([]);
  const [form,setForm]=useState({});
  const load=()=>api("/contractors").then(setRows);
  useEffect(()=>{load();},[]);
  const save=async ev=>{ev.preventDefault(); await api("/contractors",{method:"POST",body:JSON.stringify(form)}); setForm({}); load();};
  const remove=id=>api("/contractors/"+id,{method:"DELETE"}).then(load);
  return (<div className="card"><h2>Contractors</h2>
    <form className="grid-form" onSubmit={save}>
        <label>name<input value={form.name ?? ""} onChange={ev => setForm({...form, name: ev.target.value})} /></label>
        <label>phone<input value={form.phone ?? ""} onChange={ev => setForm({...form, phone: ev.target.value})} /></label>
        <label>gstin<input value={form.gstin ?? ""} onChange={ev => setForm({...form, gstin: ev.target.value})} /></label>
      <button type="submit">Add</button>
    </form>
    <div className="table-wrap"><table><thead><tr><th>name</th><th>phone</th><th>gstin</th><th></th></tr></thead>
    <tbody>{rows.map(row=><tr key={row.id}><td>{String(row.name ?? "")}</td><td>{String(row.phone ?? "")}</td><td>{String(row.gstin ?? "")}</td><td><button className="link" onClick={()=>remove(row.id)}>Delete</button></td></tr>)}</tbody></table></div>
  </div>);
}

function VehiclePage(){
  const [rows,setRows]=useState([]);
  const [form,setForm]=useState({});
  const load=()=>api("/vehicles").then(setRows);
  useEffect(()=>{load();},[]);
  const save=async ev=>{ev.preventDefault(); await api("/vehicles",{method:"POST",body:JSON.stringify(form)}); setForm({}); load();};
  const remove=id=>api("/vehicles/"+id,{method:"DELETE"}).then(load);
  return (<div className="card"><h2>Vehicles</h2>
    <form className="grid-form" onSubmit={save}>
        <label>contractorId<input value={form.contractorId ?? ""} onChange={ev => setForm({...form, contractorId: ev.target.value})} /></label>
        <label>regNo<input value={form.regNo ?? ""} onChange={ev => setForm({...form, regNo: ev.target.value})} /></label>
        <label>kind<input value={form.kind ?? ""} onChange={ev => setForm({...form, kind: ev.target.value})} /></label>
      <button type="submit">Add</button>
    </form>
    <div className="table-wrap"><table><thead><tr><th>contractorId</th><th>regNo</th><th>kind</th><th></th></tr></thead>
    <tbody>{rows.map(row=><tr key={row.id}><td>{String(row.contractorId ?? "")}</td><td>{String(row.regNo ?? "")}</td><td>{String(row.kind ?? "")}</td><td><button className="link" onClick={()=>remove(row.id)}>Delete</button></td></tr>)}</tbody></table></div>
  </div>);
}

function DriverPage(){
  const [rows,setRows]=useState([]);
  const [form,setForm]=useState({});
  const load=()=>api("/drivers").then(setRows);
  useEffect(()=>{load();},[]);
  const save=async ev=>{ev.preventDefault(); await api("/drivers",{method:"POST",body:JSON.stringify(form)}); setForm({}); load();};
  const remove=id=>api("/drivers/"+id,{method:"DELETE"}).then(load);
  return (<div className="card"><h2>Drivers</h2>
    <form className="grid-form" onSubmit={save}>
        <label>name<input value={form.name ?? ""} onChange={ev => setForm({...form, name: ev.target.value})} /></label>
        <label>dlNo<input value={form.dlNo ?? ""} onChange={ev => setForm({...form, dlNo: ev.target.value})} /></label>
        <label>dlExpiry<input value={form.dlExpiry ?? ""} onChange={ev => setForm({...form, dlExpiry: ev.target.value})} /></label>
        <label>policeVerifyExpiry<input value={form.policeVerifyExpiry ?? ""} onChange={ev => setForm({...form, policeVerifyExpiry: ev.target.value})} /></label>
      <button type="submit">Add</button>
    </form>
    <div className="table-wrap"><table><thead><tr><th>name</th><th>dlNo</th><th>dlExpiry</th><th>policeVerifyExpiry</th><th></th></tr></thead>
    <tbody>{rows.map(row=><tr key={row.id}><td>{String(row.name ?? "")}</td><td>{String(row.dlNo ?? "")}</td><td>{String(row.dlExpiry ?? "")}</td><td>{String(row.policeVerifyExpiry ?? "")}</td><td><button className="link" onClick={()=>remove(row.id)}>Delete</button></td></tr>)}</tbody></table></div>
  </div>);
}

function DocPage(){
  const [rows,setRows]=useState([]);
  const [form,setForm]=useState({});
  const load=()=>api("/docs").then(setRows);
  useEffect(()=>{load();},[]);
  const save=async ev=>{ev.preventDefault(); await api("/docs",{method:"POST",body:JSON.stringify(form)}); setForm({}); load();};
  const remove=id=>api("/docs/"+id,{method:"DELETE"}).then(load);
  return (<div className="card"><h2>Docs</h2>
    <form className="grid-form" onSubmit={save}>
        <label>ownerType<input value={form.ownerType ?? ""} onChange={ev => setForm({...form, ownerType: ev.target.value})} /></label>
        <label>ownerId<input value={form.ownerId ?? ""} onChange={ev => setForm({...form, ownerId: ev.target.value})} /></label>
        <label>docType<input value={form.docType ?? ""} onChange={ev => setForm({...form, docType: ev.target.value})} /></label>
        <label>expiryOn<input value={form.expiryOn ?? ""} onChange={ev => setForm({...form, expiryOn: ev.target.value})} /></label>
      <button type="submit">Add</button>
    </form>
    <div className="table-wrap"><table><thead><tr><th>ownerType</th><th>ownerId</th><th>docType</th><th>expiryOn</th><th></th></tr></thead>
    <tbody>{rows.map(row=><tr key={row.id}><td>{String(row.ownerType ?? "")}</td><td>{String(row.ownerId ?? "")}</td><td>{String(row.docType ?? "")}</td><td>{String(row.expiryOn ?? "")}</td><td><button className="link" onClick={()=>remove(row.id)}>Delete</button></td></tr>)}</tbody></table></div>
  </div>);
}
function Dashboard(){
  const [data,setData]=useState(null);
  useEffect(()=>{ api("/dashboard").then(setData).catch(()=>{}); },[]);
  return (<div>
    <div className="hero">
      <div className="stat"><span className="muted">Product</span><b>SchoolVan File</b></div>
      <div className="stat"><span className="muted">Workspace</span><b>{data?.tenant || "—"}</b></div>
      <div className="stat"><span className="muted">Region</span><b>ap-south-1</b></div>
    </div>
    <div className="card"><p>{data?.tag || "School-owned transport audit file. The school is liable, not the contractor."}</p></div>
  </div>);
}
export default function App(){
  const [token,setToken]=useState(localStorage.getItem("token"));
  const [menu,setMenu]=useState(false);
  const [page,setPage]=useState("dashboard");
  const [mode,setMode]=useState("login");
  const [form,setForm]=useState({tenantName:"",city:"Mumbai",fullName:"",email:"",password:""});
  const [err,setErr]=useState("");
  async function submit(ev){
    ev.preventDefault(); setErr("");
    try{
      const path = mode==="register"?"/auth/register":"/auth/login";
      const body = mode==="register"?form:{email:form.email,password:form.password};
      const out = await api(path,{method:"POST",body:JSON.stringify(body)});
      localStorage.setItem("token", out.token); setToken(out.token);
    }catch(e){ setErr(e.message); }
  }
  if(!token){
    return (<div className="auth card">
      <h1>SchoolVan File</h1><p className="muted">School-owned transport audit file. The school is liable, not the contractor.</p>
      <form onSubmit={submit} className="grid-form">
        {mode==="register" && <>
          <label>Workspace<input value={form.tenantName} onChange={e=>setForm({...form,tenantName:e.target.value})} required /></label>
          <label>City<input value={form.city} onChange={e=>setForm({...form,city:e.target.value})} /></label>
          <label>Your name<input value={form.fullName} onChange={e=>setForm({...form,fullName:e.target.value})} required /></label>
        </>}
        <label>Email<input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required /></label>
        <label>Password<input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required /></label>
        <button type="submit">{mode==="register"?"Create workspace":"Log in"}</button>
      </form>
      {err && <p className="muted">{err}</p>}
      <button className="link" onClick={()=>setMode(mode==="login"?"register":"login")}>{mode==="login"?"Create a workspace":"Have an account? Log in"}</button>
    </div>);
  }
  let body = <Dashboard />;
  if(page==="contractors") body = <ContractorPage />;
  if(page==="vehicles") body = <VehiclePage />;
  if(page==="drivers") body = <DriverPage />;
  if(page==="docs") body = <DocPage />;
  return (<div>
    <div className="top"><button type="button" className="burger" onClick={()=>setMenu(v=>!v)}>Menu</button><div className="brand">SchoolVan File</div><button onClick={()=>{localStorage.removeItem("token"); setToken(null);}}>Log out</button></div>
    <div className="layout">
      {menu && <button className="scrim" onClick={()=>setMenu(false)} />}
      <nav className={"side"+(menu?" open":"")} onClick={()=>setMenu(false)}>
          <button className={page==="dashboard"?"active":""} onClick={()=>setPage("dashboard")}>Home</button>
          <button className={page==="contractors"?"active":""} onClick={()=>setPage("contractors")}>Contractors</button>
          <button className={page==="vehicles"?"active":""} onClick={()=>setPage("vehicles")}>Vehicles</button>
          <button className={page==="drivers"?"active":""} onClick={()=>setPage("drivers")}>Drivers</button>
          <button className={page==="docs"?"active":""} onClick={()=>setPage("docs")}>Docs</button>
      </nav>
      <main>{body}</main>
      <nav className="tabs">
          <button className={page==="dashboard"?"active":""} onClick={()=>setPage("dashboard")}>Home</button>
          <button className={page==="contractors"?"active":""} onClick={()=>setPage("contractors")}>Contractors</button>
          <button className={page==="vehicles"?"active":""} onClick={()=>setPage("vehicles")}>Vehicles</button>
          <button className={page==="drivers"?"active":""} onClick={()=>setPage("drivers")}>Drivers</button>
          <button className={page==="docs"?"active":""} onClick={()=>setPage("docs")}>Docs</button>
      </nav>
    </div>
  </div>);
}
