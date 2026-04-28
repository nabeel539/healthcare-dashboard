import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { PatientCard } from '../components/patients/PatientCard';
import { PatientTable } from '../components/patients/PatientTable';
import { SkeletonPatientCard, SkeletonTableRow } from '../components/ui/Skeleton';
import { PatientModal } from '../components/patients/PatientModal';
import { usePatientStore } from '../store/patientStore';
import { useNotificationStore } from '../store/notificationStore';
import { useUiStore } from '../store/uiStore';
import type { Patient } from '../types';

import { exportToCSV } from '../utils/exportUtils';

export const PatientsPage: React.FC = () => {
  const { patients, isLoading, error, fetchPatients, addPatient, deletePatient, updatePatient } = usePatientStore();
  const { addNotification } = useNotificationStore();
  const { viewMode, setViewMode } = useUiStore();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | undefined>();

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleExport = () => {
    if (patients.length > 0) {
      exportToCSV(patients, `Patients_Directory_${new Date().toISOString().split('T')[0]}`);
    }
  };

  const triggerBrowserNotification = (title: string, body: string) => {
    if (!('Notification' in window)) return;

    const show = () => {
      new Notification(title, { body, icon: '/vite.svg' });
    };

    if (Notification.permission === 'granted') {
      show();
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') show();
      });
    }
  };

  const handleAddPatient = async (data: any) => {
    try {
      await addPatient(data);
      addNotification('Patient Registered', `${data.name} has been added to the registry.`, 'success');
      triggerBrowserNotification('🏥 New Patient', `${data.name} is now registered.`);
    } catch (err) {
      addNotification('Registry Error', 'Failed to add patient to Firestore.', 'error');
    }
  };

  const handleDeletePatient = async (id: string) => {
    const patientName = patients.find(p => p.id === id)?.name || 'Patient';
    try {
      await deletePatient(id);
      addNotification('Record Deleted', `Clinical record for ${patientName} removed.`, 'warning');
    } catch (err) {
      addNotification('System Error', 'Failed to remove clinical record.', 'error');
    }
  };

  const handleEditClick = (patient: Patient) => {
    setEditingPatient(patient);
    setIsModalOpen(true);
  };

  const handleAddNewClick = () => {
    setEditingPatient(undefined);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (data: any) => {
    if (editingPatient) {
      await updatePatient(editingPatient.id, data);
    } else {
      await handleAddPatient(data);
    }
  };

  return (
    <DashboardLayout>
      {/* Patient summary header */}
      <section className="mb-10">
        <div className="flex items-end justify-between flex-col md:flex-row gap-4">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 rounded-2xl overflow-hidden shadow-ambient primary-gradient flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-5xl">person</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface font-headline tracking-tight">
                  Patient Directory
                </h2>
                <span className="px-2.5 py-0.5 bg-primary-fixed text-on-primary-fixed text-[10px] font-bold uppercase tracking-wider rounded-full">
                  {patients.length > 0 ? `${patients.length} Records` : isLoading ? 'Loading…' : '0 Records'}
                </span>
              </div>
              <div className="flex gap-4 text-on-surface-variant font-medium text-sm flex-wrap">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">location_city</span>
                  Atelier Health Clinic
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">medical_services</span>
                  Dr. Julianne Vane
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="px-5 py-2.5 bg-surface-container-high text-on-surface-variant text-xs font-bold tracking-widest uppercase rounded-lg shadow-sm hover:bg-surface-container-highest transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              Export
            </button>
            <button
              onClick={handleAddNewClick}
              className="px-5 py-2.5 primary-gradient text-white text-xs font-bold tracking-widest uppercase rounded-lg shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              New Patient
            </button>
          </div>
        </div>
      </section>

      {/* Error State */}
      {error && (
        <div className="mb-6 p-4 bg-error-container text-on-error-container rounded-xl flex items-center gap-3">
          <span className="material-symbols-outlined">error</span>
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* View toggle + filter bar */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-bold font-headline text-on-surface">Associated Records</h3>
          <div className="h-6 w-px bg-outline-variant/30" />
          <span className="text-sm text-on-surface-variant font-medium">
            {isLoading && patients.length === 0 ? 'Loading records…' : `${patients.length} Records found`}
          </span>
        </div>

        {/* Grid / List toggle */}
        <div className="bg-surface-container-low p-1 rounded-xl flex items-center gap-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-2 px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${
              viewMode === 'grid'
                ? 'bg-white text-primary shadow-sm'
                : 'text-on-surface-variant hover:bg-white'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">grid_view</span>
            Grid
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${
              viewMode === 'list'
                ? 'bg-white text-primary shadow-sm'
                : 'text-on-surface-variant hover:bg-white'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">list</span>
            List
          </button>
        </div>
      </div>

      {/* Grid view */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {isLoading && patients.length === 0
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonPatientCard key={i} />)
            : patients.map((patient) => (
                <PatientCard 
                  key={patient.id} 
                  patient={patient} 
                  onEdit={() => handleEditClick(patient)}
                  onDelete={() => handleDeletePatient(patient.id)}
                />
              ))}
        </div>
      )}

      {/* List view */}
      {viewMode === 'list' && (
        <>
          {isLoading && patients.length === 0 ? (
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden">
              <table className="w-full">
                <tbody>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <SkeletonTableRow key={i} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <PatientTable 
              patients={patients} 
              onEdit={handleEditClick}
              onDelete={handleDeletePatient}
            />
          )}
        </>
      )}

      {/* Empty State */}
      {!isLoading && patients.length === 0 && (
        <div className="py-20 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-outline text-3xl">person_off</span>
          </div>
          <h4 className="text-lg font-bold text-on-surface">No clinical records found</h4>
          <p className="text-sm text-on-surface-variant mt-1">Start by adding your first patient to the system.</p>
          <button 
            onClick={handleAddNewClick}
            className="mt-6 px-6 py-2 bg-primary text-white rounded-lg font-bold text-xs uppercase tracking-widest"
          >
            Add Patient
          </button>
        </div>
      )}

      {/* Modal */}
      <PatientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={editingPatient}
      />

      {/* FAB */}
      <button
        onClick={handleAddNewClick}
        className="fixed bottom-24 md:bottom-8 right-8 h-14 w-14 rounded-full primary-gradient text-white shadow-2xl flex items-center justify-center hover:scale-105 transition-transform z-40"
        title="Add new patient"
      >
        <span className="material-symbols-outlined text-[24px]">add</span>
      </button>
    </DashboardLayout>
  );
};
