// @note general page component
export function General() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">General</h1>
        <p className="text-muted-foreground">
          Welcome to the general dashboard page.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">
            Active Tasks
          </p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold">4</div>
          <p className="text-xs text-muted-foreground">
            Completed Today
          </p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold">89%</div>
          <p className="text-xs text-muted-foreground">
            Success Rate
          </p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold">2.4h</div>
          <p className="text-xs text-muted-foreground">
            Avg. Study Time
          </p>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm">Completed Mathematics assignment</span>
            <span className="text-xs text-muted-foreground ml-auto">2 hours ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm">Started Physics project</span>
            <span className="text-xs text-muted-foreground ml-auto">4 hours ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-sm">Team meeting scheduled</span>
            <span className="text-xs text-muted-foreground ml-auto">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
