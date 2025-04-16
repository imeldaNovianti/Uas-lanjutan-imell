import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const EditJobPage = () => {
  const { id } = useParams();
  const history = useHistory();

  const [job, setJob] = useState({
    title: "",
    description: "",
    location: "",
    type: "",
    salary: "",
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`/api/company/jobs/${id}`);
        setJob(response.data.job);
      } catch (error) {
        console.error("❌ Error fetching job:", error);
      }
    };

    fetchJob();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/company/jobs/${id}`, job);
      history.push("/company/dashboard");
    } catch (error) {
      console.error("❌ Error updating job:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/company/jobs/${id}`);
      history.push("/company/dashboard");
    } catch (error) {
      console.error("❌ Error deleting job:", error);
    }
  };

  return (
    <div>
      <h1>Edit Lowongan</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={job.title}
          onChange={(e) => setJob({ ...job, title: e.target.value })}
        />
        <textarea
          value={job.description}
          onChange={(e) => setJob({ ...job, description: e.target.value })}
        />
        <input
          type="text"
          value={job.location}
          onChange={(e) => setJob({ ...job, location: e.target.value })}
        />
        <select
          value={job.type}
          onChange={(e) => setJob({ ...job, type: e.target.value })}
        >
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
        </select>
        <input
          type="number"
          value={job.salary}
          onChange={(e) => setJob({ ...job, salary: e.target.value })}
        />
        <button type="submit">Update Job</button>
      </form>
      <button onClick={handleDelete}>Delete Job</button>
    </div>
  );
};

export default EditJobPage;
