// @note dashboard welcome page component
export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Welcome to MahasiswaTools
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your comprehensive student productivity platform. Manage your tasks, track your progress, and achieve your academic goals.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6 text-center space-y-2">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
            <span className="text-2xl">📚</span>
          </div>
          <h3 className="font-semibold">Academic Tracking</h3>
          <p className="text-sm text-muted-foreground">
            Monitor your study progress and academic performance
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6 text-center space-y-2">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
            <span className="text-2xl">⏰</span>
          </div>
          <h3 className="font-semibold">Time Management</h3>
          <p className="text-sm text-muted-foreground">
            Organize your schedule and optimize your study time
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6 text-center space-y-2">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
            <span className="text-2xl">🎯</span>
          </div>
          <h3 className="font-semibold">Goal Achievement</h3>
          <p className="text-sm text-muted-foreground">
            Set and track your academic and personal goals
          </p>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <button className="p-4 border rounded-lg hover:bg-muted/50 transition-colors text-left">
            <div className="font-medium">View Statistics</div>
            <div className="text-sm text-muted-foreground">Check your progress</div>
          </button>
          <button className="p-4 border rounded-lg hover:bg-muted/50 transition-colors text-left">
            <div className="font-medium">Manage Tasks</div>
            <div className="text-sm text-muted-foreground">Organize assignments</div>
          </button>
          <button className="p-4 border rounded-lg hover:bg-muted/50 transition-colors text-left">
            <div className="font-medium">Study Planner</div>
            <div className="text-sm text-muted-foreground">Plan your schedule</div>
          </button>
          <button className="p-4 border rounded-lg hover:bg-muted/50 transition-colors text-left">
            <div className="font-medium">Settings</div>
            <div className="text-sm text-muted-foreground">Customize preferences</div>
          </button>
        </div>
      </div>
    </div>
  );
}