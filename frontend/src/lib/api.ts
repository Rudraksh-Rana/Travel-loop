const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Lightweight in-memory cache for GET requests
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 30000; // 30 seconds for travel data freshness

function getAuthHeaders(): HeadersInit {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('traveloop_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const method = options.method || 'GET';
  const isGet = method === 'GET';

  // Check cache for GET requests
  if (isGet && cache.has(path)) {
    const entry = cache.get(path)!;
    if (Date.now() - entry.timestamp < CACHE_TTL) {
      return entry.data as T;
    }
    cache.delete(path); // Expired
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
      ...options.headers,
    },
  });

  if (!res.ok) {
    if (res.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('traveloop_token');
    }
    const error = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${res.status}`);
  }

  const data = await res.json();

  // Save to cache if it's a GET request
  if (isGet) {
    cache.set(path, { data, timestamp: Date.now() });
  }

  return data;
}

// ── Auth ───────────────────────────────────────────────
export const authApi = {
  login: (email: string, password: string) =>
    apiFetch<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (data: {
    name: string; email: string; password: string;
    phone?: string; city?: string; country?: string;
  }) =>
    apiFetch<{ token: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  me: () => apiFetch<any>('/auth/me'),
};

// ── Users ──────────────────────────────────────────────
export const usersApi = {
  get: (id: string) => apiFetch<any>(`/users/${id}`),
  update: (id: string, data: any) =>
    apiFetch<any>(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
};

// ── Trips ──────────────────────────────────────────────
export const tripsApi = {
  list: () => apiFetch<any[]>('/trips'),
  get: (id: string) => apiFetch<{ trip: any; stops: any[] }>(`/trips/${id}`),
  getPublic: (id: string) => apiFetch<{ trip: any; stops: any[] }>(`/trips/public/${id}`),
  create: (data: any) =>
    apiFetch<any>('/trips', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) =>
    apiFetch<any>(`/trips/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) =>
    apiFetch<any>(`/trips/${id}`, { method: 'DELETE' }),
  addStop: (tripId: string, data: any) =>
    apiFetch<any>(`/trips/${tripId}/stops`, { method: 'POST', body: JSON.stringify(data) }),
  updateStop: (stopId: string, data: any) =>
    apiFetch<any>(`/trips/stops/${stopId}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteStop: (stopId: string) =>
    apiFetch<any>(`/trips/stops/${stopId}`, { method: 'DELETE' }),
};

// ── Activities ─────────────────────────────────────────
export const activitiesApi = {
  list: (stopId: string) => apiFetch<any[]>(`/stops/${stopId}/activities`),
  create: (stopId: string, data: any) =>
    apiFetch<any>(`/stops/${stopId}/activities`, { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) =>
    apiFetch<any>(`/stops/activities/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) =>
    apiFetch<any>(`/stops/activities/${id}`, { method: 'DELETE' }),
  reorder: (activities: { id: string; orderIndex: number }[]) =>
    apiFetch<any>(`/stops/activities/reorder`, { 
      method: 'PUT', 
      body: JSON.stringify({ activities }) 
    }),
};

// ── Notes ──────────────────────────────────────────────
export const notesApi = {
  listAll: () => apiFetch<any[]>('/notes/all'),
  list: (tripId: string) => apiFetch<any[]>(`/notes/trip/${tripId}`),
  create: (data: any) =>
    apiFetch<any>('/notes', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) =>
    apiFetch<any>(`/notes/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) =>
    apiFetch<any>(`/notes/${id}`, { method: 'DELETE' }),
};

// ── Budget ─────────────────────────────────────────────
export const budgetApi = {
  list: (tripId: string) => apiFetch<any[]>(`/budget/trip/${tripId}`),
  create: (data: any) =>
    apiFetch<any>('/budget', { method: 'POST', body: JSON.stringify(data) }),
  delete: (id: string) =>
    apiFetch<any>(`/budget/${id}`, { method: 'DELETE' }),
};

// ── Checklist ──────────────────────────────────────────
export const checklistApi = {
  list: (tripId: string) => apiFetch<any[]>(`/checklist/trip/${tripId}`),
  create: (data: any) =>
    apiFetch<any>('/checklist', { method: 'POST', body: JSON.stringify(data) }),
  toggle: (id: string, data: any) =>
    apiFetch<any>(`/checklist/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: string) =>
    apiFetch<any>(`/checklist/${id}`, { method: 'DELETE' }),
};

// ── Community ──────────────────────────────────────────
export const communityApi = {
  list: () => apiFetch<any[]>('/community'),
  create: (data: any) =>
    apiFetch<any>('/community', { method: 'POST', body: JSON.stringify(data) }),
  like: (id: string) =>
    apiFetch<any>(`/community/${id}/like`, { method: 'POST' }),
};

// ── Explore ────────────────────────────────────────────
export const exploreApi = {
  searchDestinations: (query: string) =>
    apiFetch<any[]>(`/explore/destinations?q=${encodeURIComponent(query)}`),
  searchActivities: (query: string) =>
    apiFetch<any[]>(`/explore/activities?q=${encodeURIComponent(query)}`),
};

// ── AI Concierge ───────────────────────────────────────
export const aiApi = {
  query: (prompt: string) =>
    apiFetch<any>('/ai/query', { method: 'POST', body: JSON.stringify({ prompt }) }),
};
