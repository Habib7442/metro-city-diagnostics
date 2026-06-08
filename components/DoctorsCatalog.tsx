'use client';

import { useState, useMemo } from 'react';
import DoctorCard from './DoctorCard';
import { Search, Stethoscope } from 'lucide-react';

interface DoctorEntry {
  id: string;
  hospital: {
    name: string;
    tagline: string;
  };
  doctor: {
    name: string;
    qualification: string[];
    designation: string;
    hospital_affiliation?: string;
    specialization: string;
    image?: string;
  };
  location: {
    address: string;
    pin_code: string;
    city: string;
    state: string;
  };
  contact: {
    phone_numbers: string[];
    whatsapp_number: string;
  };
  timing: {
    days: string;
    time: string;
    appointment_required: boolean;
  };
  fees?: number | string | null;
  highlights?: {
    title: string;
    value: string;
  }[];
  description?: {
    english?: string;
    bengali?: string[];
  };
}

interface DoctorsCatalogProps {
  doctors: DoctorEntry[];
}

const CATEGORIES = [
  { id: 'all', label: 'All Specialities' },
  { id: 'medicine', label: 'Medicine & Diabetology', specs: ['General Physician', 'Medicine & Diabetology', 'General Medicine', 'Medicine & Diabetologist', 'Internal Medicine Specialist'] },
  { id: 'neurosurgery', label: 'Neurology & Neurosurgery', specs: ['Neurosurgery', 'Neurology'] },
  { id: 'urology', label: 'Urology', specs: ['Urology'] },
  { id: 'pulmonology', label: 'Pulmonology', specs: ['Pulmonology'] },
  { id: 'surgery', label: 'Surgery', specs: ['General & Laparoscopic Surgery'] },
  { id: 'gynaecology', label: 'Gynaecology & IVF', specs: ['Obstetrics & Gynecology', 'IVF & Infertility Treatment', 'Superspeciality in Reproductive Medicine'] },
  { id: 'orthopedics', label: 'Orthopedics', specs: ['Orthopedics'] },
  { id: 'ent', label: 'ENT', specs: ['ENT (Ear, Nose & Throat)', 'ENT Head & Neck Surgeon'] },
  { id: 'paediatrics', label: 'Paediatrics', specs: ['Paediatrics'] },
  { id: 'eye-surgeon', label: 'Eye Surgeon', specs: ['Ophthalmology'] },
  { id: 'oral-maxillofacial', label: 'Oral & Maxillo Facial Surgeon', specs: ['Oral & Maxillofacial Surgery'] },
  { id: 'neuro-psychiatrist', label: 'Neuro Psychiatrist', specs: ['Psychiatry'] }
];

export default function DoctorsCatalog({ doctors }: DoctorsCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering Logic
  const filteredDoctors = useMemo(() => {
    return doctors.filter((entry) => {
      // 1. Filter by Category
      let matchesCategory = true;
      if (selectedCategory !== 'all') {
        const catConfig = CATEGORIES.find(c => c.id === selectedCategory);
        if (catConfig && catConfig.specs) {
          matchesCategory = catConfig.specs.includes(entry.doctor.specialization);
        }
      }

      // 2. Filter by Search Query
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const docName = entry.doctor.name.toLowerCase();
        const docQual = entry.doctor.qualification.join(' ').toLowerCase();
        const docDesig = entry.doctor.designation.toLowerCase();
        const docSpec = entry.doctor.specialization.toLowerCase();
        const docAffil = (entry.doctor.hospital_affiliation || '').toLowerCase();

        matchesSearch =
          docName.includes(query) ||
          docQual.includes(query) ||
          docDesig.includes(query) ||
          docSpec.includes(query) ||
          docAffil.includes(query);
      }

      return matchesCategory && matchesSearch;
    });
  }, [doctors, selectedCategory, searchQuery]);

  const ihrDoctor = useMemo(() => filteredDoctors.find(d => d.id === 'ihr-opd'), [filteredDoctors]);
  const regularDoctors = useMemo(() => filteredDoctors.filter(d => d.id !== 'ihr-opd'), [filteredDoctors]);

  return (
    <div className="space-y-10">
      {/* Search and Filters Panel */}
      <div className="bg-white rounded-xl border border-neutral-200/80 p-5 md:p-6 shadow-sm space-y-5 max-w-5xl mx-auto">
        {/* Search input bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search consultants by name, qualification, designation or affiliation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-50 hover:bg-neutral-100/60 focus:bg-white text-sm text-navy-950 pl-12 pr-4 py-3.5 rounded-lg border border-neutral-200 focus:border-gold-500/80 outline-none transition-all placeholder:text-neutral-400 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400 hover:text-neutral-600 bg-neutral-200/50 hover:bg-neutral-200 px-2 py-1 rounded transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Badges Feed */}
        <div>
          <div className="flex items-center gap-2 mb-3 text-xs font-bold text-navy-950 uppercase tracking-wider">
            <Stethoscope className="h-4.5 w-4.5 text-gold-500" />
            <span>Filter by Speciality</span>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-2.5">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              // Count matching doctors in current category (ignoring search query for context)
              const count = doctors.filter((entry) => {
                if (cat.id === 'all') return true;
                return cat.specs?.includes(entry.doctor.specialization);
              }).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-extrabold tracking-wide border transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-navy-950 text-white border-navy-950 shadow-sm'
                      : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-600 border-neutral-200'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-[10px] ${
                      isActive ? 'bg-blue-600 text-white' : 'bg-neutral-200/80 text-neutral-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results Header / Counter */}
      <div className="max-w-5xl mx-auto flex items-center justify-between border-b border-neutral-250/60 pb-3">
        <p className="text-sm font-bold text-neutral-500">
          Showing <span className="text-navy-900 font-extrabold">{filteredDoctors.length}</span>{' '}
          {filteredDoctors.length === 1 ? 'consultant' : 'consultants'}
        </p>
        {(selectedCategory !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="text-xs font-extrabold text-gold-600 hover:text-gold-700 uppercase tracking-wider transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Doctors Grid */}
      {filteredDoctors.length > 0 ? (
        <div className="space-y-8 max-w-5xl mx-auto">
          {regularDoctors.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularDoctors.map((entry) => (
                <DoctorCard key={entry.id} entry={entry} />
              ))}
            </div>
          )}
          {ihrDoctor && (
            <div className="w-full pt-4">
              <DoctorCard key={ihrDoctor.id} entry={ihrDoctor} isHorizontal={true} />
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-neutral-200 max-w-5xl mx-auto p-8 shadow-sm">
          <Stethoscope className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-navy-950 mb-1">No Consultants Found</h3>
          <p className="text-neutral-500 text-sm max-w-md mx-auto">
            We couldn't find any specialist consultants matching your filters or search query. Try resetting filters or searching for another term.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-5 px-5 py-2.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
          >
            Show All Doctors
          </button>
        </div>
      )}
    </div>
  );
}
