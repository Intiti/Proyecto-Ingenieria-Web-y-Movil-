import { useMemo, useState } from "react";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import {
  alertCircleOutline,
  analyticsOutline,
  businessOutline,
  calendarOutline,
  chevronBackOutline,
  chevronForwardOutline,
  downloadOutline,
  funnelOutline,
  homeOutline,
  peopleOutline,
  swapHorizontalOutline,
  timeOutline,
  trendingUpOutline,
} from "ionicons/icons";

import "./AdminReportes.css";

type ReportFilters = {
  year: "2025" | "2026";
  commune: "todos" | "santo-domingo" | "san-antonio";
  specialty: "todas" | "traumatologia" | "laboratorio" | "medicina-general";
};

const reportData = {
  "2025": {
    monthlyRequests: [
      { month: "Ene", value: 18 },
      { month: "Feb", value: 25 },
      { month: "Mar", value: 34 },
      { month: "Abr", value: 39 },
      { month: "May", value: 47 },
      { month: "Jun", value: 52 },
    ],
    statusDistribution: [
      { label: "En espera", value: 36, className: "status-waiting" },
      { label: "Agendadas", value: 22, className: "status-scheduled" },
      { label: "Finalizadas", value: 30, className: "status-done" },
      { label: "Prioritarias", value: 8, className: "status-priority" },
    ],
    specialties: [
      { name: "Traumatología", value: 58 },
      { name: "Medicina general", value: 49 },
      { name: "Laboratorio", value: 37 },
      { name: "Cardiología", value: 24 },
    ],
    kpis: {
      patients: 96,
      waiting: 36,
      appointments: 14,
      growth: "9%",
    },
  },

  "2026": {
    monthlyRequests: [
      { month: "Ene", value: 24 },
      { month: "Feb", value: 31 },
      { month: "Mar", value: 42 },
      { month: "Abr", value: 55 },
      { month: "May", value: 68 },
      { month: "Jun", value: 61 },
    ],
    statusDistribution: [
      { label: "En espera", value: 42, className: "status-waiting" },
      { label: "Agendadas", value: 28, className: "status-scheduled" },
      { label: "Finalizadas", value: 36, className: "status-done" },
      { label: "Prioritarias", value: 12, className: "status-priority" },
    ],
    specialties: [
      { name: "Traumatología", value: 76 },
      { name: "Medicina general", value: 58 },
      { name: "Laboratorio", value: 43 },
      { name: "Cardiología", value: 31 },
    ],
    kpis: {
      patients: 128,
      waiting: 42,
      appointments: 18,
      growth: "14%",
    },
  },
};

const communeFactor: Record<ReportFilters["commune"], number> = {
  todos: 1,
  "santo-domingo": 0.72,
  "san-antonio": 0.48,
};

const specialtyFactor: Record<ReportFilters["specialty"], number> = {
  todas: 1,
  traumatologia: 0.82,
  laboratorio: 0.64,
  "medicina-general": 0.74,
};

const priorityCases = [
  {
    patient: "María Muñoz Pérez",
    request: "Consulta traumatología",
    priority: "Alta",
    waitingDays: 36,
    status: "Revisión requerida",
  },
  {
    patient: "Carlos Rojas Díaz",
    request: "Evaluación cardiología",
    priority: "Alta",
    waitingDays: 28,
    status: "Pendiente de agenda",
  },
  {
    patient: "Ana Soto Vera",
    request: "Examen de laboratorio",
    priority: "Media",
    waitingDays: 18,
    status: "Por confirmar",
  },
];

const centerCapacity = [
  {
    center: "CESFAM Santo Domingo",
    occupation: 92,
    waiting: 28,
    specialty: "Traumatología",
    status: "Saturado",
    action: "Revisar cupos y posible reasignación",
  },
  {
    center: "Centro Médico Municipal",
    occupation: 76,
    waiting: 18,
    specialty: "Laboratorio",
    status: "Alta demanda",
    action: "Coordinar bloques de atención",
  },
  {
    center: "Unidad de Apoyo Clínico",
    occupation: 54,
    waiting: 9,
    specialty: "Medicina general",
    status: "Disponible",
    action: "Puede recibir derivaciones",
  },
  {
    center: "Posta Rural El Convento",
    occupation: 68,
    waiting: 11,
    specialty: "Medicina general",
    status: "Alta demanda",
    action: "Revisar disponibilidad semanal",
  },
];

