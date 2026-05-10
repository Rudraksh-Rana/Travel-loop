'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { tripsApi, activitiesApi } from '@/lib/api';
import PageWrapper from '@/components/PageWrapper';
import { 
  Calendar, MapPin, PlusCircle, Trash2, 
  ArrowLeft, Clock, GripVertical, Info, 
  Clock3, Trash
} from 'lucide-react';
import Link from 'next/link';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export default function ItineraryPage() {
  const { id } = useParams();
  const [data, setData] = useState<{ trip: any; stops: any[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeStopIndex, setActiveStopIndex] = useState(0);
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [newActivity, setNewActivity] = useState({ title: '', type: 'Sightseeing', duration: '60', cost: '0' });

  useEffect(() => {
    if (id) {
      tripsApi.get(id as string)
        .then(setData)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id]);

  async function handleAddActivity(e: React.FormEvent) {
    e.preventDefault();
    if (!data) return;
    const stop = data.stops[activeStopIndex];
    const activity = await activitiesApi.create(stop._id, {
      ...newActivity,
      duration: parseInt(newActivity.duration),
      cost: parseFloat(newActivity.cost)
    });

    const updatedStops = [...data.stops];
    updatedStops[activeStopIndex].activities = [...(updatedStops[activeStopIndex].activities || []), activity];
    setData({ ...data, stops: updatedStops });
    setNewActivity({ title: '', type: 'Sightseeing', duration: '60', cost: '0' });
    setShowAddActivity(false);
  }

  async function handleDeleteActivity(activityId: string) {
    if (!confirm('Remove this activity?')) return;
    await activitiesApi.delete(activityId);
    const updatedStops = [...data!.stops];
    updatedStops[activeStopIndex].activities = updatedStops[activeStopIndex].activities.filter((a: any) => a._id !== activityId);
    setData({ ...data!, stops: updatedStops });
  }

  const onDragEnd = async (result: any) => {
    if (!result.destination || !data) return;

    const stop = data.stops[activeStopIndex];
    const items = Array.from(stop.activities || []);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update local state immediately
    const updatedStops = [...data.stops];
    updatedStops[activeStopIndex].activities = items;
    setData({ ...data, stops: updatedStops });

    // Sync with backend
    const reorderPayload = items.map((item: any, index: number) => ({
      id: item._id,
      orderIndex: index
    }));
    await activitiesApi.reorder(reorderPayload);
  };

  if (loading) return <PageWrapper><div className="animate-pulse space-y-4"><div className="h-12 bg-surface rounded-xl w-64" /><div className="h-64 bg-surface rounded-3xl" /></div></PageWrapper>;
  if (!data) return <PageWrapper><div>Not found</div></PageWrapper>;

  const currentStop = data.stops[activeStopIndex];

  return (
    <PageWrapper>
      <div className="max-w-[1000px] mx-auto">
        <Link href={`/trips/${id}`} className="flex items-center gap-1 text-sm text-text-muted hover:text-primary transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Overview
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-4xl text-text mb-2">Detailed Itinerary</h1>
            <p className="text-text-muted text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4" /> {data.trip.title} • {data.stops.length} Days
            </p>
          </div>
        </div>

        {/* Day Selector */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {data.stops.map((stop, idx) => (
            <button
              key={stop._id}
              onClick={() => setActiveStopIndex(idx)}
              className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap
                ${activeStopIndex === idx 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' 
                  : 'bg-surface border border-divider text-text-muted hover:border-primary/30'}`}
            >
              Day {idx + 1}: {stop.cityName}
            </button>
          ))}
        </div>

        {currentStop ? (
          <div className="animate-fadeIn">
            <div className="bg-surface rounded-3xl border border-divider p-8 mb-8 relative overflow-hidden">
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div>
                  <h2 className="font-display text-3xl text-text mb-1">{currentStop.cityName}</h2>
                  <p className="text-xs font-bold text-primary uppercase tracking-widest">
                    {new Date(currentStop.arrivalDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}
                  </p>
                </div>
                <button 
                  onClick={() => setShowAddActivity(true)}
                  className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-primary/20 hover:bg-primary-hover transition-all"
                >
                  <PlusCircle className="w-4 h-4" /> Add Activity
                </button>
              </div>

              {showAddActivity && (
                <form onSubmit={handleAddActivity} className="bg-white rounded-2xl border border-primary/20 p-6 mb-8 shadow-lg animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input type="text" placeholder="Activity title (e.g. Visit Amber Fort)" value={newActivity.title}
                      onChange={(e) => setNewActivity(p => ({ ...p, title: e.target.value }))}
                      className="px-4 py-3 bg-surface-2 border border-divider rounded-xl text-sm" />
                    <select value={newActivity.type} onChange={(e) => setNewActivity(p => ({ ...p, type: e.target.value }))}
                      className="px-4 py-3 bg-surface-2 border border-divider rounded-xl text-sm">
                      <option>Sightseeing</option>
                      <option>Transport</option>
                      <option>Dining</option>
                      <option>Adventure</option>
                      <option>Rest</option>
                    </select>
                    <input type="number" placeholder="Duration (mins)" value={newActivity.duration}
                      onChange={(e) => setNewActivity(p => ({ ...p, duration: e.target.value }))}
                      className="px-4 py-3 bg-surface-2 border border-divider rounded-xl text-sm" />
                    <input type="number" placeholder="Est. Cost (₹)" value={newActivity.cost}
                      onChange={(e) => setNewActivity(p => ({ ...p, cost: e.target.value }))}
                      className="px-4 py-3 bg-surface-2 border border-divider rounded-xl text-sm" />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="bg-primary text-white px-6 py-2 rounded-xl text-sm font-bold">Save Activity</button>
                    <button type="button" onClick={() => setShowAddActivity(false)} className="px-6 py-2 text-sm text-text-muted">Cancel</button>
                  </div>
                </form>
              )}

              {/* Drag and Drop Activities */}
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="activities">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                      {currentStop.activities?.length === 0 ? (
                        <div className="text-center py-12 bg-white/50 rounded-2xl border border-dashed border-divider">
                          <Info className="w-8 h-8 text-divider mx-auto mb-2" />
                          <p className="text-text-muted text-sm">No activities planned for this day.</p>
                        </div>
                      ) : (
                        currentStop.activities?.map((activity: any, index: number) => (
                          <Draggable key={activity._id} draggableId={activity._id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className={`flex items-center gap-4 p-5 bg-white rounded-2xl border transition-all
                                  ${snapshot.isDragging ? 'shadow-2xl border-primary/40 rotate-1' : 'border-divider hover:border-primary/20'}`}
                              >
                                <div {...provided.dragHandleProps} className="text-text-faint hover:text-primary transition-colors cursor-grab active:cursor-grabbing">
                                  <GripVertical className="w-5 h-5" />
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-surface-2 flex items-center justify-center text-2xl shrink-0">
                                  {getActivityIcon(activity.type)}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-bold text-text mb-0.5">{activity.title}</h4>
                                  <div className="flex items-center gap-3 text-xs text-text-muted">
                                    <span className="flex items-center gap-1 uppercase tracking-wider font-bold text-[10px]"><Clock3 className="w-3 h-3" /> {activity.duration}m</span>
                                    <span className="w-1 h-1 bg-divider rounded-full" />
                                    <span className="uppercase tracking-wider font-bold text-[10px] text-primary">{activity.type}</span>
                                  </div>
                                </div>
                                <div className="text-right mr-4">
                                  <p className="text-sm font-bold text-text">₹{activity.cost}</p>
                                </div>
                                <button 
                                  onClick={() => handleDeleteActivity(activity._id)}
                                  className="p-2 text-text-faint hover:text-red-500 transition-colors"
                                >
                                  <Trash className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </Draggable>
                        ))
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-surface rounded-3xl border border-divider">
            <p className="text-text-muted italic">Add stops to your trip to start planning daily activities.</p>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

function getActivityIcon(type: string) {
  switch (type.toLowerCase()) {
    case 'sightseeing': return '🏛️';
    case 'transport': return '🚕';
    case 'dining': return '🍽️';
    case 'adventure': return '🧗';
    case 'rest': return '🏨';
    default: return '📍';
  }
}
