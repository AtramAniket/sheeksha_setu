import api from "./client";

export async function getStudents() {
  const response = await api.get("/students");
  return response.data;
}

export async function getStudentById(studentId) {
  const response = await api.get(`/students/${studentId}`);
  return response.data;
}

export async function createStudent(payload) {
  const response = await api.post("/students", payload);
  return response.data;
}

export async function updateStudent(studentId, payload) {
  const response = await api.put(`/students/${studentId}`, payload);
  return response.data;
}

export async function deleteStudent(studentId) {
  const response = await api.delete(`/students/${studentId}`);
  return response.data;
}