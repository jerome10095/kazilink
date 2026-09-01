const API_BASE = '/api';

function toQuery(params) {
  if (!params) return '';
  const entries = Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== '');
  if (entries.length === 0) return '';
  return `?${new URLSearchParams(entries).toString()}`;
}

async function request(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error || 'Something went wrong');
    error.status = response.status;
    throw error;
  }
  return data;
}

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const [, base64] = String(reader.result).split(',');
      resolve(base64);
    };
    reader.onerror = () => reject(new Error('Could not read the selected file'));
    reader.readAsDataURL(file);
  });
}

export const api = {
  getMe: (token) => request('/users/me', { token }),
  updateMe: (payload, token) => request('/users/me', { method: 'PUT', body: payload, token }),
  completeProfile: (payload, token) => request('/auth/complete-profile', { method: 'POST', body: payload, token }),
  getWorkers: (params) => request(`/workers${toQuery(params)}`),
  getWorker: (id) => request(`/workers/${id}`),
  getServices: () => request('/services'),
  sendContactMessage: (payload) => request('/contact', { method: 'POST', body: payload }),
  uploadAvatar: async (file, token) => {
    const dataBase64 = await readFileAsBase64(file);
    return request('/upload/avatar', {
      method: 'POST',
      body: { contentType: file.type, dataBase64 },
      token,
    });
  },
};
