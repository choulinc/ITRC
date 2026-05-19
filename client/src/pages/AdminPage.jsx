import { useState, useEffect, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import Footer from '../components/Footer';

// ===================== Shared Image Uploader Helper =====================
function ImageUploader({ value, onChange, label = '上傳圖片', disabled = false }) {
    const [uploading, setUploading] = useState(false);
    const [uploadMsg, setUploadMsg] = useState('');

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        setUploadMsg('上傳圖片中...');
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await api.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            onChange(res.data.url);
            setUploadMsg('✓ 圖片上傳成功');
        } catch (err) {
            console.error('Upload error:', err);
            setUploadMsg('❌ 圖片上傳失敗: ' + (err.response?.data?.error || err.message));
        } finally {
            setUploading(false);
            e.target.value = '';
        }
    };

    return (
        <div className="form-group">
            <label>{label} (Cloudinary 雲端上傳)</label>
            <input type="file" accept="image/*" onChange={handleUpload} disabled={disabled || uploading} style={{ marginBottom: 8 }} />
            <input placeholder="或直接貼上圖片網址" value={value || ''} onChange={e => onChange(e.target.value)} />
            {uploadMsg && <span className="text-accent" style={{ fontSize: '0.8rem', display: 'block', marginTop: 4 }}>{uploadMsg}</span>}
            {value && <img src={value} alt="預覽" style={{ marginTop: 10, maxHeight: 80, borderRadius: 5, objectFit: 'cover' }} />}
        </div>
    );
}

const TABS = [
    { key: 'sections', label: '頁面內容' },
    { key: 'achievements', label: '成果發表' },
    { key: 'members', label: '社團成員' },
    { key: 'plans', label: '活動規劃' },
    { key: 'records', label: '活動紀錄' },
    { key: 'experiences', label: '參與心得' },
];

