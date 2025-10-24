// @note dashboard welcome page component
export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mt-8">
          Mahasiswa Tools
        </h1>
        <p className="text-md md:text-lg text-muted-foreground max-w-2xl mx-auto mt-12">
          Platform buat bantu produktivitas mahasiswa. Kelola tugas, pantau
          progress, dan raih target akademikmu.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6 text-center space-y-2">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
            <span className="text-2xl">📄</span>
          </div>
          <h3 className="font-semibold">Makalah Maker</h3>
          <p className="text-sm text-muted-foreground">
            Buat draf makalah akademik dari topik Anda—otomatis, terstruktur,
            dan siap diedit.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6 text-center space-y-2">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
            <span className="text-2xl">🔍</span>
          </div>
          <h3 className="font-semibold">Dapus Checker</h3>
          <p className="text-sm text-muted-foreground">
            Validasi daftar pustaka secara cepat dengan pencarian web dan
            ringkasan sumber.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6 text-center space-y-2">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
            <span className="text-2xl">🚀</span>
          </div>
          <h3 className="font-semibold">Coming Soon</h3>
          <p className="text-sm text-muted-foreground">
            Fitur baru lagi dalam pengembangan. Tunggu aja ya, bakal lebih seru!
          </p>
        </div>
      </div>
    </div>
  );
}
