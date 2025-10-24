// @note settings page component
export function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Pengaturan</h1>
        <p className="text-muted-foreground">
          Kelola preferensi aplikasi dan pengaturan akunmu.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Pengaturan Profil</h2>
          <div className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Nama Tampilan</label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Masukkan nama tampilan"
                defaultValue="John Doe"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Email</label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Masukkan email"
                defaultValue="john.doe@student.university.edu"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">ID Mahasiswa</label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Masukkan ID mahasiswa"
                defaultValue="2021001234"
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Pengaturan Notifikasi</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Notifikasi Email</label>
                <p className="text-xs text-muted-foreground">
                  Terima notifikasi tentang deadline tugas dan update
                </p>
              </div>
              <input type="checkbox" className="w-4 h-4" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Notifikasi Push</label>
                <p className="text-xs text-muted-foreground">
                  Dapatkan notifikasi langsung di perangkatmu
                </p>
              </div>
              <input type="checkbox" className="w-4 h-4" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Pengingat Belajar</label>
                <p className="text-xs text-muted-foreground">
                  Pengingat harian buat tetap on track sama belajarmu
                </p>
              </div>
              <input type="checkbox" className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Tampilan</h2>
          <div className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Tema</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="light">Terang</option>
                <option value="dark">Gelap</option>
                <option value="system">Sistem</option>
              </select>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Bahasa</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="en">Inggris</option>
                <option value="id">Bahasa Indonesia</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button className="px-4 py-2 border border-border rounded-md hover:bg-muted/50">
            Batal
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}
