import React, { useEffect, useState } from "react";
function parseErr(t){ try{ const j=JSON.parse(t); return j.error||t; }catch{ return t||"Request failed"; } }
async function api(path, opts={}) {
  const token = localStorage.getItem("token");
  const res = await fetch((import.meta.env.VITE_API_URL||"")+"/api"+path, {
    ...opts,
    headers: { "Content-Type":"application/json", ...(token?{Authorization:"Bearer "+token}:{}), ...(opts.headers||{}) }
  });
  const text = await res.text();
  if(!res.ok) throw new Error(parseErr(text));
  if(!text) return null;
  return JSON.parse(text);
}
function ContractorsPage(){
  const [rows,setRows]=useState([]);
  const [form,setForm]=useState({});
  const [err,setErr]=useState("");
  const load=()=>api("/contractors").then(setRows).catch(e=>setErr(e.message));
  useEffect(()=>{load();},[]);
  const save=async ev=>{ev.preventDefault(); setErr(""); try{ await api("/contractors",{method:"POST",body:JSON.stringify(form)}); setForm({}); load(); }catch(e){ setErr(e.message); }};
  const remove=id=>api("/contractors/"+id,{method:"DELETE"}).then(load).catch(e=>setErr(e.message));
  return (<section className="card">
    <h2>Contractors</h2>
    <p className="muted">Add the contractor who runs the vans.</p>
    <form className="grid-form" onSubmit={save}>
        <label>Name<input value={form.name ?? ""} onChange={ev => setForm({...form, name: ev.target.value})} /></label>
        <label>Phone<input value={form.phone ?? ""} onChange={ev => setForm({...form, phone: ev.target.value})} /></label>
        <label>GSTIN<input value={form.gstin ?? ""} onChange={ev => setForm({...form, gstin: ev.target.value})} /></label>
      <button type="submit">Save</button>
    </form>
    {err && <p className="err">{err}</p>}
    {rows.length===0 ? <div className="empty">Add the contractor who runs the vans.</div> : (
    <div className="table-wrap"><table><thead><tr><th>Name</th><th>Phone</th><th>GSTIN</th><th></th></tr></thead>
    <tbody>{rows.map(row=><tr key={row.id}><td>{String(row.name ?? "")}</td><td>{String(row.phone ?? "")}</td><td>{String(row.gstin ?? "")}</td><td><button className="danger" onClick={()=>remove(row.id)}>Remove</button></td></tr>)}</tbody></table></div>)}
  </section>);
}

function VehiclesPage(){
  const [rows,setRows]=useState([]);
  const [form,setForm]=useState({});
  const [err,setErr]=useState("");
  const load=()=>api("/vehicles").then(setRows).catch(e=>setErr(e.message));
  useEffect(()=>{load();},[]);
  const save=async ev=>{ev.preventDefault(); setErr(""); try{ await api("/vehicles",{method:"POST",body:JSON.stringify(form)}); setForm({}); load(); }catch(e){ setErr(e.message); }};
  const remove=id=>api("/vehicles/"+id,{method:"DELETE"}).then(load).catch(e=>setErr(e.message));
  return (<section className="card">
    <h2>Vehicles</h2>
    <p className="muted">Add each bus or van on school duty.</p>
    <form className="grid-form" onSubmit={save}>
        <label>Contractor id<input value={form.contractorId ?? ""} onChange={ev => setForm({...form, contractorId: ev.target.value})} /></label>
        <label>Registration<input value={form.regNo ?? ""} onChange={ev => setForm({...form, regNo: ev.target.value})} /></label>
        <label>Type<input value={form.kind ?? ""} onChange={ev => setForm({...form, kind: ev.target.value})} /></label>
      <button type="submit">Save</button>
    </form>
    {err && <p className="err">{err}</p>}
    {rows.length===0 ? <div className="empty">Add each bus or van on school duty.</div> : (
    <div className="table-wrap"><table><thead><tr><th>Contractor id</th><th>Registration</th><th>Type</th><th></th></tr></thead>
    <tbody>{rows.map(row=><tr key={row.id}><td>{String(row.contractorId ?? "")}</td><td>{String(row.regNo ?? "")}</td><td>{String(row.kind ?? "")}</td><td><button className="danger" onClick={()=>remove(row.id)}>Remove</button></td></tr>)}</tbody></table></div>)}
  </section>);
}

