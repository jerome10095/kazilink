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

export function serializeService(row) {
  return {
    id: row.id,
    title: row.title,
    titleRw: row.title_rw,
    description: row.description,
    descriptionRw: row.description_rw,
    icon: row.icon,
    color: row.color,
    workers: row.worker_count,
  };
}
