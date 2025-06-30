import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { format, parseISO, isAfter, differenceInDays } from "date-fns";
import "react-day-picker/dist/style.css";
import { API_KEY, API_BASE_URL } from "../config/env.jsx";

export default function CalendarWithEvents() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [nextCountdown, setNextCountdown] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/prisma/post/page?tipo=1`,
          {
            headers: {
              "x-api-key": API_KEY,
            },
            cache: "no-cache",
          }
        );
        if (!response.ok) {
          throw new Error("Error al cargar los posts");
        }
        const data = await response.json();
        // Solo guardar los datos requeridos en un nuevo array
        const filteredEvents = data
          .filter((item) => item.postTypeId === 1)
          .map((item) => ({
            id: item.id,
            date_Sat: item.start_at,
            date_Eat: item.end_at,
            title: item.title,
            description: item.content,
          }));
        setEvents(filteredEvents);
        console.log("Eventos cargados:", filteredEvents);
        // Próximos eventos por fecha de inicio
        const today = new Date();
        const upcoming = filteredEvents
          .filter((e) => isAfter(parseISO(e.date_Sat), today))
          .sort((a, b) => parseISO(a.date_Sat) - parseISO(b.date_Sat))
          .slice(0, 5);
        setUpcomingEvents(upcoming);
        if (upcoming.length > 0) {
          const next = upcoming[0];
          const daysLeft = differenceInDays(parseISO(next.date_Sat), today);
          setNextCountdown({ ...next, daysLeft });
        } else {
          setNextCountdown(null);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, []);

  // Día actual
  const today = new Date();
  const todayKey = format(today, "yyyy-MM-dd");

  // Generar rangos y días especiales de eventos
  const eventRanges = [];
  const eventStartDays = new Set();
  const eventEndDays = new Set();
  const eventDays = new Set();
  const eventMap = new Map();

  events.forEach((ev) => {
    if (ev.date_Sat && ev.date_Eat) {
      let start = parseISO(ev.date_Sat);
      let end = parseISO(ev.date_Eat);

      // Agregar el rango
      eventRanges.push({ from: start, to: end });

      // Marcar inicio y fin
      eventStartDays.add(format(start, "yyyy-MM-dd"));
      eventEndDays.add(format(end, "yyyy-MM-dd"));

      // Agregar todos los días del rango
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const key = format(new Date(d), "yyyy-MM-dd");
        eventDays.add(key);
        eventMap.set(key, ev);
      }
    } else if (ev.date_Sat) {
      const key = format(parseISO(ev.date_Sat), "yyyy-MM-dd");
      eventDays.add(key);
      eventStartDays.add(key);
      eventMap.set(key, ev);
    }
  });

  // Modificadores para DayPicker
  const modifiers = {
    eventRange: eventRanges,
    eventStart: Array.from(eventStartDays).map((d) => parseISO(d)),
    eventEnd: Array.from(eventEndDays).map((d) => parseISO(d)),
    today: [today],
    eventDay: Array.from(eventDays).map((d) => parseISO(d)),
    todayEvent: eventDays.has(todayKey) ? [today] : [],
  };

  const modifiersClassNames = {
    eventRange:
      "bg-gradient-to-r from-[#669BBC] to-[#AEDFF7] hover:from-[#88b8db] hover:to-[#c2e8f8] transition-all duration-300 shadow-sm",
    eventStart:
      "rounded-l-full bg-gradient-to-r from-[#003049] to-[#669BBC] text-white hover:from-[#002437] hover:to-[#547fa8] transition-all duration-300 shadow-lg transform hover:scale-105",
    eventEnd:
      "rounded-r-full bg-gradient-to-r from-[#669BBC] to-[#003049] text-white hover:from-[#547fa8] hover:to-[#002437] transition-all duration-300 shadow-lg transform hover:scale-105",
    today:
      "border-2 border-[#C1121F] bg-gradient-to-br from-[#C1121F] to-[#AE1F23] text-white rounded-full font-bold shadow-lg animate-pulse",
    todayEvent:
      "border-2 border-[#C1121F] rounded-full font-bold z-10 ring-2 ring-[#C1121F]/20 animate-pulse",
    eventDay:
      "bg-gradient-to-br from-[#003049] to-[#669BBC] text-white rounded-full hover:from-[#002437] hover:to-[#547fa8] transition-all duration-300 shadow-md transform hover:scale-110",
  };

  // Estilos personalizados para el DayPicker
  const dayPickerClassNames = {
    day: "h-12 w-12 text-center relative rounded-full hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 transition-all duration-300 cursor-pointer flex items-center justify-center font-medium",
    selected:
      "rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 text-white font-bold hover:from-blue-700 hover:to-cyan-700 shadow-lg transform scale-105",
    disabled: "text-gray-300 cursor-not-allowed",
    head_cell: "text-[#26335D] font-bold text-sm uppercase tracking-wider",
    caption: "text-[#26335D] font-bold mb-6 text-xl",
    today:
      "text-red-600 border-2 border-red-500 rounded-full bg-transparent font-bold animate-pulse",
  };

  // Al hacer click en un día, buscar si hay evento en ese día
  const handleDayClick = (day) => {
    const key = format(day, "yyyy-MM-dd");
    const event = eventMap.get(key);
    if (event) {
      setSelectedEvent(event);
    } else {
      setSelectedEvent(null);
    }
  };

  return (
    <div
      className="bg-gradient-to-br from-[#fdf6f4] via-[#f6f6f6] to-[#f4f9fb] py-12 px-4 sm:px-6 lg:px-8"
      id="calendar-section"
    >
      {/* Header mejorado */}
      <div className="text-center mb-12">
        <div className="inline-block">
          <h1 className="text-4xl md:text-6xl font-bold tracking-wide bg-gradient-to-r from-[#26335D] via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4 drop-shadow-sm">
            Calendario de Eventos
          </h1>
          <div className="h-1.5 w-48 bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-600 mx-auto rounded-full shadow-lg shadow-blue-500/30"></div>
        </div>
        <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
          Descubre y planifica tus próximos eventos académicos
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Calendario a la izquierda */}
          <div className="flex justify-center">
            <div className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500">
              <DayPicker
                mode="single"
                onDayClick={handleDayClick}
                modifiers={modifiers}
                modifiersClassNames={modifiersClassNames}
                showOutsideDays
              />

              {/* Leyenda del calendario */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full shadow-sm"></div>
                    <span className="text-gray-600 font-medium">Evento</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border-2 border-red-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-600 font-medium">Hoy</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-sm"></div>
                    <span className="text-gray-600 font-medium">Rango</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido adicional a la derecha */}
          <div className="space-y-8">
            {/* Próximos eventos */}
            <div className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 ml-4">
                  Próximos Eventos
                </h2>
              </div>

              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className="group relative bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 p-4 rounded-2xl border border-blue-200/50 hover:border-blue-300 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:shadow-lg"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                        {format(parseISO(event.date_Sat), "dd")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-800 group-hover:text-blue-700 transition-colors line-clamp-1">
                          {event.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {format(parseISO(event.date_Sat), "MMMM yyyy")}
                        </p>
                        {event.date_Eat &&
                          event.date_Eat !== event.date_Sat && (
                            <p className="text-xs text-blue-600 font-medium mt-1">
                              hasta{" "}
                              {format(parseISO(event.date_Eat), "dd MMMM yyyy")}
                            </p>
                          )}
                      </div>
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}

                {upcomingEvents.length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-500">No hay eventos próximos</p>
                  </div>
                )}
              </div>
            </div>

            {/* Contador regresivo */}
            {nextCountdown && (
              <div className="bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 p-8 rounded-3xl shadow-2xl text-white relative overflow-hidden">
                {/* Elementos decorativos */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>

                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                      <span className="text-2xl">⏳</span>
                    </div>
                    <h2 className="text-2xl font-bold ml-4">
                      Cuenta Regresiva
                    </h2>
                  </div>

                  <div className="text-center">
                    <div className="inline-block bg-white/20 backdrop-blur-sm rounded-3xl p-6 mb-4">
                      <div className="text-4xl font-bold mb-2">
                        {nextCountdown.daysLeft}
                      </div>
                      <div className="text-sm opacity-90 uppercase tracking-wider">
                        Días restantes
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-2">
                      {nextCountdown.title}
                    </h3>
                    <p className="text-blue-100 opacity-90">
                      {format(parseISO(nextCountdown.date_Sat), "dd MMMM yyyy")}
                      {nextCountdown.date_Eat &&
                        nextCountdown.date_Eat !== nextCountdown.date_Sat && (
                          <span>
                            {" "}
                            al{" "}
                            {format(
                              parseISO(nextCountdown.date_Eat),
                              "dd MMMM yyyy"
                            )}
                          </span>
                        )}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de evento seleccionado mejorado */}
      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50 p-4">
          <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl max-w-md w-full border border-white/50 transform transition-all duration-300 scale-100">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {selectedEvent.title}
              </h2>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <p className="text-gray-700 leading-relaxed">
                {selectedEvent.description}
              </p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-4 mb-6">
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-700">
                  <span className="font-semibold text-blue-700 mr-2">
                    Inicio:
                  </span>
                  {format(parseISO(selectedEvent.date_Sat), "dd MMMM yyyy")}
                </div>
                {selectedEvent.date_Eat &&
                  selectedEvent.date_Eat !== selectedEvent.date_Sat && (
                    <div className="flex items-center text-gray-700">
                      <span className="font-semibold text-blue-700 mr-2">
                        Fin:
                      </span>
                      {format(parseISO(selectedEvent.date_Eat), "dd MMMM yyyy")}
                    </div>
                  )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-2xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                onClick={() => setSelectedEvent(null)}
              >
                Cerrar
              </button>
              <button
                className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                onClick={() => {
                  const title = encodeURIComponent(selectedEvent.title);
                  const details = encodeURIComponent(selectedEvent.description);
                  const formatDate = (dateString) => {
                    const date = new Date(dateString);
                    return `${date.getUTCFullYear()}${(date.getUTCMonth() + 1)
                      .toString()
                      .padStart(2, "0")}${date
                      .getUTCDate()
                      .toString()
                      .padStart(2, "0")}T${date
                      .getUTCHours()
                      .toString()
                      .padStart(2, "0")}${date
                      .getUTCMinutes()
                      .toString()
                      .padStart(2, "0")}${date
                      .getUTCSeconds()
                      .toString()
                      .padStart(2, "0")}`;
                  };

                  const startDate = formatDate(selectedEvent.date_Sat);
                  const endDate = formatDate(selectedEvent.date_Eat);
                  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${startDate}/${endDate}`;
                  console.log("URL de Google Calendar:", googleCalendarUrl);
                  window.open(googleCalendarUrl, "_blank");
                }}
              >
                📅 Añadir al calendario
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
