'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { tripsApi, activitiesApi } from '@/lib/api';
import PageWrapper from '@/components/PageWrapper';
import { 
  Calendar, MapPin, PlusCircle, Trash2, 
  ArrowLeft, Clock, GripVertical, Info, 
  Clock3, Trash, Sparkles, Navigation, Share2
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
    if (!data || !newActivity.title.trim()) {
      return;
    }
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

    const updatedStops = [...data.stops];
    updatedStops[activeStopIndex].activities = items;
    setData({ ...data, stops: updatedStops });

    const reorderPayload = items.map((item: any, index: number) => ({
      id: item._id,
      orderIndex: index
    }));
    await activitiesApi.reorder(reorderPayload);
  };

  if (loading) return (
    <PageWrapper>
      <div className="absolute inset-0 bg-black/90 pointer-events-none" />
      <div className="animate-pulse space-y-12 max-w-[1200px] mx-auto pt-20">
        <div className="h-20 bg-white/5 rounded-[40px] w-full" />
        <div className="h-[500px] bg-white/5 rounded-[48px] w-full" />
      </div>
    </PageWrapper>
  );

  if (!data) return <PageWrapper><div className="text-white text-center py-20 font-display text-4xl">Chronicle Entry Not Found</div></PageWrapper>;

  const currentStop = data.stops[activeStopIndex];

  return (
    <PageWrapper>
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-tl-[40px]">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.85] scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=2000')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/40 to-black/90" />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10 text-white min-h-[calc(100vh-4rem)] pt-8 pb-20 animate-fadeIn">
        
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <div className="space-y-4">
            <Link href={`/trips/${id}`} className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-primary transition-all group mb-4">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" /> Back to Chronicle
            </Link>
            <div className="flex items-center gap-3 text-primary uppercase tracking-[0.4em] text-[10px] font-black">
              <div className="w-8 h-[2px] bg-primary" />
              Itinerary Engine
            </div>
            <h1 className="font-display text-7xl md:text-8xl text-white tracking-tighter leading-[0.8]">
              Daily <span className="text-primary italic">Circuit</span>
            </h1>
            <p className="text-white/40 mt-6 text-xl font-light italic flex items-center gap-3">
              <Navigation className="w-5 h-5 text-terracotta" /> {data.trip.title} • {data.stops.length} Mapped Destinations
            </p>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => window.print()}
              className="bg-white/5 hover:bg-white/10 text-white px-8 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-4 border border-white/10 transition-all hover:scale-105 active:scale-95 group"
            >
              <Share2 className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" /> 
              Export Manifest
            </button>
            <button 
              onClick={() => setShowAddActivity(!showAddActivity)}
              className="bg-terracotta hover:bg-terracotta-hover text-white px-10 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-4 shadow-2xl shadow-terracotta/30 transition-all hover:scale-105 active:scale-95 group"
            >
              <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" /> 
              Inject Activity
            </button>
          </div>
        </div>

        {/* Destination Selector Tabs */}
        <div className="flex gap-4 overflow-x-auto pb-10 mb-10 no-scrollbar">
          {data.stops.map((stop, idx) => (
            <button
              key={stop._id}
              onClick={() => setActiveStopIndex(idx)}
              className={`px-8 py-5 rounded-[24px] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border
                ${activeStopIndex === idx 
                  ? 'bg-primary border-primary text-white shadow-2xl shadow-primary/30 scale-105 z-10' 
                  : 'bg-white/5 border-white/10 text-white/30 hover:border-white/30'}`}
            >
              Day {idx + 1}: {stop.cityName}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Main List */}
          <div className="lg:col-span-2 space-y-8">
            {showAddActivity && (
              <form onSubmit={handleAddActivity} className="bg-white/5 backdrop-blur-3xl border border-primary/30 rounded-[40px] p-10 shadow-2xl animate-fadeIn relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32" />
                <h2 className="font-display text-3xl text-white mb-8 italic relative z-10">Activity Parameters</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 relative z-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Description</label>
                    <input type="text" placeholder="e.g. Heritage walk through Hampi" value={newActivity.title}
                      onChange={(e) => setNewActivity(p => ({ ...p, title: e.target.value }))}
                      className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-primary/50 outline-none transition-all text-sm font-medium" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Category</label>
                    <select value={newActivity.type} onChange={(e) => setNewActivity(p => ({ ...p, type: e.target.value }))}
                      className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-primary/50 outline-none transition-all text-sm font-medium appearance-none">
                      <option className="bg-neutral-900">Sightseeing</option>
                      <option className="bg-neutral-900">Transport</option>
                      <option className="bg-neutral-900">Dining</option>
                      <option className="bg-neutral-900">Adventure</option>
                      <option className="bg-neutral-900">Rest</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Duration <span className="text-white/10">(Mins)</span></label>
                    <input type="number" placeholder="Duration (mins)" value={newActivity.duration}
                      onChange={(e) => setNewActivity(p => ({ ...p, duration: e.target.value }))}
                      className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-primary/50 outline-none transition-all text-sm font-medium" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Expedition Cost <span className="text-white/10">(₹)</span></label>
                    <input type="number" placeholder="Est. Cost (₹)" value={newActivity.cost}
                      onChange={(e) => setNewActivity(p => ({ ...p, cost: e.target.value }))}
                      className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-primary/50 outline-none transition-all text-sm font-medium" />
                  </div>
                </div>
                <div className="flex gap-6 relative z-10">
                  <button type="submit" className="bg-primary text-white px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">Save Activity</button>
                  <button type="button" onClick={() => setShowAddActivity(false)} className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white">Cancel</button>
                </div>
              </form>
            )}

            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="activities">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-6">
                    {!currentStop || currentStop.activities?.length === 0 ? (
                      <div className="text-center py-40 bg-white/5 backdrop-blur-3xl rounded-[48px] border border-dashed border-white/10 group">
                        <Sparkles className="w-20 h-20 text-white/10 mx-auto mb-8 group-hover:text-primary transition-all duration-1000" />
                        <h3 className="font-display text-4xl text-white mb-4 italic">Uncharted Territory</h3>
                        <p className="text-white/40 text-lg font-light">Add activities to map this destination's soul.</p>
                      </div>
                    ) : (
                      currentStop.activities?.map((activity: any, index: number) => (
                        <Draggable key={activity._id} draggableId={activity._id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`flex items-center gap-8 p-8 bg-white/5 backdrop-blur-3xl rounded-[32px] border transition-all group
                                ${snapshot.isDragging ? 'shadow-2xl border-primary/60 rotate-1 z-50 bg-white/10' : 'border-white/10 hover:border-primary/40 hover:bg-white/10'}`}
                            >
                              <div {...provided.dragHandleProps} className="text-white/10 group-hover:text-primary transition-colors cursor-grab active:cursor-grabbing">
                                <GripVertical className="w-6 h-6" />
                              </div>
                              
                              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl shrink-0 shadow-xl group-hover:scale-110 transition-all">
                                {getActivityIcon(activity.type)}
                              </div>
                              
                              <div className="flex-1">
                                <h4 className="font-display text-2xl text-white mb-2 italic group-hover:text-primary transition-colors">{activity.title}</h4>
                                <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-white/30">
                                  <span className="flex items-center gap-2"><Clock3 className="w-4 h-4 text-primary" /> {activity.duration}m</span>
                                  <span className="w-1.5 h-1.5 bg-white/10 rounded-full" />
                                  <span className="text-terracotta">{activity.type}</span>
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <p className="font-display text-2xl text-white leading-none mb-1">₹{activity.cost}</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Projected</p>
                              </div>
                              
                              <button 
                                onClick={() => handleDeleteActivity(activity._id)}
                                className="p-4 bg-white/5 rounded-2xl border border-white/10 text-white/20 hover:text-red-500 hover:bg-red-500/10 transition-all"
                              >
                                <Trash className="w-5 h-5" />
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

          {/* Logistics Sidebar */}
          <div className="space-y-8 animate-fadeInSlideUp">
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[40px] p-10 shadow-2xl">
              <h3 className="font-display text-3xl text-white mb-8 italic">Day Summary</h3>
              <div className="space-y-6">
                <SummaryItem icon={Clock} label="Total Duration" value={`${currentStop?.activities?.reduce((acc: number, a: any) => acc + a.duration, 0) || 0} mins`} />
                <SummaryItem icon={Sparkles} label="Budget Impact" value={`₹${currentStop?.activities?.reduce((acc: number, a: any) => acc + a.cost, 0) || 0}`} color="text-primary" />
                <SummaryItem icon={MapPin} label="Destination" value={currentStop?.cityName} />
              </div>
            </div>
            
            <div className="bg-terracotta rounded-[40px] p-10 shadow-2xl shadow-terracotta/20 relative overflow-hidden group">
              <Info className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10 group-hover:rotate-12 transition-transform duration-700" />
              <div className="relative z-10 space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Logistics Pro-Tip</h4>
                <p className="text-white font-light leading-relaxed italic">"Optimal heritage routes in {currentStop?.cityName} are best explored between 07:00 and 11:00 to avoid high-intensity thermal cycles."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

function SummaryItem({ icon: Icon, label, value, color = "text-white" }: any) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-white/10 last:border-0">
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4 text-white/30" />
        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{label}</span>
      </div>
      <span className={`text-sm font-bold ${color}`}>{value}</span>
    </div>
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
