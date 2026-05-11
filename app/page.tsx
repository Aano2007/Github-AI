import DashboardShell from '@/components/dashboard-shell'
import { OptimizationScore, SystemVitality } from '@/components/metrics-cards'

export default function Home() {
  return (
    <DashboardShell>
      <OptimizationScore />
      <SystemVitality />
    </DashboardShell>
  )
}