const AdminReportes: React.FC = () => {
  const [filters, setFilters] = useState<ReportFilters>({
    year: "2026",
    commune: "todos",
    specialty: "todas",
  });

  const [selectedCenterIndex, setSelectedCenterIndex] = useState(0);

  const filtersReveal = useRevealOnScroll<HTMLElement>();
  const summaryReveal = useRevealOnScroll<HTMLElement>();
  const capacityReveal = useRevealOnScroll<HTMLElement>();
  const chartsReveal = useRevealOnScroll<HTMLElement>();
  const bottomReveal = useRevealOnScroll<HTMLElement>();
  const alertsReveal = useRevealOnScroll<HTMLElement>();

  const filteredData = useMemo(() => {
    const base = reportData[filters.year];

    const factor =
      communeFactor[filters.commune] * specialtyFactor[filters.specialty];

    const monthlyRequests = base.monthlyRequests.map((item) => ({
      ...item,
      value: Math.max(1, Math.round(item.value * factor)),
    }));

    const statusDistribution = base.statusDistribution.map((item) => ({
      ...item,
      value: Math.max(1, Math.round(item.value * factor)),
    }));

    const specialties = base.specialties.map((item) => ({
      ...item,
      value: Math.max(
        1,
        Math.round(item.value * communeFactor[filters.commune]),
      ),
    }));

    const kpis = {
      patients: Math.round(base.kpis.patients * communeFactor[filters.commune]),
      waiting: Math.round(base.kpis.waiting * factor),
      appointments: Math.round(base.kpis.appointments * factor),
      growth: base.kpis.growth,
    };

    const centers = centerCapacity.map((center) => ({
      ...center,
      occupation: Math.min(
        100,
        Math.max(
          15,
          Math.round(center.occupation * communeFactor[filters.commune]),
        ),
      ),
      waiting: Math.max(
        1,
        Math.round(center.waiting * communeFactor[filters.commune]),
      ),
    }));

    return {
      monthlyRequests,
      statusDistribution,
      specialties,
      kpis,
      centers,
    };
  }, [filters]);

  const selectedCenter =
    filteredData.centers[selectedCenterIndex % filteredData.centers.length];

  const maxMonthlyValue = Math.max(
    ...filteredData.monthlyRequests.map((item) => item.value),
  );

  const maxSpecialtyValue = Math.max(
    ...filteredData.specialties.map((item) => item.value),
  );

  const totalStatus = filteredData.statusDistribution.reduce(
    (sum, item) => sum + item.value,
    0,
  );

  const goPreviousCenter = () => {
    setSelectedCenterIndex((current) =>
      current === 0 ? filteredData.centers.length - 1 : current - 1,
    );
  };

  const goNextCenter = () => {
    setSelectedCenterIndex((current) =>
      current === filteredData.centers.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <IonPage>
      <IonHeader className="reports-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>

          <IonTitle>Reportes</IonTitle>

          <IonButtons slot="end">
            <IonButton
              routerLink="/admin/dashboard"
              fill="clear"
              className="reports-home-btn"
            >
              <IonIcon icon={homeOutline} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="reports-page">
        <main className="reports-shell">
          <section className="reports-hero">
            <div>
              <p className="reports-eyebrow">Indicadores administrativos</p>
              <h1>Reportes de gestión municipal</h1>
              <p>
                Visualiza indicadores sobre listas de espera, solicitudes,
                agenda médica, centros de atención y casos prioritarios del
                sistema.
              </p>
            </div>

            <IonButton className="export-report-btn">
              <IonIcon icon={downloadOutline} slot="start" />
              Exportar reporte
            </IonButton>
          </section>

          <section ref={filtersReveal.ref} className={filtersReveal.className}>
            <IonCard className="filters-card">
              <IonCardContent>
                <div className="filters-title">
                  <IonIcon icon={funnelOutline} />
                  <div>
                    <h2>Filtros del reporte</h2>
                    <p>
                      Selecciona los criterios para actualizar los indicadores.
                    </p>
                  </div>
                </div>

                <div className="filters-grid">
                  <IonSelect
                    value={filters.year}
                    interface="popover"
                    label="Año"
                    labelPlacement="stacked"
                    className="report-select"
                    onIonChange={(event) => {
                      setSelectedCenterIndex(0);
                      setFilters((current) => ({
                        ...current,
                        year: event.detail.value as ReportFilters["year"],
                      }));
                    }}
                  >
                    <IonSelectOption value="2026">2026</IonSelectOption>
                    <IonSelectOption value="2025">2025</IonSelectOption>
                  </IonSelect>

                  <IonSelect
                    value={filters.commune}
                    interface="popover"
                    label="Comuna"
                    labelPlacement="stacked"
                    className="report-select"
                    onIonChange={(event) => {
                      setSelectedCenterIndex(0);
                      setFilters((current) => ({
                        ...current,
                        commune: event.detail.value as ReportFilters["commune"],
                      }));
                    }}
                  >
                    <IonSelectOption value="todos">Todas</IonSelectOption>
                    <IonSelectOption value="santo-domingo">
                      Santo Domingo
                    </IonSelectOption>
                    <IonSelectOption value="san-antonio">
                      San Antonio
                    </IonSelectOption>
                  </IonSelect>

                  <IonSelect
                    value={filters.specialty}
                    interface="popover"
                    label="Especialidad"
                    labelPlacement="stacked"
                    className="report-select"
                    onIonChange={(event) => {
                      setSelectedCenterIndex(0);
                      setFilters((current) => ({
                        ...current,
                        specialty: event.detail
                          .value as ReportFilters["specialty"],
                      }));
                    }}
                  >
                    <IonSelectOption value="todas">Todas</IonSelectOption>
                    <IonSelectOption value="traumatologia">
                      Traumatología
                    </IonSelectOption>
                    <IonSelectOption value="laboratorio">
                      Laboratorio
                    </IonSelectOption>
                    <IonSelectOption value="medicina-general">
                      Medicina general
                    </IonSelectOption>
                  </IonSelect>
                </div>
              </IonCardContent>
            </IonCard>
          </section>

          <section
            ref={summaryReveal.ref}
            className={`reports-summary ${summaryReveal.className}`}
          >
            <IonCard className="report-summary-card">
              <IonCardContent>
                <IonIcon icon={peopleOutline} />
                <div>
                  <strong>{filteredData.kpis.patients}</strong>
                  <span>Pacientes registrados</span>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard className="report-summary-card">
              <IonCardContent>
                <IonIcon icon={timeOutline} />
                <div>
                  <strong>{filteredData.kpis.waiting}</strong>
                  <span>Solicitudes en espera</span>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard className="report-summary-card">
              <IonCardContent>
                <IonIcon icon={calendarOutline} />
                <div>
                  <strong>{filteredData.kpis.appointments}</strong>
                  <span>Citas programadas</span>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard className="report-summary-card">
              <IonCardContent>
                <IonIcon icon={trendingUpOutline} />
                <div>
                  <strong>{filteredData.kpis.growth}</strong>
                  <span>Aumento mensual</span>
                </div>
              </IonCardContent>
            </IonCard>
          </section>

          <section
            ref={capacityReveal.ref}
            className={`capacity-section ${capacityReveal.className}`}
          >
            <IonCard className="capacity-card">
              <IonCardContent>
                <div className="section-title">
                  <div>
                    <h2>Centros de atención y capacidad</h2>
                    <p>
                      Revisión operacional para detectar saturación y posibles
                      reasignaciones.
                    </p>
                  </div>

                  <IonBadge className="badge-info">
                    {selectedCenterIndex + 1} de {filteredData.centers.length}
                  </IonBadge>
                </div>

                <article className="capacity-item capacity-slider-item">
                  <div className="capacity-header">
                    <div className="capacity-icon">
                      <IonIcon icon={businessOutline} />
                    </div>

                    <div>
                      <h3>{selectedCenter.center}</h3>
                      <p>{selectedCenter.specialty}</p>
                    </div>

                    <IonBadge
                      className={
                        selectedCenter.status === "Saturado"
                          ? "badge-danger"
                          : selectedCenter.status === "Alta demanda"
                            ? "badge-warning"
                            : "badge-success"
                      }
                    >
                      {selectedCenter.status}
                    </IonBadge>
                  </div>

                  <div className="capacity-progress">
                    <div className="capacity-progress-top">
                      <span>Ocupación estimada</span>
                      <strong>{selectedCenter.occupation}%</strong>
                    </div>

                    <div className="progress-track">
                      <div
                        key={`${filters.year}-${filters.commune}-${selectedCenter.center}`}
                        className={
                          selectedCenter.occupation >= 85
                            ? "progress-fill status-priority"
                            : selectedCenter.occupation >= 70
                              ? "progress-fill status-waiting"
                              : "progress-fill status-done"
                        }
                        style={{ width: `${selectedCenter.occupation}%` }}
                      />
                    </div>
                  </div>

                  <div className="capacity-meta">
                    <div>
                      <span>Pacientes en espera</span>
                      <strong>{selectedCenter.waiting}</strong>
                    </div>

                    <div>
                      <span>Acción sugerida</span>
                      <strong>{selectedCenter.action}</strong>
                    </div>
                  </div>

                  <div className="capacity-actions">
                    <IonButton
                      expand="block"
                      fill="outline"
                      routerLink="/admin/listas"
                    >
                      <IonIcon icon={swapHorizontalOutline} slot="start" />
                      Reasignar pacientes
                    </IonButton>

                    <IonButton expand="block" routerLink="/admin/agenda">
                      <IonIcon icon={calendarOutline} slot="start" />
                      Revisar agenda
                    </IonButton>
                  </div>

                  <div className="capacity-slider-controls">
                    <IonButton
                      fill="clear"
                      className="capacity-control-btn"
                      onClick={goPreviousCenter}
                    >
                      <IonIcon icon={chevronBackOutline} slot="start" />
                      Anterior
                    </IonButton>

                    <div className="capacity-dots">
                      {filteredData.centers.map((center, index) => (
                        <button
                          key={center.center}
                          type="button"
                          className={
                            index === selectedCenterIndex
                              ? "capacity-dot active"
                              : "capacity-dot"
                          }
                          aria-label={`Ver centro ${index + 1}`}
                          onClick={() => setSelectedCenterIndex(index)}
                        />
                      ))}
                    </div>

                    <IonButton
                      fill="clear"
                      className="capacity-control-btn"
                      onClick={goNextCenter}
                    >
                      Siguiente
                      <IonIcon icon={chevronForwardOutline} slot="end" />
                    </IonButton>
                  </div>
                </article>
              </IonCardContent>
            </IonCard>
          </section>

          <section
            ref={chartsReveal.ref}
            className={`reports-content ${chartsReveal.className}`}
          >
            <IonCard className="report-panel large-panel">
              <IonCardContent>
                <div className="section-title">
                  <div>
                    <h2>Solicitudes ingresadas por mes</h2>
                    <p>Gráfico generado desde datos filtrados del sistema.</p>
                  </div>

                  <IonBadge className="badge-info">
                    {filters.year} ·{" "}
                    {filters.commune === "todos"
                      ? "Todas las comunas"
                      : filters.commune === "santo-domingo"
                        ? "Santo Domingo"
                        : "San Antonio"}
                  </IonBadge>
                </div>

                <div className="bar-chart">
                  {filteredData.monthlyRequests.map((item) => {
                    const height = (item.value / maxMonthlyValue) * 100;

                    return (
                      <div className="bar-item" key={item.month}>
                        <div className="bar-track">
                          <div
                            key={`${filters.year}-${filters.commune}-${filters.specialty}-${item.month}`}
                            className="bar-fill"
                            style={{ height: `${height}%` }}
                          >
                            <span>{item.value}</span>
                          </div>
                        </div>

                        <strong>{item.month}</strong>
                      </div>
                    );
                  })}
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard className="report-panel">
              <IonCardContent>
                <div className="section-title">
                  <div>
                    <h2>Estado de solicitudes</h2>
                    <p>Distribución actual según filtros aplicados.</p>
                  </div>
                </div>

                <div className="status-list">
                  {filteredData.statusDistribution.map((item) => {
                    const percent = Math.round(
                      (item.value / totalStatus) * 100,
                    );

                    return (
                      <div className="status-row" key={item.label}>
                        <div className="status-row-top">
                          <span>{item.label}</span>
                          <strong>{percent}%</strong>
                        </div>

                        <div className="progress-track">
                          <div
                            key={`${filters.year}-${filters.commune}-${filters.specialty}-${item.label}`}
                            className={`progress-fill ${item.className}`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>

                        <small>{item.value} registros</small>
                      </div>
                    );
                  })}
                </div>
              </IonCardContent>
            </IonCard>
          </section>

          <section
            ref={bottomReveal.ref}
            className={`reports-content bottom-content ${bottomReveal.className}`}
          >
            <IonCard className="report-panel">
              <IonCardContent>
                <div className="section-title">
                  <div>
                    <h2>Especialidades más solicitadas</h2>
                    <p>Ranking actualizado según comuna seleccionada.</p>
                  </div>
                </div>

                <div className="specialty-list">
                  {filteredData.specialties.map((item) => {
                    const width = (item.value / maxSpecialtyValue) * 100;

                    return (
                      <div className="specialty-item" key={item.name}>
                        <div className="specialty-top">
                          <span>{item.name}</span>
                          <strong>{item.value}</strong>
                        </div>

                        <div className="specialty-track">
                          <div
                            key={`${filters.year}-${filters.commune}-${filters.specialty}-${item.name}`}
                            className="specialty-fill"
                            style={{ width: `${width}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard className="report-panel priority-panel">
              <IonCardContent>
                <div className="section-title">
                  <div>
                    <h2>Casos prioritarios</h2>
                    <p>Pacientes que requieren revisión administrativa.</p>
                  </div>

                  <IonIcon icon={alertCircleOutline} />
                </div>

                <div className="priority-list">
                  {priorityCases.map((item) => (
                    <article className="priority-item" key={item.patient}>
                      <div className="priority-main">
                        <h3>{item.patient}</h3>
                        <p>{item.request}</p>
                      </div>

                      <div className="priority-meta">
                        <IonBadge
                          className={
                            item.priority === "Alta"
                              ? "badge-danger"
                              : "badge-warning"
                          }
                        >
                          {item.priority}
                        </IonBadge>

                        <span>{item.waitingDays} días en espera</span>
                      </div>

                      <strong>{item.status}</strong>
                    </article>
                  ))}
                </div>
              </IonCardContent>
            </IonCard>
          </section>

          <section
            ref={alertsReveal.ref}
            className={`management-alerts ${alertsReveal.className}`}
          >
            <IonCard className="management-alert-card">
              <IonCardContent>
                <div className="section-title">
                  <div>
                    <h2>Alertas de gestión</h2>
                    <p>
                      Recomendaciones generadas a partir de los gráficos y la
                      capacidad de los centros.
                    </p>
                  </div>

                  <IonBadge className="badge-warning">
                    Revisión sugerida
                  </IonBadge>
                </div>

                <div className="alert-grid">
                  <div className="alert-item">
                    <IonIcon icon={alertCircleOutline} />
                    <div>
                      <strong>Espera prolongada</strong>
                      <span>
                        {filteredData.kpis.waiting > 30
                          ? "Existen pacientes con más de 30 días en espera."
                          : "La cantidad de pacientes en espera se mantiene controlada."}
                      </span>
                    </div>
                  </div>

                  <div className="alert-item">
                    <IonIcon icon={trendingUpOutline} />
                    <div>
                      <strong>Mayor demanda</strong>
                      <span>
                        Traumatología concentra la mayor cantidad de solicitudes
                        del período.
                      </span>
                    </div>
                  </div>

                  <div className="alert-item">
                    <IonIcon icon={calendarOutline} />
                    <div>
                      <strong>Agenda médica</strong>
                      <span>
                        Se recomienda revisar disponibilidad de horas para
                        especialidades críticas.
                      </span>
                    </div>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
          </section>

          <section className="reports-note">
            <IonIcon icon={analyticsOutline} />
            <p>
              Los gráficos se renderizan desde datos definidos en el componente.
              Al cambiar los filtros, los indicadores se recalculan y las barras
              se actualizan visualmente.
            </p>
          </section>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default AdminReportes;
