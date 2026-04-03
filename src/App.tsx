import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, Filter, LayoutGrid, List, ChevronRight, Info, Download, Maximize2, X, ChevronLeft, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { viData, VIItem } from './data';

// --- Image Carousel Component ---
const ImageCarousel = ({ images, name, className = "" }: { images: string[], name: string, className?: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) {
    return (
      <div className={`bg-slate-100 relative overflow-hidden flex items-center justify-center ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
        <div className="text-slate-300 flex flex-col items-center gap-2">
          <LayoutGrid size={48} strokeWidth={1} />
          <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">VI Design</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative group/carousel overflow-hidden bg-slate-100 flex items-center justify-center p-4 ${className}`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${name} ${currentIndex + 1}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="max-w-full max-h-full object-contain rounded-lg shadow-sm"
          referrerPolicy="no-referrer"
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-slate-600 hover:text-blue-600 opacity-0 group-hover/carousel:opacity-100 transition-opacity shadow-sm"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-slate-600 hover:text-blue-600 opacity-0 group-hover/carousel:opacity-100 transition-opacity shadow-sm"
          >
            <ChevronRight size={18} />
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-blue-600 scale-110' : 'border border-blue-400 bg-transparent'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// --- Canvas Component for Background/Visual Flair ---
const LogoCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = Array.from({ length: 30 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.05)';

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-50" />;
};

// --- Main App Component ---
export default function App() {
  const [items, setItems] = useState<VIItem[]>(viData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItem, setSelectedItem] = useState<VIItem | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categoryTree = useMemo(() => {
    const tree: Record<string, string[]> = {};
    items.forEach(item => {
      if (!tree[item.category]) {
        tree[item.category] = [];
      }
      if (!tree[item.category].includes(item.subcategory)) {
        tree[item.category].push(item.subcategory);
      }
    });
    return tree;
  }, [items]);

  const filteredData = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = searchTerm === '' || 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subcategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      // If searching, ignore category filter for "fuzzy positioning" but only show relevant results
      if (searchTerm !== '') return matchesSearch;

      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      const matchesSubcategory = !selectedSubcategory || item.subcategory === selectedSubcategory;
      
      return matchesCategory && matchesSubcategory;
    });
  }, [searchTerm, selectedCategory, selectedSubcategory, items]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedItem) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const updatedItems = items.map(item => {
          if (item.id === selectedItem.id) {
            return {
              ...item,
              images: [...item.images, base64String]
            };
          }
          return item;
        });
        setItems(updatedItems);
        setSelectedItem({
          ...selectedItem,
          images: [...selectedItem.images, base64String]
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryClick = (cat: string) => {
    if (selectedCategory === cat && !selectedSubcategory) {
      setSelectedCategory(null);
      setExpandedCategory(null);
    } else {
      setSelectedCategory(cat);
      setSelectedSubcategory(null);
      setExpandedCategory(cat);
    }
    setSearchTerm('');
  };

  const handleSubcategoryClick = (cat: string, sub: string) => {
    setSelectedCategory(cat);
    setSelectedSubcategory(sub);
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <LayoutGrid size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">为您服务 VI 标识系统</h1>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Visual Identity System</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="搜索类别、名称或内容..."
                className="pl-10 pr-10 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-full text-sm transition-all w-64 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <LogoCanvas />

        {/* Mobile Search */}
        <div className="md:hidden mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="搜索..."
              className="pl-10 pr-10 py-3 bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl text-sm transition-all w-full outline-none shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar / Categories */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Filter size={18} className="text-blue-600" />
                <h2 className="font-bold text-slate-900">分类筛选</h2>
              </div>
              
              <nav className="space-y-1">
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedSubcategory(null);
                    setExpandedCategory(null);
                    setSearchTerm('');
                  }}
                  className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-medium transition-all flex items-center justify-between group ${
                    selectedCategory === null 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>全部类别</span>
                  <ChevronRight size={16} className={selectedCategory === null ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity'} />
                </button>
                
                {Object.entries(categoryTree).map(([cat, subs]) => (
                  <div key={cat} className="space-y-1">
                    <button
                      onClick={() => handleCategoryClick(cat)}
                      className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-medium transition-all flex items-center justify-between group ${
                        selectedCategory === cat && !selectedSubcategory
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                          : selectedCategory === cat
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate">{cat}</span>
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform duration-200 ${expandedCategory === cat ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    
                    <AnimatePresence>
                      {expandedCategory === cat && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-4 space-y-1"
                        >
                          {(subs as string[]).map(sub => (
                            <button
                              key={sub}
                              onClick={() => handleSubcategoryClick(cat, sub)}
                              className={`w-full text-left px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between group ${
                                selectedSubcategory === sub 
                                  ? 'text-blue-600 bg-blue-50' 
                                  : 'text-slate-500 hover:bg-slate-50'
                              }`}
                            >
                              <span>{sub}</span>
                              <ChevronRight size={14} className={selectedSubcategory === sub ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity'} />
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                
                {/* Add New Item Button */}
                <button
                  onClick={() => {
                    const newItem: VIItem = {
                      id: Date.now(),
                      category: selectedCategory || "自定义类别",
                      subcategory: selectedSubcategory || "自定义子类",
                      name: "新设计项",
                      content: "请输入设计描述...",
                      images: [],
                      specs: "按需定制",
                      material: "常规材质",
                      remark: ""
                    };
                    setItems([newItem, ...items]);
                    setSelectedItem(newItem);
                  }}
                  className="w-full mt-4 flex items-center justify-center gap-2 py-3 border-2 border-dashed border-blue-200 rounded-2xl text-blue-600 font-bold hover:bg-blue-50 hover:border-blue-300 transition-all"
                >
                  <Maximize2 size={18} />
                  <span>新增设计项</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Content Area */}
          <section className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {searchTerm ? '搜索结果' : selectedSubcategory || selectedCategory || '所有设计图'}
                  <span className="ml-3 text-sm font-normal text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                    {filteredData.length} 项
                  </span>
                </h2>
              </div>
              
              <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <LayoutGrid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>

            {filteredData.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" 
                : "space-y-4"
              }>
                <AnimatePresence mode="popLayout">
                  {filteredData.map((item) => (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`group bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 ${
                        viewMode === 'list' ? 'flex items-center p-4 gap-6' : ''
                      }`}
                    >
                      {/* Image Container */}
                      <div className={`bg-slate-100 relative overflow-hidden ${
                        viewMode === 'grid' ? 'aspect-[4/3] w-full' : 'w-32 h-32 rounded-2xl flex-shrink-0'
                      }`}>
                        <ImageCarousel 
                          images={item.images} 
                          name={item.name} 
                          className="w-full h-full" 
                        />
                        
                        <div className="absolute top-3 left-3 z-10">
                          <span className="bg-white/90 backdrop-blur-sm text-blue-600 text-[10px] font-bold px-2 py-1 rounded-full shadow-sm border border-slate-100">
                            {item.subcategory}
                          </span>
                        </div>

                        <button 
                          onClick={() => setSelectedItem(item)}
                          className="absolute inset-0 z-20 bg-blue-600/0 group-hover:bg-blue-600/5 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100"
                        >
                          <div className="bg-white text-blue-600 p-3 rounded-full shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
                            <Maximize2 size={20} />
                          </div>
                        </button>
                      </div>

                      <div className={`p-6 ${viewMode === 'list' ? 'flex-1 p-0' : ''}`}>
                        <div className="mb-4">
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">{item.name}</h3>
                          <p className="text-sm text-slate-500 line-clamp-2 mt-1 leading-relaxed">{item.content}</p>
                        </div>

                        <div className="space-y-2 mb-6">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-slate-400 font-medium w-12">规格:</span>
                            <span className="text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">{item.specs || '按需定制'}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-slate-400 font-medium w-12">材质:</span>
                            <span className="text-slate-700">{item.material || '常规材质'}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setSelectedItem(item)}
                            className="flex-1 bg-slate-900 text-white text-xs font-bold py-3 rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                          >
                            <Info size={14} />
                            查看详情
                          </button>
                          <button className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors">
                            <Download size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="bg-white border border-dashed border-slate-300 rounded-3xl p-12 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                  <Search size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">未找到相关内容</h3>
                <p className="text-slate-500 mt-2">尝试更换搜索词或选择其他分类</p>
                <button 
                  onClick={() => {setSearchTerm(''); setSelectedCategory(null);}}
                  className="mt-6 text-blue-600 font-bold hover:underline"
                >
                  重置所有筛选
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
              <LayoutGrid size={18} />
            </div>
            <span className="font-bold text-slate-900">为您服务 VI 标识系统</span>
          </div>
          <p className="text-sm text-slate-500">© 2026 物业服务标准化管理系统. All rights reserved.</p>
        </div>
      </footer>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-500 hover:text-slate-900 transition-colors shadow-sm"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 bg-slate-100 aspect-square md:aspect-auto relative overflow-hidden">
                  <ImageCarousel 
                    images={selectedItem.images} 
                    name={selectedItem.name} 
                    className="w-full h-full" 
                  />
                  <div className="absolute bottom-8 left-8 right-8 z-10">
                    <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-blue-600 mb-1">Preview Mode</p>
                      <p className="text-xs text-slate-500">此为设计示意图，实际效果以最终输出文件为准。</p>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/2 p-8 sm:p-12">
                  <div className="mb-8">
                    <div className="flex gap-2 mb-4">
                      <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">
                        {selectedItem.category}
                      </span>
                      <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">
                        {selectedItem.subcategory}
                      </span>
                    </div>
                    <input 
                      className="text-3xl font-black text-slate-900 mb-4 w-full border-none focus:ring-0 p-0 bg-transparent"
                      value={selectedItem.name}
                      onChange={(e) => {
                        const newName = e.target.value;
                        setItems(items.map(i => i.id === selectedItem.id ? { ...i, name: newName } : i));
                        setSelectedItem({ ...selectedItem, name: newName });
                      }}
                    />
                    <textarea 
                      className="text-slate-600 leading-relaxed w-full border-none focus:ring-0 p-0 bg-transparent resize-none"
                      rows={3}
                      value={selectedItem.content}
                      onChange={(e) => {
                        const newContent = e.target.value;
                        setItems(items.map(i => i.id === selectedItem.id ? { ...i, content: newContent } : i));
                        setSelectedItem({ ...selectedItem, content: newContent });
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">尺寸规格</p>
                      <input 
                        className="text-slate-900 font-medium w-full border-none focus:ring-0 p-0 bg-transparent"
                        value={selectedItem.specs || ''}
                        placeholder="按需定制"
                        onChange={(e) => {
                          const newSpecs = e.target.value;
                          setItems(items.map(i => i.id === selectedItem.id ? { ...i, specs: newSpecs } : i));
                          setSelectedItem({ ...selectedItem, specs: newSpecs });
                        }}
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">推荐材质</p>
                      <input 
                        className="text-slate-900 font-medium w-full border-none focus:ring-0 p-0 bg-transparent"
                        value={selectedItem.material || ''}
                        placeholder="常规材质"
                        onChange={(e) => {
                          const newMaterial = e.target.value;
                          setItems(items.map(i => i.id === selectedItem.id ? { ...i, material: newMaterial } : i));
                          setSelectedItem({ ...selectedItem, material: newMaterial });
                        }}
                      />
                    </div>
                  </div>

                  {selectedItem.remark && (
                    <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl mb-8">
                      <div className="flex gap-3">
                        <Info size={18} className="text-amber-600 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-xs font-bold text-amber-900 mb-1">设计备注</p>
                          <textarea 
                            className="text-xs text-amber-800 leading-relaxed w-full border-none focus:ring-0 p-0 bg-transparent resize-none"
                            rows={2}
                            value={selectedItem.remark || ''}
                            placeholder="添加设计备注..."
                            onChange={(e) => {
                              const newRemark = e.target.value;
                              setItems(items.map(i => i.id === selectedItem.id ? { ...i, remark: newRemark } : i));
                              setSelectedItem({ ...selectedItem, remark: newRemark });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {!selectedItem.remark && (
                    <button 
                      onClick={() => {
                        const newRemark = "新备注";
                        setItems(items.map(i => i.id === selectedItem.id ? { ...i, remark: newRemark } : i));
                        setSelectedItem({ ...selectedItem, remark: newRemark });
                      }}
                      className="text-xs text-slate-400 hover:text-blue-600 mb-8 flex items-center gap-1"
                    >
                      <Info size={12} />
                      添加备注
                    </button>
                  )}

                  <div className="flex gap-4">
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                    >
                      <Maximize2 size={20} />
                      上传设计图
                    </button>
                    <button 
                      onClick={() => {
                        setItems(items.filter(i => i.id !== selectedItem.id));
                        setSelectedItem(null);
                      }}
                      className="px-6 bg-red-50 text-red-600 font-bold rounded-2xl hover:bg-red-100 transition-all flex items-center justify-center gap-2"
                    >
                      <X size={20} />
                      删除
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
