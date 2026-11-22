'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { AppShell } from '@/components/layouts/AppShell';
import { PageHeader } from '@/components/common/PageHeader';
import { useApp } from '@/lib/context/AppContext';
import { formatDate, cn } from '@/lib/utils';

const DAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const MONTHS = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

const eventTypeConfig = {
  class: { label: 'Kuliah', color: '#302A91' },
  exam: { label: 'Ujian', color: '#ef4444' },
  deadline: { label: 'Deadline', color: '#f59e0b' },
  event: { label: 'Acara', color: '#22c55e' },
  meeting: { label: 'Rapat', color: '#3b82f6' },
};

export default function CalendarPage() {
  const { state } = useApp();
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(today);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const prevMonth = () => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return state.events.filter(e => e.date.startsWith(dateStr));
  };

  const selectedEvents = useMemo(() => {
    const sel = selectedDate;
    const dateStr = `${sel.getFullYear()}-${String(sel.getMonth() + 1).padStart(2, '0')}-${String(sel.getDate()).padStart(2, '0')}`;
    return state.events.filter(e => e.date.startsWith(dateStr));
  }, [selectedDate, state.events]);

  const isToday = (day: number) => {
    return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
  };

  const isSelected = (day: number) => {
    return selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
  };

  return (
    <AppShell>
      <div className="min-h-screen bg-light-bg">
        <PageHeader title="Kalender" subtitle="Jadwal dan deadline akademik" showNotification />

        <div className="px-4 py-4 lg:px-6 space-y-4">
          {/* Calendar Card */}
          <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
            {/* Month Header */}
            <div className="flex items-center justify-between px-4 pt-4 pb-3">
              <button onClick={prevMonth} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted transition-colors">
                <ChevronLeft size={18} />
              </button>
              <h2 className="text-base font-bold text-foreground font-heading">
                {MONTHS[month]} {year}
              </h2>
              <button onClick={nextMonth} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Day Labels */}
            <div className="grid grid-cols-7 px-2 pb-1">
              {DAYS.map(d => (
                <div key={d} className={cn('py-1 text-center text-xs font-semibold', d === 'Min' ? 'text-red-500' : 'text-muted-foreground')}>
                  {d}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 px-2 pb-4">
              {/* Empty cells for first day */}
              {Array.from({ length: firstDayOfMonth }, (_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {/* Day cells */}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const dayEvents = getEventsForDay(day);
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(new Date(year, month, day))}
                    className={cn(
                      'relative flex flex-col items-center py-1.5 rounded-xl transition-all duration-200',
                      isSelected(day) ? 'text-white' : isToday(day) ? 'font-bold text-royal-indigo' : 'text-foreground hover:bg-muted'
                    )}
                    style={isSelected(day) ? { background: 'linear-gradient(135deg, #302A91, #171747)' } : {}}
                  >
                    <span className="text-sm">{day}</span>
                    {dayEvents.length > 0 && (
                      <div className="flex gap-0.5 mt-0.5">
                        {dayEvents.slice(0, 3).map((e, i) => (
                          <div key={i} className="h-1 w-1 rounded-full"
                            style={{ background: isSelected(day) ? 'rgba(255,255,255,0.7)' : (eventTypeConfig[e.type as keyof typeof eventTypeConfig]?.color ?? '#6b7280') }} />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3">
            {Object.entries(eventTypeConfig).map(([type, { label, color }]) => (
              <div key={type} className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full" style={{ background: color }} />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>

          {/* Selected Day Events */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-foreground font-heading">
                {selectedDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
              </h3>
            </div>

            {selectedEvents.length === 0 ? (
              <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
                <p className="text-sm text-muted-foreground">Tidak ada jadwal pada hari ini</p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedEvents.map(event => {
                  const config = eventTypeConfig[event.type as keyof typeof eventTypeConfig];
                  return (
                    <Link key={event.id} href={`/events/${event.id}`}
                      className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition-all duration-200">
                      <div className="mt-0.5 w-1 self-stretch rounded-full" style={{ background: config?.color ?? '#6b7280' }} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-semibold text-foreground">{event.title}</h4>
                          <span className="text-xs rounded-full px-2 py-0.5 shrink-0"
                            style={{ background: `${config?.color}20`, color: config?.color }}>
                            {config?.label}
                          </span>
                        </div>
                        {event.startTime && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {event.startTime}{event.endTime ? ` – ${event.endTime}` : ''}
                          </p>
                        )}
                        {event.location && (
                          <p className="text-xs text-muted-foreground">{event.location}</p>
                        )}
                        {event.description && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{event.description}</p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
