import { DashboardLayout } from './components/dashboard-layout';

// @note main app component with state-based dashboard layout
function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardLayout />
    </div>
  );
}

export default App;