export default function AdminPage() {
    const { isAdmin } = useAuth();
    const [activeTab, setActiveTab] = useState('sections');

    if (!isAdmin) return <Navigate to="/login" />;

    return (
        <>
            <div className="admin-layout">
                <div className="container">
                    <div className="admin-header">
                        <h1><span className="section-title-accent">管理後台</span></h1>
                        <div className="admin-tabs">
                            {TABS.map(tab => (
                                <button
                                    key={tab.key}
                                    className={`admin-tab ${activeTab === tab.key ? 'active' : ''}`}
                                    onClick={() => setActiveTab(tab.key)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {activeTab === 'sections' && <SectionsEditor />}
                    {activeTab === 'achievements' && <AchievementsEditor />}
                    {activeTab === 'members' && <MembersEditor />}
                    {activeTab === 'plans' && <SingleTypeActivitiesEditor activityType="plan" title="活動規劃管理" subtitle="管理未來預計舉辦的活動" />}
                    {activeTab === 'records' && <SingleTypeActivitiesEditor activityType="record" title="活動紀錄管理" subtitle="管理已完成的活動記錄與照片" />}
                    {activeTab === 'experiences' && <ExperiencesEditor />}
                </div>
            </div>
            <Footer />
        </>
    );
}

// ===================== Sections Editor =====================
function SectionsEditor() {
    const [sections, setSections] = useState([]);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ title: '', content: '' });
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState('');

    const fetchSections = useCallback(async () => {
        const res = await api.get('/sections');
        setSections(res.data);
    }, []);

    useEffect(() => { fetchSections(); }, [fetchSections]);

    const startEdit = (section) => {
        setEditing(section);
        setForm({ title: section.title, content: section.content });
        setMsg('');
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await api.put(`/sections/${editing.key}`, form);
            setMsg('✓ 已儲存');
            fetchSections();
            setTimeout(() => { setEditing(null); setMsg(''); }, 1000);
        } catch (err) {
            setMsg('儲存失敗: ' + (err.response?.data?.error || err.message));
        } finally {
            setSaving(false);
        }
    };

    return (
        <div>
            <h2 className="mb-3">頁面內容管理</h2>
            <p className="text-secondary mb-3">點擊編輯按鈕可修改首頁各區塊的文字內容</p>

            {editing && (
                <div className="card mb-4" style={{ maxWidth: 700 }}>
                    <h3 className="mb-2">編輯: {editing.title} <span className="text-secondary" style={{ fontSize: '0.8rem' }}>({editing.key})</span></h3>
                    <div className="admin-form">
                        <div className="form-group">
                            <label>標題</label>
                            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label>內容</label>
                            <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={6} />
                        </div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                            <button className="btn btn-primary btn-sm" onClick={handleSave} disabled={saving}>
                                {saving ? '儲存中...' : '儲存'}
                            </button>
                            <button className="btn btn-outline btn-sm" onClick={() => setEditing(null)}>取消</button>
                            {msg && <span className="text-accent" style={{ fontSize: '0.85rem' }}>{msg}</span>}
                        </div>
                    </div>
                </div>
            )}

            <div className="admin-item-list">
                {sections.map(s => (
                    <div key={s.id} className="admin-item">
                        <div>
                            <strong>{s.title}</strong>
                            <span className="text-secondary" style={{ marginLeft: 8, fontSize: '0.8rem' }}>({s.key})</span>
                            <p className="text-secondary" style={{ fontSize: '0.85rem', marginTop: 4, maxWidth: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {s.content?.substring(0, 80)}...
                            </p>
                        </div>
                        <button className="btn btn-outline btn-sm" onClick={() => startEdit(s)}>編輯</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ===================== Achievements Editor =====================
function AchievementsEditor() {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({ semester: '', title: '', category: '', description: '', link: '' });
    const [editingId, setEditingId] = useState(null);
    const [msg, setMsg] = useState('');

    const fetch = useCallback(async () => {
        const res = await api.get('/achievements');
        setItems(res.data.all || []);
    }, []);

    useEffect(() => { fetch(); }, [fetch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/achievements/${editingId}`, form);
                setMsg('✓ 已更新');
            } else {
                await api.post('/achievements', form);
                setMsg('✓ 已新增');
            }
            setForm({ semester: '', title: '', category: '', description: '', link: '' });
            setEditingId(null);
            fetch();
        } catch (err) {
            setMsg('錯誤: ' + (err.response?.data?.error || err.message));
        }
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setForm({ semester: item.semester, title: item.title, category: item.category || '', description: item.description || '', link: item.link || '' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('確定要刪除嗎？')) return;
        await api.delete(`/achievements/${id}`);
        fetch();
    };

    return (
        <div>
            <h2 className="mb-3">成果發表管理</h2>
            <form className="admin-form card mb-4" onSubmit={handleSubmit} style={{ maxWidth: 700, padding: 24 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div className="form-group">
                        <label>學期</label>
                        <input placeholder="例: 114-1" value={form.semester} onChange={e => setForm({ ...form, semester: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <label>類別</label>
                        <input placeholder="例: 台股、美股、加密貨幣" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
                    </div>
                </div>
                <div className="form-group">
                    <label>標題</label>
                    <input placeholder="成果標題" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
                </div>
                <div className="form-group">
                    <label>說明</label>
                    <textarea placeholder="簡要說明（選填）" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} />
                </div>
                <div className="form-group">
                    <label>連結</label>
                    <input placeholder="連結（選填）" value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} />
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <button type="submit" className="btn btn-primary btn-sm">{editingId ? '更新' : '新增'}</button>
                    {editingId && <button type="button" className="btn btn-outline btn-sm" onClick={() => { setEditingId(null); setForm({ semester: '', title: '', category: '', description: '', link: '' }); }}>取消</button>}
                    {msg && <span className="text-accent" style={{ fontSize: '0.85rem' }}>{msg}</span>}
                </div>
            </form>

            <div className="admin-item-list">
                {items.map(item => (
                    <div key={item.id} className="admin-item">
                        <div>
                            <span className="semester-badge" style={{ fontSize: '0.7rem', padding: '2px 10px', marginRight: 8 }}>{item.semester}</span>
                            <strong>{item.title}</strong>
                            {item.category && <span className="text-secondary" style={{ marginLeft: 8, fontSize: '0.8rem' }}>({item.category})</span>}
                        </div>
                        <div className="admin-item-actions">
                            <button className="btn btn-outline btn-sm" onClick={() => handleEdit(item)}>編輯</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>刪除</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ===================== Members Editor =====================
function MembersEditor() {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({ name: '', role: '', department: '', year: '', avatar_url: '' });
    const [editingId, setEditingId] = useState(null);
    const [msg, setMsg] = useState('');

    const fetchData = useCallback(async () => {
        const res = await api.get('/members');
        setItems(res.data);
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/members/${editingId}`, form);
                setMsg('✓ 已更新');
            } else {
                await api.post('/members', form);
                setMsg('✓ 已新增');
            }
            setForm({ name: '', role: '', department: '', year: '', avatar_url: '' });
            setEditingId(null);
            fetchData();
        } catch (err) {
            setMsg('錯誤: ' + (err.response?.data?.error || err.message));
        }
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setForm({ name: item.name, role: item.role || '', department: item.department || '', year: item.year || '', avatar_url: item.avatar_url || '' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('確定要刪除嗎？')) return;
        await api.delete(`/members/${id}`);
        fetchData();
    };

    return (
        <div>
            <h2 className="mb-3">社團成員管理</h2>
            <form className="admin-form card mb-4" onSubmit={handleSubmit} style={{ maxWidth: 700, padding: 24 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div className="form-group">
                        <label>姓名</label>
                        <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <label>職位</label>
                        <input placeholder="例: 召集人、社員" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>系所</label>
                        <input placeholder="例: 財管系" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>年級</label>
                        <input placeholder="例: 大三" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} />
                    </div>
                </div>
                <ImageUploader
                    value={form.avatar_url}
                    onChange={(url) => setForm(prev => ({ ...prev, avatar_url: url }))}
                    label="大頭照"
                />
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <button type="submit" className="btn btn-primary btn-sm">{editingId ? '更新' : '新增成員'}</button>
                    {editingId && <button type="button" className="btn btn-outline btn-sm" onClick={() => { setEditingId(null); setForm({ name: '', role: '', department: '', year: '', avatar_url: '' }); }}>取消</button>}
                    {msg && <span className="text-accent" style={{ fontSize: '0.85rem' }}>{msg}</span>}
                </div>
            </form>

            <div className="admin-item-list">
                {items.map(item => (
                    <div key={item.id} className="admin-item">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            {item.avatar_url && <img src={item.avatar_url} alt={item.name} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />}
                            <div>
                                <strong>{item.name}</strong>
                                {item.role && <span className="text-accent" style={{ marginLeft: 8 }}>{item.role}</span>}
                                {item.department && <span className="text-secondary" style={{ marginLeft: 8, fontSize: '0.85rem' }}>{item.department}</span>}
                            </div>
                        </div>
                        <div className="admin-item-actions">
                            <button className="btn btn-outline btn-sm" onClick={() => handleEdit(item)}>編輯</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>刪除</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ===================== Single Type Activities Editor (reusable for plans & records) =====================
function SingleTypeActivitiesEditor({ activityType, title, subtitle }) {
    const [items, setItems] = useState([]);
    const emptyForm = { type: activityType, title: '', date: '', description: '', speaker: '', image_url: '' };
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [msg, setMsg] = useState('');

    const fetchData = useCallback(async () => {
        const res = await api.get(`/activities?type=${activityType}`);
        setItems(res.data);
    }, [activityType]);

    useEffect(() => { fetchData(); }, [fetchData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/activities/${editingId}`, form);
                setMsg('✓ 已更新');
            } else {
                await api.post('/activities', form);
                setMsg('✓ 已新增');
            }
            setForm(emptyForm);
            setEditingId(null);
            fetchData();
        } catch (err) {
            setMsg('錯誤: ' + (err.response?.data?.error || err.message));
        }
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setForm({ type: activityType, title: item.title, date: item.date || '', description: item.description || '', speaker: item.speaker || '', image_url: item.image_url || '' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('確定要刪除嗎？')) return;
        await api.delete(`/activities/${id}`);
        fetchData();
    };

    return (
        <div>
            <h2 className="mb-3">{title}</h2>
            {subtitle && <p className="text-secondary mb-3">{subtitle}</p>}
            <form className="admin-form card mb-4" onSubmit={handleSubmit} style={{ maxWidth: 700, padding: 24 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div className="form-group">
                        <label>日期</label>
                        <input placeholder="例: 114年09月26日(五)" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>主講人</label>
                        <input placeholder="例: 王昭文 教授" value={form.speaker} onChange={e => setForm({ ...form, speaker: e.target.value })} />
                    </div>
                </div>
                <div className="form-group">
                    <label>主題</label>
                    <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'start' }}>
                    <div className="form-group">
                        <label>備註/其他連結</label>
                        <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={4} placeholder="支援 Markdown 語法 (如: [顯示名稱](網址))" />
                    </div>
                    <ImageUploader
                        value={form.image_url}
                        onChange={(url) => setForm(prev => ({ ...prev, image_url: url }))}
                        label="活動照片"
                    />
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <button type="submit" className="btn btn-primary btn-sm">{editingId ? '更新' : '新增'}</button>
                    {editingId && <button type="button" className="btn btn-outline btn-sm" onClick={() => { setEditingId(null); setForm(emptyForm); }}>取消</button>}
                    {msg && <span className="text-accent" style={{ fontSize: '0.85rem' }}>{msg}</span>}
                </div>
            </form>

            <div className="admin-item-list">
                {items.map(item => (
                    <div key={item.id} className="admin-item">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            {item.image_url && <img src={item.image_url} alt={item.title} style={{ width: 48, height: 36, borderRadius: 4, objectFit: 'cover' }} />}
                            <div>
                                <strong>{item.title}</strong>
                                {item.speaker && <span className="text-secondary" style={{ marginLeft: 8, fontSize: '0.85rem' }}>| {item.speaker}</span>}
                                {item.date && <span className="text-secondary" style={{ marginLeft: 8, fontSize: '0.85rem' }}>{item.date}</span>}
                            </div>
                        </div>
                        <div className="admin-item-actions">
                            <button className="btn btn-outline btn-sm" onClick={() => handleEdit(item)}>編輯</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>刪除</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ===================== Experiences Editor =====================
function ExperiencesEditor() {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({ author: '', title: '', content: '' });
    const [editingId, setEditingId] = useState(null);
    const [msg, setMsg] = useState('');

    const fetchData = useCallback(async () => {
        const res = await api.get('/experiences');
        setItems(res.data);
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/experiences/${editingId}`, form);
                setMsg('✓ 已更新');
            } else {
                await api.post('/experiences', form);
                setMsg('✓ 已新增');
            }
            setForm({ author: '', title: '', content: '' });
            setEditingId(null);
            fetchData();
        } catch (err) {
            setMsg('錯誤: ' + (err.response?.data?.error || err.message));
        }
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setForm({ author: item.author, title: item.title, content: item.content });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('確定要刪除嗎？')) return;
        await api.delete(`/experiences/${id}`);
        fetchData();
    };

    return (
        <div>
            <h2 className="mb-3">參與心得管理</h2>
            <form className="admin-form card mb-4" onSubmit={handleSubmit} style={{ maxWidth: 700, padding: 24 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div className="form-group">
                        <label>作者</label>
                        <input value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <label>標題</label>
                        <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
                    </div>
                </div>
                <div className="form-group">
                    <label>內容</label>
                    <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={6} required />
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <button type="submit" className="btn btn-primary btn-sm">{editingId ? '更新' : '新增心得'}</button>
                    {editingId && <button type="button" className="btn btn-outline btn-sm" onClick={() => { setEditingId(null); setForm({ author: '', title: '', content: '' }); }}>取消</button>}
                    {msg && <span className="text-accent" style={{ fontSize: '0.85rem' }}>{msg}</span>}
                </div>
            </form>

            <div className="admin-item-list">
                {items.map(item => (
                    <div key={item.id} className="admin-item">
                        <div>
                            <strong>{item.title}</strong>
                            <span className="text-secondary" style={{ marginLeft: 8 }}>by {item.author}</span>
                        </div>
                        <div className="admin-item-actions">
                            <button className="btn btn-outline btn-sm" onClick={() => handleEdit(item)}>編輯</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>刪除</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
