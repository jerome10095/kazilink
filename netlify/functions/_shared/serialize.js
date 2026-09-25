export function serializeAccount(profileRow, roleRow) {
  const account = {
    id: profileRow.id,
    fullName: profileRow.full_name,
    email: profileRow.email,
    role: profileRow.role,
    phone: profileRow.phone,
    avatarUrl: profileRow.profile_image,
    createdAt: profileRow.created_at,
  };

  if (profileRow.role === 'worker' && roleRow) {
    account.worker = serializeWorkerProfile(roleRow);
  }
  if (profileRow.role === 'employer' && roleRow) {
    account.employer = serializeEmployerProfile(roleRow);
  }

  return account;
}

export function serializeWorkerProfile(row) {
  return {
    serviceId: row.service_id ?? null,
    trade: row.trade,
    tradeRw: row.trade_rw,
    bio: row.bio,
    bioRw: row.bio_rw,
    location: row.location,
    experienceYears: row.experience_years,
    rate: Number(row.rate),
    rating: Number(row.rating),
    reviewCount: row.review_count,
    verified: row.verified,
    available: row.available,
    skills: row.skills ?? [],
  };
}

export function serializeEmployerProfile(row) {
  return {
    companyName: row.company_name,
    companyDescription: row.company_description,
    industry: row.industry,
    location: row.location,
    website: row.website,
    verified: row.verified,
  };
}

export function serializeWorkerListing(row) {
  return {
    id: row.id,
    name: row.name,
    avatarUrl: row.avatar_url ?? null,
    trade: row.trade,
    tradeRw: row.trade_rw,
    rating: Number(row.rating),
    reviewCount: row.review_count,
    location: row.location,
    experience: row.experience_years,
    verified: row.verified,
    available: row.available,
    rate: Number(row.rate),
    bio: row.bio,
    bioRw: row.bio_rw,
    skills: row.skills ?? [],
  };
}

export function serializeService(row, workers = 0) {
  return {
    id: row.id,
    title: row.title,
    titleRw: row.title_rw,
    description: row.description,
    descriptionRw: row.description_rw,
    icon: row.icon,
    color: row.color,
    workers,
  };
}

// Shapes a hire request for whoever is viewing it. `counterpart` is the other
// party; their email/phone are only revealed once the worker has accepted.
export function serializeHireRequest(row, viewerRole) {
  const isEmployerView = viewerRole === 'employer';
  const other = isEmployerView ? row.worker_profiles : row.employer_profiles;
  const otherUser = other?.users;
  const accepted = row.status === 'accepted';

  return {
    id: row.id,
    jobTitle: row.job_title,
    message: row.message,
    proposedRate: row.proposed_rate === null ? null : Number(row.proposed_rate),
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    counterpart: {
      id: other?.id ?? null,
      name: otherUser?.full_name ?? '',
      avatarUrl: otherUser?.profile_image ?? null,
      title: isEmployerView ? other?.trade ?? null : other?.company_name ?? null,
      titleRw: isEmployerView ? other?.trade_rw ?? null : null,
      email: accepted ? otherUser?.email ?? null : null,
      phone: accepted ? otherUser?.phone ?? null : null,
    },
  };
}

export function serializeReview(row, companyName, workerRow) {
  return {
    id: row.id,
    rating: row.rating,
    comment: row.comment,
    createdAt: row.created_at,
    reviewer: {
      name: row.reviewer?.full_name ?? '',
      avatarUrl: row.reviewer?.profile_image ?? null,
      company: companyName ?? null,
    },
    worker: workerRow
      ? {
          id: workerRow.id,
          name: workerRow.users?.full_name ?? '',
          trade: workerRow.trade,
          tradeRw: workerRow.trade_rw,
        }
      : null,
  };
}

export function serializeTraining(row, enrolledCount = 0, enrolled = false) {
  return {
    id: row.id,
    title: row.title,
    titleRw: row.title_rw,
    description: row.description,
    descriptionRw: row.description_rw,
    instructor: row.instructor,
    category: row.category,
    durationHours: row.duration_hours === null ? null : Number(row.duration_hours),
    location: row.location,
    online: row.online,
    capacity: row.capacity,
    startDate: row.start_date,
    endDate: row.end_date,
    status: row.status,
    enrolledCount,
    enrolled,
  };
}
