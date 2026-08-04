// src/pages/reports/reportsData.js

export const placesReportData = [
  { id: 'PLC-001', name: 'Angkor Wat', category: 'Temple', province: 'Siem Reap', status: 'Active', rating: 4.9, reviews: 256, createdAt: '2025-01-15' },
  { id: 'PLC-002', name: 'Koh Ker Temple', category: 'Temple', province: 'Preah Vihear', status: 'Active', rating: 4.8, reviews: 124, createdAt: '2025-02-10' },
  { id: 'PLC-003', name: 'National Museum', category: 'Historical Site', province: 'Phnom Penh', status: 'Active', rating: 4.9, reviews: 89, createdAt: '2025-03-01' },
  { id: 'PLC-004', name: 'Royal Palace', category: 'Palace', province: 'Phnom Penh', status: 'Active', rating: 4.7, reviews: 98, createdAt: '2025-03-12' },
  { id: 'PLC-005', name: 'Bokor National Park', category: 'Nature', province: 'Kampot', status: 'Active', rating: 4.6, reviews: 78, createdAt: '2025-04-05' },
  { id: 'PLC-006', name: 'Preah Vihear Temple', category: 'Temple', province: 'Preah Vihear', status: 'Active', rating: 4.9, reviews: 142, createdAt: '2025-04-18' },
  { id: 'PLC-007', name: 'Banteay Srei', category: 'Temple', province: 'Siem Reap', status: 'Active', rating: 4.8, reviews: 110, createdAt: '2025-05-02' },
  { id: 'PLC-008', name: 'Otres Beach', category: 'Nature', province: 'Preah Sihanouk', status: 'Pending', rating: 4.4, reviews: 65, createdAt: '2025-06-11' }
];

export const eventsReportData = [
  { id: 'EVT-101', title: 'Cambodia Water Festival (Bon Om Touk)', location: 'Phnom Penh Riverside', startDate: '2026-11-14', endDate: '2026-11-16', status: 'Upcoming', attendees: 45000 },
  { id: 'EVT-102', title: 'Siem Reap Marathon 2026', location: 'Angkor Wat Complex', startDate: '2026-12-06', endDate: '2026-12-06', status: 'Upcoming', attendees: 8200 },
  { id: 'EVT-103', title: 'Khmer New Year Festival', location: 'Nationwide', startDate: '2026-04-14', endDate: '2026-04-16', status: 'Completed', attendees: 120000 },
  { id: 'EVT-104', title: 'Kampot Pepper & Food Expo', location: 'Kampot Center', startDate: '2026-09-20', endDate: '2026-09-22', status: 'Scheduled', attendees: 3500 },
  { id: 'EVT-105', title: 'Sea Festival Sihanoukville', location: 'Ochheuteal Beach', startDate: '2026-12-25', endDate: '2026-12-27', status: 'Scheduled', attendees: 15000 }
];

export const usersReportData = [
  { id: 'USR-501', name: 'Bunheng Ton', email: 'bunheng@email.com', role: 'Super Admin', status: 'Active', joinedDate: '2024-11-01', reviewsCount: 42 },
  { id: 'USR-502', name: 'Sophea Chan', email: 'sophea.chan@tourism.gov.kh', role: 'Admin', status: 'Active', joinedDate: '2025-01-10', reviewsCount: 19 },
  { id: 'USR-503', name: 'Michael Smith', email: 'msmith@travel.com', role: 'Guide / Editor', status: 'Active', joinedDate: '2025-02-14', reviewsCount: 31 },
  { id: 'USR-504', name: 'Dara Kim', email: 'dara.kim@gmail.com', role: 'User', status: 'Active', joinedDate: '2025-03-22', reviewsCount: 8 },
  { id: 'USR-505', name: 'Elena Rostova', email: 'elena.r@tourist.org', role: 'User', status: 'Suspended', joinedDate: '2025-05-09', reviewsCount: 3 }
];

export const reviewsReportData = [
  { id: 'REV-801', userName: 'Dara Kim', placeName: 'Angkor Wat', rating: 5, comment: 'Breathtaking sunrise views! Highly recommended tour guide.', date: '2026-07-28', status: 'Approved' },
  { id: 'REV-802', userName: 'Michael Smith', placeName: 'Koh Ker Temple', rating: 5, comment: 'Pyramid temple is impressive and less crowded.', date: '2026-07-25', status: 'Approved' },
  { id: 'REV-803', userName: 'Elena Rostova', placeName: 'Royal Palace', rating: 4, comment: 'Stunning architecture. Remember to wear appropriate clothes.', date: '2026-07-20', status: 'Approved' },
  { id: 'REV-804', userName: 'Sophea Chan', placeName: 'Otres Beach', rating: 3, comment: 'Decent beach area, could use cleaner walking paths.', date: '2026-07-15', status: 'Flagged' }
];

export const categoriesReportData = [
  { id: 'CAT-01', name: 'Temple', totalPlaces: 45, status: 'Active', description: 'Ancient Khmers religious temples and historical ruins' },
  { id: 'CAT-02', name: 'Historical Site', totalPlaces: 28, status: 'Active', description: 'Museums, monuments, and historical landmarks' },
  { id: 'CAT-03', name: 'Nature & Wildlife', totalPlaces: 34, status: 'Active', description: 'National parks, waterfalls, mountains, and wildlife reserves' },
  { id: 'CAT-04', name: 'Palace', totalPlaces: 12, status: 'Active', description: 'Royal residences and official state palaces' },
  { id: 'CAT-05', name: 'Beach & Island', totalPlaces: 22, status: 'Active', description: 'Coastal beaches and island resorts' }
];
