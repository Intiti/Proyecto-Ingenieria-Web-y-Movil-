import { useEffect, useMemo, useState } from "react";

import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonMenuButton,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import {
  callOutline,
  documentTextOutline,
  homeOutline,
  mailOutline,
  peopleOutline,
  searchOutline,
  swapHorizontalOutline,
  timeOutline,
} from "ionicons/icons";

import { apiRequest } from "../../../../services/api";
import "./AdminPacientes.css";

type Solicitud = {
  id: string;
  estado: string;
  prioridad: string;
  diasEspera: number;
  especialidad: { nombre: string };
  centroSalud: { nombre: string } | null;
};

type Paciente = {
  id: string;
  telefono: string | null;
  comuna: string | null;
  usuario: { id: string; rut: string; nombre: string; correo: string; activo: boolean };
  solicitudes: Solicitud[];
};

type PacientesResponse = { ok: boolean; pacientes: Paciente[] };

type FiltroEstado = "todos" | "EN_ESPERA" | "AGENDADA" | "prioritario";

const AdminPacientes: React.FC = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filtro, setFiltro] = useState<FiltroEstado>("todos");

  useEffect(() => {
    apiRequest<PacientesResponse>("/pacientes")
      .then((data) => setPacientes(data.pacientes))
      .catch(() => setError("No se pudo cargar la lista de pacientes."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return pacientes.filter((p) => {
      const matchSearch =
        p.usuario.nombre.toLowerCase().includes(q) ||
        p.usuario.rut.toLowerCase().includes(q) ||
        p.solicitudes.some((s) => s.especialidad.nombre.toLowerCase().includes(q));

      if (!matchSearch) return false;
      if (filtro === "todos") return true;
      if (filtro === "prioritario")
        return p.solicitudes.some((s) => s.prioridad === "ALTA");
      return p.solicitudes.some((s) => s.estado === filtro);
    });
  }, [pacientes, search, filtro]);

  const totalEspera = pacientes.filter((p) =>
    p.solicitudes.some((s) => s.estado === "EN_ESPERA")
  ).length;
  const totalAgendados = pacientes.filter((p) =>
    p.solicitudes.some((s) => s.estado === "AGENDADA")
  ).length;
  const totalPrioritarios = pacientes.filter((p) =>
    p.solicitudes.some((s) => s.prioridad === "ALTA")
  ).length;

  return (
    <IonPage>
      <IonHeader className="app-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Gestión de pacientes</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/admin/dashboard" fill="clear" className="app-header-btn">
              <IonIcon icon={homeOutline} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="app-page admin-patients-page">
        <main className="app-shell">
          <section className="app-hero">
            <div>
              <p className="app-eyebrow">Administración</p>
              <h1>Gestionar pacientes</h1>
              <p>Busca pacientes, revisa solicitudes y detecta prioridades.</p>
            </div>
          </section>

          <section className="kpi-grid">
            <IonCard className="kpi-card">
              <IonCardContent>
                <IonIcon icon={peopleOutline} />
                <div><strong>{pacientes.length}</strong><span>Total pacientes</span></div>
              </IonCardContent>
            </IonCard>
            <IonCard className="kpi-card">
              <IonCardContent>
                <IonIcon icon={timeOutline} />
                <div><strong>{totalEspera}</strong><span>En espera</span></div>
              </IonCardContent>
            </IonCard>
            <IonCard className="kpi-card">
              <IonCardContent>
                <IonIcon icon={documentTextOutline} />
                <div><strong>{totalAgendados}</strong><span>Agendados</span></div>
              </IonCardContent>
            </IonCard>
            <IonCard className="kpi-card">
              <IonCardContent>
                <IonIcon icon={swapHorizontalOutline} />
                <div><strong>{totalPrioritarios}</strong><span>Prioritarios</span></div>
              </IonCardContent>
            </IonCard>
          </section>

          <IonCard className="app-card admin-patients-filters">
            <IonCardContent>
              <div className="admin-patients-search">
                <IonIcon icon={searchOutline} />
                <IonInput
                  value={search}
                  placeholder="Buscar por nombre, RUT o solicitud"
                  aria-label="Buscar paciente"
                  onIonInput={(e) => setSearch(e.detail.value?.toString() ?? "")}
                />
              </div>
              <IonSelect
                value={filtro}
                interface="popover"
                label="Estado"
                labelPlacement="stacked"
                className="admin-patients-select"
                onIonChange={(e) => setFiltro(e.detail.value as FiltroEstado)}
              >
                <IonSelectOption value="todos">Todos</IonSelectOption>
                <IonSelectOption value="EN_ESPERA">En espera</IonSelectOption>
                <IonSelectOption value="AGENDADA">Agendado</IonSelectOption>
                <IonSelectOption value="prioritario">Prioritario</IonSelectOption>
              </IonSelect>
            </IonCardContent>
          </IonCard>

          {loading && (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <IonSpinner name="crescent" />
            </div>
          )}

          {error && (
            <IonCard className="app-card">
              <IonCardContent>
                <p style={{ color: "var(--ion-color-danger)" }}>{error}</p>
              </IonCardContent>
            </IonCard>
          )}

          <section className="admin-patients-list">
            {filtered.map((p) => {
              const sol = p.solicitudes[0];
              const esPrioritario = p.solicitudes.some((s) => s.prioridad === "ALTA");
              const estaAgendado = p.solicitudes.some((s) => s.estado === "AGENDADA");

              return (
                <IonCard className="app-card admin-patient-card" key={p.id}>
                  <IonCardContent>
                    <div className="admin-patient-top">
                      <div>
                        <h2>{p.usuario.nombre}</h2>
                        <p>{p.usuario.rut}</p>
                      </div>
                      <IonBadge
                        className={
                          esPrioritario ? "badge-danger"
                          : estaAgendado ? "badge-success"
                          : "badge-warning"
                        }
                      >
                        {esPrioritario ? "Prioritario" : estaAgendado ? "Agendado" : "En espera"}
                      </IonBadge>
                    </div>

                    <div className="admin-patient-info">
                      <div>
                        <span>Solicitud</span>
                        <strong>{sol?.especialidad.nombre ?? "Sin solicitudes"}</strong>
                      </div>
                      <div>
                        <span>Centro asignado</span>
                        <strong>{sol?.centroSalud?.nombre ?? "Sin asignar"}</strong>
                      </div>
                      <div>
                        <span>Días en espera</span>
                        <strong>{sol?.diasEspera ?? 0} días</strong>
                      </div>
                      <div>
                        <span>Comuna</span>
                        <strong>{p.comuna ?? "—"}</strong>
                      </div>
                    </div>

                    <div className="admin-patient-contact">
                      {p.telefono && (
                        <p><IonIcon icon={callOutline} />{p.telefono}</p>
                      )}
                      <p><IonIcon icon={mailOutline} />{p.usuario.correo}</p>
                    </div>

                    <div className="admin-patient-actions">
                      <IonButton expand="block" routerLink="/admin/listas" className="app-primary-btn">
                        Revisar solicitud
                      </IonButton>
                      <IonButton expand="block" fill="outline" routerLink="/admin/agenda" className="app-outline-btn">
                        Reasignar / agendar
                      </IonButton>
                    </div>
                  </IonCardContent>
                </IonCard>
              );
            })}
          </section>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default AdminPacientes;