function DriversPage(){
  const [rows,setRows]=useState([]);
  const [form,setForm]=useState({});
  const [err,setErr]=useState("");
  const load=()=>api("/drivers").then(setRows).catch(e=>setErr(e.message));
  useEffect(()=>{load();},[]);
  const save=async ev=>{ev.preventDefault(); setErr(""); try{ await api("/drivers",{method:"POST",body:JSON.stringify(form)}); setForm({}); load(); }catch(e){ setErr(e.message); }};
  const remove=id=>api("/drivers/"+id,{method:"DELETE"}).then(load).catch(e=>setErr(e.message));
  return (<section className="card">
    <h2>Drivers</h2>
    <p className="muted">Add drivers with DL and police dates.</p>
    <form className="grid-form" onSubmit={save}>
        <label>Name<input value={form.name ?? ""} onChange={ev => setForm({...form, name: ev.target.value})} /></label>
        <label>DL number<input value={form.dlNo ?? ""} onChange={ev => setForm({...form, dlNo: ev.target.value})} /></label>
        <label>DL expiry<input value={form.dlExpiry ?? ""} onChange={ev => setForm({...form, dlExpiry: ev.target.value})} /></label>
        <label>Police verification<input value={form.policeVerifyExpiry ?? ""} onChange={ev => setForm({...form, policeVerifyExpiry: ev.target.value})} /></label>
      <button type="submit">Save</button>
    </form>
    {err && <p className="err">{err}</p>}
    {rows.length===0 ? <div className="empty">Add drivers with DL and police dates.</div> : (
    <div className="table-wrap"><table><thead><tr><th>Name</th><th>DL number</th><th>DL expiry</th><th>Police verification</th><th></th></tr></thead>
    <tbody>{rows.map(row=><tr key={row.id}><td>{String(row.name ?? "")}</td><td>{String(row.dlNo ?? "")}</td><td>{String(row.dlExpiry ?? "")}</td><td>{String(row.policeVerifyExpiry ?? "")}</td><td><button className="danger" onClick={()=>remove(row.id)}>Remove</button></td></tr>)}</tbody></table></div>)}
  </section>);
}

