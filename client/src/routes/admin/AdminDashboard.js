import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUsers, FaHome, FaClock, FaCheckCircle, FaTimesCircle, FaEye } from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, usersRes, postsRes, docsRes] = await Promise.all([
        axios.get('/api/admin/dashboard'),
        axios.get('/api/admin/users'),
        axios.get('/api/admin/posts'),
        axios.get('/api/admin/documents/pending')
      ]);

      setStats(statsRes.data);
      setUsers(usersRes.data.users);
      setPosts(postsRes.data.posts);
      setDocuments(docsRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyUser = async (userId, status) => {
    try {
      await axios.put(`/api/admin/users/${userId}/verify`, { status });
      fetchDashboardData();
    } catch (error) {
      console.error('Error verifying user:', error);
    }
  };

  const handlePostAction = async (postId, action) => {
    try {
      if (action === 'approve') {
        await axios.put(`/api/admin/posts/${postId}/approve`);
      } else {
        await axios.put(`/api/admin/posts/${postId}/reject`);
      }
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleVerifyDocument = async (docId, isVerified) => {
    try {
      await axios.put(`/api/admin/documents/${docId}/verify`, { isVerified });
      fetchDashboardData();
    } catch (error) {
      console.error('Error verifying document:', error);
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading dashboard...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage users, properties, and verifications</p>
      </div>

      <div className="admin-tabs">
        <button 
          className={activeTab === 'dashboard' ? 'active' : ''} 
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={activeTab === 'users' ? 'active' : ''} 
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button 
          className={activeTab === 'posts' ? 'active' : ''} 
          onClick={() => setActiveTab('posts')}
        >
          Properties
        </button>
        <button 
          className={activeTab === 'documents' ? 'active' : ''} 
          onClick={() => setActiveTab('documents')}
        >
          Documents
        </button>
      </div>

      {activeTab === 'dashboard' && stats && (
        <div className="dashboard-stats">
          <div className="stat-card">
            <FaUsers className="stat-icon" />
            <div className="stat-content">
              <h3>{stats.stats.totalUsers}</h3>
              <p>Total Users</p>
            </div>
          </div>
          <div className="stat-card">
            <FaHome className="stat-icon" />
            <div className="stat-content">
              <h3>{stats.stats.totalPosts}</h3>
              <p>Total Properties</p>
            </div>
          </div>
          <div className="stat-card">
            <FaClock className="stat-icon" />
            <div className="stat-content">
              <h3>{stats.stats.pendingPosts}</h3>
              <p>Pending Approvals</p>
            </div>
          </div>
          <div className="stat-card">
            <FaCheckCircle className="stat-icon" />
            <div className="stat-content">
              <h3>{stats.stats.pendingVerifications}</h3>
              <p>Pending Documents</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="admin-section">
          <h2>User Management</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <span className={`status ${user.verificationStatus.toLowerCase()}`}>
                        {user.verificationStatus}
                      </span>
                    </td>
                    <td>
                      {user.verificationStatus === 'PENDING' && (
                        <div className="action-buttons">
                          <button 
                            onClick={() => handleVerifyUser(user.id, 'VERIFIED')}
                            className="btn-approve"
                          >
                            Verify
                          </button>
                          <button 
                            onClick={() => handleVerifyUser(user.id, 'REJECTED')}
                            className="btn-reject"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'posts' && (
        <div className="admin-section">
          <h2>Property Management</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Owner</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>{post.user.fullName}</td>
                    <td>${post.price}</td>
                    <td>
                      <span className={`status ${post.status.toLowerCase()}`}>
                        {post.status}
                      </span>
                    </td>
                    <td>
                      {post.status === 'PENDING' && (
                        <div className="action-buttons">
                          <button 
                            onClick={() => handlePostAction(post.id, 'approve')}
                            className="btn-approve"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handlePostAction(post.id, 'reject')}
                            className="btn-reject"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="admin-section">
          <h2>Document Verification</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Document</th>
                  <th>User</th>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map(doc => (
                  <tr key={doc.id}>
                    <td>{doc.title}</td>
                    <td>{doc.user?.fullName || 'N/A'}</td>
                    <td>{doc.fileType}</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          onClick={() => window.open(doc.fileUrl, '_blank')}
                          className="btn-view"
                        >
                          <FaEye /> View
                        </button>
                        <button 
                          onClick={() => handleVerifyDocument(doc.id, true)}
                          className="btn-approve"
                        >
                          Verify
                        </button>
                        <button 
                          onClick={() => handleVerifyDocument(doc.id, false)}
                          className="btn-reject"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;