"use client";

export function PaymentsTab() {
    return (
        <>
            <header className="mb-10 flex flex-col gap-2 animate-fade-in-up">
                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white">Payment Methods</h1>
                <p className="text-gray-400 text-base lg:text-lg max-w-2xl">Securely manage your archived cards and settlement protocols.</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 relative overflow-hidden group hover:border-blue-500/30 transition-all">
                    <div className="flex justify-between items-start mb-12">
                        <div className="size-12 bg-white/10 rounded-xl flex items-center justify-center font-bold italic">VISA</div>
                        <span className="text-[9px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-widest">Primary</span>
                    </div>
                    <p className="text-white font-mono text-lg tracking-wider mb-2">•••• •••• •••• 4289</p>
                    <p className="text-gray-500 text-xs font-bold uppercase">Expires 12/26</p>
                </div>
                <div className="bg-white/5 border border-dashed border-white/10 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-500/30 transition-all group min-h-[200px]">
                    <span className="material-symbols-outlined text-4xl text-gray-600 group-hover:text-blue-500 transition-colors mb-4">add_circle</span>
                    <p className="text-gray-500 font-bold text-sm uppercase tracking-widest group-hover:text-white transition-colors">Add New Payment Method</p>
                </div>
            </div>
        </>
    );
}
