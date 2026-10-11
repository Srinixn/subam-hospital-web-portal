/**
 * FAQManager.tsx — Admin page for managing the chatbot knowledge base
 *
 * Features:
 * - CRUD interface for FAQ documents
 * - Department assignment
 * - Search and pagination
 * - "Re-generate embedding" capability
 */
import { useState, useEffect, useCallback } from 'react';
import {
  BookOpen, Plus, Search, ChevronLeft, ChevronRight,
  Edit, Trash2, XCircle, Check, Tag, Sparkles,
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

interface FaqDocument {
  id: number;
  title: string;
  content: string;
  departmentId: number | null;
  departmentName: string | null;
  tags: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Department {
  id: number;
  name: string;
}

export default function FAQManager() {
  const [faqs, setFaqs] = useState<FaqDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [departments, setDepartments] = useState<Department[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqDocument | null>(null);

  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formDeptId, setFormDeptId] = useState('');
  const [formTags, setFormTags] = useState('');
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  // Fetch FAQs
  const fetchFaqs = useCallback(async () => {
    setLoading(true);
    try {
      let url = `${API_BASE}/chat-admin/faq?page=${page}&limit=20`;
      if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;

      const response = await fetch(url, { credentials: 'include' });
      const data = await response.json();

      if (data.success) {
        setFaqs(data.data || []);
        setTotalPages(data.pagination?.totalPages || 1);
      }
    } catch (error) {
      console.error('Failed to fetch FAQs:', error);
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery]);

  useEffect(() => {
    fetch(`${API_BASE}/chat/departments`)
      .then((r) => r.json())
      .then((d) => { if (d.data) setDepartments(d.data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchFaqs();
  }, [fetchFaqs]);

  // Open editor for new/edit
  const openEditor = (faq?: FaqDocument) => {
    if (faq) {
      setEditingFaq(faq);
      setFormTitle(faq.title);
      setFormContent(faq.content);
      setFormDeptId(faq.departmentId?.toString() || '');
      setFormTags(faq.tags || '');
    } else {
      setEditingFaq(null);
      setFormTitle('');
      setFormContent('');
      setFormDeptId('');
      setFormTags('');
    }
    setFormError('');
    setShowEditor(true);
  };

  // Save FAQ
  const saveFaq = async () => {
    if (!formTitle.trim() || formTitle.trim().length < 2) {
      setFormError('Title is required (min 2 characters).');
      return;
    }
    if (!formContent.trim() || formContent.trim().length < 10) {
      setFormError('Content is required (min 10 characters).');
      return;
    }

    setSaving(true);
    setFormError('');

    try {
      const body: any = {
        title: formTitle.trim(),
        content: formContent.trim(),
        departmentId: formDeptId ? Number(formDeptId) : null,
        tags: formTags.trim() || null,
      };

      const isEdit = !!editingFaq;
      const url = isEdit
        ? `${API_BASE}/chat-admin/faq/${editingFaq!.id}`
        : `${API_BASE}/chat-admin/faq`;
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.success) {
        setShowEditor(false);
        fetchFaqs();
      } else {
        setFormError(data.message || 'Failed to save FAQ.');
      }
    } catch (error) {
      setFormError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Delete FAQ
  const deleteFaq = async (id: number) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;

    try {
      const response = await fetch(`${API_BASE}/chat-admin/faq/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if ((await response.json()).success) {
        fetchFaqs();
      }
    } catch (error) {
      console.error('Failed to delete FAQ:', error);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <BookOpen size={22} className="text-brand-primary" /> Knowledge Base
          </h2>
          <p className="text-sm text-slate-500 mt-1">Manage FAQ documents that power the chatbot</p>
        </div>
        <button
          onClick={() => openEditor()}
          className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-white rounded-xl font-medium text-sm hover:bg-teal-700 transition-colors"
        >
          <Plus size={16} /> Add FAQ
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm mb-6">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
        />
      </div>

      {/* FAQ List */}
      <div className="space-y-3">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary" />
          </div>
        ) : faqs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm text-center py-20 text-slate-400">
            <BookOpen size={48} className="mx-auto mb-4 opacity-30" />
            <p className="font-medium">No FAQ documents found</p>
            <p className="text-sm mt-1">Add your first FAQ to power the chatbot.</p>
          </div>
        ) : (
          faqs.map((faq) => (
            <div
              key={faq.id}
              className={`bg-white rounded-xl border border-slate-100 shadow-sm p-5 transition-all hover:shadow-md ${
                !faq.isActive ? 'opacity-50' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-800 mb-1">{faq.title}</h4>
                  <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{faq.content}</p>
                  <div className="flex items-center gap-3 mt-3">
                    {faq.departmentName && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-teal-50 text-teal-700 rounded-full text-xs font-medium">
                        {faq.departmentName}
                      </span>
                    )}
                    {faq.tags && (
                      <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                        <Tag size={12} /> {faq.tags.split(',').slice(0, 3).join(', ')}
                        {faq.tags.split(',').length > 3 && '...'}
                      </span>
                    )}
                    {!faq.isActive && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Inactive</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => openEditor(faq)}
                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-brand-primary transition-colors"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => deleteFaq(faq.id)}
                    className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-30"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm font-medium text-slate-600">{page}/{totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-30"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* ── Editor Modal ── */}
      {showEditor && (
        <div className="fixed inset-0 bg-slate-800/50 z-50 flex items-center justify-center p-4" onClick={() => setShowEditor(false)}>
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800">
                {editingFaq ? 'Edit FAQ' : 'Add New FAQ'}
              </h3>
              <button onClick={() => setShowEditor(false)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400">
                <XCircle size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {formError && (
                <div className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Title *</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
                  placeholder="e.g., Hospital Visiting Hours"
                  maxLength={255}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Content *</label>
                <textarea
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30 resize-y"
                  placeholder="Provide a detailed answer that the chatbot can use..."
                  rows={6}
                  maxLength={5000}
                />
                <p className="text-xs text-slate-400 mt-1 text-right">{formContent.length}/5000</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Department</label>
                <select
                  value={formDeptId}
                  onChange={(e) => setFormDeptId(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                >
                  <option value="">None (General)</option>
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Tags <span className="text-slate-400 font-normal">(comma-separated)</span>
                </label>
                <input
                  type="text"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                  placeholder="e.g., visiting hours, visit, timing"
                  maxLength={500}
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-50 p-3 rounded-xl">
                <Sparkles size={14} className="text-brand-primary flex-shrink-0" />
                <span>An embedding will be auto-generated when you save. This enables AI-powered search.</span>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowEditor(false)}
                  className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={saveFaq}
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-primary text-white rounded-xl text-sm font-medium hover:bg-teal-700 disabled:opacity-50"
                >
                  <Check size={16} /> {saving ? 'Saving...' : editingFaq ? 'Update FAQ' : 'Create FAQ'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
