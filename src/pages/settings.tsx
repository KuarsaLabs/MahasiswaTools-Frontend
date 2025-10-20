// @note settings page component
export function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your application preferences and account settings.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
          <div className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Display Name</label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Enter your display name"
                defaultValue="John Doe"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Email</label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Enter your email"
                defaultValue="john.doe@student.university.edu"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Student ID</label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Enter your student ID"
                defaultValue="2021001234"
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Email Notifications</label>
                <p className="text-xs text-muted-foreground">
                  Receive notifications about task deadlines and updates
                </p>
              </div>
              <input type="checkbox" className="w-4 h-4" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Push Notifications</label>
                <p className="text-xs text-muted-foreground">
                  Get instant notifications on your device
                </p>
              </div>
              <input type="checkbox" className="w-4 h-4" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Study Reminders</label>
                <p className="text-xs text-muted-foreground">
                  Daily reminders to stay on track with your studies
                </p>
              </div>
              <input type="checkbox" className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Appearance</h2>
          <div className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Theme</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Language</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="en">English</option>
                <option value="id">Indonesian</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button className="px-4 py-2 border border-border rounded-md hover:bg-muted/50">
            Cancel
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
