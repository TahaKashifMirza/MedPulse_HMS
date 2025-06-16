import React, { useEffect, useState } from 'react';
import '../CSS/DoctorList.css';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/doctors');
        const data = await response.json();
        if (Array.isArray(data)) {
          setDoctors(data);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <div className="doctorlist-loading-container">
        <div className="doctorlist-loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="doctorlist-container">
      <header className="doctorlist-header">
        <h1 className="doctorlist-title">MedPulse Doctors List</h1>
        <p className="doctorlist-subtitle">Where Care Meets Innovation</p>
      </header>

      <div className="doctorlist-grid">
        {doctors.map((doctor) => (
          <article key={doctor._id} className="doctorlist-card">
            <div className="doctorlist-card-inner">
              <div className="doctorlist-image-container">
                <img
                  src={`data:image/jpeg;base64,${doctor.picture}`}
                  alt={doctor.name}
                  className="doctorlist-image"
                  loading="lazy"
                />
                <div className="doctorlist-image-overlay"></div>
              </div>
              <div className="doctorlist-content">
                <h2 className="doctorlist-name">{doctor.name}</h2>
                <p className="doctorlist-category">{doctor.category}</p>
                <div className="doctorlist-badge">{doctor.specialization}</div>
                
                <div className="doctorlist-details">
                  <div className="doctorlist-detail-item">
                    <span className="doctorlist-detail-label">Gender:</span>
                    <span className="doctorlist-detail-value">{doctor.gender}</span>
                  </div>
                </div>

                <div className="doctorlist-schedule">
                  <h3 className="doctorlist-schedule-title">Available Times:</h3>
                  <div className="doctorlist-schedule-grid">
                    {doctor.timings.map((timing, index) => (
                      <div key={index} className="doctorlist-time-slot">
                        <span className="doctorlist-day">{timing.day}</span>
                        <span className="doctorlist-time">{timing.start} - {timing.end}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;