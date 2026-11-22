'use client';

import { useRouter } from 'next/navigation';
import { LogOut, ArrowLeft, ShieldAlert } from 'lucide-react';

export default function LogoutPage() {
  const router = useRouter();

  const handleConfirmLogout = () => {
    // Navigate back to login
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-light-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-border shadow-lg text-center space-y-5 animate-fade-up">
        <div className="w-16 h-16 rounded-3xl bg-red-50 text-red-600 mx-auto flex items-center justify-center">
          <LogOut size={28} />
        </div>

        <div>
          <h1 className="text-xl font-bold text-midnight-navy font-heading">
            Konfirmasi Keluar
          </h1>
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
            Apakah Anda yakin ingin keluar dari sesi KAIROS? Data demo yang telah Anda simpan di perangkat ini akan tetap tersimpan secara aman di LocalStorage.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => router.back()}
            className="flex-1 py-3.5 rounded-xl border border-border bg-white text-xs font-semibold text-foreground hover:bg-light-bg transition-colors"
          >
            Batal & Tetap di Sini
          </button>
          <button
            onClick={handleConfirmLogout}
            className="flex-1 py-3.5 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition-colors shadow-sm"
          >
            Ya, Keluar Akun
          </button>
        </div>
      </div>
    </div>
  );
}