function DocumentsPage(){
  const [rows,setRows]=useState([]);
  const [form,setForm]=useState({});
  const [err,setErr]=useState("");
  const load=()=>api("/docs").then(setRows).catch(e=>setErr(e.message));
  useEffect(()=>{load();},[]);
  const save=async ev=>{ev.preventDefault(); setErr(""); try{ await api("/docs",{method:"POST",body:JSON.stringify(form)}); setForm({}); load(); }catch(e){ setErr(e.message); }};
  const remove=id=>api("/docs/"+id,{method:"DELETE"}).then(load).catch(e=>setErr(e.message));
  return (<section className="card">
    <h2>Documents</h2>
    <p className="muted">Log fitness, insurance, PUC, permit.</p>
    <form className="grid-form" onSubmit={save}>
        <label>Owner type<input value={form.ownerType ?? ""} onChange={ev => setForm({...form, ownerType: ev.target.value})} /></label>
        <label>Owner id<input value={form.ownerId ?? ""} onChange={ev => setForm({...form, ownerId: ev.target.value})} /></label>
        <label>Document<input value={form.docType ?? ""} onChange={ev => setForm({...form, docType: ev.target.value})} /></label>
        <label>Expiry<input value={form.expiryOn ?? ""} onChange={ev => setForm({...form, expiryOn: ev.target.value})} /></label>
      <button type="submit">Save</button>
    </form>
    {err && <p className="err">{err}</p>}
    {rows.length===0 ? <div className="empty">Log fitness, insurance, PUC, permit.</div> : (
    <div className="table-wrap"><table><thead><tr><th>Owner type</th><th>Owner id</th><th>Document</th><th>Expiry</th><th></th></tr></thead>
    <tbody>{rows.map(row=><tr key={row.id}><td>{String(row.ownerType ?? "")}</td><td>{String(row.ownerId ?? "")}</td><td>{String(row.docType ?? "")}</td><td>{String(row.expiryOn ?? "")}</td><td><button className="danger" onClick={()=>remove(row.id)}>Remove</button></td></tr>)}</tbody></table></div>)}
  </section>);
}
function Dashboard(){
  const [data,setData]=useState(null);
  const [counts,setCounts]=useState([]);
  useEffect(()=>{
    api("/dashboard").then(setData).catch(()=>{});
    Promise.all([api("/contractors"),api("/vehicles"),api("/drivers"),api("/docs")]).then(sets => setCounts(sets.map(x => (x||[]).length))).catch(()=>{});
  },[]);
  return (<div>
    <div className="hero-panel">
      <div className="kicker">For school transport in-charge</div>
      <h1>SchoolVan File</h1>
      <p>{data?.tag || "Keep fitness, insurance, DL and police verification in one audit file."}</p>
    </div>
    <div className="hero">
      <div className="stat"><span>Workspace</span><b>{data?.tenant || "—"}</b></div>
      <div className="stat"><span>Contractors</span><b>{counts[0] ?? 0}</b></div>
      <div className="stat"><span>Vehicles</span><b>{counts[1] ?? 0}</b></div>
      <div className="stat"><span>Drivers</span><b>{counts[2] ?? 0}</b></div>
      <div className="stat"><span>Documents</span><b>{counts[3] ?? 0}</b></div>
    </div>
  </div>);
}
export default function App(){
  const [token,setToken]=useState(localStorage.getItem("token"));
  const [menu,setMenu]=useState(false);
  const [page,setPage]=useState("dashboard");
  const [mode,setMode]=useState("login");
  const [form,setForm]=useState({tenantName:"",city:"Pune",fullName:"",email:"",password:""});
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
    return (<div className="auth-wrap">
      <div className="auth">
        <div className="kicker">For school transport in-charge</div>
        <h1>SchoolVan File</h1>
        <p className="muted">Keep fitness, insurance, DL and police verification in one audit file.</p>
        <form onSubmit={submit} className="grid-form">
          {mode==="register" && <>
            <label>Workspace<input value={form.tenantName} onChange={e=>setForm({...form,tenantName:e.target.value})} required /></label>
            <label>City<input value={form.city} onChange={e=>setForm({...form,city:e.target.value})} /></label>
            <label>Your name<input value={form.fullName} onChange={e=>setForm({...form,fullName:e.target.value})} required /></label>
          </>}
          <label>Email<input type="email" autoComplete="username" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required /></label>
          <label>Password<input type="password" autoComplete={mode==="login"?"current-password":"new-password"} value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required minLength={8} /></label>
          <button type="submit">{mode==="register"?"Open workspace":"Log in"}</button>
        </form>
        {err && <p className="err">{err}</p>}
        <button className="ghost-ink" onClick={()=>setMode(mode==="login"?"register":"login")}>{mode==="login"?"Create a workspace":"Have an account? Log in"}</button>
      </div>
    </div>);
  }
  let body = <Dashboard />;
  if(page==="contractors") body = <ContractorsPage />;
  if(page==="vehicles") body = <VehiclesPage />;
  if(page==="drivers") body = <DriversPage />;
  if(page==="docs") body = <DocumentsPage />;
  return (<div className="shell">
    <div className="top">
      <button type="button" className="burger" onClick={()=>setMenu(v=>!v)}>Menu</button>
      <div className="brand">SchoolVan File</div>
      <button className="ghost" onClick={()=>{localStorage.removeItem("token"); setToken(null);}}>Log out</button>
    </div>
    <div className="layout">
      {menu && <button className="scrim" onClick={()=>setMenu(false)} />}
      <nav className={"side"+(menu?" open":"")} onClick={()=>setMenu(false)}>
          <button className={page==="dashboard"?"active":""} onClick={()=>setPage("dashboard")}>Home</button>
          <button className={page==="contractors"?"active":""} onClick={()=>setPage("contractors")}>Contractors</button>
          <button className={page==="vehicles"?"active":""} onClick={()=>setPage("vehicles")}>Vehicles</button>
          <button className={page==="drivers"?"active":""} onClick={()=>setPage("drivers")}>Drivers</button>
          <button className={page==="docs"?"active":""} onClick={()=>setPage("docs")}>Documents</button>
      </nav>
      <main>{body}</main>
      <nav className="tabs">
          <button className={page==="dashboard"?"active":""} onClick={()=>setPage("dashboard")}>Home</button>
          <button className={page==="contractors"?"active":""} onClick={()=>setPage("contractors")}>Contractors</button>
          <button className={page==="vehicles"?"active":""} onClick={()=>setPage("vehicles")}>Vehicles</button>
          <button className={page==="drivers"?"active":""} onClick={()=>setPage("drivers")}>Drivers</button>
          <button className={page==="docs"?"active":""} onClick={()=>setPage("docs")}>Documents</button>
      </nav>
    </div>
  </div>);
}
